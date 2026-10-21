// 从 index.html 抽取 BASE_EFFECTS，检查 demo 依赖了哪些外部 helper
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const DIR = 'E:/AI/workbuddy/BLACK/yilana';
const html = fs.readFileSync(path.join(DIR, 'index.html'), 'utf8');

const start = html.indexOf('const BASE_EFFECTS = [');
if (start < 0) throw new Error('没找到 BASE_EFFECTS');
// 以 "const EFFECTS = BASE_EFFECTS.concat" 为锚点，取它之前最后一个 "];" 作为数组结尾（不受 CRLF 影响）
const anchor = html.indexOf('const EFFECTS = BASE_EFFECTS', start);
if (anchor < 0) throw new Error('没找到 EFFECTS 拼接处');
const end = html.lastIndexOf('];', anchor);
if (end < 0 || end < start) throw new Error('没找到数组结尾');
const snippet = html.slice(start, end + 2);

const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(snippet + '\n;globalThis.__OUT = BASE_EFFECTS;', sandbox);
const list = sandbox.__OUT;

// 检查 demo 里用到了哪些非局部标识符（粗粒度：找已知 helper 名）
const helpers = ['makeCanvas', 'clearEl', 'toast', 'copyText', 'repoUrl', 'openEffect', 't(', 'fxText'];
const report = list.map(e => {
  const src = e.demo ? e.demo.toString() : '';
  const used = helpers.filter(h => src.includes(h));
  return { id: e.id, group: e.group, title: e.title, demoLen: src.length, used };
});

console.log('总数:', list.length);
console.log('有 demo 的:', list.filter(e => typeof e.demo === 'function').length);
console.log('用到外部 helper 的:');
report.filter(r => r.used.length).forEach(r => console.log('  ', r.id, '->', r.used.join(',')));
console.log('\n最短 demo:', Math.min(...report.map(r => r.demoLen)), ' 最长 demo:', Math.max(...report.map(r => r.demoLen)));
console.log('\ngroup 分布:');
const g = {}; list.forEach(e => g[e.group] = (g[e.group] || 0) + 1);
console.log(g);

// 导出成 JSON 供生成器使用（丢掉 demo 源码，保留 code）
fs.mkdirSync(path.join(DIR, '_build'), { recursive: true });
const out = list.map(e => ({
  id: e.id, icon: e.icon, group: e.group, title: e.title, desc: e.desc,
  code: e.code, demo: e.demo ? e.demo.toString() : null
}));
fs.writeFileSync(path.join(DIR, '_build/base-effects.json'), JSON.stringify(out, null, 2), 'utf8');
console.log('\n已写出 _build/base-effects.json');
