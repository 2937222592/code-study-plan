<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const topMenus = [
  { path: '/admin/dashboard', icon: '📊', label: '数据概览' },
  { path: '/admin/content', icon: '🗂', label: '内容管理' },
  { path: '/admin/courseware', icon: '📚', label: '课件管理' },
  { path: '/admin/discussion', icon: '💬', label: '讨论区管理', badge: 3 },
  { path: '/admin/complaints', icon: '🚩', label: '课件投诉', badge: 1 },
]
const sysMenus = [
  { path: '/admin/users', icon: '👥', label: '用户管理' },
  { path: '/admin/roles', icon: '🛡️', label: '角色管理' },
  { path: '/admin/menus', icon: '📑', label: '菜单管理' },
  { path: '/admin/settings', icon: '⚙️', label: '系统设置' },
  { path: '/admin/logs', icon: '🧾', label: '操作日志' },
]
const allMenus = [...topMenus, ...sysMenus]
const isActive = (path) => route.path === path || route.path.startsWith(path + '/')
const current = computed(() => allMenus.find((m) => isActive(m.path)))
const crumb = computed(() => (current.value ? current.value.label : '管理后台'))
const avatarText = computed(() => (auth.user?.nickname || '管').slice(0, 1))

function logout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="bg"><div class="blob a"></div><div class="blob b"></div><div class="grid"></div></div>
  <div class="admin">
    <aside class="side">
      <div class="logo"><span style="font-size:20px;">🧭</span> Tech<em>Path</em></div>
      <router-link v-for="m in topMenus" :key="m.path" :to="m.path" class="nav-item" :class="{ on: isActive(m.path) }">
        {{ m.icon }} {{ m.label }}<span v-if="m.badge" class="cnt">{{ m.badge }}</span>
      </router-link>
      <div class="grp">系统管理</div>
      <router-link v-for="m in sysMenus" :key="m.path" :to="m.path" class="nav-item" :class="{ on: isActive(m.path) }">
        {{ m.icon }} {{ m.label }}
      </router-link>
      <div class="foot">
        <div class="avatar">{{ avatarText }}</div>
        <div style="min-width:0;"><b style="font-size:13px;">{{ auth.user?.nickname || '管理员' }}</b><br><span class="faint" style="font-size:11px;">{{ auth.user?.email || 'admin@techpath.cn' }}</span></div>
        <span style="margin-left:auto;cursor:pointer;color:var(--text-faint);" title="退出登录" @click="logout">⎋</span>
      </div>
    </aside>
    <div class="main">
      <header class="topbar">
        <div class="crumb">系统管理 / <b>{{ crumb }}</b></div>
        <div style="margin-left:auto;" class="row">
          <input class="input" style="width:200px;" placeholder="搜索…">
          <div class="avatar">{{ avatarText }}</div>
        </div>
      </header>
      <div class="content"><router-view /></div>
    </div>
  </div>
</template>