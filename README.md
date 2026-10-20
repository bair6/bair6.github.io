# 白晔 / bair6 的个人网站

无需安装依赖的静态个人主页，支持手机、深色模式和自动展示 GitHub 公开项目。

## 个性化

编辑 `profile.js`，填写姓名、简介、GitHub 用户名和邮箱。没有填写的联系方式会自动隐藏。`projects` 可手动配置作品；留空时会在填写用户名后从 GitHub API 读取最近更新的六个非 fork、未归档的公开仓库。API 请求失败不会影响页面其余内容。

已根据提供的资料配置姓名、GitHub 用户名以及中山大学智能工程学院、智能科学与技术专业信息。未填写邮箱，未添加虚构作品。

## 本地查看

直接打开 `index.html`，或在此目录运行：

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

然后访问 http://127.0.0.1:4173 。

## 发布到 GitHub Pages

1. 在 GitHub 的 bair6 账号创建公开仓库，名称为 `bair6.github.io`。
2. 将此目录内的文件上传到仓库根目录，包含 `index.html`、`style.css`、`profile.js`、`script.js`、`favicon.svg` 和 `.nojekyll`。
3. 在仓库 Settings → Pages 中，Source 选择 **Deploy from a branch**，Branch 选择 `main` 和 `/(root)`，然后保存。
4. 等待仓库 Actions 中 Pages 部署成功。个人网站地址为 `https://bair6.github.io/`。

也支持其他名称的项目仓库，地址将是 `https://你的用户名.github.io/仓库名/`。所有页面资源均使用相对路径。

参考：[GitHub Pages 发布来源设置](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。

网页已配置 bair6 的公开账号链接。本机尚未获得 GitHub 发布授权；本地预览不代表已经上线。
