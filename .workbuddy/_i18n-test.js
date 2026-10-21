// 用 jsdom 真实加载页面，验证中英文切换
const { JSDOM, VirtualConsole } = require('C:/Users/18511/.workbuddy/binaries/node/workspace/node_modules/jsdom');

const BASE = 'http://localhost:8777/index.html';
const errors = [];

function makeCtx() {
  const stub = new Proxy({}, {
    get(t, p) {
      if (p === 'canvas') return { width: 800, height: 600 };
      if (p === 'createLinearGradient' || p === 'createRadialGradient' || p === 'createPattern')
        return () => ({ addColorStop() {} });
      if (p === 'measureText') return () => ({ width: 10 });
      if (p === 'getImageData') return () => ({ data: new Uint8ClampedArray(4) });
      if (typeof p === 'symbol') return undefined;
      if (!(p in t)) t[p] = () => stub;
      return t[p];
    },
    set(t, p, v) { t[p] = v; return true; }
  });
  return stub;
}

async function load(url) {
  const vc = new VirtualConsole();
  vc.on('jsdomError', e => {
    if (/Not implemented: HTMLCanvasElement/.test(e.message)) return;
    errors.push('[jsdomError] ' + e.message.split('\n')[0]);
  });
  vc.on('error', (...a) => errors.push('[console.error] ' + a.join(' ')));
  const dom = await JSDOM.fromURL(url, {
    runScripts: 'dangerously',
    resources: 'usable',
    pretendToBeVisual: true,
    virtualConsole: vc,
    beforeParse(window) {
      window.HTMLCanvasElement.prototype.getContext = function () { return makeCtx(); };
      window.requestAnimationFrame = () => 0;
      window.cancelAnimationFrame = () => {};
      window.matchMedia = window.matchMedia || (() => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }));
      window.scrollTo = () => {};
      window.Element.prototype.scrollIntoView = () => {};
    }
  });
  await new Promise(r => {
    if (dom.window.document.readyState === 'complete') return r();
    dom.window.addEventListener('load', r);
    setTimeout(r, 4000);
  });
  await new Promise(r => setTimeout(r, 400));
  return dom;
}

const pass = [], fail = [];
function check(name, cond, detail) {
  (cond ? pass : fail).push(name + (detail ? ' → ' + detail : ''));
}

(async () => {
  // ---------- 中文 ----------
  const dom = await load(BASE + '?lang=zh');
  const w = dom.window, d = w.document;
  const cards = d.querySelectorAll('.effect-card');
  const firstTitle = () => (d.querySelector('.effect-card h3') || {}).textContent;

  check('卡片总数 131', cards.length === 131, '实际 ' + cards.length);
  check('html lang = zh-CN', d.documentElement.lang === 'zh-CN', d.documentElement.lang);
  check('导航计数中文', d.getElementById('navCount').textContent.trim() === '共 131 个特效', d.getElementById('navCount').textContent);
  check('首个卡片中文标题', firstTitle() === '烟花粒子', firstTitle());
  check('标题栏中文', /特效实验室/.test(d.title), d.title);
  check('搜索框中文占位', /搜索特效/.test(d.getElementById('searchBox').placeholder));
  check('筛选按钮中文', d.querySelector('.filter-btn').textContent.trim() === '全部');
  check('语言按钮显示 EN', d.getElementById('langSwitch').textContent.trim() === 'EN');
  check('弹窗全屏按钮存在', !!d.getElementById('modalFsBtn'));

  // ---------- 切到英文 ----------
  d.getElementById('langSwitch').click();
  await new Promise(r => setTimeout(r, 200));
  check('切换后 html lang = en', d.documentElement.lang === 'en', d.documentElement.lang);
  check('切换后首个卡片英文', firstTitle() === 'Fireworks', firstTitle());
  check('切换后导航计数英文', d.getElementById('navCount').textContent.trim() === '131 effects', d.getElementById('navCount').textContent);
  check('切换后标题栏英文', /Effect Lab/.test(d.title), d.title);
  check('切换后 meta description 英文', /interactive web laboratory/i.test(d.getElementById('metaDesc').getAttribute('content')));
  check('切换后搜索占位英文', /Search effects/.test(d.getElementById('searchBox').placeholder));
  check('切换后筛选按钮英文', d.querySelector('.filter-btn').textContent.trim() === 'All');
  check('切换后语言按钮显示中文', d.getElementById('langSwitch').textContent.trim() === '中文');
  check('切换后卡片按钮英文', /Run/.test(d.querySelector('.btn-run').textContent));
  check('localStorage 记住 en', w.localStorage.getItem('yilana.lang') === 'en', String(w.localStorage.getItem('yilana.lang')));
  check('URL 带上 lang=en', /lang=en/.test(w.location.search), w.location.search);

  // 所有卡片都应有英文译文（不能残留中文）
  const leftCn = [...d.querySelectorAll('.effect-card h3')].filter(h => /[\u4e00-\u9fa5]/.test(h.textContent));
  check('英文模式下无未翻译标题', leftCn.length === 0, leftCn.length + ' 条残留：' + leftCn.slice(0, 5).map(h => h.textContent).join(' / '));

  // 描述里允许保留 YILANA.CN 这类品牌名，但不能整句是中文
  const leftDesc = [...d.querySelectorAll('.effect-card p')].filter(p => (p.textContent.match(/[\u4e00-\u9fa5]/g) || []).length >= 3);
  check('英文模式下无未翻译描述', leftDesc.length === 0, leftDesc.length + ' 条残留：' + leftDesc.slice(0, 5).map(p => p.textContent).join(' / '));

  // 英文检索
  const sb = d.getElementById('searchBox');
  sb.value = 'snake'; sb.dispatchEvent(new w.Event('input'));
  await new Promise(r => setTimeout(r, 100));
  check('英文搜索 snake 命中 2 个', d.querySelectorAll('.effect-card').length === 2, d.querySelectorAll('.effect-card').length + ' 个');

  // 中文关键词在英文模式也能搜到
  sb.value = '贪吃蛇'; sb.dispatchEvent(new w.Event('input'));
  await new Promise(r => setTimeout(r, 100));
  check('英文模式下中文关键词仍可检索', d.querySelectorAll('.effect-card').length === 1, d.querySelectorAll('.effect-card').length + ' 个');

  // 打开弹窗看标题是否英文
  sb.value = ''; sb.dispatchEvent(new w.Event('input'));
  await new Promise(r => setTimeout(r, 100));
  d.querySelector('.btn-run').click();
  await new Promise(r => setTimeout(r, 150));
  check('弹窗标题英文', d.getElementById('modalTitle').textContent === '🎆 Fireworks', d.getElementById('modalTitle').textContent);
  d.getElementById('langSwitch').click();
  await new Promise(r => setTimeout(r, 150));
  check('弹窗打开时切中文，标题跟着变', d.getElementById('modalTitle').textContent === '🎆 烟花粒子', d.getElementById('modalTitle').textContent);

  w.close();

  // ---------- 默认语言（英文浏览器）----------
  const dom2 = await load(BASE);
  check('无参数+英文浏览器 → 默认英文', dom2.window.document.documentElement.lang === 'en', dom2.window.document.documentElement.lang);
  dom2.window.close();

  console.log('\n通过 ' + pass.length + ' 项');
  pass.forEach(p => console.log('  ✓ ' + p));
  if (fail.length) { console.log('\n失败 ' + fail.length + ' 项'); fail.forEach(f => console.log('  ✗ ' + f)); }
  if (errors.length) { console.log('\n页面 JS 报错 ' + errors.length + ' 条：'); [...new Set(errors)].slice(0, 12).forEach(e => console.log('  ! ' + e)); }
  process.exit(fail.length ? 1 : 0);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(1); });
