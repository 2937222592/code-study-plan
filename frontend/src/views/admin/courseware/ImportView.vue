<script setup>
import Seg from '../../../components/ui/Seg.vue'
</script>
<template>
  <div class="page-head"><h1>导入课件（Markdown）</h1><p>按规范分隔章节与页面，导入后进入章节管理微调</p></div>
  <div class="card">
    <div style="border:2px dashed var(--line-strong);border-radius:14px;padding:44px 20px;text-align:center;background:var(--card-soft);">
      <div style="font-size:40px;">⬆</div>
      <b style="font-size:15px;">拖拽 Markdown 文件到此处，或点击选择</b>
      <p class="muted" style="font-size:12.5px;margin-top:6px;">支持 .md · 单个文件 ≤ 5MB</p>
    </div>
    <div class="form-grid" style="margin-top:16px;">
      <div><label class="label">导入到技能</label><Seg :options="['OpenAI 兼容 API 调用','Prompt 工程基础']" model-value="OpenAI 兼容 API 调用" /></div>
      <div><label class="label">课件标题</label><input class="input" value="API 调用实战"></div>
    </div>
    <div class="card" style="margin-top:16px;background:var(--card-soft);box-shadow:none;">
      <div class="spread"><b style="font-size:13px;">格式规范</b><a class="muted" style="font-size:12px;" href="#">下载模板 →</a></div>
      <div class="muted" style="font-size:12.5px;margin-top:8px;line-height:2;">
        <code># 第 1 章 章节标题</code> 开始新章节<br>
        <code>## 页面标题</code> 开始新页面<br>
        <code>```python ... ```</code> 代码块；正文与代码之间空一行
      </div>
    </div>
    <div class="row" style="margin-top:16px;justify-content:flex-end;"><router-link class="btn ghost" to="/admin/courseware">取消</router-link><button class="btn primary">导入并预览</button></div>
  </div>
</template>