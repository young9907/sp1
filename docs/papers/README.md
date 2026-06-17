# 论文 PDF 文件说明

## 目录结构

所有论文 PDF 文件都放在 `public/papers/` 目录。构建后会被复制到 `docs/papers/`，通过 GitHub Pages 直接访问。

文件命名规范：
- 论文 PDF：`{paper-id}.pdf`
- 演示文稿 PDF：`{paper-id}-presentation.pdf`

## 现有文件列表（当前为占位 PDF）

| 会议 | 论文 ID | 论文 PDF | 演示文稿 |
|------|---------|----------|----------|
| PharmaSUG 2025 US | pharmasug-2025-us-001 | ✅ | ❌ |
| PharmaSUG 2025 US | pharmasug-2025-us-002 | ✅ | ✅ |
| PharmaSUG 2025 US | pharmasug-2025-us-003 | ✅ | ❌ |
| PharmaSUG 2025 EU | pharmasug-2025-eu-001 | ✅ | ✅ |
| PharmaSUG 2025 EU | pharmasug-2025-eu-002 | ✅ | ❌ |
| PharmaRug 2025 | pharmarug-2025-001 | ✅ | ✅ |
| PharmaRug 2025 | pharmarug-2025-002 | ✅ | ❌ |
| CDISC 2025 | cdisc-2025-001 | ✅ | ✅ |
| CDISC 2025 | cdisc-2025-002 | ✅ | ❌ |
| CMAC 2025 | cmac-2025-001 | ✅ | ✅ |
| CMAC 2025 | cmac-2025-002 | ✅ | ❌ |
| PharmaSUG 2026 US | pharmasug-2026-us-001 | ✅ | ✅ |
| PharmaSUG 2026 US | pharmasug-2026-us-002 | ✅ | ❌ |

## 替换真实 PDF

1. 从各会议官网下载对应论文的真实 PDF 文件
2. 将文件重命名为上表中的文件名，放入 `public/papers/` 目录
3. 如果需要调整元数据（标题、作者、摘要、标签等），编辑 `src/data/papers.json`
4. 运行 `npm run build` 重新构建
5. 提交并推送 `docs/` 目录到 GitHub

## 添加新论文

1. 在 `public/papers/` 中添加新 PDF 文件，命名为 `{id}.pdf`
2. 在 `src/data/papers.json` 中添加新条目
3. 如果属于新的会议，同时在 `src/data/conferences.json` 添加会议信息
4. 如果使用了新的技术标签，在 `src/data/tags.json` 中添加
5. 运行 `npm run build` 并推送

## 数据字段说明

`papers.json` 中每篇论文包含以下字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 唯一标识，建议格式 `{会议}-{年份}-{序号}` |
| conferenceId | string | 对应 conferences.json 的 id |
| title | string | 论文标题 |
| authors | string[] | 作者列表 |
| abstract | string | 摘要 |
| keywords | string[] | 关键词列表 |
| tags | string[] | 主题标签，用于筛选 |
| pdfUrl | string | PDF 文件路径，格式为 `papers/{id}.pdf` |
| presentationUrl | string/null | 演示文稿路径，格式为 `papers/{id}-presentation.pdf`，没有则留空 |
| publishedDate | string | 发布日期，格式 YYYY-MM-DD |

## 构建与部署

- **构建命令**：`npm run build`
- **产物目录**：`docs/`
- **部署方式**：提交并推送 `docs/` 到 GitHub main 分支，GitHub Pages 自动发布
- **访问地址**：`https://young9907.github.io/sp1/papers/{文件名}`
