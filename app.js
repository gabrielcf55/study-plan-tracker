/* =====================================================================
   app.js — Motor de renderização e sincronização (ES module).
   Toda a UI é derivada de PLAN (plan.js); a lógica de progresso vem de
   progress.js. Eventos são tratados por delegação (sem handlers inline),
   o que permite um Content-Security-Policy estrito (script-src 'self').
   ===================================================================== */
import PLAN from './plan.js';
import {
  emptyStore, normalizeStore, taskId, gapId,
  computeTotals, phasePct, gapPct, currentPhase, estWeek,
} from './progress.js';
import { svg, planIcon, iconText } from './icons.js';

const $ = (id) => document.getElementById(id);
const STORAGE_KEY = 'cta_progress_v2';
const API = '/api/progress';
const PUSH_DEBOUNCE_MS = 600;

/* ---------- Estado ---------- */
let store = loadLocal();
let cloudOK = false;
let pushTimer = null;
let curPhase = 0;
let mockFilter = 'all';

function loadLocal() {
  try { return normalizeStore(JSON.parse(localStorage.getItem(STORAGE_KEY))); }
  catch { return emptyStore(); }
}
function setStat(cls, txt) {
  const e = $('syncStat');
  e.className = 'sync-stat' + (cls ? ' ' + cls : '');
  const icon = cls === 'ok' ? 'cloudCheck' : cls === 'saving' ? 'clock' : cls === 'err' ? 'cloudOff' : 'drive';
  e.innerHTML = svg(icon, { size: 15 }) + '<span class="sync-txt">' + txt + '</span>';
}

/* ---------- Persistência (local + nuvem) ---------- */
function save() {
  store.updated = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  if (cloudOK) {
    setStat('saving', 'Salvando…');
    clearTimeout(pushTimer);
    pushTimer = setTimeout(pushCloud, PUSH_DEBOUNCE_MS);
  }
}
async function pushCloud() {
  try {
    const r = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(store),
    });
    if (!r.ok) throw new Error('http ' + r.status);
    setStat('ok', 'Sincronizado');
  } catch { setStat('err', 'Offline'); }
}
async function initSync() {
  try {
    const r = await fetch(API, { headers: { Accept: 'application/json' } });
    if (!r.ok) throw new Error('http ' + r.status);
    const remote = normalizeStore(await r.json());
    cloudOK = true;
    if (remote.updated >= store.updated && remote.checked) {
      store = remote;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      renderAll();
    } else if (store.updated > remote.updated) {
      pushCloud();
    }
    setStat('ok', 'Sincronizado');
  } catch { cloudOK = false; setStat('', 'Local'); }
}

/* ---------- Mutações ---------- */
function toggle(id) {
  if (store.checked[id]) delete store.checked[id]; else store.checked[id] = 1;
  save(); renderAll();
}
function toggleMock(i) {
  if (store.mocks[i]) delete store.mocks[i]; else store.mocks[i] = 1;
  save(); renderMocks(); renderDash();
}
function setScore(i, v) {
  if (v) store.scores[i] = v; else delete store.scores[i];
  save();
}

/* ---------- Render: header ---------- */
function renderHeader() {
  $('hTag').textContent = PLAN.meta.tagline;
  $('hTitle').textContent = PLAN.meta.title;
  $('hSub').innerHTML = PLAN.meta.subtitle;
  document.title = PLAN.meta.title + ' — Plano de Estudo & Progresso';
}

/* ---------- Render: dashboard ---------- */
function renderDash() {
  const t = computeTotals(PLAN, store);
  const circ = 2 * Math.PI * 52;
  const ring = $('ring');
  ring.setAttribute('stroke-dasharray', circ.toFixed(1));
  ring.setAttribute('stroke-dashoffset', (circ * (1 - t.pct / 100)).toFixed(1));
  $('ringNum').textContent = t.pct + '%';

  const cp = currentPhase(PLAN, store);
  const p = PLAN.phases[cp];
  $('nowPhase').textContent = `Fase 0${cp} · ${p.name}`;
  $('nowMeta').innerHTML = `${p.weeks} · ${phasePct(PLAN, store, cp)}% desta fase concluído<br>${p.goal}`;
  $('cDone').textContent = t.done;
  $('cLeft').textContent = t.total - t.done;
  $('cMocks').textContent = `${t.mocksDone}/${PLAN.mocks.length}`;
  $('cWeek').textContent = '~' + estWeek(PLAN, store);

  const next = [];
  p.tasks.forEach((tx, i) => {
    const id = taskId(cp, i);
    if (!store.checked[id] && next.length < 4) next.push({ id, tx });
  });
  $('nextItems').innerHTML = next.length
    ? next.map((n) =>
        `<label class="next-item"><input type="checkbox" class="chk" data-toggle="${n.id}"><span class="txt">${n.tx}</span></label>`).join('')
    : '<div class="next-item"><span class="txt">🎉 Fase atual concluída — avance para a próxima na aba Fases.</span></div>';

  $('milestones').innerHTML = PLAN.phases.map((ph, i) => {
    const pc = phasePct(PLAN, store, i);
    return `<div class="ms-row"><span class="ms-dot" style="color:${ph.color};background:${ph.color}"></span>
      <span class="ms-name"><b>F0${i}</b>${ph.name}</span>
      <span class="ms-week">${ph.weeks}</span>
      <span class="ms-bar-track"><span class="ms-bar-fill" style="width:${pc}%;background:${ph.color}"></span></span>
      <span class="ms-pct" style="color:${ph.color}">${pc}%</span></div>`;
  }).join('');
}

/* ---------- Render: phases ---------- */
function renderPhaseSidebar() {
  $('psb').innerHTML = PLAN.phases.map((p, i) => {
    const pc = phasePct(PLAN, store, i);
    return `<button class="phase-btn${i === curPhase ? ' on' : ''}" type="button" data-phase="${i}">
      <div class="phase-btn-top"><span style="width:8px;height:8px;border-radius:50%;background:${p.color};flex-shrink:0"></span>
        <div style="flex:1"><div class="phase-tag" style="color:${p.color}">Fase 0${i} · ${pc}%</div>
        <div class="phase-name">${p.name}</div></div></div>
      <div class="phase-mini-track"><div class="phase-mini-fill" style="width:${pc}%;background:${p.color}"></div></div>
    </button>`;
  }).join('');
}
function renderPhaseDetail() {
  const i = curPhase;
  const p = PLAN.phases[i];
  $('pdt').innerHTML = `
    <div class="detail-box" style="border-top:3px solid ${p.color}">
      <div class="detail-header">
        <div>
          <div style="display:flex;align-items:center;gap:.3rem;margin-bottom:2px">
            <span class="detail-tag" style="background:color-mix(in srgb,${p.color} 16%,var(--surface));color:${p.color};border:1px solid color-mix(in srgb,${p.color} 35%,transparent)">${p.tag.toUpperCase()}</span>
            <span class="detail-dur">${p.weeks}</span>
          </div>
          <div class="detail-title" style="color:${p.color}">${p.name}</div>
        </div>
        <span class="detail-icon" style="color:${p.color}">0${i}</span>
      </div>
      <div class="detail-goal" style="border-color:${p.color};background:color-mix(in srgb,${p.color} 10%,var(--surface))">
        <div class="detail-goal-label">Objetivo</div>
        <div class="detail-goal-text">${p.goal}</div>
      </div>
      <div class="detail-desc">${p.desc}</div>
      <div>${p.tasks.map((tx, j) => {
        const id = taskId(i, j); const on = !!store.checked[id];
        return `<label class="task-item${on ? ' done' : ''}"><input type="checkbox" class="chk" data-toggle="${id}" ${on ? 'checked' : ''}><span class="txt">${tx}</span></label>`;
      }).join('')}</div>
      <div class="detail-nav">
        ${i > 0 ? `<button class="nav-prev" type="button" data-phase="${i - 1}">← Fase anterior</button>` : ''}
        ${i < PLAN.phases.length - 1 ? `<button class="nav-next" type="button" data-phase="${i + 1}" style="background:${p.color}">Próxima fase →</button>` : ''}
      </div>
    </div>`;
}
function selectPhase(i) { curPhase = i; renderPhaseSidebar(); renderPhaseDetail(); }

/* ---------- Render: timeline ---------- */
function renderTimeline() {
  $('tlLead').innerHTML = PLAN.meta.timelineLead;
  $('tlScale').innerHTML = PLAN.meta.timelineScale.map((s) => `<span>${s}</span>`).join('');
  const maxW = PLAN.meta.timelineWeeks;
  $('tlRows').innerHTML = PLAN.phases.map((p, i) => {
    const left = ((p.start - 1) / maxW) * 100;
    const w = ((p.end - p.start + 1) / maxW) * 100;
    const exam = p.exam === true || p.tag === 'Exame' || p.tag === 'CTA 🏆';
    return `<div class="tl-row"><div><div class="tl-label"><b>F0${i}</b>${p.name}</div><div class="tl-week">${p.weeks}</div></div>
      <div class="tl-track"><div class="tl-bar" style="left:${left}%;width:${Math.max(w, 7)}%;background:${p.color}">${exam ? svg('flag', { size: 13 }) : ''}${phasePct(PLAN, store, i)}%</div></div></div>`;
  }).join('');
}

/* ---------- Render: mocks ---------- */
function renderMockFilters() {
  $('mockFilters').innerHTML = PLAN.mockFilters.map((f) =>
    `<button class="mock-filter${f.f === mockFilter ? ' on' : ''}" type="button" data-mock-filter="${f.f}">${f.label}</button>`).join('');
}
function renderMocks() {
  $('mocksLead').innerHTML = PLAN.mocksLead;
  $('mockList').innerHTML = PLAN.mocks.map((m, i) => {
    if (mockFilter !== 'all' && m.tier !== mockFilter) return '';
    const done = !!store.mocks[i];
    const sc = store.scores[i] || '';
    const tierLabel = PLAN.mockTierLabels[m.tier] || m.tier;
    const tierCol = m.tier === 'eval'
      ? 'background:color-mix(in srgb,#f59e0b 16%,var(--surface));color:color-mix(in srgb,#b45309 55%,var(--ink))'
      : 'background:color-mix(in srgb,#7c3aed 16%,var(--surface));color:color-mix(in srgb,#6d28d9 55%,var(--ink))';
    return `<div class="mock-card${done ? ' done' : ''}">
      <button class="mock-head" type="button" data-mock-toggle="${i}" aria-expanded="false">
        <span class="mock-h-left">
          <span class="mock-tier" style="${tierCol}">${tierLabel}</span>
          <span><span class="mock-title">${m.title}</span><span class="mock-time" style="display:block">${m.time}</span></span>
        </span>
        <span class="mock-status${done ? ' done' : ''}">${done ? svg('checkCircle', { size: 18 }) : svg('chevron', { size: 16 })}</span>
      </button>
      <div class="mock-body" id="mockBody${i}">
        <div class="mock-scenario">${m.scenario}</div>
        <div class="mock-sub">Requisitos a arquitetar</div>
        ${m.reqs.map((r) => `<div class="mock-req"><span class="b">›</span><span>${r}</span></div>`).join('')}
        <div class="mock-sub">O que a banca avalia</div>
        <div class="mock-eval">${m.eval}</div>
        ${Array.isArray(m.res) && m.res.length
          ? `<div class="mock-sub">${svg('book', { size: 13 })}Onde encontrar / praticar</div>` +
            m.res.map((r) => `<div class="mock-res"><span class="b">→</span><span>${r}</span></div>`).join('')
          : ''}
        <div class="mock-foot">
          <button class="mock-done-btn${done ? ' on' : ''}" type="button" data-mock-done="${i}">${svg('check', { size: 15 })}${done ? 'Concluído' : 'Marcar concluído'}</button>
          <span class="mock-score">Nota/auto-aval: <input type="number" min="0" max="100" value="${sc}" placeholder="%" data-mock-score="${i}"> %</span>
        </div>
      </div>
    </div>`;
  }).join('');

  const mp = PLAN.mockPresentation;
  $('mockPresentation').innerHTML =
    `<div class="tip-title">${iconText(mp.title, { size: 17 })}</div>` +
    mp.items.map(([n, txt]) => `<div class="r-item"><span class="r-ico">${planIcon(n, { size: 16 })}</span><span>${txt}</span></div>`).join('');
}

/* ---------- Render: routine ---------- */
function renderRoutine() {
  $('routineLead').innerHTML = PLAN.routineLead;
  $('routineCards').innerHTML = PLAN.routine.map((c) =>
    `<div class="routine-card">
      <div class="routine-header">
        <div><div class="routine-title">${c.title}</div><div class="routine-sub">${c.sub}</div></div>
        <span class="routine-badge" style="background:${c.badgeBg};color:${c.badgeColor}">${c.badge}</span>
      </div>
      ${c.items.map(([icon, txt]) => `<div class="r-item"><span class="r-ico">${planIcon(icon, { size: 16 })}</span><span>${txt}</span></div>`).join('')}
    </div>`).join('');
  const t = PLAN.routineTips;
  $('routineTips').innerHTML =
    `<div class="tip-title">${iconText(t.title, { size: 17 })}</div>` +
    t.items.map(([icon, txt]) => `<div class="r-item"><span class="r-ico">${planIcon(icon, { size: 16 })}</span><span>${txt}</span></div>`).join('');
}

/* ---------- Render: gaps ---------- */
function renderGaps() {
  $('strengthsText').innerHTML = PLAN.strengths;
  $('gapList').innerHTML = PLAN.gaps.map((g, gi) => {
    const pc = gapPct(PLAN, store, gi);
    return `<div class="gap-card">
      <div class="gap-header"><span class="gap-name">${g.name}</span><span class="gap-badge" style="background:${g.bcol};color:${g.btxt}">${iconText(g.badge, { size: 13 })}</span></div>
      <div class="gap-meta"><span>Domínio</span><span>${pc}%</span></div>
      <div class="gap-bar-track"><div class="gap-bar-fill" style="width:${pc}%;background:${g.color}"></div></div>
      <div class="gap-grid">
        <div><div class="gap-section-title">Tópicos-chave (marque ao dominar)</div>
          ${g.topics.map((tp, i) => {
            const id = gapId(gi, i); const on = !!store.checked[id];
            return `<label class="gap-task${on ? ' done' : ''}"><input type="checkbox" class="chk" data-toggle="${id}" ${on ? 'checked' : ''}><span class="txt">${tp}</span></label>`;
          }).join('')}
        </div>
        <div><div class="gap-section-title">Recursos</div>
          ${g.res.map((r) => `<div class="gap-item"><span style="color:${g.color}">›</span>${r}</div>`).join('')}
        </div>
      </div>
    </div>`;
  }).join('');
}

/* ---------- Render: costs ---------- */
function renderCosts() {
  const c = PLAN.costs;
  $('costSummary').innerHTML = c.summary.map((s) => {
    const txt = `color-mix(in srgb, ${s.color} 58%, var(--ink))`;
    return `<div class="cost-summary-card" style="background:color-mix(in srgb,${s.color} 12%,var(--surface));border:1px solid color-mix(in srgb,${s.color} 30%,var(--surface))">
      <div class="cost-label" style="color:${txt}">${s.label}</div>
      <div class="cost-amount" style="color:${txt}">${s.amount}</div>
      <div class="cost-sub" style="color:${txt}">${s.sub}</div>
    </div>`; }).join('');
  $('costRows').innerHTML = c.rows.map((r) =>
    `<div class="cost-row${r.highlight ? ' hl' : ''}">
      <div class="cost-left"><span class="cost-required-tag ${r.req ? 'req' : 'opt'}">${r.req ? 'Obrigatório' : 'Opcional'}</span><span class="cost-name">${r.name}</span></div>
      <div><div class="cost-usd">${r.usd}</div><div class="cost-brl">${r.brl}</div></div>
    </div>`).join('');
  $('costNote').textContent = c.rowsNote;
  $('strategyTitle').innerHTML = iconText(c.strategyTitle, { size: 18 });
  $('strategyItems').innerHTML = c.strategy.map((s) =>
    `<div class="s-item"><span class="s-arrow">→</span><span>${s}</span></div>`).join('');
  $('costFoot').textContent = c.note;
}

/* ---------- Render tudo ---------- */
function renderAll() {
  renderHeader();
  renderDash();
  renderPhaseSidebar();
  renderPhaseDetail();
  renderTimeline();
  renderMockFilters();
  renderMocks();
  renderRoutine();
  renderGaps();
  renderCosts();
}

/* ---------- Import / Export / Reset ---------- */
function exportProgress() {
  const blob = new Blob([JSON.stringify(store, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'plano-de-estudo-progresso-' + new Date().toISOString().slice(0, 10) + '.json';
  a.click();
  URL.revokeObjectURL(a.href);
}
function importProgress(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!data.checked) throw new Error('formato inválido');
      store = normalizeStore(data);
      save(); renderAll();
      alert('Progresso restaurado ✅');
    } catch { alert('Arquivo inválido ou corrompido.'); }
  };
  reader.readAsText(file);
}
function resetProgress() {
  if (confirm('Zerar todo o progresso? Faça um Backup antes se quiser guardar.')) {
    store = emptyStore(); save(); renderAll();
  }
}

/* ---------- Event delegation (sem handlers inline) ---------- */
function switchTab(tab) {
  document.querySelectorAll('.nav-btn').forEach((b) => b.classList.toggle('on', b.dataset.tab === tab));
  document.querySelectorAll('.panel').forEach((p) => p.classList.toggle('on', p.id === 'tab-' + tab));
}

document.addEventListener('click', (e) => {
  const navBtn = e.target.closest('[data-tab]');
  if (navBtn) return switchTab(navBtn.dataset.tab);

  const phaseBtn = e.target.closest('[data-phase]');
  if (phaseBtn) return selectPhase(Number(phaseBtn.dataset.phase));

  const filterBtn = e.target.closest('[data-mock-filter]');
  if (filterBtn) { mockFilter = filterBtn.dataset.mockFilter; renderMockFilters(); renderMocks(); return; }

  const mockHead = e.target.closest('[data-mock-toggle]');
  if (mockHead) {
    const body = $('mockBody' + mockHead.dataset.mockToggle);
    const open = body.classList.toggle('open');
    mockHead.setAttribute('aria-expanded', String(open));
    return;
  }

  const doneBtn = e.target.closest('[data-mock-done]');
  if (doneBtn) return toggleMock(Number(doneBtn.dataset.mockDone));

  if (e.target.closest('#btnExport')) return exportProgress();
  if (e.target.closest('#btnImport')) return $('imp').click();
  if (e.target.closest('#btnReset')) return resetProgress();
});

document.addEventListener('change', (e) => {
  const chk = e.target.closest('[data-toggle]');
  if (chk) return toggle(chk.dataset.toggle);

  const score = e.target.closest('[data-mock-score]');
  if (score) return setScore(Number(score.dataset.mockScore), score.value);

  if (e.target.id === 'imp' && e.target.files[0]) importProgress(e.target.files[0]);
});

/* ---------- Boot ---------- */
renderAll();
initSync();
