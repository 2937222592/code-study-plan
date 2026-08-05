<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../../../api/client'
import Badge from '../../../components/ui/Badge.vue'

const list = ref([])
onMounted(async () => { list.value = await request('/admin/discussion') })
const stColor = (s) => ({ 已解决: 'green', 待处理: 'orange' }[s] || 'gray')
</script>

<template>
  <div class="page-head"><h1>讨论区管理 <span class="badge orange">3 条待处理</span></h1><p>按章节聚合的讨论区 · 置顶 / 删除 / 禁言</p></div>
  <div class="card">
    <div class="table-wrap">
      <table>
        <thead><tr><th>帖子</th><th>章节</th><th>作者</th><th>回复</th><th>状态</th><th style="text-align:right;">操作</th></tr></thead>
        <tbody>
          <tr v-for="d in list" :key="d.id">
            <td><div class="name">{{ d.title }}</div><div class="sub">2 小时前</div></td>
            <td><span class="badge gray">{{ d.chapter }}</span></td>
            <td><span style="font-size:13px;">{{ d.author }}</span></td>
            <td class="muted">{{ d.replies }}</td>
            <td><Badge :color="stColor(d.status)" :text="d.status" /></td>
            <td style="text-align:right;"><router-link class="btn ghost sm" to="/admin/discussion/thread">查看</router-link><button class="btn ghost sm">置顶</button><button class="btn ghost sm">删除</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>