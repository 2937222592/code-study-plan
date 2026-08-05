<script setup>
import Seg from '../../../components/ui/Seg.vue'
</script>
<template>
  <div class="page-head"><h1>编辑精选资源 <span class="badge gray">OpenAI 兼容 API 调用</span></h1><p>外部视频 / 文档；资源需关联课件以保留学习沉淀</p></div>
  <div class="card">
    <div class="form-grid">
      <div><label class="label">资源类型</label><Seg :options="['视频','官方文档','图文教程']" model-value="视频" /></div>
      <div><label class="label">标题</label><input class="input" value="B站：《大模型 API 调用入门》"></div>
      <div class="full"><label class="label">链接</label><input class="input" value="https://www.bilibili.com/video/BVxxxxxx"></div>
      <div><label class="label">时长（视频）</label><input class="input" placeholder="45 分钟"></div>
      <div><label class="label">难度</label><Seg :options="['入门','进阶','高级']" model-value="入门" /></div>
      <div class="full"><label class="label">推荐理由</label><input class="input" value="用 45 分钟讲清 API 调用全过程，只看 00:00-20:00 即可"></div>
      <div class="full"><label class="label">关联课件</label><input class="input" value="API 调用实战（可留空：无课件则仅外部观看）"></div>
    </div>
  </div>
  <div class="row" style="margin-top:16px;justify-content:flex-end;"><router-link class="btn ghost" to="/admin/content/skill-edit">返回技能</router-link><button class="btn primary">保存资源</button></div>
</template>