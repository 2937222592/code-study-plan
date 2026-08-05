<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../../../api/client'

const thread = ref(null)
onMounted(async () => { thread.value = await request('/admin/discussion/1') })
</script>

<template>
  <div v-if="thread">
    <div class="page-head"><h1>帖子详情</h1><p><span class="badge gray">{{ thread.chapter }}</span> {{ thread.title }}</p></div>
    <div class="card">
      <div v-for="(p, i) in thread.posts" :key="i" class="row" style="align-items:flex-start;padding:12px 0;border-bottom:1px solid var(--line);">
        <div class="avatar">{{ p.author.slice(0, 1) }}</div>
        <div style="flex:1;"><b style="font-size:13px;">{{ p.author }}</b><p class="muted" style="font-size:13px;margin-top:4px;">{{ p.content }}</p>
          <div v-if="p.ok" class="row" style="margin-top:8px;"><span class="badge green">正常回复</span></div>
          <div v-else-if="p.bad" class="row" style="margin-top:8px;"><span class="badge red">违规</span></div>
        </div>
      </div>
    </div>
    <div class="row" style="margin-top:16px;justify-content:flex-end;"><router-link class="btn ghost" to="/admin/discussion">← 返回列表</router-link><button class="btn danger">删除违规回复</button><button class="btn primary">标记已解决</button></div>
  </div>
</template>