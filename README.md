# 特效实验室 · YILANA.CN

一个纯前端视觉特效与交互组件展示单页站点。整合了**原生手写特效**与 `iBlackBoo/javaScript` 仓库的 70+ 个 JS 特效 / 组件 demo。开箱即用，可一键复制源码、全屏运行。

> 项目主题：深色霓虹风格；原生文字类特效统一使用 **YILANA.CN**。仓库 demo 的原始文件已纳入本项目的 `repo/` 目录，可直接部署到 GitHub Pages 等静态托管服务。

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
| 结构 | `index.html`（主页面）+ `effects-repo.js`（仓库特效数据）+ `i18n.js`（中英文案） |
| 原生特效 | 数据驱动卡片网格；Canvas 2D / DOM / Clipboard API / 模态弹窗 |
| 仓库特效 | 通过 `iframe` 内嵌 `repo/` 目录下的原始 HTML（保留 jQuery / echarts / 图片等依赖） |
| 渲染 | `EFFECTS = BASE_EFFECTS.concat(window.REPO_EFFECTS \|\| [])` |
| 国际化 | 运行时切换中/英，无需构建；文案集中在 `i18n.js` |
| 部署 | 纯静态，可直接部署到 GitHub Pages / Cloudflare Pages / Vercel 等；仓库文件已随 `repo/` 一起提交 |
| 兼容 | 现代浏览器；**本地开发建议通过 `server.js` 以 http 方式打开**（避免 `file://` 跨协议被浏览器拦截）|

---

## 🌐 中英双语

站点支持运行时切换 **中文 / English**，无构建步骤、无框架。

**入口**：导航栏右侧的 `EN` / `中文` 按钮（移动端同样可见，因为它不在 `.nav-links` 内）。

**语言判定优先级**：

1. URL 参数 `?lang=en` / `?lang=zh`
2. `localStorage['yilana.lang']`（用户上次手动选择）
3. `navigator.language`：以 `zh` 开头 → 中文，否则 → 英文

切换时会同步更新：`<html lang>`、`<title>`、`meta description`、`og:title` / `og:description`、`canonical` 与三条 `hreflang`、URL 上的 `?lang=`（`history.replaceState`，不刷新页面）。

**文案组织**（`i18n.js`）：

| 导出 | 用途 |
| --- | --- |
| `window.YI_UI` | 界面文案字典，`{ zh: {...}, en: {...} }`，支持 `{n}` 占位替换 |
| `window.YI_FX_EN` | 131 个特效的英文 `[标题, 描述]` |
| `window.YI_META` | 中英 `<title>` 与 meta description |

特效翻译的 key 规则：

- **原生特效** → 直接用 `id`，例如 `'fireworks'`
- **仓库特效** → `'repo:' + dir + '/' + file`，例如 `'repo:飘雪.html'`、`'repo:word/字母下落.html'`

> 这里刻意不用 `repo1` / `repo2` 这类自增 id，因为重跑 `_gen.js` 后序号会漂移，译文就会错位。

**静态文案**用 `data-i18n="key"` 标记，占位符用 `data-i18n-ph="key"`；`applyI18n()` 会统一填充，缺译文时自动回落到中文。

**搜索**同时匹配中英两种语言的标题与描述，所以英文界面下输入「贪吃蛇」依然能搜到 *Snake*。

**新增一个特效时**：在 `i18n.js` 的 `YI_FX_EN` 补一行即可，不补也能正常显示（走中文回落）。

> 注意：`repo/` 里第三方 demo 的**页面内容**仍是原作者的原始文件（多为中文），翻译的只是卡片标题与描述。如需彻底英文化，需要在 `repo/` 内改源文件。

---

## 📖 特效详解页（58 篇）

首页每张原生特效卡片下方有「📖 详解 / 📖 Details」入口，指向 `effects/<id>.html`。

**为什么要有**：原来的站点本质是一个 demo 展厅，131 个特效里 73 个是第三方原样文件，对 AdSense 审核来说「原创内容不足」是硬伤。这 58 篇详解把每个原生特效写成了一篇独立可读的技术短文，给站点补上真正的原创内容。

每页包含：

| 区块 | 内容 |
| --- | --- |
| 导语 | 一句话说清这个特效是什么、为什么要这么做 |
| 实时演示 | 直接在本页运行，带「重新播放」；点击/鼠标类特效能自动触发一次，避免首屏是空框 |
| 原理拆解 | 讲的是真实实现（用了哪几个参数、为什么是这个公式），不是套话 |
| 可以改的地方 | 2 条具体可调的数值，附上改了之后会怎样 |
| 源码 | 可独立运行的完整片段 + 一键复制 |
| 上下篇 | 按首页顺序串联，形成内链 |

**技术要点**：

- 语言：默认英文（`<html lang="en">`），`?lang=zh` 或点击右上角切换；页面里双语内容用 `data-lang="en" / "zh"` 双份输出，靠 CSS 显示切换，不重新渲染
- SEO：每页独立 `<title>`、meta description、canonical、三条 `hreflang`、`TechArticle` 结构化数据
- 样式：共享 `effects/detail.css`，几十 KB 复用，不内联

**内容来源**：

```
_content/part-a.js      讲解文案 A（index 0–29）
_content/part-b.js      讲解文案 B（index 30–57）
_build/base-effects.json 从 index.html 抽取的特效数据（id / icon / code / demo）
_gen-detail.js          生成器 → effects/*.html + sitemap.xml
```

**改了特效之后怎么重新生成**：

```bash
node _build/extract.js   # 重新从 index.html 抽取 BASE_EFFECTS
node _gen-detail.js      # 重新生成 58 个页面 + sitemap.xml
node _build/verify-detail.js   # 全量校验（需本地服务在跑，依赖 Chrome）
```

> 新增特效时，除了在 `_content/` 里补一条讲解，还要在 `i18n.js` 的 `YI_FX_EN` 补名称；生成器会校验这两处是否齐全，缺了直接报错退出。

**踩过的坑**：`code` 字段里含有真实的 `</script>`，直接 `JSON.stringify` 嵌进页面会把 script 标签提前闭合，导致整页 SyntaxError。生成器里统一走 `jsStr()` 把 `</` 转义成 `<\/`。

---

## 💰 Google AdSense

已接入 Auto ads（自动广告），发布商 ID：`ca-pub-6465192362290250`。

| 文件 | 作用 |
| --- | --- |
| `index.html` / `grassland.html` / `effects/*.html` 的 `<head>` | AdSense 验证 + Auto ads 脚本（`async` + `crossorigin="anonymous"`） |
| `ads.txt` | 授权卖方声明，防止「收益受损」告警；内容为 `google.com, pub-6465192362290250, DIRECT, f08c47fec0942fa0` |

**刻意没有做的事**：`repo/` 下 553 个第三方 demo 文件**没有**插入广告代码。它们是原作者的原样产物、通过 iframe 展示，在上面投放广告既无授权也违反 AdSense 的内容政策。

---

## 🍪 隐私政策与 Cookie 同意

| 文件 | 作用 |
| --- | --- |
| `privacy.html` | 双语隐私政策（12 节），英文默认 + `?lang=zh` 切换；覆盖服务器日志、本地存储、AdSense Cookie、退订入口、GDPR/CCPA 权利 |
| `consent.js` | 自建轻量同意横幅，自动注入 DOM 与 `consent.css`，页脚「Cookie 设置」可随时重新唤起 |
| `consent.css` | 横幅样式，与站点同一套深色霓虹配色；≤560px 变为贴底满宽 |

### Consent Mode v2

所有页面的 `<head>` 里，AdSense 脚本**之前**有一段默认同意状态脚本：

```js
gtag('consent','default',{ ad_storage:…, ad_user_data:…, ad_personalization:…, analytics_storage:'denied' });
```

首次访问默认 `denied`（非个性化广告）；用户点「全部接受」后 `gtag('consent','update',…)` 切为 `granted`。选择存在 `localStorage.yilana.consent`（`all` / `necessary`），刷新不再打扰。

### 两个实现细节

- **横幅语言以页面 `html[lang]` 为准**，而不是 URL 的 `?lang`。因为站点切英文时会 `replaceState` 清掉 `?lang`，若按 URL 判定会出现「中文横幅 + 英文正文」的错配。
- **`privacy.html` 在 `<head>` 里预写 `html[lang]`**，避免中文访客先看到一瞬英文正文。详情页生成器同样加了这段。

### 已知边界

自建横幅满足「告知 + 同意 + 可撤回」，但**不是 Google 认证的 CMP**。若要覆盖 EEA / 英国流量的完整合规要求，需换成 Google 认证 CMP（Google 自家 CMP 或 OneTrust / Cookiebot 这类）。

---

## 📁 文件结构

```
yilana\
├── index.html          # 主页面（原生 58 特效 + 加载 effects-repo.js / i18n.js）
├── privacy.html        # 双语隐私政策与 Cookie 说明
├── consent.js          # Cookie 同意横幅（自动注入样式与 DOM）
├── consent.css         # 横幅样式
├── effects/            # 58 个特效详解页 + detail.css（由 _gen-detail.js 生成）
├── _content/           # 详解页的双语讲解文案（手工撰写）
├── _build/             # 抽取 / 校验脚本与中间产物
├── sitemap.xml         # 站点地图（首页 + 隐私页 + 58 详解页）
├── effects-repo.js     # 仓库 73 个特效数据（由 _gen.js 自动生成）
├── i18n.js             # 中英双语资源（UI 文案 + 131 条特效译文 + SEO meta）
├── ads.txt             # Google AdSense 授权卖方声明
├── _gen.js             # 生成 effects-repo.js 的脚本（仓库更新后可重跑）
├── server.js           # 本地静态服务器（本地开发用）
├── repo/               # 仓库 demo 原始文件（已复制自 P:/github/javaScript，约 36MB / 590 个文件）
└── README.md           # 本说明文档
```

> 仓库原始文件已复制到 `repo/` 目录并随项目一起部署。页面通过 `/repo/...` 路径加载 iframe，中文与逗号等字符经 `encodeURI` 编码以确保 URL 正确。
> 
> 本地开发时，也可继续使用 `server.js`（它会额外把 `/repo` 映射到 `P:/github/javaScript`，方便你修改源仓库后实时生效）。线上部署则直接读取项目内的 `repo/` 目录。

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

### 本地开发

```bash
node server.js
```

浏览器打开 **http://localhost:8777/index.html**。

`server.js` 会把 `/repo` 映射到本地 `P:/github/javaScript`，方便你修改源仓库后实时生效。

### 线上部署（GitHub Pages / Vercel / Cloudflare Pages）

直接推送本项目即可。仓库 demo 的原始文件已复制到 `repo/` 目录，线上会随站点一起发布，iframe 通过 `/repo/...` 同源路径加载，无需额外服务器映射。

> 注意：`repo/` 目录约 36MB / 590 个文件，首次 push 可能较大；若不需要全部仓库 demo，可在 `_gen.js` 的 `MAP` 中删减后重新生成 `effects-repo.js` 与 `repo/` 目录。

### 浏览特效

1. 顶部按类别筛选，搜索框按关键词检索特效。
2. 卡片「▶ 运行」全屏演示；「📋 复制代码」复制源码。
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
- **仓库文件体积**：`repo/` 目录约 36MB / 590 个文件，首次 push 到 GitHub 会较大；若只想要部分 demo，可在 `_gen.js` 的 `MAP` 中删减后重跑 `node _gen.js`，再同步清理 `repo/` 目录。
- **EEA / 英国合规**：当前同意横幅是自建的轻量实现，若要满足 Google 对 EEA/英国流量的 CMP 认证要求，需替换为 Google 认证 CMP。
- **联系邮箱**：`privacy.html` 使用 `fan20081218@qq.com`（中英各一处显示 + 一处 `mailto:`，共 4 处）；如需更换，全局替换该字符串即可。

---

## 🕓 版本记录

- **v1（草原主题）**：内蒙古大草原展示页面（已备份至 `grassland.html`，资料见 `内蒙古大草原资料.md`）。
- **v2（特效实验室）**：深色霓虹主题，12 个特效 + 复制代码 + 运行弹窗。
- **v2.x**：特效扩充至 36 个；修复卡片描边伪元素拦截点击（`pointer-events:none`）；文字类特效统一替换为 YILANA.CN。
- **v2.y**：特效扩充至 **58 个**（粒子15 / 互动12 / 视觉18 / 文字13）。
- **v3（当前）**：整合本地 `iBlackBoo/javaScript` 仓库 73 个 demo，总数 **131**；新增「组件 / 游戏」分类；仓库项以 `iframe` 内嵌原始文件（保留 jQuery / echarts 依赖）；新增 `effects-repo.js` 与生成脚本 `_gen.js`。
- **v3.1（修复黑屏）**：根因为 WorkBuddy 预览面板以 http 提供页面，而仓库 iframe 用 `file://` 源被浏览器跨协议拦截，导致"点击运行全黑"。新增 `server.js` 同源托管 + `/repo` 映射，并把 `repoUrl()` 改为 http 同源路径（`file://` 直开时回退绝对路径），实测 73/73 仓库特效经 `/repo/` 均返回 200。
- **v3.2（部署到 GitHub Pages 404 修复）**：将 `P:/github/javaScript` 的原始文件复制到项目 `repo/` 目录并随站部署；`repoUrl()` 在线上继续走 `/repo/...` 同源路径，因此 GitHub Pages / 自定义域名 `yilana.cn` 可直接访问所有仓库 demo。
- **v3.3（中英双语）**：新增 `i18n.js`，导航栏加入 `EN / 中文` 切换；132 条文案（UI + 131 个特效标题描述）全部英文化；`<title>` / meta / og / hreflang / canonical 随语言同步；支持 `?lang=en` 直达、localStorage 记忆、浏览器语言自动判定。同时修复 `server.js` 硬编码旧盘符路径导致的整站 404。
- **v3.4（接入 Google AdSense）**：站点与全部页面 `<head>` 加入 `ca-pub-6465192362290250` 的 Auto ads 脚本；新增 `ads.txt`；`server.js` 补 `.txt` 的 MIME，避免以 octet-stream 返回。
- **v3.5（58 篇特效详解）**：新增 `effects/` 目录，58 个原生特效各有独立详情页（英文优先 + 中文切换），含实时演示、原理拆解、可调参数、源码、上下篇内链、`TechArticle` 结构化数据；首页卡片加「📖 详解」入口；新增 `sitemap.xml`；修复 `starfield` 半径为负导致 `arc()` 抛异常的老 bug。
- **v3.6（隐私政策 + Cookie 同意）**：新增双语 `privacy.html`（12 节，含 AdSense / DoubleClick Cookie 披露与退订入口）；新增 `consent.js` + `consent.css` 自建同意横幅，与 Google Consent Mode v2 打通（默认 `denied`，接受后 `granted`）；全部页面 `<head>` 前置同意默认值脚本；页脚「提交创意」空链接替换为「隐私政策 + Cookie 设置」；`privacy.html` 与详情页加入预渲染语言判定，消除中文访客的英文闪烁；`sitemap.xml` 增至 61 条。
