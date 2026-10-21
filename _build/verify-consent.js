// 通过真实 Chrome (CDP) 验证：分地区 Consent Mode + Google 认证 CMP 接管 + 兜底横幅
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9337;
const BASE = 'http://localhost:8777';
const PROFILE = path.join(os.tmpdir(), 'cdp-consent-profile');

const sleep = ms => new Promise(r => setTimeout(r, ms));

let pass = 0, fail = 0;
function check(name, ok, extra) {
    if (ok) { pass++; console.log('  ✓', name); }
    else { fail++; console.log('  ✗', name, extra !== undefined ? '→ ' + extra : ''); }
}

(async () => {
    try { fs.rmSync(PROFILE, { recursive: true, force: true }); } catch (e) {}

    const chrome = spawn(CHROME, [
        '--headless=new', '--disable-gpu', '--hide-scrollbars',
        '--remote-debugging-port=' + PORT,
        '--user-data-dir=' + PROFILE,
        '--window-size=1280,900',
        'about:blank'
    ], { stdio: 'ignore' });

    let target = null;
    for (let i = 0; i < 40; i++) {
        await sleep(250);
        try {
            const list = await (await fetch('http://127.0.0.1:' + PORT + '/json/list')).json();
            target = list.find(t => t.type === 'page');
            if (target) break;
        } catch (e) {}
    }
    if (!target) { console.error('无法连接 Chrome CDP'); chrome.kill(); process.exit(1); }

    const ws = new WebSocket(target.webSocketDebuggerUrl);
    let id = 0;
    const pending = new Map();
    ws.addEventListener('message', ev => {
        const msg = JSON.parse(ev.data);
        if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result || msg.error); pending.delete(msg.id); }
    });
    await new Promise(r => ws.addEventListener('open', r, { once: true }));
    const send = (method, params) => new Promise(res => {
        const i = ++id; pending.set(i, res);
        ws.send(JSON.stringify({ id: i, method, params: params || {} }));
    });

    await send('Page.enable');
    await send('Runtime.enable');

    async function nav(url, wait) {
        await send('Page.navigate', { url });
        await sleep(wait === undefined ? 2200 : wait);
    }
    async function ev(expr) {
        const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
        if (!r || !r.result) return undefined;
        return r.result.value;
    }
    const q = s => `document.querySelector(${JSON.stringify(s)})`;

    async function waitFor(expr, timeout) {
        const end = Date.now() + (timeout || 6000);
        while (Date.now() < end) {
            if (await ev(expr)) return true;
            await sleep(150);
        }
        return false;
    }
    const setTz = tz => send('Emulation.setTimezoneOverride', { timezoneId: tz });
    const readDefaults = `(function(){
        var d=(window.dataLayer||[]).filter(function(x){return x[0]==='consent'&&x[1]==='default';});
        return d.map(function(x){var c=x[2]||{};return {
            region: c.region||null, ad_storage: c.ad_storage,
            ad_user_data: c.ad_user_data, ad_personalization: c.ad_personalization,
            wait: c.wait_for_update
        };});
    })()`;

    /* ---------- 0. head 里的分地区默认值 ---------- */
    console.log('\n[0] 分地区 Consent Mode 默认值');
    await setTz('Europe/Berlin');
    await nav(BASE + '/index.html?lang=en', 900);
    const defs = await ev(readDefaults);
    check('存在两个 default（地区拒绝 + 全局放行）', Array.isArray(defs) && defs.length === 2, JSON.stringify(defs && defs.length));
    const dRegion = defs && defs[0] || {};
    const dRest = defs && defs[1] || {};
    check('第一个 default 带 region 且为 denied',
        dRegion.ad_storage === 'denied' && dRegion.ad_user_data === 'denied' && dRegion.ad_personalization === 'denied' && Array.isArray(dRegion.region),
        JSON.stringify(dRegion));
    check('region 覆盖 EU 27 + EEA 其余 + 英国 + 瑞士（32 个）', dRegion.region && dRegion.region.length === 32, dRegion.region && dRegion.region.length);
    check('region 含 DE / GB / CH / IS / NO',
        dRegion.region && ['DE', 'GB', 'CH', 'IS', 'NO'].every(c => dRegion.region.indexOf(c) >= 0));
    check('第二个 default 无 region 且为 granted',
        !dRest.region && dRest.ad_storage === 'granted' && dRest.ad_user_data === 'granted' && dRest.ad_personalization === 'granted',
        JSON.stringify(dRest));
    check('wait_for_update 挂在地区 default 上', dRegion.wait === 500, dRegion.wait);

    /* ---------- 1. 欧洲访客：无 Google CMP 时走兜底 ---------- */
    console.log('\n[1] 欧洲访客（Europe/Berlin），无 Google CMP');
    check('时区识别为同意地区', (await ev(`window.ylConsent.inConsentRegion()`)) === true);
    check('等待期内不抢在 Google 前面弹窗', await ev(`!${q('.ylc-banner')}`));
    check('兜底横幅随后出现', await waitFor(`!!${q('.ylc-banner')}`, 6000));
    check('横幅可见（opacity=1）', await ev(`(function(){var b=${q('.ylc-banner')};return !!b && getComputedStyle(b).opacity==='1';})()`));
    check('未写入同意记录', await ev(`localStorage.getItem('yilana.consent')===null`));
    check('模式为 google', (await ev(`window.ylConsent && window.ylConsent.mode`)) === 'google');
    check('检测不到 Google CMP', (await ev(`window.ylConsent.hasGoogleCmp()`)) === false);
    check('广告脚本已加载', await ev(`!!document.querySelector('script[src*="adsbygoogle.js"]')`));
    check('文案为英文（Accept all）', (await ev(`${q('.ylc-btn-primary')} && ${q('.ylc-btn-primary')}.textContent`)) === 'Accept all');

    /* ---------- 2. 接受 ---------- */
    console.log('\n[2] 点击 Accept all');
    await ev(`${q('.ylc-btn-primary')}.click()`);
    await sleep(700);
    check('已记录 all', (await ev(`localStorage.getItem('yilana.consent')`)) === 'all');
    check('横幅已移除', await ev(`!${q('.ylc-banner')}`));
    const updates = await ev(`(function(){
        var u=(window.dataLayer||[]).filter(function(x){return x[0]==='consent'&&x[1]==='update';});
        if(!u.length) return null;
        var c=u[u.length-1][2]||{};
        return {ad_storage:c.ad_storage, ad_personalization:c.ad_personalization};
    })()`);
    check('Consent Mode 已 update 为 granted', updates && updates.ad_storage === 'granted' && updates.ad_personalization === 'granted', JSON.stringify(updates));

    /* ---------- 3. 回访不打扰 ---------- */
    console.log('\n[3] 刷新页面');
    await nav(BASE + '/index.html?lang=en', 4200);
    check('回访不再弹横幅', await ev(`!${q('.ylc-banner')}`));
    check('已存选择被重新应用', await ev(`(function(){
        var u=(window.dataLayer||[]).filter(function(x){return x[0]==='consent'&&x[1]==='update';});
        return u.length>0 && (u[u.length-1][2]||{}).ad_storage==='granted';
    })()`));

    /* ---------- 4. 非欧洲访客：默认放行、不弹窗 ---------- */
    console.log('\n[4] 非欧洲访客（Asia/Shanghai）');
    await ev(`localStorage.clear()`);
    await setTz('Asia/Shanghai');
    await nav(BASE + '/index.html?lang=zh', 4000);
    check('时区识别为非同意地区', (await ev(`window.ylConsent.inConsentRegion()`)) === false);
    check('不自动弹兜底横幅', await ev(`!${q('.ylc-banner')}`));
    check('没有多余的 consent update', await ev(`(window.dataLayer||[]).filter(function(x){return x[0]==='consent'&&x[1]==='update';}).length===0`));
    check('地区默认值仍然下发', await ev(`${readDefaults}.length===2`));
    check('页脚 Cookie 设置按钮存在', await ev(`!!document.querySelector('.footer-links button')`));
    await ev(`document.querySelector('.footer-links button').click()`);
    check('手动点击仍可打开横幅', await waitFor(`!!${q('.ylc-banner')}`, 3000));
    check('手动打开后文案为中文', (await ev(`${q('.ylc-btn-primary')}&&${q('.ylc-btn-primary')}.textContent`)) === '全部接受');

    /* ---------- 5. 语言地区信号兜底（时区不在欧洲但 locale 是 de-DE） ---------- */
    console.log('\n[5] 时区非欧洲 + locale de-DE');
    await ev(`localStorage.clear()`);
    await send('Emulation.setLocaleOverride', { locale: 'de-DE' });
    await nav(BASE + '/index.html?lang=en', 4000);
    check('locale 命中同意地区即视为欧洲', (await ev(`window.ylConsent.inConsentRegion()`)) === true);
    check('仍会弹出兜底横幅', await waitFor(`!!${q('.ylc-banner')}`, 5000));
    await send('Emulation.setLocaleOverride', { locale: 'en-US' });
    await setTz('Europe/Berlin');

    /* ---------- 6. 中文详情页 ---------- */
    console.log('\n[6] 中文界面 + 详情页');
    await ev(`localStorage.clear()`);
    await nav(BASE + '/effects/matrix.html?lang=zh', 900);
    check('详情页出现兜底横幅', await waitFor(`!!${q('.ylc-banner')}`, 6000));
    check('文案为中文（全部接受）', (await ev(`${q('.ylc-btn-primary')}&&${q('.ylc-btn-primary')}.textContent`)) === '全部接受');
    const dHref = await ev(`(function(){var a=${q('.ylc-body a')};return a?a.href:null;})()`);
    check('详情页隐私链接解析到根目录', /\/privacy\.html$/.test(dHref || ''), dHref);
    await ev(`${q('.ylc-btn-ghost')}.click()`);
    await sleep(600);
    check('选择「仅必要」记录为 necessary', (await ev(`localStorage.getItem('yilana.consent')`)) === 'necessary');
    const g = await ev(`(function(){
        var u=(window.dataLayer||[]).filter(function(x){return x[0]==='consent'&&x[1]==='update';});
        return u.length?(u[u.length-1][2]||{}).ad_storage:null;
    })()`);
    check('拒绝时不会置为 granted', g !== 'granted', g);

    /* ---------- 7. 页脚入口可重开 ---------- */
    console.log('\n[7] 页脚 Cookie 设置');
    await ev(`localStorage.removeItem('yilana.consent')`);
    await nav(BASE + '/index.html?lang=en', 900);
    check('页脚按钮存在', await ev(`!!document.querySelector('.footer-links button')`));
    await ev(`document.querySelector('.footer-links button').click()`);
    check('无 CMP 时可展开兜底横幅', await waitFor(`!!${q('.ylc-banner')}`, 3000));

    /* ---------- 8. 隐私政策页 ---------- */
    console.log('\n[8] privacy.html');
    await nav(BASE + '/privacy.html?lang=en', 4200);
    check('英文标题正确', (await ev(`document.title`)) === 'Privacy Policy & Cookies | Effect Lab');
    check('已声明使用 Google 认证 CMP', await ev(`document.querySelector('article[data-lang="en"]').innerText.includes("Google's own consent management platform")`));
    check('不再声明「非认证 CMP」', await ev(`!document.querySelector('article[data-lang="en"]').innerText.includes('rather than a certified CMP')`));
    check('已说明分地区默认值', await ev(`document.querySelector('article[data-lang="en"]').innerText.includes('per region')`));
    check('含撤回同意入口', await ev(`!!document.querySelector('article[data-lang="en"] .cookie-btn')`));
    check('section 数量 ≥ 12（英文版）', (await ev(`document.querySelectorAll('article[data-lang="en"] h2').length`)) >= 12);
    await ev(`${q('#langSwitch')}.click()`);
    await sleep(400);
    check('切中文后 html lang=zh-CN', (await ev(`document.documentElement.lang`)) === 'zh-CN');
    check('中文正文可见', await ev(`(function(){var a=document.querySelector('article[data-lang="zh"]');return a && getComputedStyle(a).display!=='none';})()`));
    check('英文正文已隐藏', await ev(`(function(){var a=document.querySelector('article[data-lang="en"]');return a && getComputedStyle(a).display==='none';})()`));
    check('中文标题正确', (await ev(`document.title`)).indexOf('隐私政策') >= 0);
    check('URL 带 lang=zh', (await ev(`location.search`)) === '?lang=zh');
    check('中文版也说明分地区默认值', await ev(`document.querySelector('article[data-lang="zh"]').innerText.includes('按地区设置')`));

    /* ---------- 9. 移动端 ---------- */
    console.log('\n[9] 移动端 390px（欧洲）');
    await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
    await ev(`localStorage.clear()`);
    await nav(BASE + '/index.html?lang=zh', 900);
    const sw = await ev(`document.documentElement.scrollWidth`);
    check('无横向溢出', sw === 390, 'scrollWidth=' + sw);
    await waitFor(`!!${q('.ylc-banner')}`, 6000);
    const box = await ev(`(function(){var b=${q('.ylc-banner')}; if(!b) return null; var r=b.getBoundingClientRect(); return {w:Math.round(r.width), bottom:Math.round(innerHeight-r.bottom)};})()`);
    check('窄屏横幅贴底且满宽', box && box.w === 390 && box.bottom === 0, JSON.stringify(box));
    await send('Emulation.clearDeviceMetricsOverride');

    /* ---------- 10. 存在 Google CMP：自己绝不弹窗 ---------- */
    console.log('\n[10] 模拟 Google CMP 已下发');
    await ev(`localStorage.clear()`);
    const injected = await send('Page.addScriptToEvaluateOnNewDocument', {
        source: [
            'window.__fcPushed = [];',
            'window.__fcRevoked = false;',
            'window.googlefc = {',
            '  callbackQueue: { push: function (x) { window.__fcPushed.push(x); } },',
            '  showRevocationMessage: function () { window.__fcRevoked = true; }',
            '};'
        ].join('\n')
    });
    await nav(BASE + '/index.html?lang=en', 5000);
    check('识别到 Google CMP', (await ev(`window.ylConsent.hasGoogleCmp()`)) === true);
    check('自建横幅完全不出现', await ev(`!${q('.ylc-banner')}`));
    check('未向自建横幅写入记录', await ev(`localStorage.getItem('yilana.consent')===null`));
    await ev(`document.querySelector('.footer-links button').click()`);
    await sleep(400);
    const pushed = await ev(`(function(){
        var p = window.__fcPushed || [];
        return { len: p.length, isFn: p.length ? typeof p[0] === 'function' : false,
                 key: (p.length && p[0] && typeof p[0] === 'object') ? Object.keys(p[0]).join(',') : '' };
    })()`);
    check('Cookie 设置走 Google 撤回流程', pushed && pushed.len >= 1 && (pushed.isFn || pushed.key === 'CONSENT_API_READY'), JSON.stringify(pushed));
    check('点击后仍不弹自建横幅', await ev(`!${q('.ylc-banner')}`));
    if (injected && injected.identifier) {
        await send('Page.removeScriptToEvaluateOnNewDocument', { identifier: injected.identifier });
    }

    console.log('\n通过 ' + pass + ' 项，失败 ' + fail + ' 项');

    ws.close();
    chrome.kill();
    await sleep(300);
    process.exit(fail ? 1 : 0);
})();
