<script setup>
import { reactive } from 'vue'
const faqs = reactive([
  { q: '为什么输出不稳定？', a: '模型是概率采样，温度越高随机性越大；可降低 temperature 或增加示例约束输出格式。' },
  { q: 'Token 超了怎么办？', a: '压缩上下文：精简历史、只保留关键信息，或使用更大的上下文窗口。' },
])
</script>
<template>
  <div class="page-head"><h1>编辑 FAQ <span class="badge gray">OpenAI 兼容 API 调用</span></h1><p>FAQ 同时是 AI 助教的知识库</p></div>
  <div class="card">
    <div v-for="(f, i) in faqs" :key="i" style="border-bottom:1px solid var(--line);padding-bottom:12px;margin-bottom:12px;">
      <div class="row"><input v-model="f.q" class="input" placeholder="问题"><button class="btn ghost sm" @click="faqs.splice(i, 1)">删除</button></div>
      <textarea v-model="f.a" class="input" rows="2" style="margin-top:8px;"></textarea>
    </div>
    <button class="btn ghost sm" @click="faqs.push({ q: '', a: '' })">＋ 添加问题</button>
  </div>
  <div class="row" style="margin-top:16px;justify-content:flex-end;"><router-link class="btn ghost" to="/admin/content/skill-edit">返回技能</router-link><button class="btn primary">保存 FAQ</button></div>
</template>