<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../../../../api/client'
import Switch from '../../../../components/ui/Switch.vue'

const role = ref(null)
onMounted(async () => { role.value = await request('/admin/roles/2') })
</script>

<template>
  <div v-if="role">
    <div class="page-head"><h1>编辑角色 <span class="badge gray">{{ role.name }}</span></h1><p>基础信息 + 权限配置（勾选模块与操作）</p></div>
    <div class="card">
      <div class="form-grid">
        <div><label class="label">角色名称</label><input class="input" :value="role.name"></div>
        <div><label class="label">角色标识</label><input class="input" :value="role.key"></div>
        <div><label class="label">状态</label><div class="row"><Switch v-model="role.status" /><span class="muted" style="font-size:13px;">{{ role.status ? '启用' : '禁用' }}</span></div></div>
        <div><label class="label">备注</label><input class="input" :value="role.remark"></div>
      </div>
    </div>
    <div class="card" style="margin-top:14px;">
      <div class="spread"><h3>权限配置</h3><span class="badge gray">勾选可访问的模块与操作</span></div>
      <div style="margin-top:12px;display:grid;gap:6px;font-size:13.5px;">
        <div v-for="p in role.perms" :key="p.module">
          <label><input type="checkbox" v-model="p.on"> {{ p.module }}</label>
          <div v-if="p.ops" style="padding-left:26px;color:var(--text-dim);font-size:13px;">
            <label v-for="o in p.ops" :key="o" style="margin-right:10px;"><input type="checkbox" checked> {{ o }}</label>
          </div>
        </div>
      </div>
    </div>
    <div class="row" style="margin-top:16px;justify-content:flex-end;"><router-link class="btn ghost" to="/admin/roles">取消</router-link><button class="btn primary">保存角色</button></div>
  </div>
</template>