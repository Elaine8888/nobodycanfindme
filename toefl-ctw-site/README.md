# TOEFL Complete the Words 网站文件

这是一个可直接部署到 GitHub Pages 的静态网站版本。

## 文件结构

- `index.html`：网站首页和练习页面
- `css/style.css`：样式文件
- `js/questions.js`：题库数据
- `js/app.js`：交互逻辑

## 如何部署到 GitHub Pages

1. 新建一个 GitHub 仓库
2. 把整个文件夹里的内容全部上传
3. 进入仓库 `Settings` → `Pages`
4. Source 选择 `Deploy from a branch`
5. Branch 选择 `main`，Folder 选择 `/root`
6. 保存后等待几分钟，GitHub 会生成公开链接

## 当前功能

- 首页练习卡片
- 10 道 Complete the Words 练习
- 严格保留整词判分逻辑
- 自动计时
- 本地最高分记录（localStorage）
- 提交后答案回顾
- 再做一次 / 下一题

## 后续你可以继续扩展

- 增加更多题目
- 增加分类标签
- 加入错题本
- 加入自定义域名
