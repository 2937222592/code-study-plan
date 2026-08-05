<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../../../../api/client'
import Badge from '../../../../components/ui/Badge.vue'

const list = ref([])
onMounted(async () => { list.value = await request('/admin/roles') })
</script>

<template>
  <div class="page-head"><h1>角色管理 <span class="badge blue">4 个角色</span></h1><p>角色决定后台可见模块与操作权限；系统内置角色不可删除</p></div>
  <div class="card">
    <div class="table-wrap">
      <table>
        <thead><tr><th>角色名称</th><th>角色标识</th><th>用户数</th><th>权限范围</th><th>状态</th><th style="text-align:right;">操作</th></tr></thead>
        <tbody>
          <tr v-for="r in list" :key="r.id">
            <td><div class="name">{{ r.name }}</div><div v-if="r.builtin" class="sub">内置 · 不可删除</div></td>
            <td class="muted">{{ r.key }}</td>
            <td class="muted">{{ r.users }}</td>
            <td><span class="badge" :class="r.scope === '全部' ? 'blue' : 'gray'">{{ r.scope }}</span></td>
            <td><Badge :color="r.status === '启用' ? 'green' : 'red'" :text="r.status" /></td>
            <td style="text-align:right;"><router-link class="btn ghost sm" to="/admin/roles/edit">编辑</router-link><button v-if="!r.builtin" class="btn ghost sm">删除</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row" style="margin-top:14px;justify-content:flex-end;"><router-link class="btn primary sm" to="/admin/roles/edit">＋ 新增角色</router-link></div>
  </div>
</template>