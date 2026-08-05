# TechPath Backend（FastAPI 骨架）

## 结构
```
app/
  main.py            FastAPI 入口（CORS、路由挂载）
  core/config.py     配置（环境变量）
  db/                SQLAlchemy engine / session / Base
  models/            数据模型（示例：users）
  schemas/           统一响应结构 { code, message, data }
  api/routers/       接口（health / auth 占位）
  services/ai_service.py  LangChain AI 服务（mock 模式）
tests/               冒烟测试
```

## 运行
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```
接口文档：http://127.0.0.1:8000/docs（FastAPI 自动生成 OpenAPI）

## 说明
- 统一前缀 `/api`，响应结构 `{ code, message, data }`
- AI 调用全部收敛在 `services/ai_service.py`；`AI_MOCK=true` 或无 Key 时返回 mock
- 完整数据模型与迁移（Alembic）在 M1 与内容模块一并落地