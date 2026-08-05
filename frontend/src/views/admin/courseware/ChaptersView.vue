<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../../../api/client'
import Seg from '../../../components/ui/Seg.vue'

const cw = ref(null)
onMounted(async () => { cw.value = await request('/admin/courseware/1') })
</script>

<template>
  <div v-if="cw">
    <div class="page-head"><h1>课件「{{ cw.name }}」<span class="badge green">B站开源 · 已标注</span></h1><p>章节对应视频分段 · 每章一个讨论区</p></div>
    <div class="card">
      <div class="form-grid" style="margin-bottom:14px;">
        <div><label class="label">来源类型</label><Seg :options="['B站开源','平台自制']" model-value="B站开源" /></div>
        <div><label class="label">原视频 / 来源链接</label><input class="input" :value="cw.sourceUrl"></div>
        <div class="full"><label class="label">来源创作者 / 授权说明</label><input class="input" :value="cw.sourceNote"></div>
      </div>
      <div class="spread" style="border-top:1px solid var(--line);padding-top:14px;"><h3>章节与页面</h3><button class="btn ghost sm">＋ 新增章节</button></div>
      <div style="margin-top:8px;">
        <div v-for="ch in cw.chapters" :key="ch.id" class="row" style="padding:10px 0;border-bottom:1px solid var(--line);">
          <span class="badge blue">{{ ch.title }}</span><span class="faint" style="font-size:12px;">{{ ch.pages }} 页</span>
          <span style="margin-left:auto;"><router-link class="btn ghost sm" to="/admin/courseware/slide-edit">页面</router-link><button class="btn ghost sm">编辑</button><button class="btn ghost sm">删除</button></span>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top:14px;">
      <h3>页面列表（第 2 章）</h3>
      <div class="table-wrap" style="margin-top:10px;">
        <table>
          <thead><tr><th>页</th><th>标题</th><th>内容类型</th><th style="text-align:right;">操作</th></tr></thead>
          <tbody>
            <tr v-for="(s, i) in cw.chapters[1].slides" :key="i">
              <td class="muted">{{ i + 1 }}</td><td><div class="name">{{ s }}</div></td>
              <td><span class="badge gray">图文</span></td>
              <td style="text-align:right;"><router-link class="btn ghost sm" to="/admin/courseware/slide-edit">编辑</router-link></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row" style="margin-top:12px;"><router-link class="btn ghost sm" to="/admin/courseware/slide-edit">＋ 新增页面</router-link></div>
    </div>
  </div>
</template>