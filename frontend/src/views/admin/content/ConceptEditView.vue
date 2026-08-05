<template>
  <div class="page-head"><h1>编辑概念卡 <span class="badge gray">OpenAI 兼容 API 调用</span></h1><p>3~5 分钟可读完的速览内容</p></div>
  <div class="card">
    <div class="form-grid">
      <div class="full"><label class="label">一句话解释</label><input class="input" value="API 调用是让你的程序通过网络请求，使用别人提供的能力。"></div>
      <div class="full"><label class="label">生活化类比</label><input class="input" value="就像去餐厅点餐：你报菜名（请求），厨师做菜（模型处理），服务员上菜（返回结果）。"></div>
      <div class="full"><label class="label">代码示例</label><textarea class="input" rows="6">from openai import OpenAI
client = OpenAI()
resp = client.chat.completions.create(...)</textarea></div>
      <div class="full"><label class="label">常见坑（每行一条）</label><textarea class="input" rows="3">API Key 不要硬编码在代码里
注意上下文窗口长度限制
网络超时需要重试与错误处理</textarea></div>
    </div>
  </div>
  <div class="row" style="margin-top:16px;justify-content:flex-end;"><router-link class="btn ghost" to="/admin/content/skill-edit">返回技能</router-link><button class="btn primary">保存概念卡</button></div>
</template>