<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import AuthLayout from '../../layouts/AuthLayout.vue'

const router = useRouter()
const auth = useAuthStore()
const email = ref('demo@techpath.cn')
const password = ref('12345678')
const loading = ref(false)
const error = ref('')

async function submit() {
  loading.value = true
  error.value = ''
  try {
    await auth.login(email.value, password.value)
    router.push('/admin/dashboard')
  } catch (e) {
    error.value = e.message || '登录失败'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthLayout>
    <div class="card auth-card">
      <h3 style="font-size:20px;margin-bottom:20px;">登录 TechPath</h3>
      <div class="field"><div class="label">邮箱</div><input v-model="email" class="input" type="email" placeholder="you@example.com"></div>
      <div class="field">
        <div class="label-row"><span class="label" style="margin:0;">密码</span><router-link class="link muted" to="/forgot">忘记密码？</router-link></div>
        <input v-model="password" class="input" type="password" placeholder="输入密码">
      </div>
      <p v-if="error" class="badge red" style="margin-bottom:12px;">{{ error }}</p>
      <div class="agree" style="margin-bottom:18px;"><input type="checkbox" checked> <span>保持登录状态</span></div>
      <button class="btn primary block" :disabled="loading" @click="submit">{{ loading ? '登录中…' : '登 录' }}</button>
      <p class="muted" style="font-size:12.5px;text-align:center;margin-top:16px;">还没有账号？<router-link to="/register">去注册</router-link></p>
      <p class="faint" style="font-size:12px;text-align:center;margin-top:8px;">演示账号：任意邮箱 + 密码（Mock 模式）</p>
    </div>
  </AuthLayout>
</template>