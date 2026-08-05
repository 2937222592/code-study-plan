<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../../../../api/client'

const list = ref([])
onMounted(async () => { list.value = await request('/admin/menus') })
</script>

<template>
  <div class="page-head"><h1>菜单管理 <span class="badge blue">11 项</span></h1><p>配置后台左侧目录：目录 / 菜单 / 按钮 三级</p></div>
  <div class="card">
    <div class="table-wrap">
      <table>
        <thead><tr><th>菜单名称</th><th>类型</th><th>图标</th><th>路由</th><th>排序</th><th>状态</th><th style="text-align:right;">操作</th></tr></thead>
        <tbody>
          <template v-for="m in list" :key="m.id">
            <tr>
              <td><div class="name">{{ m.name }}</div></td>
              <td><span class="badge" :class="m.type === '目录' ? 'blue' : 'gray'">{{ m.type }}</span></td>
              <td class="muted">{{ m.icon }}</td>
              <td class="muted">{{ m.route }}</td>
              <td class="muted">{{ m.sort }}</td>
              <td><span class="badge green">显示</span></td>
              <td style="text-align:right;"><router-link class="btn ghost sm" to="/admin/menus/edit">编辑</router-link></td>
            </tr>
            <tr v-for="c in m.children || []" :key="c.id">
              <td style="padding-left:34px;"><div class="name">{{ c.name }}</div></td>
              <td><span class="badge gray">{{ c.type }}</span></td>
              <td class="muted">{{ c.icon }}</td>
              <td class="muted">{{ c.route }}</td>
              <td class="muted">{{ c.sort }}</td>
              <td><span class="badge green">显示</span></td>
              <td style="text-align:right;"><router-link class="btn ghost sm" to="/admin/menus/edit">编辑</router-link></td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="row" style="margin-top:14px;justify-content:flex-end;"><router-link class="btn primary sm" to="/admin/menus/edit">＋ 新增菜单</router-link></div>
  </div>
</template>