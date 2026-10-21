'use strict';
/* ==========================================================================
 * _gen-detail.js — 生成 58 个原生特效的独立详情页
 * 数据来源：
 *   _build/base-effects.json  （从 index.html 抽取的特效数据）
 *   _content/part-a.js|b.js   （人工撰写的双语讲解）
 *   i18n.js                   （英文名称，保持与首页一致）
 * 产出：
 *   effects/<id>.html × 58
 *   effects/detail.css / effects/detail.js
 *   sitemap.xml
 * ========================================================================== */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DIR = __dirname;
const OUT = path.join(DIR, 'effects');
const SITE = 'https://yilana.cn';
const TOTAL_ALL = 131;

const list = JSON.parse(fs.readFileSync(path.join(DIR, '_build/base-effects.json'), 'utf8'));
const content = Object.assign(
  {},
  require(path.join(DIR, '_content/part-a.js')),
  require(path.join(DIR, '_content/part-b.js'))
);

// 英文名称复用 i18n.js，避免首页与详情页叫法不一致
const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(DIR, 'i18n.js'), 'utf8'), sandbox);
const FX_EN = sandbox.window.YI_FX_EN;

const GROUPS = {
  particle: { en: 'Particles', zh: '粒子' },
  interact: { en: 'Interactive', zh: '互动' },
  visual: { en: 'Visual', zh: '视觉' },
  text: { en: 'Text', zh: '文字' }
};

const esc = s => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const escAttr = s => esc(s).replace(/'/g, '&#39;');

// 嵌入 <script> 的字符串必须转义 "<" + "/"，否则内容里的 </script> 会提前闭合标签
const jsStr = v => JSON.stringify(v).replace(/<\//g, '<\\/').replace(/<!--/g, '<\\!--');
const jsFnSrc = v => String(v).replace(/<\//g, '<\\/');

/* ---------------- 校验 ---------------- */
const missing = list.filter(e => !content[e.id]);
if (missing.length) {
  console.error('缺少文案:', missing.map(e => e.id).join(', '));
  process.exit(1);
}
const noEnName = list.filter(e => !FX_EN[e.id]);
if (noEnName.length) {
  console.error('缺少英文名称:', noEnName.map(e => e.id).join(', '));
  process.exit(1);
}

/* ---------------- 页面模板 ---------------- */
function page(e, idx) {
  const c = content[e.id];
  const enName = FX_EN[e.id][0];
  const enDesc = FX_EN[e.id][1];
  const zhName = e.title;
  const prev = list[idx - 1];
  const next = list[idx + 1];
  const g = GROUPS[e.group] || { en: 'Effects', zh: '特效' };

  const titleEn = enName + ' — a ' + g.en.toLowerCase() + ' effect built with plain ' +
    (e.code.includes('<canvas') ? 'Canvas' : 'CSS') + ' | Effect Lab';
  const descEn = c.en.lead.slice(0, 155);
  const descZh = c.zh.lead.slice(0, 155);

  const tagsHtml = c.tags.map(t => `<span class="tag">${esc(t)}</span>`).join('');

  const tweakEn = c.en.tweak.map((t, i) => `<li><span class="num">${i + 1}</span><span>${esc(t)}</span></li>`).join('\n            ');
  const tweakZh = c.zh.tweak.map((t, i) => `<li><span class="num">${i + 1}</span><span>${esc(t)}</span></li>`).join('\n            ');

  const prevHtml = prev
    ? `<a class="pn prev" href="${prev.id}.html"><span class="dir">← Previous</span><strong>${esc(FX_EN[prev.id][0])}</strong></a>`
    : '<span class="pn empty"></span>';
  const nextHtml = next
    ? `<a class="pn next" href="${next.id}.html"><span class="dir">Next →</span><strong>${esc(FX_EN[next.id][0])}</strong></a>`
    : '<span class="pn empty"></span>';

  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: enName + ' — how it works',
    description: c.en.lead,
    inLanguage: ['en', 'zh-CN'],
    url: SITE + '/effects/' + e.id + '.html',
    mainEntityOfPage: { '@type': 'WebPage', '@id': SITE + '/effects/' + e.id + '.html' },
    about: { '@type': 'Thing', name: 'Web visual effects, ' + c.tags.join(', ') },
    isPartOf: { '@type': 'WebSite', name: 'Effect Lab', url: SITE + '/' },
    publisher: { '@type': 'Organization', name: 'Effect Lab', url: SITE + '/' },
    isAccessibleForFree: true
  };

  return `<!DOCTYPE html>
<html lang="en" data-slug="${esc(e.id)}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Google Consent Mode v2：EEA / 英国 / 瑞士默认拒绝，其他地区默认放行；用户选择后由 Google 认证 CMP 更新 -->
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments); }
        // 1) 需要事先取得同意的地区：EEA（EU 27 + 冰岛 / 列支敦士登 / 挪威）+ 英国 + 瑞士 → 全部拒绝
        //    注意：region 由 Google 按访问者 IP 判定，与浏览器时区无关
        gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted',
            wait_for_update: 500,
            region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH']
        });
        // 2) 其他地区：默认放行（Google 仍按当地法规做受限数据处理；本站不接入分析工具，analytics 保持关闭）
        gtag('consent', 'default', {
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
            analytics_storage: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted'
        });
    </script>
    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6465192362290250"
        crossorigin="anonymous"></script>
    <title>${esc(titleEn)}</title>
    <meta id="metaDesc" name="description" content="${escAttr(descEn)}">
    <link rel="canonical" href="${SITE}/effects/${e.id}.html">
    <link rel="alternate" hreflang="en" href="${SITE}/effects/${e.id}.html">
    <link rel="alternate" hreflang="zh-CN" href="${SITE}/effects/${e.id}.html?lang=zh">
    <link rel="alternate" hreflang="x-default" href="${SITE}/effects/${e.id}.html">
    <meta name="robots" content="index, follow">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="yilana.cn">
    <meta property="og:title" content="${escAttr(enName + ' — ' + c.en.lead.slice(0, 90))}">
    <meta property="og:description" content="${escAttr(descEn)}">
    <meta property="og:url" content="${SITE}/effects/${e.id}.html">
    <meta property="og:locale" content="en_US">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></svg>">
    <link rel="stylesheet" href="detail.css">
    <!-- 语言先定：在 body 解析前写入 html[lang]，避免中文访客看到一瞬英文 -->
    <script>
        (function () {
            var q = null;
            try { q = new URLSearchParams(location.search).get('lang'); } catch (e) {}
            var L = (q === 'en' || q === 'zh') ? q : (function () {
                try {
                    var s = localStorage.getItem('yilana.lang');
                    if (s === 'en' || s === 'zh') return s;
                } catch (e) {}
                return /^zh\\b/i.test(navigator.language || '') ? 'zh' : 'en';
            })();
            document.documentElement.lang = L === 'en' ? 'en' : 'zh-CN';
        })();
    </script>
    <script type="application/ld+json">${JSON.stringify(jsonld)}</script>
</head>
<body>

<header class="topbar">
    <div class="topbar-inner">
        <a class="brand" href="../index.html"><span class="brand-icon">✨</span><span>Effect Lab</span></a>
        <nav class="topnav">
            <a href="../index.html#lab"><span data-lang="en">All ${TOTAL_ALL} effects</span><span data-lang="zh">全部 ${TOTAL_ALL} 个特效</span></a>
        </nav>
        <button class="lang-switch" id="langSwitch" type="button" aria-label="Switch language">中文</button>
    </div>
</header>

<main class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb">
        <a href="../index.html">Effect Lab</a><span class="sep">/</span>
        <a href="../index.html#lab"><span data-lang="en">${g.en}</span><span data-lang="zh">${g.zh}</span></a><span class="sep">/</span>
        <span class="here"><span data-lang="en">${esc(enName)}</span><span data-lang="zh">${esc(zhName)}</span></span>
    </nav>

    <article>
        <header class="head">
            <div class="icon">${e.icon}</div>
            <h1>
                <span data-lang="en">${esc(enName)}</span>
                <span data-lang="zh">${esc(zhName)}</span>
            </h1>
            <p class="lead">
                <span data-lang="en">${esc(c.en.lead)}</span>
                <span data-lang="zh">${esc(c.zh.lead)}</span>
            </p>
            <div class="tags">${tagsHtml}</div>
        </header>

        <section class="stage-box" aria-label="Live demo">
            <div class="stage-bar">
                <span class="dot"></span><span class="dot"></span><span class="dot"></span>
                <span class="stage-label"><span data-lang="en">Live demo</span><span data-lang="zh">实时演示</span></span>
                <button class="restart" id="restart" type="button">
                    <span data-lang="en">↻ Restart</span><span data-lang="zh">↻ 重新播放</span>
                </button>
            </div>
            <div class="stage" id="stage"></div>
            <p class="stage-hint">
                <span data-lang="en">Runs live on this page. Move the pointer, click, or drag — whichever the effect listens for.</span>
                <span data-lang="zh">就在本页实时运行。移动鼠标、点击或拖拽——看它响应哪一种。</span>
            </p>
        </section>

        <section class="block">
            <h2><span data-lang="en">How it works</span><span data-lang="zh">原理拆解</span></h2>
            <p>
                <span data-lang="en">${esc(c.en.how)}</span>
                <span data-lang="zh">${esc(c.zh.how)}</span>
            </p>
        </section>

        <section class="block">
            <h2><span data-lang="en">What to change</span><span data-lang="zh">可以改的地方</span></h2>
            <ul class="tweaks" data-lang="en">${tweakEn}</ul>
            <ul class="tweaks" data-lang="zh">${tweakZh}</ul>
        </section>

        <section class="block">
            <h2><span data-lang="en">Source code</span><span data-lang="zh">源码</span></h2>
            <p class="block-note">
                <span data-lang="en">Self-contained — paste it into any HTML file and it runs. No libraries.</span>
                <span data-lang="zh">完全独立——粘进任意 HTML 文件就能跑，不需要任何库。</span>
            </p>
            <div class="code-wrap">
                <div class="code-bar">
                    <span>${esc(e.id)}.html</span>
                    <button id="copyCode" type="button"><span data-lang="en">📋 Copy</span><span data-lang="zh">📋 复制</span></button>
                </div>
                <pre class="code-block" id="codeBlock"></pre>
            </div>
        </section>

        <nav class="pager">
            ${prevHtml}
            ${nextHtml}
        </nav>

        <aside class="cta">
            <p>
                <span data-lang="en">This is one of ${TOTAL_ALL} effects in the lab — particles, text shaders, UI components and small games.</span>
                <span data-lang="zh">这只是实验室里 ${TOTAL_ALL} 个特效中的一个——粒子、文字、UI 组件和小游戏都有。</span>
            </p>
            <a class="btn" href="../index.html#lab"><span data-lang="en">Browse the full gallery →</span><span data-lang="zh">浏览全部特效 →</span></a>
        </aside>
    </article>
</main>

<footer class="foot">
    <p><span data-lang="en">Effect Lab · yilana.cn — built with plain Canvas 2D and CSS, no libraries.</span><span data-lang="zh">Effect Lab · yilana.cn —— 纯 Canvas 2D 与 CSS，不依赖任何库。</span></p>
    <p class="foot-links">
        <a href="../index.html"><span data-lang="en">Gallery</span><span data-lang="zh">特效大厅</span></a>
        <a href="../privacy.html"><span data-lang="en">Privacy</span><span data-lang="zh">隐私政策</span></a>
        <button class="foot-btn" type="button" onclick="window.ylConsent&&window.ylConsent.open()"><span data-lang="en">Cookie settings</span><span data-lang="zh">Cookie 设置</span></button>
    </p>
</footer>

<script>
/* ===== 当前特效 ===== */
const EFFECT_ID = ${jsStr(e.id)};
const CODE = ${jsStr(e.code)};
const DEMO = function ${jsFnSrc(e.demo)};
const META = {
  en: { title: ${jsStr(titleEn)}, desc: ${jsStr(descEn)} },
  zh: { title: ${jsStr(zhName + ' · 原理与源码 | Effect Lab')}, desc: ${jsStr(descZh)} }
};

/* ===== 与首页一致的 helper（部分 demo 依赖）===== */
function makeCanvas(el){ const c=document.createElement('canvas'); c.width=el.clientWidth||800; c.height=el.clientHeight||380; c.style.width='100%'; c.style.height='100%'; el.appendChild(c); return c; }
function clearEl(el){ while(el.firstChild) el.removeChild(el.firstChild); }

/* ===== 语言 ===== */
const LANG_KEY = 'yilana.lang';
let LANG = 'en';
function detectLang(){
  let q = null;
  try{ q = new URLSearchParams(location.search).get('lang'); }catch(e){}
  if(q === 'en' || q === 'zh') return q;
  try{ const s = localStorage.getItem(LANG_KEY); if(s === 'en' || s === 'zh') return s; }catch(e){}
  return /^zh\\b/i.test(navigator.language || '') ? 'zh' : 'en';
}
function applyLang(){
  document.documentElement.lang = LANG === 'en' ? 'en' : 'zh-CN';
  const m = META[LANG];
  document.title = m.title;
  const md = document.getElementById('metaDesc'); if(md) md.setAttribute('content', m.desc);
  const ogt = document.querySelector('meta[property="og:title"]'); if(ogt) ogt.setAttribute('content', m.title);
  const ogd = document.querySelector('meta[property="og:description"]'); if(ogd) ogd.setAttribute('content', m.desc);
  const ogl = document.querySelector('meta[property="og:locale"]'); if(ogl) ogl.setAttribute('content', LANG === 'en' ? 'en_US' : 'zh_CN');
  const sw = document.getElementById('langSwitch'); if(sw) sw.textContent = LANG === 'en' ? '中文' : 'EN';
  try{
    const u = new URL(location.href);
    if(LANG === 'zh') u.searchParams.set('lang','zh'); else u.searchParams.delete('lang');
    history.replaceState(null, '', u.pathname + (u.search || '') + u.hash);
  }catch(e){}
}
document.getElementById('langSwitch').onclick = function(){
  LANG = LANG === 'en' ? 'zh' : 'en';
  try{ localStorage.setItem(LANG_KEY, LANG); }catch(e){}
  applyLang();
};

/* ===== 源码 ===== */
document.getElementById('codeBlock').textContent = CODE;
document.getElementById('copyCode').onclick = async function(){
  const btn = this;
  try{ await navigator.clipboard.writeText(CODE); }
  catch(e){
    const ta = document.createElement('textarea'); ta.value = CODE;
    document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
  }
  const old = btn.innerHTML;
  btn.innerHTML = LANG === 'en' ? '✓ Copied' : '✓ 已复制';
  setTimeout(() => { btn.innerHTML = old; }, 1600);
};

/* ===== 运行 demo ===== */
const stage = document.getElementById('stage');
let cleanup = null, pokeTimer = null;

// 点击/鼠标类特效初始是空的，主动在舞台中心模拟一次鼠标事件，避免访客看到空框
function autoPoke(){
  const target = stage.querySelector('canvas') || stage.firstElementChild || stage;
  const r = stage.getBoundingClientRect();
  const x = r.left + r.width / 2, y = r.top + r.height / 2;
  const opts = { clientX: x, clientY: y, bubbles: true, cancelable: true, view: window };
  try{
    target.dispatchEvent(new MouseEvent('mousemove', opts));
    target.dispatchEvent(new MouseEvent('click', opts));
  }catch(e){}
}

function runDemo(){
  if(cleanup){ try{ cleanup(); }catch(e){} cleanup = null; }
  clearTimeout(pokeTimer);
  clearEl(stage);
  stage.removeAttribute('style');
  try{
    cleanup = DEMO(stage) || null;
    pokeTimer = setTimeout(autoPoke, 650);
  }catch(err){
    stage.innerHTML = '<p style="padding:2rem;color:#ff9aa2">Demo error: ' + err.message + '</p>';
  }
}
document.getElementById('restart').onclick = runDemo;

/* ===== 初始化 ===== */
LANG = detectLang();
applyLang();
runDemo();
</script>
<script src="../consent.js" defer></script>
</body>
</html>
`;
}

/* ---------------- 样式与脚本 ---------------- */
const CSS = `/* 特效详情页：与首页同一套配色 */
:root{
  --bg:#08080f; --bg2:#0d0d1a; --surface:#141428; --surface2:#1b1b34;
  --text:#e8e8f5; --muted:#9a9ac0; --dim:#7a7a9a;
  --accent1:#ff6b9d; --accent2:#4ecdc4; --accent3:#ffe66d; --accent5:#6c8cff;
  --border:rgba(255,255,255,.08);
}
*{margin:0;padding:0;box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{
  font-family:'Segoe UI',system-ui,-apple-system,'PingFang SC','Microsoft YaHei',sans-serif;
  background:radial-gradient(circle at 20% 0%,#16162e 0%,var(--bg) 55%);
  color:var(--text); line-height:1.75; min-height:100vh;
}
a{color:var(--accent2);text-decoration:none}
a:hover{text-decoration:underline}

/* 顶部 */
.topbar{position:sticky;top:0;z-index:100;background:rgba(8,8,15,.82);
  backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid var(--border)}
.topbar-inner{max-width:900px;margin:0 auto;padding:0 1.5rem;height:60px;
  display:flex;align-items:center;gap:1rem}
.brand{display:flex;align-items:center;gap:.5rem;color:var(--text);font-weight:700;letter-spacing:.03em}
.brand:hover{text-decoration:none}
.brand-icon{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;
  background:linear-gradient(135deg,var(--accent1),var(--accent2));font-size:.95rem;
  box-shadow:0 0 14px rgba(255,107,157,.45)}
.topnav{margin-left:auto;font-size:.9rem}
.topnav a{color:var(--muted);padding:.4rem .8rem;border-radius:16px}
.topnav a:hover{background:rgba(255,255,255,.06);color:#fff;text-decoration:none}
.lang-switch{background:rgba(108,140,255,.12);color:var(--accent5);border:1px solid rgba(108,140,255,.35);
  border-radius:16px;padding:.35rem .9rem;font-size:.85rem;font-weight:700;font-family:inherit;
  cursor:pointer;transition:all .2s;white-space:nowrap}
.lang-switch:hover{background:rgba(108,140,255,.28);color:#fff}

/* 正文容器 */
.wrap{max-width:900px;margin:0 auto;padding:2rem 1.5rem 1rem}

/* 面包屑 */
.crumbs{font-size:.82rem;color:var(--dim);margin-bottom:1.6rem;display:flex;gap:.5rem;flex-wrap:wrap}
.crumbs a{color:var(--dim)}
.crumbs a:hover{color:var(--accent2)}
.crumbs .here{color:var(--muted)}
.crumbs .sep{opacity:.4}

/* 标题区 */
.head{text-align:center;margin-bottom:2rem}
.head .icon{font-size:3.4rem;line-height:1;margin-bottom:.6rem;
  filter:drop-shadow(0 0 20px rgba(255,255,255,.25))}
.head h1{font-size:clamp(1.9rem,5vw,2.8rem);font-weight:800;letter-spacing:.02em;line-height:1.25;
  background:linear-gradient(120deg,var(--accent3),var(--accent1),var(--accent2));
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
  margin-bottom:.8rem}
.lead{color:var(--muted);font-size:1.08rem;max-width:640px;margin:0 auto 1.2rem}
.tags{display:flex;gap:.5rem;justify-content:center;flex-wrap:wrap}
.tag{font-size:.76rem;color:var(--accent3);background:rgba(255,230,109,.1);
  border:1px solid rgba(255,230,109,.25);padding:.22rem .7rem;border-radius:12px;letter-spacing:.02em}

/* 演示舞台 */
.stage-box{background:linear-gradient(160deg,var(--surface),var(--surface2));
  border:1px solid var(--border);border-radius:18px;overflow:hidden;margin-bottom:2.6rem;
  box-shadow:0 18px 50px rgba(0,0,0,.4)}
.stage-bar{display:flex;align-items:center;gap:.4rem;padding:.6rem .9rem;
  background:rgba(255,255,255,.04);border-bottom:1px solid var(--border)}
.stage-bar .dot{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.18)}
.stage-bar .dot:first-child{background:#ff6b6b}
.stage-bar .dot:nth-child(2){background:#ffd166}
.stage-bar .dot:nth-child(3){background:#4ecdc4}
.stage-label{margin-left:.6rem;font-size:.78rem;color:var(--dim);letter-spacing:.04em;text-transform:uppercase}
.restart{margin-left:auto;background:rgba(255,255,255,.06);border:1px solid var(--border);
  color:var(--muted);font-family:inherit;font-size:.78rem;padding:.3rem .8rem;border-radius:14px;
  cursor:pointer;transition:all .2s}
.restart:hover{background:rgba(255,255,255,.14);color:#fff}
.stage{position:relative;height:min(52vh,400px);min-height:300px;overflow:hidden;
  background:#05050c;display:block}
.stage > *{max-width:100%}
.stage-hint{font-size:.8rem;color:var(--dim);padding:.7rem .9rem;border-top:1px solid var(--border);
  background:rgba(0,0,0,.2)}

/* 内容块 */
.block{margin-bottom:2.4rem}
.block h2{font-size:1.35rem;font-weight:700;margin-bottom:.9rem;letter-spacing:.01em;
  color:#f0f0ff;display:flex;align-items:center;gap:.5rem}
.block h2::before{content:'';width:4px;height:1.15em;border-radius:2px;
  background:linear-gradient(180deg,var(--accent1),var(--accent5))}
.block p{color:#b9b9d4;font-size:1.02rem}
.block-note{color:var(--dim)!important;font-size:.88rem!important;margin-bottom:.8rem}

/* 可调参数 */
.tweaks{list-style:none;display:flex;flex-direction:column;gap:.7rem}
.tweaks li{display:flex;gap:.75rem;align-items:flex-start;background:rgba(255,255,255,.03);
  border:1px solid var(--border);border-radius:12px;padding:.8rem 1rem;color:#c4c4dd;font-size:.96rem}
.tweaks .num{flex:0 0 22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  font-size:.75rem;font-weight:700;background:rgba(78,205,196,.15);color:var(--accent2);
  border:1px solid rgba(78,205,196,.3);margin-top:.15rem}

/* 代码 */
.code-wrap{background:#05050c;border:1px solid var(--border);border-radius:14px;overflow:hidden}
.code-bar{display:flex;align-items:center;justify-content:space-between;padding:.55rem .9rem;
  background:rgba(255,255,255,.04);border-bottom:1px solid var(--border)}
.code-bar span{font-size:.78rem;color:var(--dim);font-family:Consolas,Monaco,monospace}
.code-bar button{background:rgba(255,230,109,.12);color:var(--accent3);border:1px solid rgba(255,230,109,.25);
  padding:.32rem .85rem;border-radius:14px;font-size:.78rem;font-weight:600;font-family:inherit;
  cursor:pointer;transition:all .2s}
.code-bar button:hover{background:rgba(255,230,109,.25)}
pre.code-block{margin:0;padding:1rem;max-height:340px;overflow:auto;font-size:.78rem;line-height:1.6;
  color:#c8c8e8;font-family:Consolas,Monaco,monospace;white-space:pre-wrap;word-break:break-all}

/* 上一页 / 下一页 */
.pager{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:2.6rem 0}
.pn{display:flex;flex-direction:column;gap:.2rem;padding:.9rem 1.1rem;border-radius:14px;
  background:rgba(255,255,255,.03);border:1px solid var(--border);transition:all .2s}
.pn:hover{background:rgba(255,255,255,.07);text-decoration:none;transform:translateY(-2px)}
.pn .dir{font-size:.75rem;color:var(--dim);letter-spacing:.04em}
.pn strong{font-size:.98rem;color:var(--text);font-weight:600}
.pn.next{text-align:right}
.pn.empty{border:none;background:none}

/* CTA */
.cta{text-align:center;background:linear-gradient(160deg,rgba(255,107,157,.1),rgba(108,140,255,.1));
  border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:1.6rem 1.2rem;margin-bottom:2.4rem}
.cta p{color:var(--muted);font-size:.95rem;margin-bottom:1rem}
.btn{display:inline-block;background:linear-gradient(135deg,var(--accent1),#a37eba);color:#fff;
  padding:.7rem 1.8rem;border-radius:26px;font-weight:700;font-size:.95rem;
  box-shadow:0 8px 24px rgba(255,107,157,.35);transition:all .25s}
.btn:hover{transform:translateY(-2px);text-decoration:none;box-shadow:0 12px 32px rgba(255,107,157,.5)}

/* 页脚 */
.foot{text-align:center;padding:2.2rem 1.5rem;border-top:1px solid var(--border);
  color:var(--dim);font-size:.85rem;margin-top:1rem}
.foot-links{display:flex;gap:1.5rem;justify-content:center;align-items:center;flex-wrap:wrap;margin-top:.7rem}
.foot-links a{color:var(--dim)}
.foot-links a:hover{color:var(--accent1);text-decoration:none}
.foot-btn{appearance:none;background:none;border:0;padding:0;font:inherit;color:var(--dim);cursor:pointer}
.foot-btn:hover{color:var(--accent1)}

/* 语言切换：只显示当前语言的块 */
html[lang="en"] [data-lang="zh"],
html[lang="zh-CN"] [data-lang="en"]{display:none}

@media (max-width:640px){
  .wrap{padding:1.4rem 1rem 1rem}
  .stage{height:min(46vh,320px);min-height:260px}
  .pager{grid-template-columns:1fr}
  .pn.next{text-align:left}
  .topnav{display:none}
  .head .icon{font-size:2.8rem}
}
`;

/* ---------------- 写出 ---------------- */
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'detail.css'), CSS, 'utf8');

list.forEach((e, i) => {
  try {
    fs.writeFileSync(path.join(OUT, e.id + '.html'), page(e, i), 'utf8');
  } catch (err) {
    console.error('生成失败:', e.id, err.message);
    process.exit(1);
  }
});

/* sitemap */
const urls = [
  { loc: SITE + '/', pri: '1.0', freq: 'weekly' },
  { loc: SITE + '/privacy.html', pri: '0.3', freq: 'yearly' },
  { loc: SITE + '/grassland.html', pri: '0.4', freq: 'monthly' }
].concat(list.map(e => ({
  loc: SITE + '/effects/' + e.id + '.html', pri: '0.7', freq: 'monthly'
})));

const today = new Date().toISOString().slice(0, 10);
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.freq}</changefreq>\n    <priority>${u.pri}</priority>\n  </url>`).join('\n') +
  '\n</urlset>\n';
fs.writeFileSync(path.join(DIR, 'sitemap.xml'), sitemap, 'utf8');

console.log('生成详情页:', list.length, '个');
console.log('输出目录:', OUT);
console.log('sitemap 条目:', urls.length);
