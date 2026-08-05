<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import AuthLayout from '../../layouts/AuthLayout.vue'

const router = useRouter()
const auth = useAuthStore()
const form = ref({ nickname: '', email: '', password: '', confirm: '' })
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  if (!form.value.nickname || !form.value.email || !form.value.password) return (error.value = '请填写完整信息')
  if (form.value.password.length < 8) return (error.value = '密码至少 8 位')
  if (form.value.password !== form.value.confirm) return (error.value = '两次密码不一致')
  loading.value = true
  try {
    await auth.register(form.value)
    router.push('/admin/dashboard')
  } catch (e) {
    error.value = e.message || '注册失败'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthLayout>
    <div class="card auth-card">
      <h3 style="font-size:20px;margin-bottom:20px;">创建账号</h3>
      <div class="field"><div class="label">昵称</div><input v-model="form.nickname" class="input" placeholder="给自己起个名字"></div>
      <div class="field"><div class="label">邮箱</div><input v-model="form.email" class="input" type="email" placeholder="you@example.com"></div>
      <div class="field"><div class="label">密码</div><input v-model="form.password" class="input" type="password" placeholder="至少 8 位"></div>
      <div class="field"><div class="label">确认密码</div><input v-model="form.confirm" class="input" type="password" placeholder="再次输入密码"></div>
      <p v-if="error" class="badge red" style="margin-bottom:12px;">{{ error }}</p>
      <div class="agree" style="margin-bottom:18px;"><input type="checkbox"> <span>我已阅读并同意《用户协议》与《隐私政策》</span></div>
      <button class="btn primary block" :disabled="loading" @click="submit">{{ loading ? '创建中…' : '创建账号' }}</button>
      <p class="muted" style="font-size:12.5px;text-align:center;margin-top:16px;">已有账号？<router-link to="/login">去登录</router-link></p>
    </div>
  </AuthLayout>
</template>