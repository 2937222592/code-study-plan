<script setup>
import Seg from '../../../components/ui/Seg.vue'
</script>
<template>
  <div class="page-head"><h1>编辑课件页 <span class="badge gray">第 2 章 · 请求与鉴权</span></h1><p>页面内容支持图文与代码</p></div>
  <div class="card">
    <div class="form-grid">
      <div><label class="label">所属章节</label><Seg :options="['第 1 章 认识 API','第 2 章 请求与鉴权']" model-value="第 2 章 请求与鉴权" /></div>
      <div><label class="label">排序</label><input class="input" type="number" value="2"></div>
      <div class="full"><label class="label">页面标题</label><input class="input" value="Bearer 鉴权示例"></div>
      <div class="full"><label class="label">正文</label><textarea class="input" rows="6">在请求头中携带 Authorization: Bearer &lt;API Key&gt; 进行身份验证……</textarea></div>
      <div class="full"><label class="label">代码示例（可选）</label><textarea class="input" rows="5">headers = { "Authorization": "Bearer " + api_key }</textarea></div>
    </div>
  </div>
  <div class="row" style="margin-top:16px;justify-content:flex-end;"><router-link class="btn ghost" to="/admin/courseware/chapters">返回章节</router-link><button class="btn ghost">预览</button><button class="btn primary">保存页面</button></div>
</template>