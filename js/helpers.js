// ─── FORMAT HELPERS ───────────────────────────────────────────────────────────
function fmt(n) { return n==null||isNaN(n) ? '-' : '฿'+Number(n).toLocaleString('th-TH'); }
function fmtNum(n) { return n==null||isNaN(n) ? '-' : Number(n).toLocaleString('th-TH'); }
function fmtDate(d) {
  if (!d) return '-';
  const p = d.split('-');
  if (p.length < 3) return d;
  return `${parseInt(p[2])} ${MONTHS_TH[parseInt(p[1])-1]} ${parseInt(p[0])+543}`;
}

// ─── BADGE HELPERS ────────────────────────────────────────────────────────────
function statusBadge(s) {
  if (s==='เสร็จแล้ว')    return `<span class="badge b-suc">✓ ${s}</span>`;
  if (s==='กำลังซ่อม')    return `<span class="badge b-inf">⚙ ${s}</span>`;
  if (s==='รอดำเนินการ') return `<span class="badge b-war">⏳ ${s}</span>`;
  return `<span class="badge b-def">${s||'-'}</span>`;
}

function catBadge(c) {
  const col = CAT_COLORS[c] || '#6b7280';
  return `<span class="badge" style="background:${col}22;color:${col}">${c||'-'}</span>`;
}

const VCAT_STYLE = {
  'รถยนต์':    {bg:'#eff6ff', color:'#1d4ed8', icon:'🚗'},
  'รถบรรทุก':  {bg:'#fff7ed', color:'#c2410c', icon:'🚛'},
  'รถโฟคลิฟท์':{bg:'#f0fdf4', color:'#15803d', icon:'🏗️'}
};

function vcatBadge(v) {
  const s = VCAT_STYLE[v];
  if (!s) return `<span class="badge b-def">${v||'-'}</span>`;
  return `<span class="badge" style="background:${s.bg};color:${s.color}">${s.icon} ${v}</span>`;
}
