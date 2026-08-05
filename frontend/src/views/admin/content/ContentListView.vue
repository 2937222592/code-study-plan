<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../../../api/client'
import Badge from '../../../components/ui/Badge.vue'

const tree = ref(null)
const skills = ref([])
onMounted(async () => {
  tree.value = await request('/admin/content/tree')
  skills.value = await request('/admin/content/skills')
})
const lv = (l) => ({ 核心: 'blue', 进阶: 'orange' }[l] || 'gray')
const st = (s) => (s === '已启用' ? 'green' : 'gray')
const cp = (c) => (c === '5/5' ? 'green' : 'orange')
</script>

<template>
  <div class="page-head"><h1>内容管理 <span class="badge blue">{{ tree?.role }}</span></h1><p>岗位 → 阶段 → 技能 → 五件套（概念卡 / 资源 / 课件 / 小任务 / FAQ）</p></div>
  <div v-if="tree" style="display:grid;grid-template-columns:260px 1fr;gap:14px;">
    <div class="card" style="padding:14px;">
      <div class="spread" style="margin-bottom:8px;"><b style="font-size:13px;">内容树</b><span class="badge gray">7 阶段</span></div>
      <ul class="tree">
        <li><span class="arrow">▾</span> {{ tree.role }} <span class="n">37</span></li>
        <li><ul>
          <li v-for="s in tree.stages" :key="s.id" :class="{ on: s.active }">
            {{ s.active ? '▾' : '▸' }} {{ s.title }} <span class="n">{{ s.count }}</span>
            <ul v-if="s.skills">
              <li v-for="k in s.skills" :key="k" :style="k === 'OpenAI 兼容 API 调用' ? 'color:var(--accent);font-weight:600;' : ''">{{ k }}</li>
            </ul>
          </li>
        </ul></li>
      </ul>
    </div>
    <div style="display:grid;gap:14px;align-content:start;">
      <div class="card">
        <div class="spread"><h3>技能列表 · S2 大模型 API 与 Prompt</h3><router-link class="btn primary sm" to="/admin/content/skill-edit">＋ 新增技能</router-link></div>
        <div class="table-wrap" style="margin-top:12px;">
          <table>
            <thead><tr><th>技能</th><th>难度</th><th>五件套</th><th>状态</th><th style="text-align:right;">操作</th></tr></thead>
            <tbody>
              <tr v-for="s in skills" :key="s.id">
                <td><div class="name">{{ s.name }}</div><div class="sub">{{ s.desc }}</div></td>
                <td><Badge :color="lv(s.level)" :text="s.level" /></td>
                <td><Badge :color="cp(s.complete)" :text="s.complete" /></td>
                <td><Badge :color="st(s.status)" :text="s.status" /></td>
                <td style="text-align:right;"><router-link class="btn ghost sm" to="/admin/content/skill-edit">编辑</router-link></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>