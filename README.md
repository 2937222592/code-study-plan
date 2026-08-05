# TechPath · 学习陪跑平台

面向编程初学者的「学习陪跑系统」：AI 应用开发岗位的学习路线、计划、精选资料、课件互动（标注/笔记/讨论区）与 AI 学习助教。

## 仓库结构（Monorepo）

```
├── docs/           需求文档 v1.3 · 开发计划 v2.0 · 接口契约（API.md 待 M0 产出）
├── prototype/      低保真线框 + 高保真设计稿（27 页，浅色主题）
├── frontend/       Vue 3 + Vite（前端工程 · 先做注册登录 + 系统管理）
└── backend/        FastAPI + SQLAlchemy + LangChain（后端工程 · 骨架已就绪）
```

## 快速开始

### 前端
```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

### 后端
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload   # 接口文档 http://127.0.0.1:8000/docs
```

## 文档
- [需求文档](docs/AI应用开发岗位需求文档.md)
- [开发计划](docs/开发计划.md)
- [高保真设计](prototype/highfi/index.html)

## 技术栈
FastAPI · SQLAlchemy · SQLite（→ PostgreSQL） · Vue 3 + Vite · LangChain + DeepSeek · Docker Compose