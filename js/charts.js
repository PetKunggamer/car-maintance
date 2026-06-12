// ─── DARK MODE HELPERS ────────────────────────────────────────────────────────
function isDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function chartColors() {
  const dark = isDark();
  return {
    grid:    dark ? '#334155' : '#f1f5f9',
    tick:    dark ? '#94a3b8' : '#64748b',
    legend:  dark ? '#cbd5e1' : '#1e293b',
    tooltip: dark ? '#1e293b' : '#fff',
    tooltipText: dark ? '#f1f5f9' : '#1e293b',
    doughnutBorder: dark ? '#1e293b' : '#fff',
  };
}

// Recreate charts when OS color scheme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (charts.monthly) { charts.monthly.destroy(); charts.monthly = null; }
  if (charts.cat)     { charts.cat.destroy();     charts.cat     = null; }
  renderCharts();
});

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
  const c = chartColors();

  // ── Monthly cost bar chart ──────────────────────────────────────────────────
  const md  = {};
  const src = chartVcatFilter ? allData.filter(r => (r.vcat||'รถยนต์') === chartVcatFilter) : allData;
  src.forEach(r => {
    const m = r.date ? r.date.substring(0, 7) : '';
    if (m) md[m] = (md[m]||0) + (r.total||0);
  });
  const months  = Object.keys(md).sort();
  const mLabels = months.map(m => {
    const [y, mo] = m.split('-');
    return `${MONTHS_TH[parseInt(mo)-1]} ${parseInt(y)+543-2500}`;
  });
  const mVals = months.map(m => md[m]);

  if (charts.monthly) {
    charts.monthly.data.labels = mLabels;
    charts.monthly.data.datasets[0].data = mVals;
    charts.monthly.options.scales.y.grid.color  = c.grid;
    charts.monthly.options.scales.y.ticks.color = c.tick;
    charts.monthly.options.scales.x.ticks.color = c.tick;
    charts.monthly.update('none');
  } else {
    const ctx = document.getElementById('chart-monthly').getContext('2d');
    charts.monthly = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: mLabels,
        datasets: [{
          label: 'ค่าใช้จ่าย (บาท)', data: mVals,
          backgroundColor: '#3b82f6', borderRadius: 5, borderSkipped: false
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: ctx => `฿${ctx.raw.toLocaleString('th-TH')}` }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid:  { color: c.grid },
            ticks: { color: c.tick, callback: v => `฿${(v/1000).toFixed(0)}K` }
          },
          x: {
            grid:  { display: false },
            ticks: { color: c.tick }
          }
        }
      }
    });
  }

  // ── Category doughnut chart ─────────────────────────────────────────────────
  const cat    = {};
  allData.forEach(r => { if (r.cat) cat[r.cat] = (cat[r.cat]||0) + 1; });
  const cLabels = Object.keys(cat);
  const cVals   = Object.values(cat);
  const cColors = cLabels.map(l => CAT_COLORS[l] || '#94a3b8');

  if (charts.cat) {
    charts.cat.data.labels                          = cLabels;
    charts.cat.data.datasets[0].data               = cVals;
    charts.cat.data.datasets[0].backgroundColor    = cColors;
    charts.cat.data.datasets[0].borderColor        = c.doughnutBorder;
    charts.cat.options.plugins.legend.labels.color = c.legend;
    charts.cat.update('none');
  } else {
    const ctx2 = document.getElementById('chart-cat').getContext('2d');
    charts.cat = new Chart(ctx2, {
      type: 'doughnut',
      data: {
        labels: cLabels,
        datasets: [{
          data: cVals, backgroundColor: cColors,
          borderWidth: 2, borderColor: c.doughnutBorder
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: '60%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { font: { size: 11 }, padding: 8, usePointStyle: true, color: c.legend }
          },
          tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.raw} ครั้ง` } }
        }
      }
    });
  }
}
