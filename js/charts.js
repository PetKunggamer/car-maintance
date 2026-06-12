// ─── CHART VCAT FILTER ────────────────────────────────────────────────────────
function setChartFilter(vcat) {
  chartVcatFilter = vcat;
  const map = { '':'cf-all', 'รถยนต์':'cf-car', 'รถบรรทุก':'cf-truck', 'รถโฟคลิฟท์':'cf-fork' };
  Object.values(map).forEach(id => document.getElementById(id).classList.remove('active'));
  document.getElementById(map[vcat] || 'cf-all').classList.add('active');
  renderCharts();
}

// ─── RENDER CHARTS ────────────────────────────────────────────────────────────
function renderCharts() {
  // Monthly cost bar chart
  const md = {};
  const src = chartVcatFilter ? allData.filter(r => (r.vcat||'รถยนต์') === chartVcatFilter) : allData;
  src.forEach(r => {
    const m = r.date ? r.date.substring(0, 7) : '';
    if (m) md[m] = (md[m]||0) + (r.total||0);
  });
  const months = Object.keys(md).sort();
  const mLabels = months.map(m => { const [y,mo] = m.split('-'); return `${MONTHS_TH[parseInt(mo)-1]} ${parseInt(y)+543-2500}`; });
  const mVals = months.map(m => md[m]);

  if (charts.monthly) {
    charts.monthly.data.labels = mLabels;
    charts.monthly.data.datasets[0].data = mVals;
    charts.monthly.update();
  } else {
    const ctx = document.getElementById('chart-monthly').getContext('2d');
    charts.monthly = new Chart(ctx, {
      type: 'bar',
      data: { labels: mLabels, datasets: [{ label:'ค่าใช้จ่าย (บาท)', data: mVals, backgroundColor:'#3b82f6', borderRadius:5, borderSkipped:false }] },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend:{display:false}, tooltip:{callbacks:{label:ctx=>`฿${ctx.raw.toLocaleString('th-TH')}`}} },
        scales: { y:{beginAtZero:true, ticks:{callback:v=>`฿${(v/1000).toFixed(0)}K`}, grid:{color:'#f1f5f9'}}, x:{grid:{display:false}} }
      }
    });
  }

  // Category doughnut chart
  const cat = {};
  allData.forEach(r => { if (r.cat) cat[r.cat] = (cat[r.cat]||0) + 1; });
  const cLabels = Object.keys(cat);
  const cVals = Object.values(cat);
  const cColors = cLabels.map(l => CAT_COLORS[l] || '#94a3b8');

  if (charts.cat) {
    charts.cat.data.labels = cLabels;
    charts.cat.data.datasets[0].data = cVals;
    charts.cat.data.datasets[0].backgroundColor = cColors;
    charts.cat.update();
  } else {
    const ctx2 = document.getElementById('chart-cat').getContext('2d');
    charts.cat = new Chart(ctx2, {
      type: 'doughnut',
      data: { labels: cLabels, datasets: [{ data: cVals, backgroundColor: cColors, borderWidth:2, borderColor:'#fff' }] },
      options: {
        responsive: true, maintainAspectRatio: false, cutout:'60%',
        plugins: {
          legend: { position:'bottom', labels:{font:{size:11}, padding:8, usePointStyle:true} },
          tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.raw} ครั้ง` } }
        }
      }
    });
  }
}
