/* TechPath · 技术岗位学习路线图数据 */
const ROLES = [
  {
    id: "frontend",
    name: "前端开发",
    emoji: "🎨",
    accent: "#ff7a59",
    tagline: "让产品拥有灵魂，把设计变成用户指尖的体验。",
    stages: [
      {
        title: "HTML & CSS 基础",
        description: "网页的结构与样式，是一切视觉表达的地基。",
        skills: [
          { name: "HTML5 语义化标签", desc: "掌握语义化、表单与多媒体标签", level: "入门" },
          { name: "CSS3 选择器与盒模型", desc: "理解层叠、继承与盒模型布局", level: "入门" },
          { name: "Flexbox 与 Grid 布局", desc: "现代布局两大核心，告别 float", level: "入门" },
          { name: "响应式设计", desc: "媒体查询与移动端优先适配", level: "进阶" },
          { name: "CSS 动画与过渡", desc: "过渡、关键帧动画与交互动效", level: "进阶" },
          { name: "Sass / Less 预处理器", desc: "变量、嵌套与混入，提升开发效率", level: "进阶" }
        ]
      },
      {
        title: "JavaScript 核心",
        description: "前端语言的灵魂，理解原理才能走得更远。",
        skills: [
          { name: "JS 语法与数据类型", desc: "变量、作用域、闭包与原型链", level: "入门" },
          { name: "DOM 操作与事件机制", desc: "节点操作、事件冒泡与委托", level: "入门" },
          { name: "ES6+ 新特性", desc: "解构、箭头函数、类与模块", level: "入门" },
          { name: "异步编程", desc: "Promise、async/await 与微任务", level: "进阶" },
          { name: "模块化开发", desc: "ES Modules 与 CommonJS", level: "进阶" },
          { name: "浏览器调试技巧", desc: "DevTools 断点、性能面板与网络分析", level: "进阶" }
        ]
      },
      {
        title: "框架与工程化",
        description: "进入生产环境，用框架与工具链武装自己。",
        skills: [
          { name: "主流框架（Vue / React）", desc: "选一个深入：组件、生命周期、Hooks", level: "核心" },
          { name: "状态管理", desc: "Pinia / Redux 与跨组件通信", level: "进阶" },
          { name: "TypeScript", desc: "类型系统与工程化落地", level: "进阶" },
          { name: "构建工具（Vite / Webpack）", desc: "打包、热更新与性能配置", level: "进阶" },
          { name: "代码规范与 Git", desc: "ESLint、Prettier 与协作流程", level: "入门" },
          { name: "自动化测试", desc: "Jest / Vitest 单元与组件测试", level: "高级" }
        ]
      },
      {
        title: "进阶与性能",
        description: "理解浏览器底层，写出流畅的应用。",
        skills: [
          { name: "浏览器渲染原理", desc: "解析、重排重绘与合成", level: "高级" },
          { name: "前端性能优化", desc: "懒加载、缓存、代码分割", level: "高级" },
          { name: "网络基础（HTTP/HTTPS）", desc: "请求头、缓存策略与 HTTPS", level: "进阶" },
          { name: "Node.js 基础", desc: "搭建前端工具链与轻量服务", level: "进阶" },
          { name: "工程架构与设计模式", desc: "组件设计、MVVM 与发布订阅", level: "高级" },
          { name: "安全基础", desc: "XSS、CSRF 与常见漏洞防护", level: "高级" }
        ]
      },
      {
        title: "高级方向",
        description: "成为独当一面的前端工程师，探索更广阔的边界。",
        skills: [
          { name: "微前端架构", desc: "qiankun / Module Federation", level: "高级" },
          { name: "跨端开发", desc: "Taro / uni-app / React Native", level: "高级" },
          { name: "可视化开发", desc: "Canvas / SVG / WebGL / ECharts", level: "高级" },
          { name: "全栈能力", desc: "Node 服务、Serverless 与 BFF", level: "高级" },
          { name: "源码阅读与开源", desc: "读框架源码、参与开源贡献", level: "高级" },
          { name: "技术方案与带团队", desc: "技术选型、评审与复盘", level: "高级" }
        ]
      }
    ]
  },
  {
    id: "backend",
    name: "后端开发",
    emoji: "⚙️",
    accent: "#4facfe",
    tagline: "在看不见的地方支撑一切，稳定、高效、可扩展。",
    stages: [
      {
        title: "语言与基础",
        description: "精通一门主语言，是后端的基本功。",
        skills: [
          { name: "主攻一门语言", desc: "Java / Python / Go 选一深入", level: "入门" },
          { name: "语法、集合与异常", desc: "常用 API、容器与错误处理", level: "入门" },
          { name: "面向对象与设计基础", desc: "封装、继承、多态与 SOLID", level: "进阶" },
          { name: "数据结构与算法", desc: "数组、链表、树、哈希与复杂度", level: "进阶" },
          { name: "并发与多线程", desc: "线程模型、锁与并发容器", level: "高级" },
          { name: "代码规范与调试", desc: "日志、断点与单元测试习惯", level: "入门" }
        ]
      },
      {
        title: "计算机基础",
        description: "计算机四大件，决定你能走多高。",
        skills: [
          { name: "计算机网络", desc: "TCP/IP、HTTP、DNS 与 HTTPS", level: "进阶" },
          { name: "操作系统", desc: "进程线程、内存与 I/O 模型", level: "进阶" },
          { name: "数据库原理", desc: "索引、事务与隔离级别", level: "进阶" },
          { name: "Linux 基础", desc: "常用命令、权限与部署", level: "入门" },
          { name: "内存与性能", desc: "GC、缓存与性能调优", level: "高级" }
        ]
      },
      {
        title: "数据库与缓存",
        description: "数据是系统的核心资产，读写都要稳。",
        skills: [
          { name: "MySQL 设计与优化", desc: "建表规范、索引优化与慢查询", level: "核心" },
          { name: "事务与锁", desc: "ACID、MVCC 与锁机制", level: "高级" },
          { name: "Redis 应用", desc: "缓存、持久化与分布式锁", level: "核心" },
          { name: "NoSQL 数据库", desc: "MongoDB / Elasticsearch 场景", level: "进阶" },
          { name: "数据备份与迁移", desc: "主从、分库分表与恢复演练", level: "高级" }
        ]
      },
      {
        title: "Web 框架与接口",
        description: "把业务变成稳定可靠的接口服务。",
        skills: [
          { name: "Web 框架", desc: "Spring Boot / FastAPI / Gin", level: "核心" },
          { name: "RESTful 接口设计", desc: "资源建模、版本与状态码", level: "进阶" },
          { name: "参数校验与异常处理", desc: "统一异常、全局拦截器", level: "进阶" },
          { name: "认证与鉴权", desc: "JWT、OAuth2 与 Session", level: "核心" },
          { name: "接口测试与文档", desc: "单元测试、集成测试与 Swagger", level: "进阶" },
          { name: "中间件与拦截器", desc: "日志、限流与鉴权中间件", level: "高级" }
        ]
      },
      {
        title: "分布式与架构",
        description: "面向大规模，设计高并发高可用的系统。",
        skills: [
          { name: "消息队列", desc: "Kafka / RabbitMQ 与削峰解耦", level: "高级" },
          { name: "微服务与网关", desc: "服务拆分、注册中心与网关", level: "高级" },
          { name: "分布式事务与缓存", desc: "最终一致、缓存一致性", level: "高级" },
          { name: "容器化部署", desc: "Docker 与 Kubernetes 基础", level: "进阶" },
          { name: "系统设计", desc: "高并发、高可用与容量评估", level: "高级" },
          { name: "监控与治理", desc: "链路追踪、熔断与限流", level: "高级" }
        ]
      }
    ]
  },
  {
    id: "fullstack",
    name: "全栈开发",
    emoji: "🛠️",
    accent: "#a78bfa",
    tagline: "一个人也能交付完整产品，从界面到数据库。",
    stages: [
      {
        title: "前端基础",
        description: "先能做出好看的界面。",
        skills: [
          { name: "HTML & CSS", desc: "语义化、布局与响应式", level: "入门" },
          { name: "JavaScript 核心", desc: "语法、DOM 与异步编程", level: "入门" },
          { name: "前端框架", desc: "Vue / React 组件化开发", level: "核心" },
          { name: "状态管理与路由", desc: "Pinia/Redux + Router", level: "进阶" }
        ]
      },
      {
        title: "后端基础",
        description: "把数据与逻辑交付为接口。",
        skills: [
          { name: "后端语言", desc: "Node.js / Java / Python 选一", level: "核心" },
          { name: "RESTful API 开发", desc: "接口设计、校验与异常", level: "核心" },
          { name: "数据库与 SQL", desc: "表设计、索引与查询优化", level: "核心" },
          { name: "认证与安全", desc: "JWT、密码学与常见防护", level: "进阶" }
        ]
      },
      {
        title: "工程与部署",
        description: "让代码可靠地跑在生产环境。",
        skills: [
          { name: "Git 协作", desc: "分支模型与 Code Review", level: "入门" },
          { name: "Docker 容器化", desc: "镜像、容器与 Compose", level: "进阶" },
          { name: "CI/CD 流程", desc: "自动化构建、测试与发布", level: "进阶" },
          { name: "云服务部署", desc: "云主机 / Serverless 上线", level: "进阶" }
        ]
      },
      {
        title: "全栈进阶",
        description: "打通前后端，追求更优的工程体验。",
        skills: [
          { name: "性能优化", desc: "前端渲染 + 后端响应优化", level: "高级" },
          { name: "实时通信", desc: "WebSocket / SSE 应用", level: "高级" },
          { name: "搜索与缓存", desc: "Redis 与 Elasticsearch", level: "高级" },
          { name: "监控与日志", desc: "错误追踪与应用监控", level: "高级" }
        ]
      },
      {
        title: "综合实战",
        description: "用完整项目证明能力。",
        skills: [
          { name: "完整项目实战", desc: "从需求到上线的全流程作品", level: "核心" },
          { name: "架构与文档", desc: "模块划分、API 文档与 README", level: "高级" },
          { name: "单元测试覆盖", desc: "前后端核心逻辑测试", level: "高级" },
          { name: "持续迭代与复盘", desc: "发布节奏、反馈与优化", level: "高级" }
        ]
      }
    ]
  },
  {
    id: "ai",
    name: "AI / 机器学习",
    emoji: "🤖",
    accent: "#34d399",
    tagline: "教会机器理解世界，让智能成为产品能力。",
    stages: [
      {
        title: "数学与编程基础",
        description: "地基决定上层建筑，数学是 AI 的语言。",
        skills: [
          { name: "Python 编程", desc: "语法、类、文件与常用库", level: "入门" },
          { name: "线性代数", desc: "向量、矩阵、特征值", level: "入门" },
          { name: "概率论与统计", desc: "分布、期望、贝叶斯与假设检验", level: "入门" },
          { name: "NumPy / Pandas", desc: "科学计算与数据处理", level: "核心" }
        ]
      },
      {
        title: "机器学习核心",
        description: "经典算法是理解一切的起点。",
        skills: [
          { name: "监督学习", desc: "线性回归、决策树、SVM 与集成", level: "核心" },
          { name: "无监督学习", desc: "聚类、降维与异常检测", level: "进阶" },
          { name: "模型评估与调参", desc: "交叉验证、过拟合与网格搜索", level: "核心" },
          { name: "Scikit-learn 实践", desc: "完整建模流程实战", level: "核心" }
        ]
      },
      {
        title: "深度学习",
        description: "进入神经网络的世界。",
        skills: [
          { name: "神经网络基础", desc: "反向传播、优化器与正则化", level: "核心" },
          { name: "PyTorch / TensorFlow", desc: "张量、自动求导与训练循环", level: "核心" },
          { name: "CNN 与计算机视觉", desc: "卷积网络与图像任务", level: "高级" },
          { name: "Transformer 与 NLP", desc: "注意力机制与语言模型", level: "高级" }
        ]
      },
      {
        title: "工程与部署",
        description: "让模型真正跑起来，产生价值。",
        skills: [
          { name: "训练优化", desc: "GPU、分布式训练与实验管理", level: "高级" },
          { name: "模型部署", desc: "ONNX / Triton / 推理服务", level: "高级" },
          { name: "MLOps", desc: "数据版本、流水线与监控", level: "高级" },
          { name: "LLM 应用开发", desc: "RAG、Agent 与微调", level: "高级" }
        ]
      },
      {
        title: "进阶方向",
        description: "在某个方向成为专家。",
        skills: [
          { name: "强化学习", desc: "MDP、策略梯度与 DQN", level: "高级" },
          { name: "多模态模型", desc: "图文、音视频统一建模", level: "高级" },
          { name: "分布式训练", desc: "数据并行、模型并行", level: "高级" },
          { name: "论文阅读与复现", desc: "跟踪顶会与开源项目", level: "高级" }
        ]
      }
    ]
  },
  {
    id: "data",
    name: "数据分析/工程",
    emoji: "📊",
    accent: "#fbbf24",
    tagline: "从数据中发现规律，让决策有据可依。",
    stages: [
      {
        title: "数据处理基础",
        description: "先学会高效地拿到和整理数据。",
        skills: [
          { name: "SQL 查询与优化", desc: "连接、聚合与窗口函数", level: "核心" },
          { name: "Python 与 Pandas", desc: "数据清洗、转换与分组聚合", level: "核心" },
          { name: "Excel / BI 工具", desc: "透视表、函数与常用 BI", level: "入门" }
        ]
      },
      {
        title: "数据可视化",
        description: "让数据自己说话。",
        skills: [
          { name: "Matplotlib / Seaborn", desc: "统计图表与可视化规范", level: "进阶" },
          { name: "Tableau / Power BI", desc: "交互式仪表盘", level: "进阶" },
          { name: "图表设计原则", desc: "配色、标注与叙事", level: "进阶" }
        ]
      },
      {
        title: "统计与分析",
        description: "用严谨的方法得出结论。",
        skills: [
          { name: "描述性统计", desc: "集中趋势、离散程度与分布", level: "进阶" },
          { name: "假设检验与 A/B 测试", desc: "显著性、置信区间与实验设计", level: "高级" },
          { name: "业务指标体系", desc: "漏斗、留存、北极星指标", level: "进阶" }
        ]
      },
      {
        title: "数据工程",
        description: "构建稳定高效的数据管道。",
        skills: [
          { name: "数据仓库建模", desc: "维度建模、分层设计", level: "高级" },
          { name: "ETL / ELT 流程", desc: "Airflow / dbt 调度", level: "高级" },
          { name: "大数据处理", desc: "Hive / Spark 离线计算", level: "高级" }
        ]
      },
      {
        title: "进阶方向",
        description: "数据与智能的结合，价值放大。",
        skills: [
          { name: "机器学习入门", desc: "经典算法与特征工程", level: "高级" },
          { name: "实时计算", desc: "Flink / Kafka 流处理", level: "高级" },
          { name: "数据治理与质量", desc: "元数据、血缘与质量监控", level: "高级" }
        ]
      }
    ]
  },
  {
    id: "devops",
    name: "DevOps / SRE",
    emoji: "🚀",
    accent: "#22d3ee",
    tagline: "打通开发与运维，让交付又快又稳。",
    stages: [
      {
        title: "基础能力",
        description: "一切自动化的起点。",
        skills: [
          { name: "Linux 系统管理", desc: "文件、进程、服务与权限", level: "入门" },
          { name: "网络基础", desc: "IP、DNS、端口与防火墙", level: "入门" },
          { name: "Shell 脚本", desc: "编写自动化脚本处理日常", level: "入门" },
          { name: "Git 与代码托管", desc: "分支策略与协作", level: "入门" }
        ]
      },
      {
        title: "自动化",
        description: "把重复劳动交给脚本和流水线。",
        skills: [
          { name: "配置管理", desc: "Ansible / Puppet 批量管理", level: "进阶" },
          { name: "CI/CD 流水线", desc: "Jenkins / GitLab CI", level: "核心" },
          { name: "自动化测试接入", desc: "测试驱动发布流程", level: "进阶" }
        ]
      },
      {
        title: "容器与编排",
        description: "现代部署的核心技术栈。",
        skills: [
          { name: "Docker 原理与实践", desc: "镜像、网络与存储", level: "核心" },
          { name: "Kubernetes 核心", desc: "Pod、Deployment 与服务发现", level: "核心" },
          { name: "Helm 与云原生实践", desc: "模板化部署与生态", level: "高级" }
        ]
      },
      {
        title: "可观测性",
        description: "先能看见，才能做好。",
        skills: [
          { name: "监控告警", desc: "Prometheus / Grafana", level: "核心" },
          { name: "日志收集", desc: "ELK / Loki 体系", level: "进阶" },
          { name: "链路追踪", desc: "Jaeger / SkyWalking", level: "高级" },
          { name: "On-call 与应急", desc: "故障响应与复盘", level: "高级" }
        ]
      },
      {
        title: "云与架构",
        description: "面向大规模与高可用。",
        skills: [
          { name: "云服务", desc: "AWS / 阿里云核心产品", level: "进阶" },
          { name: "IaC 基础设施即代码", desc: "Terraform / CloudFormation", level: "高级" },
          { name: "高可用与容灾", desc: "多活、备份与演练", level: "高级" },
          { name: "SRE 方法论", desc: "SLO、错误预算与容量", level: "高级" }
        ]
      }
    ]
  },
  {
    id: "mobile",
    name: "移动端开发",
    emoji: "📱",
    accent: "#f472b6",
    tagline: "把体验装进口袋，让应用随手可用。",
    stages: [
      {
        title: "基础入门",
        description: "认识移动端的世界。",
        skills: [
          { name: "移动端 UI/UX 概念", desc: "触控、适配与设计规范", level: "入门" },
          { name: "语言基础", desc: "Swift / Kotlin / Dart 选一", level: "入门" },
          { name: "布局与组件", desc: "常用布局与基础组件", level: "入门" }
        ]
      },
      {
        title: "原生能力",
        description: "调用系统的力量。",
        skills: [
          { name: "网络请求与解析", desc: "HTTP、JSON 与错误处理", level: "核心" },
          { name: "本地存储", desc: "偏好、数据库与文件", level: "进阶" },
          { name: "系统 API 与权限", desc: "相机、定位、通知等", level: "进阶" },
          { name: "动画与交互", desc: "转场、手势与反馈", level: "进阶" }
        ]
      },
      {
        title: "跨端与工程化",
        description: "一套代码，多端运行。",
        skills: [
          { name: "跨端框架", desc: "Flutter / React Native", level: "核心" },
          { name: "状态管理", desc: "Provider / Riverpod / Redux", level: "进阶" },
          { name: "打包与发布", desc: "App Store / 应用市场审核上架", level: "核心" }
        ]
      },
      {
        title: "进阶优化",
        description: "流畅与稳定的背后是细节。",
        skills: [
          { name: "性能优化", desc: "启动速度、内存与卡顿排查", level: "高级" },
          { name: "自动化测试", desc: "单元测试与 UI 测试", level: "高级" },
          { name: "架构模式", desc: "MVVM / Clean Architecture", level: "高级" }
        ]
      },
      {
        title: "高级方向",
        description: "挑战更复杂的端上技术。",
        skills: [
          { name: "原生与 Web 混合", desc: "WebView 与桥接通信", level: "高级" },
          { name: "端上安全", desc: "加固、防逆向与数据安全", level: "高级" },
          { name: "音视频与图形", desc: "播放器、GPU 与渲染", level: "高级" }
        ]
      }
    ]
  },
  {
    id: "security",
    name: "网络安全",
    emoji: "🛡️",
    accent: "#fb7185",
    tagline: "攻防之间，守护数字世界的边界。",
    stages: [
      {
        title: "基础能力",
        description: "理解网络与系统，才能攻防有据。",
        skills: [
          { name: "计算机网络原理", desc: "TCP/IP、协议与抓包", level: "入门" },
          { name: "操作系统安全", desc: "Linux / Windows 安全机制", level: "入门" },
          { name: "编程基础", desc: "Python / Shell 脚本", level: "入门" }
        ]
      },
      {
        title: "Web 安全",
        description: "互联网攻击面最广的战场。",
        skills: [
          { name: "OWASP Top 10", desc: "全面了解十大风险", level: "核心" },
          { name: "XSS / CSRF / SSRF", desc: "原理、利用与防护", level: "核心" },
          { name: "注入攻击", desc: "SQL 注入与命令注入", level: "核心" },
          { name: "认证与会话安全", desc: "会话固定、越权与令牌", level: "进阶" }
        ]
      },
      {
        title: "渗透测试",
        description: "用攻击者的视角寻找漏洞。",
        skills: [
          { name: "信息收集与扫描", desc: "子域、指纹与漏洞扫描", level: "进阶" },
          { name: "常用工具链", desc: "Burp Suite / Nmap / Metasploit", level: "核心" },
          { name: "内网渗透与提权", desc: "横向移动、权限提升", level: "高级" },
          { name: "漏洞报告与修复", desc: "危害评级与修复建议", level: "进阶" }
        ]
      },
      {
        title: "安全防护",
        description: "防守同样是艺术。",
        skills: [
          { name: "安全加固", desc: "系统基线、补丁与配置", level: "进阶" },
          { name: "边界防护", desc: "WAF、IDS/IPS 与蜜罐", level: "高级" },
          { name: "应急响应", desc: "入侵检测、隔离与取证", level: "高级" }
        ]
      },
      {
        title: "进阶方向",
        description: "深入某一领域成为专家。",
        skills: [
          { name: "二进制与逆向", desc: "汇编、调试与破解", level: "高级" },
          { name: "红蓝对抗", desc: "攻防演练与蓝队运营", level: "高级" },
          { name: "云安全与合规", desc: "云上安全与等保合规", level: "高级" },
          { name: "DevSecOps", desc: "安全左移与自动化", level: "高级" }
        ]
      }
    ]
  },
  {
    id: "qa",
    name: "测试工程师",
    emoji: "🧪",
    accent: "#60a5fa",
    tagline: "守住质量底线，让发布成为确定的事。",
    stages: [
      {
        title: "测试基础",
        description: "建立质量意识与方法论。",
        skills: [
          { name: "测试基础理论", desc: "测试类型、层级与流程", level: "入门" },
          { name: "测试用例设计", desc: "等价类、边界值与判定表", level: "核心" },
          { name: "缺陷管理", desc: "提交规范、跟踪与回归", level: "入门" },
          { name: "接口测试", desc: "Postman / Apifox 实践", level: "进阶" }
        ]
      },
      {
        title: "自动化测试",
        description: "让机器替你重复劳动。",
        skills: [
          { name: "Python / Java 基础", desc: "自动化脚本语言", level: "入门" },
          { name: "UI 自动化", desc: "Selenium / Playwright", level: "核心" },
          { name: "接口自动化", desc: "pytest / requests 框架", level: "核心" },
          { name: "自动化框架设计", desc: "PO 模式与数据驱动", level: "高级" }
        ]
      },
      {
        title: "性能与专项",
        description: "发现肉眼看不到的问题。",
        skills: [
          { name: "性能测试", desc: "JMeter / 压测与瓶颈分析", level: "高级" },
          { name: "兼容性测试", desc: "多端多浏览器矩阵", level: "进阶" },
          { name: "安全测试入门", desc: "基础漏洞验证", level: "高级" }
        ]
      },
      {
        title: "工程与协作",
        description: "测试融入研发全流程。",
        skills: [
          { name: "CI/CD 集成", desc: "流水线中的质量门禁", level: "进阶" },
          { name: "测试左移", desc: "需求评审与静态分析", level: "高级" },
          { name: "质量度量", desc: "覆盖率、缺陷密度与报告", level: "高级" }
        ]
      },
      {
        title: "进阶方向",
        description: "向测试开发与质量专家进化。",
        skills: [
          { name: "测试开发", desc: "测试平台与工具链开发", level: "高级" },
          { name: "AI 辅助测试", desc: "智能用例与缺陷预测", level: "高级" },
          { name: "团队质量体系", desc: "质量文化建设与流程优化", level: "高级" }
        ]
      }
    ]
  }
];