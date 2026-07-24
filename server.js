// 本地静态服务器：同时托管特效实验室工作区 + 本地 javaScript 仓库
// 用法：node server.js  →  浏览器打开 http://localhost:8777/index.html
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = 'P:/AI/WorkBuddy/black/yilana';   // 工作区（index.html / effects-repo.js / ...）
const REPO = 'P:/AI/WorkBuddy/black/yilana/repo'; // 仓库 demo 原始文件（已复制到项目内，便于线上部署）
const PORT = 8777;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg', '.mp4': 'video/mp4', '.webm': 'video/webm',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  let u = decodeURIComponent(req.url.split('?')[0]);
  let filePath;
  if (u.startsWith('/repo/')) {
    filePath = path.join(REPO, u.slice('/repo/'.length));
  } else if (u === '/' || u === '') {
    filePath = path.join(ROOT, 'index.html');
  } else {
    filePath = path.join(ROOT, u);
  }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('404 Not Found: ' + filePath); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('SERVER_READY http://localhost:' + PORT + '/index.html');
});
