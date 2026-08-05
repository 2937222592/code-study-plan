<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../../../../api/client'
import Seg from '../../../../components/ui/Seg.vue'
import Switch from '../../../../components/ui/Switch.vue'

const menu = ref(null)
const show = ref(true)
onMounted(async () => { menu.value = await request('/admin/menus/62') })
</script>

<template>
  <div v-if="menu">
    <div class="page-head"><h1>编辑菜单 <span class="badge gray">{{ menu.name }}</span></h1><p>目录 / 菜单 / 按钮 三级配置</p></div>
    <div class="card">
      <div class="form-grid">
        <div><label class="label">上级菜单</label><input class="input" :value="menu.parent"></div>
        <div><label class="label">菜单类型</label><Seg :options="['目录','菜单','按钮']" model-value="菜单" /></div>
        <div><label class="label">菜单名称</label><input class="input" :value="menu.name"></div>
        <div><label class="label">路由地址</label><input class="input" :value="menu.route"></div>
        <div><label class="label">图标</label><input class="input" :value="menu.icon"></div>
        <div><label class="label">排序</label><input class="input" type="number" :value="menu.sort"></div>
        <div><label class="label">显示状态</label><div class="row"><Switch v-model="show" /><span class="muted" style="font-size:13px;">{{ show ? '显示' : '隐藏' }}</span></div></div>
        <div><label class="label">组件路径（菜单）</label><input class="input" :value="menu.component"></div>
      </div>
    </div>
    <div class="row" style="margin-top:16px;justify-content:flex-end;"><router-link class="btn ghost" to="/admin/menus">取消</router-link><button class="btn primary">保存菜单</button></div>
  </div>
</template>