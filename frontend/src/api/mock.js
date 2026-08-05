// ============ TechPath Mock 数据（M1 前端先用，后端就绪后切换真实 API） ============

const now = Date.now()

export const MOCK_ROUTES = {
  'POST /auth/login': ({ email }) => ({
    token: 'mock-token-' + email,
    user: { id: 1, email: email || 'demo@techpath.cn', nickname: '管理员', role: 'admin' },
  }),
  'POST /auth/register': ({ nickname, email }) => ({
    token: 'mock-token-' + email,
    user: { id: 99, email, nickname: nickname || '新同学', role: 'user' },
  }),

  'GET /admin/stats': () => ({
    users: { value: 1286, up: 12.4 },
    learning: { value: 342, up: 8.1 },
    aiCalls: { value: 1204, down: 3.2 },
    discussions: { value: 86, up: 21.6 },
    trend: [
      { label: '周一', v: 46 }, { label: '周二', v: 62 }, { label: '周三', v: 38 },
      { label: '周四', v: 74 }, { label: '周五', v: 58 }, { label: '周六', v: 80 }, { label: '周日', v: 66 },
    ],
    health: [
      { name: '概念卡', done: 37, total: 37 },
      { name: '精选资源', done: 35, total: 37 },
      { name: '课件', done: 28, total: 37 },
      { name: '小任务', done: 31, total: 37 },
      { name: 'FAQ', done: 37, total: 37 },
    ],
    activities: [
      { type: 'content', text: '新增课件章节《API 调用实战 · 第三章》', time: '10 分钟前' },
      { type: 'complaint', text: '收到课件侵权投诉 1 条，待 24h 内处理', time: '1 小时前' },
      { type: 'user', text: '新注册用户 +32，学习中的用户 +8', time: '3 小时前' },
    ],
  }),

  'GET /admin/content/tree': () => ({
    role: 'AI 应用开发',
    stages: [
      { id: 's0', title: 'S0 认知与准备', count: 3 },
      { id: 's1', title: 'S1 Python 编程基础', count: 6 },
      { id: 's2', title: 'S2 大模型 API 与 Prompt', count: 6, active: true,
        skills: ['大模型基础概念', 'OpenAI 兼容 API 调用', 'Prompt 工程基础', '结构化输出', '对话与多轮', '流式输出'] },
      { id: 's3', title: 'S3 应用开发与工程化', count: 6 },
      { id: 's4', title: 'S4 RAG 知识库问答', count: 6 },
      { id: 's5', title: 'S5 Agent 智能体', count: 5 },
      { id: 's6', title: 'S6 部署评估与作品集', count: 5 },
    ],
  }),

  'GET /admin/content/skills': () => [
    { id: 1, name: '大模型基础概念', desc: 'LLM / Token / 上下文', level: '核心', complete: '5/5', status: '已启用' },
    { id: 2, name: 'OpenAI 兼容 API 调用', desc: 'openai 库 / Chat Completions', level: '核心', complete: '4/5', status: '已启用' },
    { id: 3, name: 'Prompt 工程基础', desc: '角色 / 指令 / few-shot', level: '核心', complete: '5/5', status: '已启用' },
    { id: 4, name: '结构化输出', desc: 'JSON / json mode', level: '进阶', complete: '5/5', status: '草稿' },
    { id: 5, name: '对话与多轮', desc: '消息列表 / 角色', level: '进阶', complete: '5/5', status: '草稿' },
    { id: 6, name: '流式输出', desc: 'stream / 增量', level: '进阶', complete: '5/5', status: '草稿' },
  ],

  'GET /admin/courseware': () => [
    { id: 1, name: 'API 调用实战', skill: 'OpenAI 兼容 API 调用', stage: 'S2 · 核心', pages: '2 章 · 12 页', source: 'B站开源 · 已标注', status: '已发布' },
    { id: 2, name: 'Prompt 工程入门', skill: 'Prompt 工程基础', stage: 'S2 · 核心', pages: '3 章 · 18 页', source: 'B站开源 · 已标注', status: '已发布' },
    { id: 3, name: 'RAG 架构图解', skill: 'RAG 概念', stage: 'S4 · 核心', pages: '2 章 · 10 页', source: '平台自制', status: '草稿' },
    { id: 4, name: 'FastAPI 快速上手', skill: 'FastAPI 基础', stage: 'S3 · 核心', pages: '1 章 · 8 页', source: 'B站开源 · 已标注', status: '草稿' },
  ],

  'GET /admin/courseware/1': () => ({
    id: 1, name: 'API 调用实战', sourceType: 'B站开源', sourceUrl: 'https://www.bilibili.com/video/BVxxxxxx',
    sourceNote: 'UP 主：xxx · 课件标注开放使用',
    chapters: [
      { id: 'ch1', title: '第 1 章 认识 API', pages: 8, slides: ['什么是 API', '请求与响应', '鉴权与 Key', '第一个调用', '处理返回结果', '错误与重试', '流式输出', '小结'] },
      { id: 'ch2', title: '第 2 章 请求与鉴权', pages: 6, slides: ['什么是请求头', 'Bearer 鉴权示例', '错误处理要点'] },
    ],
  }),

  'GET /admin/discussion': () => [
    { id: 1, title: '🔝 Bearer Token 为什么要加 Bearer？', chapter: 'API 调用实战 · 第 3 章', author: '张三', replies: 3, status: '已解决' },
    { id: 2, title: 'requests 和 openai 库有什么区别？', chapter: 'API 调用实战 · 第 1 章', author: '李四', replies: 5, status: '待处理' },
    { id: 3, title: '⚠️ 低价代写 AI 作业，加微……', chapter: '讨论区 · 通用', author: '广告号', replies: 0, status: '待处理' },
  ],
  'GET /admin/discussion/1': () => ({
    title: 'Bearer Token 为什么要加 Bearer？',
    chapter: 'API 调用实战 · 第 3 章',
    posts: [
      { author: '张三', content: '我照着课件写，发现 Authorization 的值是 "Bearer sk-xxx"，这个 Bearer 是必须的吗？', type: 'post' },
      { author: '李四', content: 'Bearer 表示"持有者令牌"，是 HTTP 标准里的约定，服务端靠它识别令牌类型……', type: 'reply', ok: true },
      { author: '广告号', content: '加微信领取全套资料……（命中敏感词：加微信）', type: 'reply', bad: true },
    ],
  }),

  'GET /admin/complaints': () => [
    { id: 1, courseware: 'RAG 架构图解', source: '平台自制', user: '用户 U-1024', reason: '疑似与某付费课程内容一致', time: '2 小时前', status: '待处理' },
    { id: 2, courseware: 'API 调用实战', source: 'B站开源 · 已标注', user: '用户 U-0876', reason: '来源标注不清晰', time: '昨天', status: '已处理 · 补充来源' },
  ],
  'GET /admin/complaints/1': () => ({
    id: 1, courseware: 'RAG 架构图解', user: '用户 U-1024',
    content: '该课件内容与某付费课程第 3 讲一致，疑似未授权引用。请核实来源。',
    time: '2026-08-05 09:32', deadline: '2026-08-06 09:32 前',
    records: ['08-05 09:32 · 管理员创建投诉工单'],
  }),

  'GET /admin/users': () => [
    { id: 1024, nickname: '张三', email: 'zhangsan@qq.com', role: '用户', progress: 32, streak: 5, status: '正常' },
    { id: 1025, nickname: '李四', email: 'lisi@163.com', role: '用户', progress: 58, streak: 12, status: '正常' },
    { id: 1100, nickname: '广告号', email: 'ad-xxxx@temp.com', role: '用户', progress: 0, streak: 0, status: '已禁用' },
    { id: 1, nickname: '管理员', email: 'admin@techpath.cn', role: '管理员', progress: null, streak: null, status: '正常' },
  ],
  'GET /admin/users/1024': () => ({
    id: 1024, nickname: '张三', email: 'zhangsan@qq.com', role: '用户', status: '正常', joined: '2026-07-01',
    progress: 32, streak: 5, notes: 8, aiToday: { used: 3, limit: 20 },
    activities: [
      { type: '打卡', text: '完成今日任务 · S2 API 调用实战', time: '今天 10:02', cls: 'green' },
      { type: 'AI', text: '提问：什么是 Token？', time: '今天 09:40', cls: 'blue' },
      { type: '笔记', text: '课件第 3 页新增笔记', time: '昨天 21:15', cls: 'gray' },
      { type: '讨论', text: '发帖：Bearer 为什么要加？', time: '昨天 20:30', cls: 'gray' },
    ],
  }),

  'GET /admin/roles': () => [
    { id: 1, name: '超级管理员', key: 'admin', users: 1, scope: '全部', status: '启用', builtin: true },
    { id: 2, name: '内容管理员', key: 'content_admin', users: 2, scope: '内容/课件管理', status: '启用', builtin: false },
    { id: 3, name: '社区版主', key: 'moderator', users: 3, scope: '讨论/投诉治理', status: '启用', builtin: false },
    { id: 4, name: '访客', key: 'guest', users: 0, scope: '只读', status: '禁用', builtin: false },
  ],
  'GET /admin/roles/2': () => ({
    id: 2, name: '内容管理员', key: 'content_admin', status: true, remark: '负责内容与课件管理',
    perms: [
      { module: '数据概览', on: true },
      { module: '内容管理', on: true, ops: ['查看', '新增', '编辑'] },
      { module: '课件管理', on: true, ops: ['查看', '编辑', '导入'] },
      { module: '讨论区管理', on: true },
      { module: '课件投诉', on: true },
      { module: '系统管理', on: false, ops: ['用户管理', '角色管理', '菜单管理', '系统设置', '操作日志'] },
    ],
  }),

  'GET /admin/menus': () => [
    { id: 1, name: '数据概览', type: '菜单', icon: '📊', route: '/dashboard', sort: 1 },
    { id: 2, name: '内容管理', type: '菜单', icon: '🗂', route: '/content', sort: 2 },
    { id: 3, name: '课件管理', type: '菜单', icon: '📚', route: '/courseware', sort: 3 },
    { id: 4, name: '讨论区管理', type: '菜单', icon: '💬', route: '/discussion', sort: 4 },
    { id: 5, name: '课件投诉', type: '菜单', icon: '🚩', route: '/complaints', sort: 5 },
    { id: 6, name: '系统管理', type: '目录', icon: '⚙️', route: '/system', sort: 6,
      children: [
        { id: 61, name: '用户管理', type: '菜单', icon: '👥', route: '/system/users', sort: 1 },
        { id: 62, name: '角色管理', type: '菜单', icon: '🛡️', route: '/system/roles', sort: 2 },
        { id: 63, name: '菜单管理', type: '菜单', icon: '📑', route: '/system/menus', sort: 3 },
        { id: 64, name: '系统设置', type: '菜单', icon: '⚙️', route: '/system/settings', sort: 4 },
        { id: 65, name: '操作日志', type: '菜单', icon: '🧾', route: '/system/logs', sort: 5 },
      ],
    },
  ],
  'GET /admin/menus/62': () => ({
    id: 62, parent: '系统管理（目录）', type: '菜单', name: '角色管理', route: '/system/roles',
    icon: '🛡️', sort: 2, show: true, component: 'system/roles/index',
  }),

  'GET /admin/logs': () => [
    { user: '管理员', module: '内容管理', action: '编辑技能「OpenAI 兼容 API 调用」', ip: '127.0.0.1', cost: '82ms', time: '10:42:15', status: '成功' },
    { user: '管理员', module: '课件管理', action: '导入课件「API 调用实战」', ip: '127.0.0.1', cost: '1.2s', time: '10:35:02', status: '成功' },
    { user: '管理员', module: '讨论区管理', action: '删除违规帖子「低价代写…」', ip: '127.0.0.1', cost: '45ms', time: '09:58:30', status: '成功' },
    { user: '管理员', module: '用户管理', action: '禁用用户「广告号」', ip: '127.0.0.1', cost: '60ms', time: '09:47:11', status: '成功' },
    { user: '管理员', module: '系统设置', action: '修改 AI 每日限额为 20', ip: '127.0.0.1', cost: '38ms', time: '09:30:00', status: '成功' },
  ],

  'GET /admin/settings': () => ({
    site: { name: 'TechPath 学习陪跑平台', desc: '面向编程初学者的学习路线 · 课件 · AI 助教' },
    plan: { dailyMinutes: 60, carryOver: true },
    ai: { model: 'deepseek-chat', key: 'sk-****************', dailyLimit: 20, mock: false },
    compliance: { complaintHours: 24, sensitiveFilter: true },
  }),
  'PUT /admin/settings': (body) => body,
}