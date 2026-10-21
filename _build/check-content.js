// 校验文案库完整性：58 个 id 是否齐全、字段是否完整
const fs = require('fs');
const path = require('path');
const DIR = 'E:/AI/workbuddy/BLACK/yilana';

let A, B;
try { A = require(path.join(DIR, '_content/part-a.js')); }
catch (e) { console.error('part-a.js 解析失败:', e.message); process.exit(1); }
try { B = require(path.join(DIR, '_content/part-b.js')); }
catch (e) { console.error('part-b.js 解析失败:', e.message); process.exit(1); }

const all = Object.assign({}, A, B);
const list = JSON.parse(fs.readFileSync(path.join(DIR, '_build/base-effects.json'), 'utf8'));
const ids = list.map(e => e.id);

const missing = ids.filter(id => !all[id]);
const extra = Object.keys(all).filter(id => !ids.includes(id));

console.log('文案条数:', Object.keys(all).length, '/ 特效数:', ids.length);
if (missing.length) console.log('缺文案:', missing.join(', '));
if (extra.length) console.log('多余文案:', extra.join(', '));

let bad = [];
Object.entries(all).forEach(([id, c]) => {
  ['en', 'zh'].forEach(l => {
    const o = c[l];
    if (!o) return bad.push(id + ' 缺 ' + l);
    ['lead', 'how'].forEach(k => { if (!o[k] || o[k].length < 10) bad.push(id + '.' + l + '.' + k + ' 过短'); });
    if (!Array.isArray(o.tweak) || o.tweak.length < 2) bad.push(id + '.' + l + '.tweak 不足 2 条');
  });
  if (!Array.isArray(c.tags) || c.tags.length < 2) bad.push(id + '.tags 不足 2 个');
  // 换行符会破坏单行排版
  Object.values(c).forEach(v => {
    if (typeof v === 'string' && v.includes('\n')) bad.push(id + ' 含换行');
  });
});
if (bad.length) { console.log('问题:'); bad.forEach(b => console.log('  -', b)); }
else console.log('字段校验通过');

// 英文里不应残留中文
const cnInEn = Object.entries(all).filter(([id, c]) =>
  /[\u4e00-\u9fa5]/.test(c.en.lead + c.en.how + c.en.tweak.join('')));
if (cnInEn.length) console.log('英文里残留中文:', cnInEn.map(x => x[0]).join(', '));
