# 特效实验室 · YILANA.CN

一个纯前端视觉特效与交互组件展示单页站点。整合了**原生手写特效**与本地 `iBlackBoo/javaScript` 仓库（现位于 `P:/github/javaScript`）的 70+ 个 JS 特效 / 组件 demo。开箱即用，可一键复制源码、全屏运行。

> 项目主题：深色霓虹风格；原生文字类特效统一使用 **YILANA.CN**。

---

## ✨ 特性

- **131 个特效**，6 大分类：粒子 / 互动 / 视觉 / 文字 / 组件 / 游戏
- **数据驱动**：原生特效在 `index.html` 的 `BASE_EFFECTS` 数组；仓库 demo 在 `effects-repo.js`（由 `_gen.js` 自动生成），运行时 `EFFECTS = BASE_EFFECTS.concat(REPO_EFFECTS)`
- **一键复制**：每个卡片「📋 复制代码」复制源码（原生项为独立可运行片段；仓库项为主 HTML 源码）
- **全屏运行**：「▶ 运行」弹窗演示；仓库项以 `iframe` 内嵌原始文件，完整保留 jQuery / echarts / 图片等资源
- **分类筛选 + 实时搜索**：按类别过滤，按标题关键词检索
- **背景粒子动效**：首页常驻彩色辉光粒子背景

---

## 🗂 分类体系（6 类，共 131 个）

| 分类 | 标识 | 数量 | 说明 |
| --- | --- | --- | --- |
| 粒子 | `particle` | 17 | 烟花、粒子、飘雪等（原生 15 + 仓库 2） |
| 互动 | `interact` | 20 | 拖拽、点击、放大镜、烟花输入等（原生 12 + 仓库 8） |
| 视觉 | `visual` | 41 | 轮播、3D、进度条、图表、霓虹等（原生 18 + 仓库 23） |
| 文字 | `text` | 25 | 打字机、字符云、蛇形文字等（原生 13 + 仓库 12，原生项用 YILANA.CN） |
| 组件 | `component` | 21 | 日历、表格、搜索补全、投票、购物车等 UI 组件（仓库 21） |
| 游戏 | `game` | 7 | 贪吃蛇、摇奖、计时等（仓库 7） |
| **合计** | | **131** | |

---

## 🧱 技术栈

| 维度 | 说明 |
| --- | --- |
| 结构 | `index.html`（主页面）+ `effects-repo.js`（仓库特效数据） |
| 原生特效 | 数据驱动卡片网格；Canvas 2D / DOM / Clipboard API / 模态弹窗 |
| 仓库特效 | 通过 `iframe` 内嵌 `P:/github/javaScript` 下的原始 HTML（保留 jQuery / echarts / 图片等依赖） |
| 渲染 | `EFFECTS = BASE_EFFECTS.concat(window.REPO_EFFECTS || [])` |
| 兼容 | 现代浏览器；**须通过 `server.js` 以 http 方式打开**（仓库 iframe 走同源 `/repo/` 路径，避免 `file://` 跨协议被浏览器拦截）|

---

## 📁 文件结构

```
P:\AI\WorkBuddy\black\yilana\
├── index.html          # 主页面（原生 58 特效 + 加载 effects-repo.js）
├── effects-repo.js     # 仓库 73 个特效数据（由 _gen.js 自动生成）
├── _gen.js             # 生成 effects-repo.js 的脚本（仓库更新后可重跑）
├── server.js           # 本地静态服务器：同源托管工作区 + /repo 映射仓库目录
├── grassland.html      # 草原主题备份（早期版本）
├── 内蒙古大草原资料.md   # 草原素材库（早期主题资料）
└── README.md           # 本说明文档
```

> 仓库原始文件通过 `iframe` 内嵌：页面以 **http（本地服务器）** 打开时走同源 `/repo/...` 路径（`server.js` 将 `/repo` 映射到 `P:/github/javaScript`）；若直接以 **`file://`** 打开页面，则回退为绝对路径 `file:///P:/github/javaScript/...`。中文与逗号等字符经 `encodeURI` 编码以确保精确匹配磁盘目录名。

---

## 📦 仓库新增特效清单（73 个，按分类）

### 粒子（2）
- 飘雪 — `飘雪.html`
- 粒子 — `粒子/粒子.html`

### 互动（8）
- 输入框抖动 — `输入框抖动.html`
- 元素拖拽 — `cookie,jsonp,拖拽等综合/拖拽.html`
- 擦除刮刮乐 — `擦除/html/擦除.html`
- 放大镜 — `放大镜/放大镜效果.html`
- 点击特效 — `点击特效/test.html`
- 输入框烟花 — `输入框烟花/输入框烟花.html`
- 鼠标滚轮 — `鼠标滚轮/鼠标滚轮.html`
- 鼠标滑块 — `鼠标移动滑块/index.html`

### 视觉（23）
- Canvas 仪表盘 — `仪表盘.html`
- 3D 图片切换 — `3D图片切换/3D图片切换.html`
- animate.css 动画 — `animate.css/1.html`
- Apple 产品动画 — `apple/index.html`
- ECharts 地图 — `echarts-实例/地图扩展`
- ECharts 标签 — `echarts-实例/标签引入`
- ECharts 雷达图 — `echarts-实例/雷达图`
- 全屏滚动 fullPage — `fullPage/fullpage实例/fullPage.html`
- 滚动入场动画 — `jQuery-aniview/index.html`
- 圆形统计图 — `jQuery圆形统计插件/circle.html`
- 圆形轮播 roundabout — `roundabout/index.html`
- 滑块轮播 — `slider1.2/index.html`
- 仿淘宝轮播 — `仿淘宝轮播(无缝做不出来)/轮播.html`
- 图片墙 — `图片墙/hualang.html`
- 无缝切换 — `无缝切换/无缝切换.html`
- 3D 立方体 — `立方体/3D旋转轮播.html`
- 网页进度条 — `网页进度条/网页进度条.html`
- 弹性商品展示 — `苹果官网商品展示/弹性运动.html`
- 瀑布流 — `瀑布流/瀑布流.html`
- 手写轮播 — `轮播(自己写出来的,第一次,值得纪念)/1.html`
- 轮播神器 — `轮播神器/index.html`
- 韩雪冬轮播 — `韩雪冬/miaov_demo.html`
- 韩雪冬 jQuery 轮播 — `韩雪冬jQuery/韩雪冬轮播.html`

### 文字（12）
- 滚动标题 — `滚动title.html`
- 字母入场动画 — `AnimatedLetters/index.html`
- 字母下落 — `word/字母从上落下.html`
- 字母上升 — `word/字母往上出现.html`
- 字母基本动画 — `word/最基本应用.html`
- 文字分割 — `字符串操作/分割文字.html`
- 文字替换 — `字符串操作/文字替换.html`
- 文字高亮 — `字符串操作/高亮文字.html`
- 内容缩放 — `字符串操作/介绍内容缩放.html`
- 字符串综合 — `字符串操作/字符串综合.html`
- 字符云 — `字符云/wordCloud.html`
- 蛇形文字 — `蛇形文字/蛇形文字.html`

### 组件（21）
- iframe 自适应高度 — `iframe改变高度.html`
- 数组去重 — `数组去重.html`
- 9 种推拉门 — `9种推拉门/demo.html`
- 复选框动效 — `checkbox/checkbox.html`
- 加入购物车(飞入) — `jQuery仿天猫完美加入购物车/index.html`
- 仿苹果导航 — `仿苹果导航菜单/1.html`
- 事件委托切换 — `切换(给未来元素添加事件)/切换.html`
- 新闻列表滚动 — `列表项滚动(多用于新闻条目)/test.html`
- 加入购物车 — `加入购物车/加入购物车.html`
- 动感导航 — `动感十足的jquery导航/index.html`
- 延时菜单 — `延时菜单/11-setTimeout实例.html`
- 推拉门改进 — `推拉门改进/推拉门改进.html`
- 辩论投票 — `搜狐辩论投票/html/搜狐辩论投票.html`
- 搜索自动补全 — `搜索自动补全/html/自动补全.html`
- 文字转移 — `数组/文字转移.html`
- 日历插件 — `日历插件/html/日历.html`
- 日历生成 — `日历生成/日历生成.html`
- 日历联动 — `日历联动/index.html`
- 表格行移动 — `表格上下移动/表格行上下移动.html`
- 表格查找 — `表格操作/表格查找.html`
- 表格行交换 — `表格操作/表格行交换.html`

### 游戏（7）
- 数字滚动停止 — `数字逐一停止.html`
- 贪吃蛇 — `贪吃蛇.html`
- 自由落体 — `cookie,jsonp,拖拽等综合/自由落体.html`
- 碰撞检测 — `cookie,jsonp,拖拽等综合/碰撞.html`
- 摇奖机 — `摇奖/摇奖自写/摇奖.html`
- 模拟扔物体 — `模拟扔物体/模拟扔小球.html`
- 计时器 — `计时/计时.html`

> 原生 58 个特效（粒子15 / 互动12 / 视觉18 / 文字13）为上一版内容，均为零依赖、可独立运行的 Canvas / DOM 特效，文字类用 YILANA.CN。完整清单见 git 历史或 `index.html` 的 `BASE_EFFECTS` 数组。

---

## 🚀 使用方法

1. **启动本地服务器**（仓库类特效通过同源 http 加载，避免 `file://` 跨协议被浏览器拦截）：
   ```bash
   node server.js
   ```
   然后浏览器打开 **http://localhost:8777/index.html**。
   > 若直接以 `file://` 打开 `index.html` 也能运行（此时仓库 iframe 回退为绝对 `file://` 路径）；但 WorkBuddy 预览面板以 http 提供页面，必须用上面的服务器方式，仓库 demo 才能正常加载。
2. 顶部按类别筛选，搜索框按关键词检索特效。
3. 卡片「▶ 运行」全屏演示；「📋 复制代码」复制源码。
   - **原生特效**：复制出的片段可独立粘贴运行。
   - **仓库特效**：复制的是该 demo 的主 HTML 源码；部分依赖 jQuery / 图片的多文件 demo，需连同原目录资源才能独立运行。

### 新增一个原生特效

在 `index.html` 的 `BASE_EFFECTS` 数组追加一项：

```js
{
  id: 'myEffect',
  icon: '⭐',
  title: '我的特效',
  desc: '一句话描述',
  group: 'visual',          // particle | interact | visual | text | component | game
  code: '<独立可运行源码>',
  demo: function (el) {
    // 在 el 容器内渲染特效
  }
}
```

### 新增一个仓库特效

在 `_gen.js` 的 `MAP` 追加一项（指定 `dir` / `file` / `group` / `icon` / `title` / `desc`），重跑生成：

```bash
node _gen.js
```

脚本会读取对应原始 HTML、转义后写入 `effects-repo.js`，导航计数、分类、搜索自动更新。

---

## 📌 待办 / 已知项

- **移动端导航**：在视口宽度 ≤ 768px 时，顶部 `.nav-links` 为 `display:none`，手机端暂无汉堡菜单入口（功能不受影响，仅导航入口在窄屏隐藏）。
- **本地路径依赖（已缓解）**：仓库类特效需访问 `P:/github/javaScript`；已通过 `server.js` 将 `/repo` 同源映射解决 http 预览下的跨协议拦截。若移动仓库目录，请同步修改 `server.js` 的 `REPO` 常量与 `repoUrl()` 中的 `file://` 基准路径。

---

## 🕓 版本记录

- **v1（草原主题）**：内蒙古大草原展示页面（已备份至 `grassland.html`，资料见 `内蒙古大草原资料.md`）。
- **v2（特效实验室）**：深色霓虹主题，12 个特效 + 复制代码 + 运行弹窗。
- **v2.x**：特效扩充至 36 个；修复卡片描边伪元素拦截点击（`pointer-events:none`）；文字类特效统一替换为 YILANA.CN。
- **v2.y**：特效扩充至 **58 个**（粒子15 / 互动12 / 视觉18 / 文字13）。
- **v3（当前）**：整合本地 `iBlackBoo/javaScript` 仓库 73 个 demo，总数 **131**；新增「组件 / 游戏」分类；仓库项以 `iframe` 内嵌原始文件（保留 jQuery / echarts 依赖）；新增 `effects-repo.js` 与生成脚本 `_gen.js`。
- **v3.1（修复黑屏）**：根因为 WorkBuddy 预览面板以 http 提供页面，而仓库 iframe 用 `file://` 源被浏览器跨协议拦截，导致"点击运行全黑"。新增 `server.js` 同源托管 + `/repo` 映射，并把 `repoUrl()` 改为 http 同源路径（`file://` 直开时回退绝对路径），实测 73/73 仓库特效经 `/repo/` 均返回 200。
