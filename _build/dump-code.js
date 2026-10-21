// 紧凑打印每个特效的源码，便于写准确的技术讲解
const fs = require('fs');
const list = JSON.parse(fs.readFileSync('E:/AI/workbuddy/BLACK/yilana/_build/base-effects.json', 'utf8'));
const from = +(process.argv[2] || 0), to = +(process.argv[3] || list.length);
list.slice(from, to).forEach((e, i) => {
  const code = (e.code || '').replace(/\s+/g, ' ').slice(0, 760);
  console.log('### ' + (from + i) + ' ' + e.id + ' [' + e.group + '] ' + e.title);
  console.log(code);
  console.log('');
});
