<template>
  <div class="bg"><div class="blob a"></div><div class="blob b"></div><div class="grid"></div></div>
  <div class="auth-wrap">
    <div class="auth-brand">
      <div class="logo"><span style="font-size:26px;">🧭</span> Tech<em>Path</em></div>
      <h1>把学习变成<br>看得见的<span class="grad">成长</span></h1>
      <p>为编程初学者打造的「学习陪跑系统」——路线、计划、精选资料、课件互动，还有随时在身边的 AI 助教。</p>
      <div class="auth-feats">
        <div class="auth-feat"><div class="ic">🗺</div><div><b>确定的学习路线</b><br><span>AI 应用开发 · 7 阶段 · 37 技能</span></div></div>
        <div class="auth-feat"><div class="ic">📚</div><div><b>课件 + 笔记 + 讨论</b><br><span>看视频配课件，标注笔记，章节内交流</span></div></div>
        <div class="auth-feat"><div class="ic">🤖</div><div><b>AI 学习助教</b><br><span>知道你在学什么，卡住随时问</span></div></div>
      </div>
    </div>
    <slot />
  </div>
</template>