# 临床试验统计编程知识库 - 技术架构文档

## 1. 架构设计

```mermaid
graph LR
    A[用户浏览器] --> B[GitHub Pages静态资源]
    B --> C[React SPA应用]
    C --> D[本地JSON数据]
    D --> E[静态数据文件]
```

**说明**：采用纯前端静态架构，无需后端服务器，所有数据存储在本地JSON文件中，通过GitHub Pages托管部署。

## 2. 技术栈

| 层级 | 技术选型 | 说明 |
|-----|---------|-----|
| 框架 | React 18 | UI组件化开发 |
| 构建工具 | Vite | 快速开发与构建 |
| 样式 | Tailwind CSS | 原子化CSS框架 |
| 路由 | React Router v6 | SPA路由管理 |
| 数据 | 静态JSON | 本地数据存储 |
| 部署 | GitHub Pages | 静态网站托管 |

## 3. 路由定义

| 路由 | 页面 | 功能描述 |
|-----|------|---------|
| / | HomePage | 首页，展示知识库概览和最新资料 |
| /conference/:id | ConferencePage | 会议资料列表页 |
| /paper/:id | PaperDetailPage | 论文详情页 |
| /search | SearchPage | 搜索结果页 |

## 4. 数据模型

### 4.1 会议数据 (Conference)

```typescript
interface Conference {
  id: string;           // 唯一标识
  name: string;         // 会议名称 PharmaSUG/PharmaRug/CDISC/CMAC
  year: number;         // 年份 2025/2026
  region: string;       // 地区 US/EU/China
  fullName: string;     // 完整名称
  url: string;          // 官网链接
}
```

### 4.2 论文数据 (Paper)

```typescript
interface Paper {
  id: string;           // 唯一标识
  conferenceId: string; // 所属会议ID
  title: string;        // 论文标题
  authors: string[];    // 作者列表
  abstract: string;     // 摘要
  keywords: string[];  // 关键词
  tags: string[];       // 技术标签 CDISC/SDTM/ADaM/SAS等
  pdfUrl?: string;      // PDF链接（如果有）
  presentationUrl?: string; // 演示文稿链接（如果有）
  publishedDate: string; // 发布时间
}
```

### 4.3 标签分类 (Tag)

```typescript
interface Tag {
  id: string;
  name: string;         // 标签名称
  category: string;     // 分类：技术/领域/工具
  count: number;        // 使用次数
}
```

## 5. 目录结构

```
/src
  /components
    Header.jsx        # 页头导航
    Footer.jsx        # 页脚
    ConferenceCard.jsx # 会议卡片
    PaperCard.jsx     # 论文卡片
    TagFilter.jsx     # 标签筛选器
    SearchBar.jsx     # 搜索栏
  /pages
    HomePage.jsx      # 首页
    ConferencePage.jsx # 会议列表页
    PaperDetailPage.jsx # 论文详情页
    SearchPage.jsx    # 搜索结果页
  /data
    conferences.json  # 会议数据
    papers.json       # 论文数据
    tags.json         # 标签数据
  /styles
    index.css         # 全局样式
  App.jsx             # 应用入口
  main.jsx            # 渲染入口
/public
  index.html          # HTML模板
```

## 6. 部署方案

### 6.1 GitHub仓库结构

```
/clinical-trial-knowledge-base
  /src               # 源代码
  /public            # 静态资源
  /docs              # GitHub Pages配置
  package.json
  vite.config.js
  tailwind.config.js
```

### 6.2 部署流程

1. 代码推送到GitHub仓库
2. 配置GitHub Pages使用docs文件夹
3. 访问 `https://username.github.io/clinical-trial-knowledge-base`

## 7. 数据维护

由于数据来源于公开的行业会议网站，数据更新流程如下：

1. **手动采集**：从各会议官网获取最新论文信息
2. **数据录入**：将论文信息更新到JSON数据文件
3. **代码提交**：提交更新后的JSON文件到GitHub
4. **自动部署**：GitHub Actions自动触发部署
