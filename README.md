# 临床试验统计编程知识库

汇集 PharmaSUG、PharmaRug、CDISC、CMAC 等行业会议资源，为临床试验统计编程专业人士提供一站式学习参考平台。

## 在线访问

网站已部署至 GitHub Pages: https://[username].github.io/clinical-trial-knowledge-base/

## 技术栈

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查
npm run check

# 构建生产版本
npm run build
```

## 数据来源

知识库数据来源于以下行业会议的公开资料：

- [PharmaSUG](https://pharmasug.org) - 制药SAS用户组会议
- [PharmaRug](https://www.pharmarug.org) - 制药R语言用户组会议
- [CDISC](https://www.cdisc.org) - CDISC标准组织
- [CMAC](https://www.cmac.org.cn) - 中国医疗器械创新学术会议

## 部署说明

项目使用 GitHub Pages 部署，构建产物位于 `docs/` 目录。

部署步骤：
1. 将代码推送到 GitHub 仓库
2. 在仓库 Settings → Pages 中选择 `deploy from a branch`
3. 选择 `docs` 文件夹作为源
4. 等待部署完成

## 项目结构

```
src/
├── components/     # React 组件
├── pages/          # 页面组件
├── data/           # 静态数据文件
├── App.tsx         # 应用入口
└── main.tsx        # 渲染入口
```

## License

MIT
