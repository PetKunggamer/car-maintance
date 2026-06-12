// ─── APP STATE ────────────────────────────────────────────────────────────────
let allData = [];
let filtered = [];
let charts = {};
let chartVcatFilter = '';

// ─── LOCAL STORAGE ────────────────────────────────────────────────────────────
const STORE_KEY = 'maint_v1';

function saveToStorage() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(allData)); } catch(e) {}
}

function loadFromStorage() {
  try {
    const d = localStorage.getItem(STORE_KEY);
    if (d) { allData = JSON.parse(d); return true; }
  } catch(e) {}
  return false;
}
