<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../../../../api/client'

const u = ref(null)
onMounted(async () => { u.value = await request('/admin/users/1024') })
const cls = (c) => ({ green: 'green', blue: 'blue', gray: 'gray' }[c])
</script>

<template>
  <div v-if="u">
    <div class="page-head"><h1>用户详情 <span class="badge green">{{ u.status }}</span></h1><p>UID {{ u.id }} · {{ u.email }}</p></div>
    <div style="display:grid;grid-template-columns:1fr 1.4fr;gap:14px;">
      <div class="card">
        <div style="text-align:center;">
          <div class="avatar" style="width:64px;height:64px;font-size:24px;margin:0 auto 10px;">{{ u.nickname.slice(0, 1) }}</div>
          <b style="font-size:16px;">{{ u.nickname }}</b>
          <p class="muted" style="font-size:12.5px;">注册于 {{ u.joined }}</p>
          <div class="row" style="justify-content:center;margin-top:12px;"><span class="badge gray">角色：{{ u.role }}</span></div>
        </div>
        <div style="border-top:1px solid var(--line);margin-top:16px;padding-top:14px;display:grid;gap:10px;">
          <div class="spread"><span class="muted" style="font-size:12.5px;">学习进度</span><b style="font-size:13px;">{{ u.progress }}%</b></div>
          <div class="prog"><i :style="{ width: u.progress + '%' }"></i></div>
          <div class="spread"><span class="muted" style="font-size:12.5px;">连续打卡</span><b style="font-size:13px;">🔥 {{ u.streak }} 天</b></div>
          <div class="spread"><span class="muted" style="font-size:12.5px;">笔记 / 标记</span><b style="font-size:13px;">{{ u.notes }} 条</b></div>
          <div class="spread"><span class="muted" style="font-size:12.5px;">AI 今日提问</span><b style="font-size:13px;">{{ u.aiToday.used }} / {{ u.aiToday.limit }}</b></div>
        </div>
      </div>
      <div class="card">
        <div class="spread"><h3>最近动态</h3><span class="badge gray">学习记录</span></div>
        <div style="margin-top:10px;">
          <div v-for="(a, i) in u.activities" :key="i" class="row" :style="{ padding: '9px 0', borderBottom: i < u.activities.length - 1 ? '1px solid var(--line)' : 'none' }">
            <span class="badge" :class="cls(a.cls)">{{ a.type }}</span>
            <span class="muted" style="font-size:13px;">{{ a.text }}</span>
            <span style="margin-left:auto;font-size:12px;color:var(--text-faint);">{{ a.time }}</span>
          </div>
        </div>
        <div class="row" style="margin-top:16px;justify-content:flex-end;"><router-link class="btn ghost" to="/admin/users">← 返回列表</router-link><button class="btn danger">禁用该用户</button></div>
      </div>
    </div>
  </div>
</template>