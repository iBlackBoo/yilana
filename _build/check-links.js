// 校验首页「详解」入口：数量、URL 可达性、无死链
const { JSDOM, VirtualConsole } = require('C:/Users/18511/.workbuddy/binaries/node/workspace/node_modules/jsdom');

const vc = new VirtualConsole();
vc.on('jsdomError', () => {});

(async () => {
  const dom = await JSDOM.fromURL('http://localhost:8777/index.html?lang=en', {
    runScripts: 'dangerously', resources: 'usable', pretendToBeVisual: true, virtualConsole: vc,
    beforeParse(w) {
      const ctx = new Proxy({}, { get: (t, p) => (p in t ? t[p] : () => ctx), set: (t, p, v) => (t[p] = v, true) });
      w.HTMLCanvasElement.prototype.getContext = () => ctx;
      w.requestAnimationFrame = () => 0;
      w.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} });
    }
  });
  await new Promise(r => setTimeout(r, 1500));
  const d = dom.window.document;

  const links = [...d.querySelectorAll('.card-detail')].map(a => a.getAttribute('href'));
  const cards = d.querySelectorAll('.effect-card').length;

  console.log('卡片总数:', cards);
  console.log('详解链接数:', links.length, '（应为 58）');
  const uniq = new Set(links);
  console.log('去重后:', uniq.size);
  console.log('样例:', links.slice(0, 3).join(', '));

  let bad = [];
  for (const href of uniq) {
    const url = 'http://localhost:8777/' + href;
    const res = await fetch(url);
    if (res.status !== 200) bad.push(res.status + ' ' + href);
  }
  console.log('链接 200:', uniq.size - bad.length, ' 失败:', bad.length);
  bad.forEach(b => console.log('  ✗', b));

  // 中文界面下链接文字
  d.getElementById('langSwitch').click();
  await new Promise(r => setTimeout(r, 150));
  console.log('中文下详解文案:', d.querySelector('.card-detail').textContent);

  dom.window.close();
  process.exit(bad.length || uniq.size !== 58 ? 1 : 0);
})();
