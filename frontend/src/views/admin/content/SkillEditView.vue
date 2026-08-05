<script setup>
import Seg from '../../../components/ui/Seg.vue'
</script>

<template>
  <div class="page-head"><h1>编辑技能 <span class="badge blue">OpenAI 兼容 API 调用</span></h1><p>基础信息 + 五件套完整性入口</p></div>
  <div class="card">
    <div class="form-grid">
      <div><label class="label">技能名称</label><input class="input" value="OpenAI 兼容 API 调用"></div>
      <div><label class="label">难度</label><Seg :options="['入门','进阶','核心','高级']" model-value="核心" /></div>
      <div class="full"><label class="label">一句话目标（用于计划与 AI 上下文）</label><input class="input" value="能调用大模型 API 并正确处理请求与输出"></div>
      <div class="full"><label class="label">所属阶段</label><Seg :options="['S0 认知','S1 Python','S2 API/Prompt','S3 应用','S4 RAG','S5 Agent','S6 部署']" model-value="S2 API/Prompt" /></div>
    </div>
  </div>
  <div class="card" style="margin-top:14px;">
    <div class="spread"><h3>五件套完整性</h3><span class="badge orange">4/5</span></div>
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-top:12px;">
      <router-link class="card" style="text-decoration:none;color:var(--text);padding:14px;" to="/admin/content/concept-edit"><div style="font-size:20px;">📄</div><b style="font-size:13px;">概念卡</b><br><span class="badge green" style="margin-top:6px;">✓ 已完善</span><br><span class="muted" style="font-size:12px;">编辑 →</span></router-link>
      <router-link class="card" style="text-decoration:none;color:var(--text);padding:14px;" to="/admin/content/resource-edit"><div style="font-size:20px;">🔗</div><b style="font-size:13px;">资源</b><br><span class="badge green" style="margin-top:6px;">2 条</span><br><span class="muted" style="font-size:12px;">编辑 →</span></router-link>
      <router-link class="card" style="text-decoration:none;color:var(--text);padding:14px;" to="/admin/courseware/chapters"><div style="font-size:20px;">📚</div><b style="font-size:13px;">课件</b><br><span class="badge green" style="margin-top:6px;">1 份</span><br><span class="muted" style="font-size:12px;">管理 →</span></router-link>
      <router-link class="card" style="text-decoration:none;color:var(--text);padding:14px;" to="/admin/content/task-edit"><div style="font-size:20px;">🧪</div><b style="font-size:13px;">小任务</b><br><span class="badge orange" style="margin-top:6px;">待完善</span><br><span class="muted" style="font-size:12px;">编辑 →</span></router-link>
      <router-link class="card" style="text-decoration:none;color:var(--text);padding:14px;" to="/admin/content/faq-edit"><div style="font-size:20px;">❓</div><b style="font-size:13px;">FAQ</b><br><span class="badge green" style="margin-top:6px;">3 条</span><br><span class="muted" style="font-size:12px;">编辑 →</span></router-link>
    </div>
  </div>
  <div class="row" style="margin-top:16px;justify-content:flex-end;"><router-link class="btn ghost" to="/admin/content">取消</router-link><button class="btn primary">保存技能</button></div>
</template>