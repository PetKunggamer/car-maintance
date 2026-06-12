// ─── FILTERS ──────────────────────────────────────────────────────────────────
function populatePlateFilter() {
  const sel = document.getElementById('f-plate');
  const plates = [...new Set(allData.map(r => r.plate))].sort();
  const cur = sel.value;
  sel.innerHTML = '<option value="">ทั้งหมด</option>' + plates.map(p => `<option${p===cur?' selected':''}>${p}</option>`).join('');
}

function applyFilters() {
  const plate  = document.getElementById('f-plate').value;
  const month  = document.getElementById('f-month').value;
  const vcat   = document.getElementById('f-vcat').value;
  const status = document.getElementById('f-status').value;
  const cat    = document.getElementById('f-cat').value;
  const search = document.getElementById('f-search').value.toLowerCase();

  filtered = allData.filter(r => {
    if (plate  && r.plate !== plate) return false;
    if (month  && (!r.date || r.date.substring(0,7) !== month)) return false;
    if (vcat   && (r.vcat||'รถยนต์') !== vcat) return false;
    if (status && r.status !== status) return false;
    if (cat    && r.cat !== cat) return false;
    if (search) {
      const haystack = [r.plate, r.vtype, r.symptoms, r.repair, r.garage, r.reporter, r.note].join(' ').toLowerCase();
      if (!haystack.includes(search)) return false;
    }
    return true;
  });
  renderTable();
}

function resetFilters() {
  document.getElementById('f-plate').value  = '';
  document.getElementById('f-month').value  = '';
  document.getElementById('f-vcat').value   = '';
  document.getElementById('f-status').value = '';
  document.getElementById('f-cat').value    = '';
  document.getElementById('f-search').value = '';
  filtered = [...allData];
  renderTable();
}
