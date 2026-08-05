<script setup>
import AuthLayout from '../../layouts/AuthLayout.vue'
</script>

<template>
  <AuthLayout>
    <div class="card auth-card">
      <h3 style="font-size:20px;margin-bottom:12px;">忘记密码</h3>
      <p class="muted" style="font-size:13px;margin-bottom:18px;">v1 暂不开放自助找回：请通过邮件联系管理员协助重置（admin@techpath.cn）。</p>
      <div class="field"><div class="label">你的邮箱</div><input class="input" type="email" placeholder="you@example.com"></div>
      <router-link class="btn ghost block" to="/login">返回登录</router-link>
    </div>
  </AuthLayout>
</template>