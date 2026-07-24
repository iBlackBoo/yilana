'use strict';
const fs = require('fs');
const path = require('path');

const REPO = 'P:/github/javaScript';

// 分类映射：dir(相对仓库路径) | file(主HTML,可空则递归找首个html) | group | icon | title | desc
const MAP = [
  // ===== 根目录独立 HTML =====
  { dir:'', file:'飘雪.html', group:'particle', icon:'🌨️', title:'飘雪', desc:'Canvas 飘雪动画' },
  { dir:'', file:'仪表盘.html', group:'visual', icon:'📊', title:'Canvas 仪表盘', desc:'Canvas 绘制的仪表盘' },
  { dir:'', file:'数字逐一停止.html', group:'game', icon:'🔢', title:'数字滚动停止', desc:'数字逐一停止的滚动效果' },
  { dir:'', file:'数组去重.html', group:'component', icon:'🧮', title:'数组去重', desc:'JS 数组去重演示' },
  { dir:'', file:'滚动title.html', group:'text', icon:'📜', title:'滚动标题', desc:'浏览器标题栏文字滚动' },
  { dir:'', file:'贪吃蛇.html', group:'game', icon:'🐍', title:'贪吃蛇', desc:'经典贪吃蛇小游戏' },
  { dir:'', file:'输入框抖动.html', group:'interact', icon:'📝', title:'输入框抖动', desc:'校验失败时输入框抖动' },
  { dir:'', file:'iframe改变高度.html', group:'component', icon:'🪟', title:'iframe 自适应高度', desc:'iframe 随内容自适应高度' },

  // ===== 目录 demo =====
  { dir:'3D图片切换', file:'3D图片切换.html', group:'visual', icon:'🧊', title:'3D 图片切换', desc:'3D 翻转图片切换展示' },
  { dir:'9种推拉门', file:'demo.html', group:'component', icon:'🚪', title:'9 种推拉门', desc:'多种推拉门展开效果' },
  { dir:'animate.css', file:'1.html', group:'visual', icon:'🎬', title:'animate.css 动画', desc:'animate.css 动画库演示' },
  { dir:'AnimatedLetters', file:'index.html', group:'text', icon:'🔤', title:'字母入场动画', desc:'AnimatedLetters 字母动画' },
  { dir:'apple', file:'index.html', group:'visual', icon:'🍎', title:'Apple 产品动画', desc:'Apple 风格产品展示动画' },
  { dir:'checkbox', file:'checkbox.html', group:'component', icon:'☑️', title:'复选框动效', desc:'自定义复选框动画' },
  { dir:'cookie,jsonp,拖拽等综合', file:'拖拽.html', group:'interact', icon:'✋', title:'元素拖拽', desc:'鼠标拖拽元素' },
  { dir:'cookie,jsonp,拖拽等综合', file:'自由落体.html', group:'game', icon:'🍎', title:'自由落体', desc:'物理自由落体模拟' },
  { dir:'cookie,jsonp,拖拽等综合', file:'碰撞.html', group:'game', icon:'💥', title:'碰撞检测', desc:'元素碰撞检测' },
  { dir:'echarts-实例/地图扩展', file:'', group:'visual', icon:'🗺️', title:'ECharts 地图', desc:'ECharts 地图扩展实例' },
  { dir:'echarts-实例/标签引入', file:'', group:'visual', icon:'🏷️', title:'ECharts 标签', desc:'ECharts 标签引入实例' },
  { dir:'echarts-实例/雷达图', file:'', group:'visual', icon:'📡', title:'ECharts 雷达图', desc:'ECharts 雷达图实例' },
  { dir:'fullPage/fullpage实例', file:'fullPage.html', group:'visual', icon:'📜', title:'全屏滚动 fullPage', desc:'fullPage 整屏滚动' },
  { dir:'jQuery-aniview', file:'index.html', group:'visual', icon:'✨', title:'滚动入场动画', desc:'jQuery-aniview 滚动显现' },
  { dir:'jQuery仿天猫完美加入购物车', file:'index.html', group:'component', icon:'🛒', title:'加入购物车(飞入)', desc:'天猫式加入购物车飞入动画' },
  { dir:'jQuery圆形统计插件', file:'circle.html', group:'visual', icon:'🥧', title:'圆形统计图', desc:'jQuery 圆形统计插件' },
  { dir:'roundabout', file:'index.html', group:'visual', icon:'🎡', title:'圆形轮播 roundabout', desc:'roundabout 圆形旋转轮播' },
  { dir:'slider1.2', file:'index.html', group:'visual', icon:'🎞️', title:'滑块轮播', desc:'slider1.2 图片轮播' },
  { dir:'word', file:'字母从上落下.html', group:'text', icon:'🔠', title:'字母下落', desc:'字母从上落下动画' },
  { dir:'word', file:'字母往上出现.html', group:'text', icon:'🔡', title:'字母上升', desc:'字母往上出现动画' },
  { dir:'word', file:'最基本应用.html', group:'text', icon:'📝', title:'字母基本动画', desc:'Animate 字母基本应用' },
  { dir:'仿淘宝轮播(无缝做不出来)', file:'轮播.html', group:'visual', icon:'🖼️', title:'仿淘宝轮播', desc:'淘宝风格图片轮播' },
  { dir:'仿苹果导航菜单', file:'1.html', group:'component', icon:'🍏', title:'仿苹果导航', desc:'苹果风格导航菜单' },
  { dir:'切换(给未来元素添加事件)', file:'切换.html', group:'component', icon:'🔀', title:'事件委托切换', desc:'给未来元素绑定切换事件' },
  { dir:'列表项滚动(多用于新闻条目)', file:'test.html', group:'component', icon:'📰', title:'新闻列表滚动', desc:'新闻条目上下滚动' },
  { dir:'加入购物车', file:'加入购物车.html', group:'component', icon:'🛒', title:'加入购物车', desc:'加入购物车动效' },
  { dir:'动感十足的jquery导航', file:'index.html', group:'component', icon:'🧭', title:'动感导航', desc:'jQuery 动感导航菜单' },
  { dir:'图片墙', file:'hualang.html', group:'visual', icon:'🖼️', title:'图片墙', desc:'画廊式图片墙' },
  { dir:'字符串操作', file:'分割文字.html', group:'text', icon:'✂️', title:'文字分割', desc:'字符串分割动画' },
  { dir:'字符串操作', file:'文字替换.html', group:'text', icon:'🔁', title:'文字替换', desc:'文字替换动画' },
  { dir:'字符串操作', file:'高亮文字.html', group:'text', icon:'🔆', title:'文字高亮', desc:'高亮显示文字' },
  { dir:'字符串操作', file:'介绍内容缩放.html', group:'text', icon:'🔍', title:'内容缩放', desc:'介绍内容缩放显示' },
  { dir:'字符串操作', file:'字符串综合.html', group:'text', icon:'🧵', title:'字符串综合', desc:'字符串操作综合' },
  { dir:'字符云', file:'wordCloud.html', group:'text', icon:'☁️', title:'字符云', desc:'文字云 / 词云展示' },
  { dir:'延时菜单', file:'11-setTimeout实例.html', group:'component', icon:'⏱️', title:'延时菜单', desc:'setTimeout 延时菜单' },
  { dir:'推拉门改进', file:'推拉门改进.html', group:'component', icon:'🚪', title:'推拉门改进', desc:'改进后的推拉门' },
  { dir:'搜狐辩论投票/html', file:'搜狐辩论投票.html', group:'component', icon:'🗳️', title:'辩论投票', desc:'搜狐式辩论投票' },
  { dir:'搜索自动补全/html', file:'自动补全.html', group:'component', icon:'🔍', title:'搜索自动补全', desc:'输入搜索自动补全' },
  { dir:'摇奖/摇奖自写', file:'摇奖.html', group:'game', icon:'🎰', title:'摇奖机', desc:'摇奖 / 抽奖动画' },
  { dir:'擦除/html', file:'擦除.html', group:'interact', icon:'🧽', title:'擦除刮刮乐', desc:'鼠标擦除揭示内容' },
  { dir:'放大镜', file:'放大镜效果.html', group:'interact', icon:'🔎', title:'放大镜', desc:'图片放大镜效果' },
  { dir:'数组', file:'文字转移.html', group:'component', icon:'🔤', title:'文字转移', desc:'文字转移动画' },
  { dir:'无缝切换', file:'无缝切换.html', group:'visual', icon:'🔁', title:'无缝切换', desc:'无缝图片切换' },
  { dir:'日历插件/html', file:'日历.html', group:'component', icon:'📅', title:'日历插件', desc:'jQuery 日历插件' },
  { dir:'日历生成', file:'日历生成.html', group:'component', icon:'📅', title:'日历生成', desc:'JS 生成日历' },
  { dir:'日历联动', file:'index.html', group:'component', icon:'📅', title:'日历联动', desc:'双日历联动' },
  { dir:'模拟扔物体', file:'模拟扔小球.html', group:'game', icon:'🎯', title:'模拟扔物体', desc:'模拟扔小球物理' },
  { dir:'瀑布流', file:'瀑布流.html', group:'visual', icon:'🌊', title:'瀑布流', desc:'瀑布流布局' },
  { dir:'点击特效', file:'test.html', group:'interact', icon:'👆', title:'点击特效', desc:'点击触发特效' },
  { dir:'立方体', file:'3D旋转轮播.html', group:'visual', icon:'🧊', title:'3D 立方体', desc:'3D 立方体旋转' },
  { dir:'粒子', file:'粒子.html', group:'particle', icon:'✨', title:'粒子', desc:'Canvas 粒子效果' },
  { dir:'网页进度条', file:'网页进度条.html', group:'visual', icon:'📊', title:'网页进度条', desc:'页面加载进度条' },
  { dir:'苹果官网商品展示', file:'弹性运动.html', group:'visual', icon:'🍏', title:'弹性商品展示', desc:'苹果式弹性运动展示' },
  { dir:'蛇形文字', file:'蛇形文字.html', group:'text', icon:'🐍', title:'蛇形文字', desc:'蛇形排列文字动画' },
  { dir:'表格上下移动', file:'表格行上下移动.html', group:'component', icon:'🔼', title:'表格行移动', desc:'表格行上下移动' },
  { dir:'表格操作', file:'表格查找.html', group:'component', icon:'🔎', title:'表格查找', desc:'表格内容查找高亮' },
  { dir:'表格操作', file:'表格行交换.html', group:'component', icon:'🔄', title:'表格行交换', desc:'表格行交换' },
  { dir:'计时', file:'计时.html', group:'game', icon:'⏱️', title:'计时器', desc:'计时器演示' },
  { dir:'轮播(自己写出来的,第一次,值得纪念)', file:'1.html', group:'visual', icon:'🎞️', title:'手写轮播', desc:'手写图片轮播' },
  { dir:'轮播神器', file:'index.html', group:'visual', icon:'🎞️', title:'轮播神器', desc:'轮播插件演示' },
  { dir:'输入框烟花', file:'输入框烟花.html', group:'interact', icon:'🎆', title:'输入框烟花', desc:'输入框输入烟花特效' },
  { dir:'韩雪冬', file:'miaov_demo.html', group:'visual', icon:'🎞️', title:'韩雪冬轮播', desc:'妙味课堂轮播 demo' },
  { dir:'韩雪冬jQuery', file:'韩雪冬轮播.html', group:'visual', icon:'🎞️', title:'韩雪冬 jQuery 轮播', desc:'妙味 jQuery 轮播' },
  { dir:'鼠标滚轮', file:'鼠标滚轮.html', group:'interact', icon:'🖱️', title:'鼠标滚轮', desc:'滚轮缩放 / 切换' },
  { dir:'鼠标移动滑块', file:'index.html', group:'interact', icon:'🎚️', title:'鼠标滑块', desc:'鼠标移动控制滑块' },
];

function findFirstHtml(dir){
  if(!fs.existsSync(dir)) return null;
  const stack=[dir];
  while(stack.length){
    const d=stack.pop();
    let ents;
    try{ ents=fs.readdirSync(d,{withFileTypes:true}); }catch(e){ continue; }
    const htmls=[];
    for(const en of ents){
      const p=path.join(d,en.name);
      if(en.isDirectory()){ if(en.name==='.git'||en.name==='.idea') continue; stack.push(p); }
      else if(en.name.toLowerCase().endsWith('.html')) htmls.push(p);
    }
    if(htmls.length) return htmls[0];
  }
  return null;
}

function escapeCode(s){
  return s
    .replace(/\\/g,'\\\\')
    .replace(/`/g,'\\`')
    .replace(/\$\{/g,'\\${')
    .replace(/<\/script>/gi,'<\\/script>');
}

const items=[];
let skipped=0;
MAP.forEach((m, idx)=>{
  const dirPath = path.join(REPO, m.dir);
  let file = m.file;
  let filePath;
  if(file){
    filePath = path.join(dirPath, file);
    if(!fs.existsSync(filePath)){
      // 尝试在 dir 下递归找同名或首个 html
      const alt = findFirstHtml(dirPath);
      if(alt){ filePath = alt; }
      else { console.log('SKIP (not found):', m.dir, m.file); skipped++; return; }
    }
  } else {
    const alt = findFirstHtml(dirPath);
    if(!alt){ console.log('SKIP (no html):', m.dir); skipped++; return; }
    filePath = alt;
  }
  let raw;
  try{ raw = fs.readFileSync(filePath,'utf8'); }catch(e){ console.log('SKIP (read err):', filePath, e.message); skipped++; return; }
  const rel = m.dir ? m.dir+'/'+path.basename(filePath) : path.basename(filePath);
  const safeRel = rel.split('/').map(encodeURIComponent).join('/');
  const id = 'repo'+(idx+1);
  const code = escapeCode(raw);
  items.push(
`  {\n    id:'${id}', icon:'${m.icon}', title:${JSON.stringify(m.title)}, desc:${JSON.stringify(m.desc)}, group:'${m.group}',\n    repo:{ dir:${JSON.stringify(m.dir)}, file:${JSON.stringify(path.basename(filePath))}, rel:'${safeRel}' },\n    code:\`${code}\`\n  }`
  );
});

const out = '// Auto-generated from P:/github/javaScript by _gen.js\n// 每项含 repo(原始文件路径) 与 code(主HTML源码)，由 index.html 以 iframe 内嵌展示。\nwindow.REPO_EFFECTS = [\n'+items.join(',\n')+'\n];\n';
fs.writeFileSync(path.join(__dirname,'effects-repo.js'), out, 'utf8');
console.log('Generated', items.length, 'effects; skipped', skipped);
console.log('Output bytes:', Buffer.byteLength(out,'utf8'));
