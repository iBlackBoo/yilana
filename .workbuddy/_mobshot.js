// 通过 CDP 做真实移动端设备模拟并截图（Node 22 自带 WebSocket）
const { spawn } = require('child_process');
const fs = require('fs');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9333;
const URL_ = process.argv[2];
const OUT = process.argv[3];
const W = +(process.argv[4] || 390), H = +(process.argv[5] || 844);

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const chrome = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars',
    '--remote-debugging-port=' + PORT,
    '--user-data-dir=' + require('os').tmpdir() + '/cdp-shot-profile',
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
  const send = (method, params) => new Promise(res => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params: params || {} })); });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 2, mobile: true });
  await send('Page.navigate', { url: URL_ });
  await sleep(+(process.argv[6] || 2500));

  const probe = await send('Runtime.evaluate', {
    expression: `JSON.stringify({
      vw: innerWidth,
      docW: document.documentElement.scrollWidth,
      bodyW: document.body.scrollWidth,
      overflow: document.documentElement.scrollWidth > innerWidth,
      lang: document.documentElement.lang,
      switchVisible: (()=>{ const b=document.getElementById('langSwitch'); if(!b) return 'missing';
        const r=b.getBoundingClientRect(); const s=getComputedStyle(b);
        return (r.width>0 && r.height>0 && s.display!=='none' && r.right<=innerWidth+1) ? 'visible@'+Math.round(r.right) : 'hidden@'+Math.round(r.right); })(),
      navLinks: getComputedStyle(document.querySelector('.nav-links')).display,
      btnText: (document.getElementById('langSwitch')||{}).textContent,
      widest: (()=>{ let max=0, tag='';
        document.querySelectorAll('body *').forEach(el=>{ const r=el.getBoundingClientRect(); if(r.width>max && r.right>innerWidth){ max=r.right; tag=el.tagName+'.'+el.className; } });
        return tag+' -> right='+Math.round(max); })()
    })`,
    returnByValue: true
  });
  console.log(probe.result.value);

  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  if (shot.data) { fs.writeFileSync(OUT, Buffer.from(shot.data, 'base64')); console.log('saved', OUT); }
  else console.error('capture failed', JSON.stringify(shot).slice(0, 200));

  ws.close(); chrome.kill();
})();
