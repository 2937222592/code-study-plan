/* ============ TechPath 应用逻辑 ============ */
const STORAGE_KEY = "techpath_progress_v1";
const ACTIVE_KEY = "techpath_active_role_v1";
const RING_C = 376.99;

const state = {
  activeId: localStorage.getItem(ACTIVE_KEY) || ROLES[0].id,
  progress: loadProgress(),
  prevStageDone: {},   // 记录切换前各阶段完成数，用于触发完成彩带
};

function loadProgress() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return raw && typeof raw === "object" ? raw : {};
  } catch { return {}; }
}
function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}
function getRole(id) { return ROLES.find(r => r.id === id); }
function skillKey(roleId, sIdx, kIdx) { return roleId + ":" + sIdx + ":" + kIdx; }
function isDone(roleId, sIdx, kIdx) { return !!state.progress[skillKey(roleId, sIdx, kIdx)]; }

function getStats(role) {
  let total = 0, done = 0;
  role.stages.forEach((st, si) => {
    st.skills.forEach((_, ki) => {
      total++;
      if (isDone(role.id, si, ki)) done++;
    });
  });
  return { total, done, pct: total ? Math.round(done / total * 100) : 0 };
}

function getStageStats(role, si) {
  const stage = role.stages[si];
  let total = stage.skills.length, done = 0;
  stage.skills.forEach((_, ki) => { if (isDone(role.id, si, ki)) done++; });
  return { total, done, pct: total ? Math.round(done / total * 100) : 0 };
}

/* ---------- 渲染 ---------- */
function applyTheme(role) {
  const root = document.documentElement;
  root.style.setProperty("--accent", role.accent);
  root.style.setProperty("--accent-2", shiftHue(role.accent, 38));
  document.title = role.name + "工程师路线 · TechPath";
}

/* 把主题色往邻近色相偏移，生成第二个强调色 */
function shiftHue(hex, deg) {
  const m = hex.match(/^#?([0-9a-f]{6})$/i);
  if (!m) return "#a78bfa";
  let n = parseInt(m[1], 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
      case g: h = ((b - r) / d + 2); break;
      default: h = ((r - g) / d + 4);
    }
    h *= 60;
  }
  h = (h + deg) % 360;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const mm = l - c / 2;
  let rr, gg, bb;
  if (h < 60) { rr = c; gg = x; bb = 0; }
  else if (h < 120) { rr = x; gg = c; bb = 0; }
  else if (h < 180) { rr = 0; gg = c; bb = x; }
  else if (h < 240) { rr = 0; gg = x; bb = c; }
  else if (h < 300) { rr = x; gg = 0; bb = c; }
  else { rr = c; gg = 0; bb = x; }
  const to = v => Math.round((v + mm) * 255).toString(16).padStart(2, "0");
  return "#" + to(rr) + to(gg) + to(bb);
}

function renderRoleNav() {
  const nav = document.getElementById("roleNav");
  nav.innerHTML = ROLES.map(role => {
    const stats = getStats(role);
    const active = role.id === state.activeId ? " active" : "";
    const doneMark = stats.done === stats.total && stats.total > 0 ? " ✅" : "";
    return `
      <button class="role-pill${active}" data-role="${role.id}" style="${active ? `--accent:${role.accent};--accent-2:${shiftHue(role.accent, 38)}` : ""}">
        <span class="rp-emoji">${role.emoji}</span>
        <span>${role.name}</span>
        <span class="rp-check">${doneMark}</span>
      </button>`;
  }).join("");
  nav.querySelectorAll(".role-pill").forEach(btn => {
    btn.addEventListener("click", () => switchRole(btn.dataset.role));
  });
}

function renderRoadmap() {
  const role = getRole(state.activeId);
  const wrap = document.getElementById("roadmap");
  state.prevStageDone = {};
  wrap.innerHTML = role.stages.map((stage, si) => {
    const st = getStageStats(role, si);
    state.prevStageDone[si] = st.done;
    const cls = st.done === st.total && st.total > 0 ? " completed" : "";
    const skills = stage.skills.map((sk, ki) => {
      const done = isDone(role.id, si, ki);
      const lvClass = "lv-" + sk.level;
      return `
        <button class="skill-card${done ? " done" : ""}" data-si="${si}" data-ki="${ki}" aria-pressed="${done}">
          <span class="skill-check"><svg viewBox="0 0 24 24"><path d="M4.5 12.5l5 5 10-11"/></svg></span>
          <span class="skill-body">
            <span class="skill-name">${sk.name}<span class="skill-level ${lvClass}">${sk.level}</span></span>
            <span class="skill-desc">${sk.desc}</span>
          </span>
        </button>`;
    }).join("");
    return `
      <article class="stage${cls}" data-si="${si}">
        <div class="stage-dot">${st.done === st.total && st.total > 0 ? "✓" : si + 1}</div>
        <div class="stage-head">
          <div class="stage-title-row">
            <h2 class="stage-title">${stage.title}</h2>
            <span class="stage-badge">✓ 阶段完成</span>
          </div>
          <div class="stage-progress">
            <span>${st.done}/${st.total}</span>
            <div class="bar"><i style="width:${st.pct}%"></i></div>
          </div>
        </div>
        <p class="stage-desc">${stage.description}</p>
        <div class="skills">${skills}</div>
      </article>`;
  }).join("");

  wrap.querySelectorAll(".skill-card").forEach(card => {
    card.addEventListener("click", () => toggleSkill(Number(card.dataset.si), Number(card.dataset.ki), card));
  });

  updateAllDone(role);
  renderHero(role);
}

function renderHero(role) {
  const stats = getStats(role);
  document.getElementById("heroEyebrow").textContent = "Career Roadmap · " + role.name;
  document.getElementById("heroGrad").textContent = role.name + "成长";
  document.getElementById("heroRolePill").textContent = role.emoji + " " + role.name;
  document.getElementById("heroStageCount").textContent = role.stages.length;
  const totalSkills = role.stages.reduce((n, s) => n + s.skills.length, 0);
  document.getElementById("heroSkillCount").textContent = totalSkills;
  updateProgressUI(role, stats);
}

function updateProgressUI(role, stats) {
  stats = stats || getStats(role);
  const ring = document.getElementById("ringProgress");
  ring.style.strokeDashoffset = RING_C * (1 - stats.pct / 100);
  document.getElementById("ringPct").textContent = stats.pct + "%";
  document.getElementById("miniFill").style.width = stats.pct + "%";
  document.getElementById("miniText").textContent = stats.pct + "%";
}

function updateStageUI(role, si) {
  const stageEl = document.querySelector(`.stage[data-si="${si}"]`);
  if (!stageEl) return;
  const st = getStageStats(role, si);
  stageEl.querySelector(".stage-progress span").textContent = st.done + "/" + st.total;
  stageEl.querySelector(".bar i").style.width = st.pct + "%";
  stageEl.classList.toggle("completed", st.done === st.total && st.total > 0);
}

function updateAllDone(role) {
  const stats = getStats(role);
  const box = document.getElementById("allDone");
  box.hidden = stats.done !== stats.total || stats.total === 0;
  document.getElementById("allDoneCount").textContent = stats.done;
  const stages = document.querySelectorAll(".stage");
  if (stats.done === stats.total && stats.total > 0) {
    stages.forEach(el => el.classList.add("completed"));
  }
  // 实时更新岗位按钮上的完成标记
  const pillCheck = document.querySelector(".role-pill.active .rp-check");
  if (pillCheck) {
    pillCheck.textContent = (stats.done === stats.total && stats.total > 0) ? " ✅" : "";
  }
}

/* ---------- 交互 ---------- */
function toggleSkill(si, ki, card) {
  const role = getRole(state.activeId);
  const key = skillKey(role.id, si, ki);
  const before = getStageStats(role, si).done;
  if (state.progress[key]) {
    delete state.progress[key];
    card.classList.remove("done");
    card.setAttribute("aria-pressed", "false");
  } else {
    state.progress[key] = true;
    card.classList.add("done");
    card.setAttribute("aria-pressed", "true");
    card.classList.remove("pop");
    void card.offsetWidth;   // 重启动画
    card.classList.add("pop");
  }
  saveProgress();

  const after = getStageStats(role, si).done;
  updateStageUI(role, si);
  updateProgressUI(role);
  updateAllDone(role);

  // 阶段刚完成 -> 撒花
  if (after === before + 1 && after === getStageStats(role, si).total && getStageStats(role, si).total > 0) {
    const dot = document.querySelector(`.stage[data-si="${si}"] .stage-dot`);
    if (dot) {
      const r = dot.getBoundingClientRect();
      burstConfetti(r.left + r.width / 2, r.top + r.height / 2, role.accent);
    }
  }
}

function switchRole(id) {
  if (id === state.activeId) return;
  state.activeId = id;
  localStorage.setItem(ACTIVE_KEY, id);
  applyTheme(getRole(id));
  renderRoleNav();
  renderRoadmap();
  const nav = document.getElementById("roleNav");
  nav.querySelector(`[data-role="${id}"]`)?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
}

/* ---------- 彩带 ---------- */
function burstConfetti(x, y, color) {
  const colors = [color, "#ffffff", "#ffd166", "#7ee0b8", "#93b4ff", "#f9a8d4"];
  for (let i = 0; i < 30; i++) {
    const el = document.createElement("div");
    el.className = "confetti";
    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 130;
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.background = colors[i % colors.length];
    el.style.width = (6 + Math.random() * 6) + "px";
    el.style.height = (8 + Math.random() * 8) + "px";
    el.style.setProperty("--dx", Math.cos(angle) * dist + "px");
    el.style.setProperty("--dy", (Math.sin(angle) * dist * 0.6 - 80) + "px");
    el.style.setProperty("--rot", (Math.random() * 720 - 360) + "deg");
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }
}

/* ---------- 重置弹窗 ---------- */
function openResetModal() {
  const mask = document.getElementById("modalMask");
  mask.hidden = false;
  document.getElementById("modalDesc").textContent =
    `将清除「${getRole(state.activeId).name}」路线下所有已打卡的技能，此操作不可撤销。`;
}
function closeResetModal() { document.getElementById("modalMask").hidden = true; }

function doReset() {
  const role = getRole(state.activeId);
  role.stages.forEach((st, si) => st.skills.forEach((_, ki) => delete state.progress[skillKey(role.id, si, ki)]));
  saveProgress();
  closeResetModal();
  renderRoadmap();
  renderRoleNav();
}

/* ---------- 启动 ---------- */
document.getElementById("btnReset").addEventListener("click", openResetModal);
document.getElementById("btnReset2").addEventListener("click", openResetModal);
document.getElementById("btnCancel").addEventListener("click", closeResetModal);
document.getElementById("btnConfirm").addEventListener("click", doReset);
document.getElementById("modalMask").addEventListener("click", e => {
  if (e.target === e.currentTarget) closeResetModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeResetModal();
});

applyTheme(getRole(state.activeId));
renderRoleNav();
renderRoadmap();