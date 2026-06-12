// ─── RENDER DASHBOARD ─────────────────────────────────────────────────────────
function renderDashboard() {
  const d = allData;
  const totalCost = d.reduce((s, r) => s + (r.total||0), 0);
  const totalRep  = d.length;

  const pc = {};
  d.forEach(r => pc[r.plate] = (pc[r.plate]||0) + 1);
  const mp = Object.entries(pc).sort((a,b) => b[1]-a[1])[0];

  const cc = {};
  d.forEach(r => cc[r.plate] = (cc[r.plate]||0) + (r.total||0));
  const hc = Object.entries(cc).sort((a,b) => b[1]-a[1])[0];

  document.getElementById('stat-cost').textContent     = fmt(totalCost);
  document.getElementById('stat-count').textContent    = fmtNum(totalRep) + ' ครั้ง';
  document.getElementById('stat-most').textContent     = mp ? mp[0] : '-';
  document.getElementById('stat-most-sub').textContent = mp ? `ซ่อม ${mp[1]} ครั้ง` : '-';
  document.getElementById('stat-top-cost').textContent     = hc ? hc[0] : '-';
  document.getElementById('stat-top-cost-sub').textContent = hc ? fmt(hc[1]) : '-';

  const pend = allData.filter(r => r.status !== 'เสร็จแล้ว');
  document.getElementById('badge-pending').textContent       = pend.length;
  document.getElementById('pending-badge-count').textContent = pend.length;
  document.getElementById('pending-count').textContent       = pend.length + ' รายการ';

  renderCharts();
  renderPendingTable();
}

// ─── PENDING TABLE ────────────────────────────────────────────────────────────
function renderPendingTable() {
  const pend = allData.filter(r => r.status !== 'เสร็จแล้ว').sort((a,b) => a.date < b.date ? 1 : -1);
  const tb = document.getElementById('pending-tbody');

  if (!pend.length) {
    tb.innerHTML = `<tr><td colspan="8"><div class="empty"><div class="empty-ico">✅</div><div class="empty-txt">ไม่มีงานค้าง</div></div></td></tr>`;
  } else {
    tb.innerHTML = pend.map(r => `<tr>
      <td>${fmtDate(r.date)}</td>
      <td><span class="td-link" onclick="openModal('${r.plate}')">${r.plate}</span></td>
      <td class="td-muted">${r.vtype}</td>
      <td>${r.repair||'-'}</td>
      <td>${catBadge(r.cat)}</td>
      <td class="td-muted">${r.garage||'-'}</td>
      <td>${statusBadge(r.status)}</td>
      <td class="td-muted">${r.reporter||'-'}</td>
    </tr>`).join('');
  }

  // Full pending section
  const tb2 = document.getElementById('pending-full-tbody');
  tb2.innerHTML = pend.map(r => `<tr>
    <td>${fmtDate(r.date)}</td>
    <td><span class="td-link" onclick="openModal('${r.plate}')">${r.plate}</span></td>
    <td class="td-muted">${r.vtype}</td>
    <td>${r.symptoms||'-'}</td>
    <td>${r.repair||'-'}</td>
    <td>${catBadge(r.cat)}</td>
    <td class="td-muted">${r.garage||'-'}</td>
    <td class="td-num ${r.total>0?'red':''}">${fmt(r.total)}</td>
    <td>${statusBadge(r.status)}</td>
    <td class="td-muted">${r.reporter||'-'}</td>
    <td class="td-muted">${r.note||''}</td>
  </tr>`).join('');
}

// ─── MAIN TABLE ───────────────────────────────────────────────────────────────
function renderTable() {
  const tb = document.getElementById('main-tbody');
  document.getElementById('tbl-count').textContent = filtered.length + ' รายการ';

  if (!filtered.length) {
    tb.innerHTML = `<tr><td colspan="16"><div class="empty"><div class="empty-ico">🔍</div><div class="empty-txt">ไม่พบข้อมูลที่ตรงกัน</div></div></td></tr>`;
    return;
  }

  const rows = [...filtered].sort((a,b) => a.date < b.date ? 1 : -1);
  tb.innerHTML = rows.map(r => {
    const idx = allData.indexOf(r);
    return `<tr>
      <td style="white-space:nowrap">${fmtDate(r.date)}</td>
      <td><span class="td-link" onclick="openModal('${r.plate}')">${r.plate}</span></td>
      <td>${vcatBadge(r.vcat)}</td>
      <td class="td-muted" style="white-space:nowrap">${r.vtype||'-'}</td>
      <td class="td-muted">${fmtNum(r.miles)}</td>
      <td style="max-width:160px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${r.symptoms||''}">${r.symptoms||'-'}</td>
      <td style="max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${r.repair||''}">${r.repair||'-'}</td>
      <td>${catBadge(r.cat)}</td>
      <td class="td-muted" style="white-space:nowrap">${r.garage||'-'}</td>
      <td class="td-num">${fmt(r.parts)}</td>
      <td class="td-num">${fmt(r.labor)}</td>
      <td class="td-num red">${fmt(r.total)}</td>
      <td>${statusBadge(r.status)}</td>
      <td class="td-muted">${r.reporter||'-'}</td>
      <td class="td-muted" style="max-width:120px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${r.note||''}</td>
      <td style="white-space:nowrap">
        <button class="btn btn-sm" onclick="openEditForm(${idx})" title="แก้ไข" style="margin-right:4px">✏️</button>
        <button class="btn btn-sm btn-danger" onclick="deleteRecord(${idx})" title="ลบ">🗑️</button>
      </td>
    </tr>`;
  }).join('');
}
