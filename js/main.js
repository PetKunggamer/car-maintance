// ─── SIDEBAR TOGGLE (mobile) ──────────────────────────────────────────────────
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  const btn     = document.getElementById('hamburger-btn');
  const isOpen  = sidebar.classList.toggle('open');
  overlay.classList.toggle('show', isOpen);
  btn.classList.toggle('active', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeSidebar() {
  document.querySelector('.sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('show');
  const btn = document.getElementById('hamburger-btn');
  if (btn) btn.classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('sidebar-overlay').addEventListener('click', closeSidebar);

// Close sidebar on Escape key
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSidebar(); });

// ─── SECTION NAVIGATION ───────────────────────────────────────────────────────
const TITLES = {
  dashboard: 'ภาพรวมการซ่อมบำรุง',
  table:     'ตาราง Log การซ่อมทั้งหมด',
  pending:   'งานซ่อมที่ยังไม่เสร็จ',
  upload:    'นำเข้าข้อมูลจาก Excel'
};

function showSection(id, btn) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('section-' + id).classList.add('active');
  if (btn) btn.classList.add('active');
  document.getElementById('page-title').textContent = TITLES[id] || id;
  // Auto-close sidebar on mobile after nav tap
  if (window.innerWidth < 1024) closeSidebar();
}

// ─── VEHICLE HISTORY MODAL ────────────────────────────────────────────────────
function openModal(plate) {
  const records = allData.filter(r => r.plate === plate).sort((a,b) => a.date < b.date ? 1 : -1);
  const vtype   = records[0]?.vtype || '';

  document.getElementById('modal-title').textContent = `ประวัติซ่อม: ${plate}`;
  document.getElementById('modal-vtype').textContent = vtype;

  const totalCost = records.reduce((s,r) => s + (r.total||0), 0);
  const done      = records.filter(r => r.status === 'เสร็จแล้ว').length;
  const lastMiles = records.reduce((m,r) => Math.max(m, r.miles||0), 0);

  document.getElementById('modal-stats').innerHTML = `
    <div class="ms"><div class="ms-val">${records.length}</div><div class="ms-lbl">ครั้งที่ซ่อม</div></div>
    <div class="ms"><div class="ms-val">${fmt(totalCost)}</div><div class="ms-lbl">ค่าใช้จ่ายรวม</div></div>
    <div class="ms"><div class="ms-val">${done}</div><div class="ms-lbl">เสร็จแล้ว</div></div>
    <div class="ms"><div class="ms-val">${fmtNum(lastMiles)}</div><div class="ms-lbl">เลขไมล์ล่าสุด</div></div>`;

  document.getElementById('modal-tbody').innerHTML = records.map(r => `<tr>
    <td style="white-space:nowrap">${fmtDate(r.date)}</td>
    <td class="td-muted">${fmtNum(r.miles)}</td>
    <td style="max-width:150px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${r.symptoms||''}">${r.symptoms||'-'}</td>
    <td style="max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${r.repair||''}">${r.repair||'-'}</td>
    <td>${catBadge(r.cat)}</td>
    <td class="td-muted">${r.garage||'-'}</td>
    <td class="td-num">${fmt(r.parts)}</td>
    <td class="td-num">${fmt(r.labor)}</td>
    <td class="td-num red">${fmt(r.total)}</td>
    <td>${statusBadge(r.status)}</td>
  </tr>`).join('');

  document.getElementById('modal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('show');
  document.body.style.overflow = '';
}

document.getElementById('modal').addEventListener('click', e => {
  if (e.target === document.getElementById('modal')) closeModal();
});

// ─── TOAST ────────────────────────────────────────────────────────────────────
let toastTimer;
function showToast(msg, type = 'ok') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show t-' + (type === 'ok' ? 'ok' : 'err');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3500);
}

// ─── RENDER ALL ───────────────────────────────────────────────────────────────
function renderAll() {
  renderDashboard();
  renderTable();
  populatePlateFilter();
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
if (!loadFromStorage()) {
  allData = [...SAMPLE];
}
filtered = [...allData];
populatePlateFilter();
renderAll();
