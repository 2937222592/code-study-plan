<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../../../api/client'
import Badge from '../../../components/ui/Badge.vue'

const list = ref([])
onMounted(async () => { list.value = await request('/admin/complaints') })
const stColor = (s) => (s.startsWith('待') ? 'orange' : 'green')
</script>

<template>
  <div class="page-head"><h1>课件投诉管理 <span class="badge red">⏱ 1 条待处理 · 需 24h 内响应</span></h1><p>所有课件必须标注来源；有效投诉 24h 内处理</p></div>
  <div class="card">
    <div class="table-wrap">
      <table>
        <thead><tr><th>课件</th><th>投诉人</th><th>理由</th><th>时间</th><th>状态</th><th style="text-align:right;">操作</th></tr></thead>
        <tbody>
          <tr v-for="c in list" :key="c.id">
            <td><div class="name">{{ c.courseware }}</div><div class="sub">来源：{{ c.source }}</div></td>
            <td class="muted">{{ c.user }}</td>
            <td class="muted" style="font-size:12.5px;">{{ c.reason }}</td>
            <td class="muted">{{ c.time }}</td>
            <td><Badge :color="stColor(c.status)" :text="c.status" /></td>
            <td style="text-align:right;"><router-link class="btn ghost sm" to="/admin/complaints/detail">{{ c.status.startsWith('待') ? '处理' : '查看' }}</router-link></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>