# TechPath · 接口契约文档（API.md）

| 项 | 内容 |
|---|---|
| 文档版本 | v1.0 |
| 日期 | 2026-08-05 |
| 状态 | 评审中（认证模块已实现，其余为前端 Mock 对齐契约） |
| 配套 | 开发计划 v2.0（docs/开发计划.md）、前端 mock（frontend/src/api/mock.js） |

---

## 1. 通用约定

- **Base URL**：开发 `http://127.0.0.1:8000`（前端通过 vite 代理 `/api` 转发）
- **统一前缀**：所有接口以 `/api` 开头
- **统一响应结构**：
  ```json
  { "code": 0, "message": "ok", "data": { } }
  ```
  - `code = 0` 成功；非 0 为业务错误（`message` 为可展示提示）
  - 业务错误同时使用 HTTP 状态码（4xx/5xx）
- **鉴权**：`Authorization: Bearer <token>`（JWT）；管理接口要求角色 `admin`
- **错误码约定**：

| HTTP | 含义 |
|---|---|
| 401 | 未登录 / 登录已失效 |
| 403 | 无权限（非 admin 访问管理接口 / 账号被禁用） |
| 404 | 资源不存在 |
| 409 | 冲突（如邮箱已注册） |
| 422 | 参数校验失败（Pydantic） |

- **前端切换**：`frontend/.env.development` 中 `VITE_API_MOCK=false` 时全部走真实后端；`/auth/*` 已通过 `VITE_AUTH_REAL=true` 直连真实后端。

---

## 2. 认证模块（✅ 已实现）

### POST /api/auth/register
注册（自动登录，返回 token）
```json
// 请求
{ "email": "you@example.com", "password": "12345678", "nickname": "张三" }
// 响应 data
{ "token": "eyJhbGciOi...", "user": { "id": 1, "email": "you@example.com", "nickname": "张三", "role": "user" } }
```
- 校验：邮箱格式、密码 ≥ 8 位；重复邮箱返回 409

### POST /api/auth/login
```json
// 请求
{ "email": "you@example.com", "password": "12345678" }
// 响应 data 同上
```
- 错误密码 401；禁用账号 403

### GET /api/auth/me
获取当前用户（需 Bearer）
```json
// 响应 data
{ "id": 1, "email": "you@example.com", "nickname": "张三", "role": "user" }
```

### GET /api/health
```json
{ "data": { "status": "ok", "app": "TechPath API" } }
```

---

## 3. 管理模块（规划中，与前端 Mock 对齐）

> 以下接口均需 `admin` 角色；分页查询建议参数 `page` / `page_size`（默认 1 / 20）。

### 3.1 数据概览

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | /api/admin/stats | 概览统计 |

```json
// 响应 data
{
  "users": { "value": 1286, "up": 12.4 },
  "learning": { "value": 342, "up": 8.1 },
  "aiCalls": { "value": 1204, "down": 3.2 },
  "discussions": { "value": 86, "up": 21.6 },
  "trend": [ { "label": "周一", "v": 46 } ],
  "health": [ { "name": "概念卡", "done": 37, "total": 37 } ],
  "activities": [ { "type": "content|complaint|user", "text": "...", "time": "10 分钟前" } ]
}
```

### 3.2 内容管理

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | /api/admin/content/tree | 岗位 → 阶段 → 技能 内容树 |
| GET | /api/admin/content/skills | 技能列表（含五件套完整度） |
| POST | /api/admin/content/skills | 新增技能 |
| PUT | /api/admin/content/skills/{id} | 编辑技能 |
| DELETE | /api/admin/content/skills/{id} | 删除技能 |
| PUT | /api/admin/content/skills/{id}/concept | 保存概念卡 |
| PUT | /api/admin/content/skills/{id}/resources | 保存资源列表 |
| PUT | /api/admin/content/skills/{id}/task | 保存小任务 |
| PUT | /api/admin/content/skills/{id}/faqs | 保存 FAQ 列表 |

```json
// GET /api/admin/content/skills 响应 data
[
  { "id": 1, "name": "大模型基础概念", "desc": "LLM / Token / 上下文",
    "level": "核心", "complete": "5/5", "status": "已启用" }
]
```

### 3.3 课件管理

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | /api/admin/courseware | 课件列表 |
| POST | /api/admin/courseware | 新增课件 |
| GET | /api/admin/courseware/{id} | 课件详情（章节/页面） |
| PUT | /api/admin/courseware/{id} | 编辑课件（含来源标注） |
| POST | /api/admin/courseware/{id}/chapters | 新增章节 |
| PUT | /api/admin/courseware/chapters/{id} | 编辑章节 |
| PUT | /api/admin/courseware/slides/{id} | 编辑课件页 |
| POST | /api/admin/courseware/import | Markdown 导入（multipart） |

```json
// GET /api/admin/courseware/{id} 响应 data
{
  "id": 1, "name": "API 调用实战",
  "sourceType": "B站开源", "sourceUrl": "https://...", "sourceNote": "...",
  "chapters": [ { "id": "ch1", "title": "第 1 章 认识 API", "pages": 8, "slides": ["..."] } ]
}
```

### 3.4 讨论区管理

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | /api/admin/discussion | 帖子列表（支持 status 筛选） |
| GET | /api/admin/discussion/{id} | 帖子详情（回复列表） |
| POST | /api/admin/discussion/{id}/pin | 置顶/取消置顶 |
| DELETE | /api/admin/discussion/posts/{id} | 删除帖子/回复 |
| POST | /api/admin/users/{id}/ban | 禁言/解除 |

### 3.5 课件投诉

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | /api/admin/complaints | 投诉列表 |
| GET | /api/admin/complaints/{id} | 投诉详情 + 处理记录 |
| POST | /api/admin/complaints/{id}/resolve | 处理投诉（驳回/下架 + 备注） |

```json
// POST /api/admin/complaints/{id}/resolve 请求
{ "action": "reject|take_down", "note": "处理备注" }
```

### 3.6 用户管理

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | /api/admin/users | 用户列表（支持 keyword / status / role） |
| GET | /api/admin/users/{id} | 用户详情 + 学习统计 + 最近动态 |
| POST | /api/admin/users/{id}/disable | 禁用/启用 |
| PUT | /api/admin/users/{id}/role | 修改角色 |

### 3.7 角色管理（RBAC）

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | /api/admin/roles | 角色列表 |
| POST | /api/admin/roles | 新增角色 |
| GET | /api/admin/roles/{id} | 角色详情 + 权限配置 |
| PUT | /api/admin/roles/{id} | 编辑角色（含权限勾选） |
| DELETE | /api/admin/roles/{id} | 删除角色（内置角色不可删） |

```json
// GET /api/admin/roles/{id} 响应 data
{
  "id": 2, "name": "内容管理员", "key": "content_admin", "status": true, "remark": "...",
  "perms": [
    { "module": "数据概览", "on": true },
    { "module": "内容管理", "on": true, "ops": ["查看", "新增", "编辑"] }
  ]
}
```

### 3.8 菜单管理

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | /api/admin/menus | 菜单树（目录/菜单/按钮 三级） |
| POST | /api/admin/menus | 新增菜单 |
| GET | /api/admin/menus/{id} | 菜单详情 |
| PUT | /api/admin/menus/{id} | 编辑菜单 |
| DELETE | /api/admin/menus/{id} | 删除菜单 |

### 3.9 系统设置

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | /api/admin/settings | 读取设置 |
| PUT | /api/admin/settings | 保存设置 |

```json
// 响应 data
{
  "site": { "name": "TechPath 学习陪跑平台", "desc": "..." },
  "plan": { "dailyMinutes": 60, "carryOver": true },
  "ai": { "model": "deepseek-chat", "key": "sk-****", "dailyLimit": 20, "mock": false },
  "compliance": { "complaintHours": 24, "sensitiveFilter": true }
}
```
> AI `key` 仅返回掩码，不回显明文。

### 3.10 操作日志

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | /api/admin/logs | 日志列表（支持 user / module / date） |
| POST | /api/admin/logs/clear | 清空日志（需二次确认） |

```json
// 响应 data
[
  { "user": "管理员", "module": "内容管理", "action": "编辑技能「...」",
    "ip": "127.0.0.1", "cost": "82ms", "time": "10:42:15", "status": "成功" }
]
```

---

## 4. 用户端模块（M2，规划中）

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | /api/roles | 岗位列表（路线展示） |
| GET | /api/roles/{id} | 岗位详情（阶段/技能/概念卡/资源/课件/小任务/FAQ） |
| GET | /api/progress | 我的技能进度 |
| PUT | /api/progress | 更新技能状态 |
| GET | /api/plans | 我的周计划 |
| POST | /api/plans/{id}/checkin | 打卡 |
| GET | /api/courseware/{id} | 课件阅读（章节/页面） |
| GET | /api/courseware/slides/{id} | 课件页 |
| PUT | /api/notes | 保存标注/笔记 |
| GET | /api/notes | 我的笔记聚合 |
| GET | /api/discussions/{chapterId} | 章节讨论区 |
| POST | /api/discussions/{chapterId}/threads | 发帖 |
| POST | /api/ai/tutor | AI 助教答疑（LangChain） |

> 以上为 M2 规划接口，字段待 M2 详细设计时冻结。

---

## 5. 待办与约定

- **Auth 已实现**（backend 可直接运行验证）；其余接口待后端实现，前端保持 Mock
- 新增/变更接口必须同步更新本文档（先契约后编码）
- 分页返回建议统一：`{ "items": [...], "total": 100, "page": 1, "page_size": 20 }`