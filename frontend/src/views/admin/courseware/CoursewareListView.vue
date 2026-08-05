<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../../../api/client'
import Badge from '../../../components/ui/Badge.vue'

const list = ref([])
onMounted(async () => { list.value = await request('/admin/courseware') })
const srcColor = (s) => (s.startsWith('B站') ? 'green' : 'orange')
const stColor = (s) => (s === '已发布' ? 'green' : 'gray')
</script>

<template>
  <div class="page-head"><h1>课件管理 <span class="badge blue">28/37 技能已配课件</span></h1><p>课件 → 章节 → 页面；来源：B站开源优先，缺失则自制</p></div>
  <div class="card">
    <div class="table-wrap">
      <table>
        <thead><tr><th>课件</th><th>关联技能</th><th>章节/页数</th><th>来源</th><th>状态</th><th style="text-align:right;">操作</th></tr></thead>
        <tbody>
          <tr v-for="c in list" :key="c.id">
            <td><div class="name">{{ c.name }}</div><div class="sub">{{ c.skill }}</div></td>
            <td><span class="badge gray">{{ c.stage }}</span></td>
            <td class="muted">{{ c.pages }}</td>
            <td><Badge :color="srcColor(c.source)" :text="c.source" /></td>
            <td><Badge :color="stColor(c.status)" :text="c.status" /></td>
            <td style="text-align:right;"><router-link class="btn ghost sm" to="/admin/courseware/chapters">章节</router-link><router-link class="btn ghost sm" to="/admin/courseware/chapters">编辑</router-link></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row" style="margin-top:14px;justify-content:flex-end;"><router-link class="btn ghost sm" to="/admin/courseware/import">⬆ 导入 Markdown</router-link><button class="btn primary sm">＋ 新增课件</button></div>
  </div>
</template>