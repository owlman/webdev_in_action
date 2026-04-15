# Vue.js 网页应用开发项目教材

[![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=flat&logo=vuedotjs&logoColor=%2335495E)](https://vuejs.org/)
[![Bootstrap 5](https://img.shields.io/badge/Bootstrap_5-7952B3?style=flat&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=%23FFFFFF)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=%23FFFFFF)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=%23FFFFFF)](https://www.mongodb.com/)
[![NPM](https://img.shields.io/badge/NPM-CB3837?style=flat&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

本项目是一本面向前端程序员的实战型教材，通过五个精心设计的教学项目，系统讲解如何使用 JavaScript 语言及其相关前后端开发技术来完成企业级 Web 应用开发。

## 📖 内容简介

本教材采用**项目驱动式教学法**，以"凌雪冰熊"连锁饮料店的数字化转型为业务背景，带领读者从零到一完成一个完整的企业级 Web 应用开发。

### 五个教学项目

| 项目 | 名称 | 技术要点 |
|:---:|------|----------|
| 1 | [将企业官网重构为互联网服务](./Markdown/01.md) | Node.js、HTTP 服务、Express.js 框架 |
| 2 | [网站用户功能模块的后端实现](./Markdown/02.md) | MongoDB 数据库、RESTful API、Cypress 测试 |
| 3 | [用户注册/登录功能的前端实现](./Markdown/03.md) | Vue 3 组件、Vite 构建工具、Bootstrap 5 UI |
| 4 | [用户信息管理功能的前端实现](./Markdown/04.md) | Vue Router、响应式数据处理、表单验证 |
| 5 | [用户线上购物功能的前端实现](./Markdown/05.md) | 购物车逻辑、订单管理、状态管理 |

## 🛠 技术栈

### 前端

- **Vue.js 3.4** - 渐进式 JavaScript 框架
- **Vite 5** - 下一代前端构建工具
- **Bootstrap 5.3** - CSS  UI 框架
- **Vue Router** - Vue.js 官方路由管理

### 后端

- **Node.js** - JavaScript 运行时环境
- **Express.js** - 标杆性 Web 开发框架
- **MongoDB** - NoSQL 数据库

### 开发工具

- **VS Code** - 代码编辑器（推荐）
- **Git** - 版本控制
- **Cypress** - 端到端测试框架

## 📁 项目结构

```bash
├── Markdown/                # 教材正文（Markdown 格式）
│   ├── 00.md                # 前言与学习导引
│   ├── 01.md ~ 05.md        # 项目1~5 详细内容
│   ├── A.md / B.md          # 附录
│   └── img/                 # 教材配图
│
├── Examples/                # 教学示例源码
│   ├── 00_oldcode/          # 凌雪冰熊官网原始静态网站
│   ├── 01_snowbear/         # 项目1-2：Node.js 后端服务
│   │   ├── frontend/        # 前端静态资源
│   │   └── backend/         # 后端服务代码
│   ├── 02_studynodejs/      # Node.js 语法学习示例
│   ├── 03_vuejsDemo/        # 项目3-5：Vue.js 前端项目
│   │   ├── src/
│   │   │   ├── components/  # Vue 组件
│   │   │   ├── main.js      # 应用入口
│   │   │   └── style.css    # 全局样式
│   │   └── vite.config.js
│   └── 04_qrcodeDemo/       # 二维码功能演示
│
├── LICENSE                  # MIT 开源协议
├── README.md                # 项目说明
└── .gitignore               # Git 忽略配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.x
- npm >= 9.x 或 yarn >= 1.x
- MongoDB >= 6.x（仅后端项目需要）

### 运行示例

**Vue.js 前端演示（项目3-5）**

```bash
cd Examples/03_vuejsDemo
npm install
npm run dev
```

**Node.js 后端服务（项目1-2）**

```bash
cd Examples/01_snowbear
npm install
npm start
```

## 📚 学习路径

```text
第一阶段：后端基础（项目1-2）
    │
    ├── 了解 B/S 架构与前后端分工
    ├── 掌握 Node.js 核心模块
    ├── 学会使用 Express.js 框架
    └── 熟悉 MongoDB 数据库操作
    │
    ▼
第二阶段：前端实战（项目3-5）
    │
    ├── Vue 3 核心概念（组合式 API、组件化）
    ├── Vite 构建工具使用
    ├── Bootstrap 5 UI 组件集成
    ├── Vue Router 路由管理
    └── 实际业务功能开发（注册登录、用户管理、购物车）
```

## 👤 前置知识要求

- ✅ JavaScript 基本语法（ES6+）
- ✅ 面向对象编程基础
- ✅ 异步编程概念（Promise/async-await）
- ✅ HTML5 + CSS3 网页设计基础
- ✅ Bootstrap 等 UI 框架使用经验（可选）

## 📖 教材目录

| 章节 | 内容 |
|------|------|
| [前言](./Markdown/00.md) | 教材介绍、学习目标、读者须知 |
| [项目1](./Markdown/01.md) | 将企业官网重构为互联网服务 |
| [项目2](./Markdown/02.md) | 网站用户功能模块的后端实现 |
| [项目3](./Markdown/03.md) | 用户注册/登录功能的前端实现 |
| [项目4](./Markdown/04.md) | 用户信息管理功能的前端实现 |
| [项目5](./Markdown/05.md) | 用户线上购物功能的前端实现 |
| [附录A](./Markdown/A.md) | Express.js 框架补充知识 |
| [附录B](./Markdown/B.md) | Vue.js 生态补充知识 |

## 🤝 开源贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

本项目基于 [MIT License](./LICENSE) 开源。
