<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../../../api/client'

const c = ref(null)
onMounted(async () => { c.value = await request('/admin/complaints/1') })
</script>

<template>
  <div v-if="c">
    <div class="page-head"><h1>处理投诉</h1><p><span class="badge gray">{{ c.courseware }}</span> · 投诉人：{{ c.user }}</p></div>
    <div class="card">
      <h3>投诉内容</h3>
      <div class="card" style="background:var(--card-soft);box-shadow:none;margin:8px 0;">{{ c.content }}</div>
      <div class="muted" style="font-size:12.5px;">投诉时间：{{ c.time }} · 需在 {{ c.deadline }} 处理</div>
      <div class="form-grid" style="margin-top:16px;">
        <div class="full"><label class="label">处理备注</label><textarea class="input" rows="3">核实课件实际来源与授权说明后填写处理结论……</textarea></div>
      </div>
      <div class="row" style="margin-top:14px;justify-content:flex-end;"><router-link class="btn ghost" to="/admin/complaints">← 返回</router-link><button class="btn ghost">驳回（理由不成立）</button><button class="btn danger">下架课件</button></div>
    </div>
    <div class="card" style="margin-top:14px;">
      <h3>处理记录</h3>
      <div v-for="(r, i) in c.records" :key="i" class="muted" style="font-size:12.5px;padding:8px 0;border-bottom:1px solid var(--line);">{{ r }}</div>
    </div>
  </div>
</template>