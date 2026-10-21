// 校验全部站点页面的 <head> 中是否正确放置 AdSense 脚本
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PID = 'ca-pub-6465192362290250';
const SKIP_DIRS = ['node_modules', '.git', '.workbuddy', 'repo', '_build', '_content'];

function walk(dir, out) {
    out = out || [];
    for (const name of fs.readdirSync(dir)) {
        const p = path.join(dir, name);
        const st = fs.statSync(p);
        if (st.isDirectory()) {
            if (SKIP_DIRS.indexOf(name) >= 0) continue;
            walk(p, out);
        } else if (/\.html?$/i.test(name)) {
            out.push(p);
        }
    }
    return out;
}

const SRC_RE = /src=["']https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-6465192362290250["']/i;

// Consent Mode 需要的地区清单：EU 27 + 冰岛/列支敦士登/挪威 + 英国/瑞士
const MUST_REGIONS = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU',
    'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'IS', 'LI', 'NO', 'GB', 'CH'];

/** 校验 <head> 里的分地区 Consent Mode 默认值 */
function checkConsent(head) {
    const errs = [];
    const idxDenied = head.indexOf("gtag('consent', 'default'");
    if (idxDenied < 0) return ['缺少 Consent Mode 默认值'];

    // 第一个 default 块（带 region，全部 denied）
    const first = head.slice(idxDenied, head.indexOf('});', idxDenied) + 3);
    const rm = first.match(/region:\s*\[([^\]]*)\]/);
    if (!rm) {
        errs.push('第一个 default 缺少 region（会让欧洲访客默认放行）');
    } else {
        const list = rm[1].split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
        const missing = MUST_REGIONS.filter(c => list.indexOf(c) < 0);
        const extra = list.filter(c => MUST_REGIONS.indexOf(c) < 0);
        if (missing.length) errs.push('region 缺少: ' + missing.join(','));
        if (extra.length) errs.push('region 多出: ' + extra.join(','));
        if (list.length !== new Set(list).size) errs.push('region 有重复项');
    }
    ['ad_storage', 'ad_user_data', 'ad_personalization'].forEach(k => {
        if (!new RegExp(k + ":\\s*'denied'").test(first)) errs.push('带 region 的 default 里 ' + k + ' 不是 denied');
    });

    // 第二个 default 块（不写 region，其他地区放行）
    const idxGranted = head.indexOf("gtag('consent', 'default'", idxDenied + 5);
    if (idxGranted < 0) {
        errs.push('缺少「其他地区默认放行」的第二个 default');
    } else {
        if (idxGranted < idxDenied) errs.push('两个 default 顺序颠倒');
        const second = head.slice(idxGranted, head.indexOf('});', idxGranted) + 3);
        if (/region:/.test(second)) errs.push('第二个 default 不应带 region（否则其他地区无默认值）');
        if (!/ad_storage:\s*'granted'/.test(second)) errs.push('第二个 default 的 ad_storage 不是 granted');
    }
    return errs;
}

const files = walk(ROOT);
const problems = [];
const okList = [];

for (const f of files) {
    const rel = path.relative(ROOT, f).replace(/\\/g, '/');
    const html = fs.readFileSync(f, 'utf8');
    const hi = html.search(/<head[^>]*>/i);
    const he = html.search(/<\/head>/i);

    if (hi < 0 || he < hi) { problems.push({ rel, why: '没有 <head>' }); continue; }
    const head = html.slice(hi, he);
    const body = html.slice(he);

    const inHead = head.indexOf('adsbygoogle.js?client=' + PID) >= 0;
    const inBody = body.indexOf('adsbygoogle.js?client=' + PID) >= 0;

    const tagMatch = head.match(/<script[^>]*adsbygoogle\.js\?client=[^>]*>/i);
    const tag = tagMatch ? tagMatch[0] : '';

    const hasAsync = /\sasync(\s|=|>)/i.test(tag);
    const hasCors = /crossorigin=["']anonymous["']/i.test(tag);
    const hasSrc = SRC_RE.test(tag);

    // Consent Mode 默认值必须在广告脚本之前
    const iAds = head.indexOf('adsbygoogle.js?client=');
    const iConsent = head.indexOf("gtag('consent', 'default'");
    const orderOk = iConsent >= 0 && iAds >= 0 && iConsent < iAds;

    if (!inHead) { problems.push({ rel, why: inBody ? '脚本在 body 里，不在 head' : 'head 里没有脚本' }); continue; }
    if (!hasAsync || !hasCors || !hasSrc) {
        problems.push({ rel, why: '标签属性不符', tag: tag.replace(/\s+/g, ' ').trim() });
        continue;
    }
    if (!orderOk) { problems.push({ rel, why: 'Consent Mode 默认值缺失或位于广告脚本之后' }); continue; }

    const consentErrs = checkConsent(head);
    if (consentErrs.length) { problems.push({ rel, why: 'Consent Mode 地区默认值有问题: ' + consentErrs.join('；') }); continue; }

    okList.push(rel);
}

console.log('扫描站点页面:', files.length);
console.log('head 内脚本完整:', okList.length);
console.log('有问题:', problems.length);
problems.forEach(p => console.log('  ✗', p.rel, '—', p.why, p.tag ? '\n     ' + p.tag : ''));

if (!problems.length) {
    console.log('\n样例（index.html 的 head 前 30 行）：');
    const s = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    const hi = s.search(/<head[^>]*>/i);
    const he = s.search(/<\/head>/i);
    console.log(s.slice(hi, he).split('\n').slice(0, 30).join('\n'));
}
