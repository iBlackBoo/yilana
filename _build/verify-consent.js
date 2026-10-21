// 通过真实 Chrome (CDP) 验证 Cookie 同意流程与 Consent Mode 信号
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
    // 干净 profile：模拟首次访问
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

    async function nav(url) {
        await send('Page.navigate', { url });
        await sleep(2200);
    }
    async function ev(expr) {
        const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
        if (!r || !r.result) return undefined;
        return r.result.value;
    }
    const q = s => `document.querySelector(${JSON.stringify(s)})`;

    /* ---------- 1. 首次访问：横幅出现，同意默认 denied ---------- */
    console.log('\n[1] 首次访问 index.html');
    await nav(BASE + '/index.html?lang=en');
    check('横幅已渲染', await ev(`!!${q('.ylc-banner')}`));
    check('横幅可见（opacity=1）', await ev(`(function(){var b=${q('.ylc-banner')};return !!b && getComputedStyle(b).opacity==='1';})()`));
    check('未写入同意记录', await ev(`localStorage.getItem('yilana.consent')===null`));
    const defaults = await ev(`(function(){
        var d=(window.dataLayer||[]).filter(function(x){return x[0]==='consent'&&x[1]==='default';});
        if(!d.length) return null;
        var c=d[0][2]||{};
        return {ad_storage:c.ad_storage, ad_user_data:c.ad_user_data, analytics_storage:c.analytics_storage};
    })()`);
    check('Consent Mode 默认 denied', defaults && defaults.ad_storage === 'denied' && defaults.ad_user_data === 'denied', JSON.stringify(defaults));
    check('广告脚本已加载', await ev(`!!document.querySelector('script[src*="adsbygoogle.js"]')`));
    check('文案为英文（Accept all）', (await ev(`${q('.ylc-btn-primary')} && ${q('.ylc-btn-primary')}.textContent`)) === 'Accept all');
    const href = await ev(`(function(){var a=${q('.ylc-body a')};return a?a.getAttribute('href'):null;})()`);
    check('隐私政策链接指向 privacy.html', /privacy\.html$/.test(href || ''), href);

    /* ---------- 2. 点击「全部接受」 ---------- */
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

    /* ---------- 3. 刷新不再打扰 ---------- */
    console.log('\n[3] 刷新页面');
    await nav(BASE + '/index.html?lang=en');
    check('刷新后不再弹横幅', await ev(`!${q('.ylc-banner')}`));
    const defAfter = await ev(`(function(){
        var d=(window.dataLayer||[]).filter(function(x){return x[0]==='consent'&&x[1]==='default';});
        return d.length ? (d[0][2]||{}).ad_storage : null;
    })()`);
    check('回访时默认值随记忆变为 granted', defAfter === 'granted', defAfter);

    /* ---------- 4. 中文页面 ---------- */
    console.log('\n[4] 中文界面 + 详情页');
    await ev(`localStorage.clear()`);
    await nav(BASE + '/effects/matrix.html?lang=zh');
    check('详情页也出现横幅', await ev(`!!${q('.ylc-banner')}`));
    check('文案为中文（全部接受）', (await ev(`${q('.ylc-btn-primary')}&&${q('.ylc-btn-primary')}.textContent`)) === '全部接受');
    const dHref = await ev(`(function(){var a=${q('.ylc-body a')};return a?a.href:null;})()`);
    check('详情页隐私链接解析为根目录', /\/privacy\.html$/.test(dHref || ''), dHref);
    await ev(`${q('.ylc-btn-ghost')}.click()`);
    await sleep(600);
    check('选择「仅必要」记录为 necessary', (await ev(`localStorage.getItem('yilana.consent')`)) === 'necessary');
    const g = await ev(`(function(){
        var u=(window.dataLayer||[]).filter(function(x){return x[0]==='consent'&&x[1]==='update';});
        return u.length?(u[u.length-1][2]||{}).ad_storage:null;
    })()`);
    check('拒绝时不会置为 granted', g !== 'granted', g);

    /* ---------- 5. 页脚可重新打开 ---------- */
    console.log('\n[5] 页脚 Cookie 设置入口');
    await ev(`localStorage.removeItem('yilana.consent')`);
    await nav(BASE + '/index.html?lang=en');
    await ev(`(function(){var b=document.querySelector('.footer-links button'); if(b) b.click();})()`);
    await sleep(600);
    check('可重新唤起横幅', await ev(`!!${q('.ylc-banner')}`));

    /* ---------- 6. 隐私政策页 ---------- */
    console.log('\n[6] privacy.html');
    await nav(BASE + '/privacy.html?lang=en');
    check('英文标题正确', (await ev(`document.title`)) === 'Privacy Policy & Cookies | Effect Lab');
    check('横幅语言与页面一致（英文）', (await ev(`(function(){var b=${q('.ylc-btn-primary')};return b?b.textContent:null;})()`)) === 'Accept all');
    check('页面含 AdSense 披露', await ev(`document.body.innerText.includes('DoubleClick')||document.body.innerText.includes('third-party vendors')||document.body.innerText.includes('Third-party vendors')`));
    check('section 数量 ≥ 12（英文版）', (await ev(`document.querySelectorAll('article[data-lang="en"] h2').length`)) >= 12);
    await ev(`${q('#langSwitch')}.click()`);
    await sleep(400);
    check('切中文后 html lang=zh-CN', (await ev(`document.documentElement.lang`)) === 'zh-CN');
    check('中文正文可见', await ev(`(function(){var a=document.querySelector('article[data-lang="zh"]');return a && getComputedStyle(a).display!=='none';})()`));
    check('英文正文已隐藏', await ev(`(function(){var a=document.querySelector('article[data-lang="en"]');return a && getComputedStyle(a).display==='none';})()`));
    check('中文标题正确', (await ev(`document.title`)).indexOf('隐私政策') >= 0);
    check('URL 带 lang=zh', (await ev(`location.search`)) === '?lang=zh');

    /* ---------- 7. 窄屏不溢出 ---------- */
    console.log('\n[7] 移动端 390px');
    await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
    await ev(`localStorage.clear()`);
    await nav(BASE + '/index.html?lang=en');
    const sw = await ev(`document.documentElement.scrollWidth`);
    check('无横向溢出', sw === 390, 'scrollWidth=' + sw);
    const box = await ev(`(function(){var b=${q('.ylc-banner')}; if(!b) return null; var r=b.getBoundingClientRect(); return {w:Math.round(r.width), bottom:Math.round(innerHeight-r.bottom)};})()`);
    check('窄屏横幅贴底且满宽', box && box.w === 390 && box.bottom === 0, JSON.stringify(box));

    console.log('\n通过 ' + pass + ' 项，失败 ' + fail + ' 项');

    ws.close();
    chrome.kill();
    await sleep(300);
    process.exit(fail ? 1 : 0);
})();
