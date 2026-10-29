# 李小冉 · AI Product & Agent Application Portfolio

轻量 HTML / CSS / JavaScript，无构建步骤、无运行时 CDN、无外部字体。

## 文件与内容维护

- `index.html`：首页固定内容、经历、能力、教育与联系。
- `projects.js`：项目唯一数据源；`featured: true` 决定是否进入首页。首页与案例共用标题、职责、状态和链接。数组顺序即展示顺序。
- `app.js`：项目渲染、`#case/<id>` 案例路由、截图放大、移动端菜单、轻量入场。
- `styles.css`：颜色 token、响应式排版与打印样式。
- `assets/`：本地图标和截图。图片完整展示，可在案例中放大。

案例链接例如 `https://xl81194.github.io/lxr-portfolio/#case/elder-care`，无需 GitHub Pages rewrite。直接打开本地 `index.html` 也能运行。

## 最新简历

目前仅找到《个人简历-AI产品实习生-李小冉.docx》，未找到该版本 PDF，网站暂以邮件索取入口替代下载。

将最新版 PDF 放到 `assets/resume/个人简历-AI产品实习生-李小冉.pdf`，然后把 `projects.js` 中 `site.resume.url` 从 `null` 改为：

```js
"./assets/resume/个人简历-AI产品实习生-李小冉.pdf"
```

导航、Hero、Contact 三处入口会自动显示 `Download Resume`。请勿用旧简历替代。

## GitHub Pages 更新

仓库：`XL81194/lxr-portfolio`。Pages：`main` 分支、`/(root)`。

将本目录内容放入仓库根目录，包括 `.nojekyll`，保留 `index.html` 和 `assets/` 的相对关系。不要把 ZIP 本身或外层 `portfolio-web-ppt` 文件夹作为首页上传。保持 HTTPS 正式链接不变。

本目录已整理成可发布内容，可以整体同步到仓库根目录。旧 `.png/.jpg` 素材原件存档在工作区 `work/portfolio-original-assets/`；通信项目原始数值图不在新版公开目录中。

## 内容边界

- Elder Care：课程原型、虚拟数据；AI 辅助开发与 DeepSeek API 功能分别说明。
- GRE：个人原型，AI 用于开发；不宣称产品本身内置 LLM 或存在增长结果。
- 通信项目：内部分析，只公开业务拆解与验证方法，不公开客户或原始收入数据。
- 大创：分维度方法；R² 0.968 仅对应身体健康维度阶段成果。
- 反思部分为后续改进方向，不写成已完成的功能。
- 公网页面不显示电话、账号密码或不存在的职业链接。

## 本地检查

可直接打开 `index.html`。若需模拟 GitHub Pages 子路径，从工作区运行 `node work/portfolio_preview.cjs`。测试覆盖桌面、iPhone、微信尺寸与 UA、案例路由、后退/关闭、截图放大、导航、简历缺失回退、相对资源、打印和 reduced motion。尺寸与 UA 模拟不等同于真实微信客户端测试。

本地原版备份位于工作区 `work/portfolio-before-ai-product-20261029.zip`。
