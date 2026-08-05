<template>
  <div class="page-head"><h1>编辑小任务 <span class="badge gray">OpenAI 兼容 API 调用</span></h1><p>20~60 分钟；不判题，提供参考思路，可让 AI 点评</p></div>
  <div class="card">
    <div class="form-grid">
      <div class="full"><label class="label">任务标题</label><input class="input" value="写出你的第一个「你好」程序"></div>
      <div class="full"><label class="label">任务描述</label><textarea class="input" rows="4">调用大模型 API 输出一句问候，并打印返回的 Token 用量。</textarea></div>
      <div class="full"><label class="label">验收标准（每行一条）</label><textarea class="input" rows="3">程序可运行并打印正确输出
API Key 通过环境变量读取</textarea></div>
      <div class="full"><label class="label">参考思路（不提供完整答案）</label><textarea class="input" rows="3">先读官方文档的最小示例 → 拆解为 3 步：构造客户端、发请求、打印结果</textarea></div>
    </div>
  </div>
  <div class="row" style="margin-top:16px;justify-content:flex-end;"><router-link class="btn ghost" to="/admin/content/skill-edit">返回技能</router-link><button class="btn primary">保存小任务</button></div>
</template>