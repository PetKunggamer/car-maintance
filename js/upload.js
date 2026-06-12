// ─── EXCEL IMPORT ─────────────────────────────────────────────────────────────
function handleUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const wb   = XLSX.read(ev.target.result, { type:'binary', cellDates:true });
      const ws   = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, { raw:false, dateNF:'YYYY-MM-DD' });
      if (!rows.length) { showToast('ไฟล์ไม่มีข้อมูล', 'err'); return; }

      const parsed = rows.map(row => {
        const r = {};
        Object.entries(row).forEach(([k, v]) => {
          const key = COL_MAP[k.trim().toLowerCase()] || COL_MAP[k.trim()];
          if (key) r[key] = v;
        });
        // Normalize date format dd/mm/yyyy → yyyy-mm-dd
        if (r.date && typeof r.date === 'string' && r.date.includes('/')) {
          const p = r.date.split('/');
          if (p.length === 3) r.date = `${p[2]}-${p[1].padStart(2,'0')}-${p[0].padStart(2,'0')}`;
        }
        r.parts = parseFloat(String(r.parts||0).replace(/,/g,'')) || 0;
        r.labor = parseFloat(String(r.labor||0).replace(/,/g,'')) || 0;
        r.total = parseFloat(String(r.total||0).replace(/,/g,'')) || ((r.parts||0)+(r.labor||0));
        r.miles = parseFloat(String(r.miles||0).replace(/,/g,'')) || 0;
        if (!r.status) r.status = 'รอดำเนินการ';
        return r;
      }).filter(r => r.plate || r.date);

      allData  = [...parsed];
      filtered = [...allData];
      populatePlateFilter();
      renderAll();
      saveToStorage();
      showToast(`นำเข้าสำเร็จ ${parsed.length} รายการ จากไฟล์ "${file.name}"`, 'ok');
      showSection('dashboard', document.querySelector('.nav-btn'));
    } catch(err) {
      showToast('เกิดข้อผิดพลาด: ' + err.message, 'err');
    }
  };
  reader.readAsBinaryString(file);
  e.target.value = '';
}

// ─── DRAG & DROP ──────────────────────────────────────────────────────────────
const dz = document.getElementById('drop-zone');
dz.addEventListener('dragover', e => { e.preventDefault(); dz.classList.add('drag'); });
dz.addEventListener('dragleave', () => dz.classList.remove('drag'));
dz.addEventListener('drop', e => {
  e.preventDefault();
  dz.classList.remove('drag');
  const file = e.dataTransfer.files[0];
  if (file) handleUpload({ target:{ files:[file], value:'' } });
});

// ─── EXPORT EXCEL ─────────────────────────────────────────────────────────────
function exportExcel() {
  const rows = allData.map(r => ({
    'วันที่':r.date, 'ทะเบียนรถ':r.plate, 'ประเภทยานพาหนะ':r.vcat||'รถยนต์', 'ยี่ห้อ/รุ่น':r.vtype, 'เลขไมล์':r.miles,
    'อาการ/ปัญหา':r.symptoms, 'รายการซ่อม':r.repair, 'หมวดหมู่ซ่อม':r.cat,
    'อู่/ผู้ซ่อม':r.garage, 'ค่าอะไหล่':r.parts, 'ค่าแรง':r.labor,
    'รวมค่าใช้จ่าย':r.total, 'สถานะ':r.status, 'ผู้แจ้ง':r.reporter, 'หมายเหตุ':r.note
  }));
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'ซ่อมบำรุง');
  XLSX.writeFile(wb, 'maintenance_export.xlsx');
  showToast('ส่งออก Excel สำเร็จ', 'ok');
}

// ─── DOWNLOAD TEMPLATE ────────────────────────────────────────────────────────
function downloadTemplate() {
  const row = {
    'วันที่':'2026-06-11', 'ทะเบียนรถ':'กข-1234', 'ประเภทยานพาหนะ':'รถยนต์', 'ยี่ห้อ/รุ่น':'Toyota Vigo',
    'เลขไมล์':'85000', 'อาการ/ปัญหา':'น้ำมันเครื่องรั่ว', 'รายการซ่อม':'เปลี่ยนซีล',
    'หมวดหมู่ซ่อม':'เครื่องยนต์', 'อู่/ผู้ซ่อม':'อู่ช่างสมชาย',
    'ค่าอะไหล่':'2500', 'ค่าแรง':'1500', 'รวมค่าใช้จ่าย':'4000',
    'สถานะ':'เสร็จแล้ว', 'ผู้แจ้ง':'สมชาย ใจดี', 'หมายเหตุ':''
  };
  const ws = XLSX.utils.json_to_sheet([row]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Template');
  XLSX.writeFile(wb, 'maintenance_template.xlsx');
  showToast('ดาวน์โหลด Template สำเร็จ', 'ok');
}
