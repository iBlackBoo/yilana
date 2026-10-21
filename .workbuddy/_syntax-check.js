// 抽取 index.html 里的内联脚本做语法检查
const fs = require('fs');
const vm = require('vm');
const file = process.argv[2];
const html = fs.readFileSync(file, 'utf8');
const blocks = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)];
console.log('inline script blocks:', blocks.length);
let bad = 0;
blocks.forEach((m, i) => {
  const code = m[1];
  try {
    new vm.Script(code, { filename: 'inline-' + (i + 1) + '.js' });
    console.log('  block ' + (i + 1) + ': OK (' + code.length + ' chars)');
  } catch (e) {
    bad++;
    console.log('  block ' + (i + 1) + ': FAIL -> ' + e.message);
  }
});
// 同时检查外部 js
['i18n.js', 'effects-repo.js'].forEach(f => {
  const p = require('path').join(require('path').dirname(file), f);
  if (!fs.existsSync(p)) return;
  try { new vm.Script(fs.readFileSync(p, 'utf8'), { filename: f }); console.log('  ' + f + ': OK'); }
  catch (e) { bad++; console.log('  ' + f + ': FAIL -> ' + e.message); }
});
process.exit(bad ? 1 : 0);
