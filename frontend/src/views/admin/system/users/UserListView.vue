<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../../../../api/client'
import Badge from '../../../../components/ui/Badge.vue'

const list = ref([])
onMounted(async () => { list.value = await request('/admin/users') })
const roleColor = (r) => (r === '管理员' ? 'blue' : 'gray')
const stColor = (s) => (s === '正常' ? 'green' : 'red')
</script>

<template>
  <div class="page-head"><h1>用户管理 <span class="badge blue">1,286 人</span></h1><p>查看与治理用户；禁用后无法登录，学习数据保留</p></div>
  <div class="card">
    <div class="table-wrap">
      <table>
        <thead><tr><th>用户</th><th>邮箱</th><th>角色</th><th>进度</th><th>连续打卡</th><th>状态</th><th style="text-align:right;">操作</th></tr></thead>
        <tbody>
          <tr v-for="u in list" :key="u.id">
            <td><div class="row"><div class="avatar">{{ u.nickname.slice(0, 1) }}</div><div><div class="name">{{ u.nickname }}</div><div class="sub">UID {{ u.id }}</div></div></div></td>
            <td class="muted">{{ u.email }}</td>
            <td><Badge :color="roleColor(u.role)" :text="u.role" /></td>
            <td><div style="width:90px;"><div class="prog"><i :style="{ width: (u.progress || 0) + '%' }"></i></div></div></td>
            <td class="muted">{{ u.streak ? '🔥 ' + u.streak + ' 天' : '—' }}</td>
            <td><Badge :color="stColor(u.status)" :text="u.status" /></td>
            <td style="text-align:right;"><router-link class="btn ghost sm" to="/admin/users/detail">详情</router-link><button class="btn ghost sm">{{ u.status === '正常' ? '禁用' : '启用' }}</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>