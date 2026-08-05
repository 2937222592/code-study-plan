<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../../api/client'

const stats = ref(null)
onMounted(async () => { stats.value = await request('/admin/stats') })
const maxTrend = () => Math.max(...(stats.value?.trend.map((t) => t.v) || [1]))
</script>

<template>
  <div class="page-head"><h1>数据概览 <span class="badge blue">2026-08-05</span></h1><p>系统运行概况 · Mock 数据</p></div>
  <div v-if="stats" class="stats">
    <div class="stat"><div class="t">👥 注册用户</div><div class="v">{{ stats.users.value.toLocaleString() }}</div><div class="d up">▲ {{ stats.users.up }}% <span class="faint">较上周</span></div></div>
    <div class="stat"><div class="t">🎓 学习中的用户</div><div class="v">{{ stats.learning.value }}</div><div class="d up">▲ {{ stats.learning.up }}%</div></div>
    <div class="stat"><div class="t">🤖 AI 今日调用</div><div class="v">{{ stats.aiCalls.value.toLocaleString() }}</div><div class="d down">▼ {{ stats.aiCalls.down }}%</div></div>
    <div class="stat"><div class="t">💬 今日讨论</div><div class="v">{{ stats.discussions.value }}</div><div class="d up">▲ {{ stats.discussions.up }}%</div></div>
  </div>
  <div v-if="stats" style="display:grid;grid-template-columns:1.6fr 1fr;gap:14px;">
    <div class="card">
      <div class="spread"><h3>近 7 日新增用户</h3><span class="badge gray">周视图</span></div>
      <div style="display:flex;align-items:flex-end;gap:14px;height:150px;margin-top:18px;padding:0 6px;">
        <div v-for="t in stats.trend" :key="t.label" style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:6px;">
          <div :style="{ width: '60%', height: (t.v / maxTrend() * 100) + '%', background: 'linear-gradient(180deg,var(--accent),var(--accent-2))', borderRadius: '6px 6px 0 0' }"></div>
          <span class="faint" style="font-size:11px;">{{ t.label }}</span>
        </div>
      </div>
    </div>
    <div class="card">
      <h3>内容健康度</h3><p class="sub" style="margin-bottom:14px;">技能五件套完整度</p>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div v-for="h in stats.health" :key="h.name">
          <div class="spread" style="margin-bottom:4px;"><span class="muted" style="font-size:12.5px;">{{ h.name }}</span><b style="font-size:12.5px;">{{ h.done }}/{{ h.total }}</b></div>
          <div class="prog"><i :style="{ width: (h.done / h.total * 100) + '%' }"></i></div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="stats" class="card" style="margin-top:14px;">
    <div class="spread"><h3>最近动态</h3><a class="muted" style="font-size:12px;" href="#">查看全部 →</a></div>
    <div style="margin-top:10px;">
      <div v-for="(a, i) in stats.activities" :key="i" class="row" :style="{ padding: '9px 0', borderBottom: i < stats.activities.length - 1 ? '1px solid var(--line)' : 'none' }">
        <span class="badge" :class="{ blue: a.type === 'content', orange: a.type === 'complaint', green: a.type === 'user' }">{{ a.type === 'content' ? '内容' : a.type === 'complaint' ? '投诉' : '用户' }}</span>
        <span class="muted" style="font-size:13px;">{{ a.text }}</span>
        <span style="margin-left:auto;font-size:12px;color:var(--text-faint);">{{ a.time }}</span>
      </div>
    </div>
  </div>
</template>