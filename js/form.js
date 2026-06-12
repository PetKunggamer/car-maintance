// ─── FORM (ADD / EDIT / DELETE) ───────────────────────────────────────────────
let _editIdx = -1;

function openAddForm() {
  _editIdx = -1;
  document.getElementById('form-modal-title').textContent = '➕ เพิ่มรายการซ่อม';
  document.getElementById('ff-date').value = new Date().toISOString().split('T')[0];
  ['ff-plate','ff-vtype','ff-miles','ff-symptoms','ff-repair','ff-garage',
   'ff-parts','ff-labor','ff-total','ff-reporter','ff-note'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('ff-vcat').value   = 'รถยนต์';
  document.getElementById('ff-cat').value    = '';
  document.getElementById('ff-status').value = 'รอดำเนินการ';
  document.getElementById('form-modal').classList.add('show');
  setTimeout(() => document.getElementById('ff-date').focus(), 100);
}

function openEditForm(idx) {
  _editIdx = idx;
  const r = allData[idx];
  document.getElementById('form-modal-title').textContent = '✏️ แก้ไขรายการซ่อม';
  document.getElementById('ff-date').value     = r.date     || '';
  document.getElementById('ff-plate').value    = r.plate    || '';
  document.getElementById('ff-vcat').value     = r.vcat     || 'รถยนต์';
  document.getElementById('ff-vtype').value    = r.vtype    || '';
  document.getElementById('ff-miles').value    = r.miles    || '';
  document.getElementById('ff-symptoms').value = r.symptoms || '';
  document.getElementById('ff-repair').value   = r.repair   || '';
  document.getElementById('ff-cat').value      = r.cat      || '';
  document.getElementById('ff-garage').value   = r.garage   || '';
  document.getElementById('ff-parts').value    = r.parts    || '';
  document.getElementById('ff-labor').value    = r.labor    || '';
  document.getElementById('ff-total').value    = r.total    || '';
  document.getElementById('ff-status').value   = r.status   || 'รอดำเนินการ';
  document.getElementById('ff-reporter').value = r.reporter || '';
  document.getElementById('ff-note').value     = r.note     || '';
  document.getElementById('form-modal').classList.add('show');
}

function closeFormModal() {
  document.getElementById('form-modal').classList.remove('show');
}

function calcTotal() {
  const p = parseFloat(document.getElementById('ff-parts').value) || 0;
  const l = parseFloat(document.getElementById('ff-labor').value) || 0;
  if (p || l) document.getElementById('ff-total').value = p + l;
}

function saveFormData() {
  const plate = document.getElementById('ff-plate').value.trim();
  const date  = document.getElementById('ff-date').value;
  if (!plate || !date) { showToast('กรุณากรอก วันที่ และ ทะเบียนรถ', 'err'); return; }

  const rec = {
    date, plate,
    vcat:     document.getElementById('ff-vcat').value,
    vtype:    document.getElementById('ff-vtype').value.trim(),
    miles:    parseFloat(document.getElementById('ff-miles').value)    || 0,
    symptoms: document.getElementById('ff-symptoms').value.trim(),
    repair:   document.getElementById('ff-repair').value.trim(),
    cat:      document.getElementById('ff-cat').value,
    garage:   document.getElementById('ff-garage').value.trim(),
    parts:    parseFloat(document.getElementById('ff-parts').value)    || 0,
    labor:    parseFloat(document.getElementById('ff-labor').value)    || 0,
    total:    parseFloat(document.getElementById('ff-total').value)    || 0,
    status:   document.getElementById('ff-status').value,
    reporter: document.getElementById('ff-reporter').value.trim(),
    note:     document.getElementById('ff-note').value.trim()
  };

  if (_editIdx >= 0) { allData[_editIdx] = rec; showToast('แก้ไขรายการสำเร็จ ✓', 'ok'); }
  else               { allData.unshift(rec);      showToast('เพิ่มรายการสำเร็จ ✓', 'ok'); }

  saveToStorage();
  filtered = [...allData];
  closeFormModal();
  populatePlateFilter();
  renderAll();
}

function deleteRecord(idx) {
  const r = allData[idx];
  if (!confirm(`ลบรายการนี้?\n\nทะเบียน: ${r.plate}\nวันที่: ${fmtDate(r.date)}\nรายการ: ${r.repair||'-'}`)) return;
  allData.splice(idx, 1);
  saveToStorage();
  filtered = [...allData];
  populatePlateFilter();
  renderAll();
  showToast('ลบรายการแล้ว', 'ok');
}

// Close modal on backdrop click
document.getElementById('form-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('form-modal')) closeFormModal();
});
