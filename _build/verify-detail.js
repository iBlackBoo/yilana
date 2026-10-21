// 用 CDP 逐页验证 58 个详情页：异常、舞台子节点、canvas 尺寸
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9444;
const DIR = 'E:/AI/workbuddy/BLACK/yilana';
const BASE = 'http://localhost:8777/effects/';

const sleep = ms => new Promise(r => setTimeout(r, ms));
const list = JSON.parse(fs.readFileSync(path.join(DIR, '_build/base-effects.json'), 'utf8'));

(async () => {
  const chrome = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars',
    '--remote-debugging-port=' + PORT,
    '--user-data-dir=' + require('os').tmpdir() + '/cdp-verify-profile',
    'about:blank'
  ], { stdio: 'ignore' });

  let target = null;
  for (let i = 0; i < 40; i++) {
    await sleep(250);
    try {
      const l = await (await fetch('http://127.0.0.1:' + PORT + '/json/list')).json();
      target = l.find(t => t.type === 'page');
      if (target) break;
    } catch (e) {}
  }
  if (!target) { console.error('CDP 连接失败'); chrome.kill(); process.exit(1); }

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  const jsErrors = [];
  let collecting = false;

  ws.addEventListener('message', ev => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result || msg.error); pending.delete(msg.id); return; }
    if (msg.method === 'Runtime.exceptionThrown' && collecting) {
      const d = msg.params.exceptionDetails;
      jsErrors.push((d.exception && d.exception.description ? d.exception.description : d.text).split('\n')[0]);
    }
    if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error' && collecting) {
      jsErrors.push('[console] ' + msg.params.args.map(a => a.value || a.description || '').join(' ').split('\n')[0]);
    }
  });
  await new Promise(r => ws.addEventListener('open', r, { once: true }));
  const send = (m, p) => new Promise(res => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method: m, params: p || {} })); });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });

  const rows = [];
  for (const e of list) {
    jsErrors.length = 0;
    collecting = true;
    await send('Page.navigate', { url: BASE + e.id + '.html' });
    await sleep(1100);
    const r = await send('Runtime.evaluate', {
      expression: `(()=>{
        const st = document.getElementById('stage');
        const cv = st && st.querySelector('canvas');
        const errBox = !!(st && st.textContent.includes('Demo error:'));
        return {
          children: st ? st.children.length : -1,
          canvas: cv ? cv.width + 'x' + cv.height : 'none',
          demoError: errBox,
          lang: document.documentElement.lang,
          title: document.title.slice(0, 60),
          hasLede: !!(document.querySelector('.lead [data-lang="en"]')||{}).textContent,
          codeLen: (document.getElementById('codeBlock')||{}).textContent.length,
          stageText: st ? st.textContent.trim().slice(0, 120) : '',
          stageStyle: st ? (st.getAttribute('style')||'').slice(0, 60) : ''
        };
      })()`,
      returnByValue: true
    });
    collecting = false;
    rows.push({ id: e.id, ...(r.result ? r.result.value : { score: 'EVAL_FAIL' }), errors: [...new Set(jsErrors)] });
  }

  // children=0 但对 stage 本身做样式（holo 这类）是合法的，只要没报错
  const bad = rows.filter(r => r.demoError || r.errors.length || (!r.codeLen) || r.children === -1);
  console.log('检查页面:', rows.length);
  console.log('有问题:', bad.length);
  bad.forEach(b => console.log('  ✗', b.id, JSON.stringify({ children: b.children, canvas: b.canvas, demoError: b.demoError, codeLen: b.codeLen, errors: b.errors, stageText: b.stageText })));

  const noCanvas = rows.filter(r => r.canvas === 'none');
  console.log('无 canvas（CSS/DOM 类）:', noCanvas.length, noCanvas.map(r => r.id).join(', ') || '-');
  const zeroCanvas = rows.filter(r => r.canvas !== 'none' && /^0x|^x0|^0x0$/.test(r.canvas));
  if (zeroCanvas.length) console.log('canvas 尺寸为 0:', zeroCanvas.map(r => r.id + '=' + r.canvas).join(', '));

  fs.writeFileSync(path.join(DIR, '_build/detail-verify.json'), JSON.stringify(rows, null, 2), 'utf8');
  ws.close(); chrome.kill();
  process.exit(bad.length ? 1 : 0);
})();
