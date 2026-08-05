<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../../../../api/client'
import Seg from '../../../../components/ui/Seg.vue'
import Switch from '../../../../components/ui/Switch.vue'

const s = ref(null)
const mock = ref(true)
onMounted(async () => {
  s.value = await request('/admin/settings')
  mock.value = !s.value.ai.mock
})
async function save() {
  await request('/admin/settings', { method: 'PUT', body: s.value })
  alert('已保存（Mock 模式）')
}
</script>

<template>
  <div v-if="s">
    <div class="page-head"><h1>系统设置</h1><p>站点信息、学习计划默认值、AI 模型与限额（保存后全局生效）</p></div>
    <div class="card" style="margin-bottom:14px;">
      <h3>站点信息</h3>
      <div class="form-grid" style="margin-top:12px;">
        <div><label class="label">站点名称</label><input class="input" v-model="s.site.name"></div>
        <div><label class="label">站点描述</label><input class="input" v-model="s.site.desc"></div>
      </div>
    </div>
    <div class="card" style="margin-bottom:14px;">
      <h3>学习计划默认值</h3>
      <div class="form-grid" style="margin-top:12px;">
        <div><label class="label">默认每日学习时长（分钟）</label><input class="input" type="number" v-model.number="s.plan.dailyMinutes"></div>
        <div><label class="label">未完成任务顺延</label><Seg :options="['自动顺延','不顺延']" :model-value="s.plan.carryOver ? '自动顺延' : '不顺延'" /></div>
      </div>
    </div>
    <div class="card" style="margin-bottom:14px;">
      <h3>AI 模型与限额（LangChain 服务）</h3>
      <div class="form-grid" style="margin-top:12px;">
        <div><label class="label">模型</label><Seg :options="['deepseek-chat','deepseek-reasoner','gpt-4o-mini']" :model-value="s.ai.model" /></div>
        <div><label class="label">API Key（加密存储，不回显）</label><input class="input" type="password" :value="s.ai.key"></div>
        <div><label class="label">每用户每日 AI 调用上限</label><input class="input" type="number" v-model.number="s.ai.dailyLimit"></div>
        <div><label class="label">开发模式</label><Seg :options="['真实 API','Mock 模式']" :model-value="mock ? 'Mock 模式' : '真实 API'" @update:model-value="(v) => (mock = v === 'Mock 模式')" /></div>
      </div>
      <div class="row" style="margin-top:14px;"><span class="badge blue">LangChain</span><span class="muted" style="font-size:12.5px;">AI 调用统一收敛在 ai_service 模块 · 修改后立即生效</span></div>
    </div>
    <div class="card">
      <h3>内容与合规</h3>
      <div class="form-grid" style="margin-top:12px;">
        <div><label class="label">课件投诉处理时限（小时）</label><input class="input" type="number" v-model.number="s.compliance.complaintHours"></div>
        <div><label class="label">讨论区敏感词过滤</label><div class="row"><Switch v-model="s.compliance.sensitiveFilter" /><span class="muted" style="font-size:13px;">启用（自动拦截并提示）</span></div></div>
      </div>
    </div>
    <div class="row" style="margin-top:16px;justify-content:flex-end;"><button class="btn primary" @click="save">保存设置</button></div>
  </div>
</template>