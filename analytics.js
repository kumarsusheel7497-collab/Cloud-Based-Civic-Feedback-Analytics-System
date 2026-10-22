// =============================================
// ANALYTICS DASHBOARD - analytics.js
// =============================================

let dashboardData = [];

document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();
    setupHamburger();
});

function setupHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

function loadDashboard() {
    dashboardData = StorageManager.getAllFeedback();
    updateKPIs(dashboardData);
    renderAllCharts(dashboardData);
}

function updateKPIs(data) {
    const total = data.length;
    const resolved = data.filter(f => f.status === 'Resolved').length;
    const inProgress = data.filter(f => f.status === 'In Progress').length;
    const critical = data.filter(f => f.urgency === 'Critical').length;
    const avgRating = total > 0
        ? (data.reduce((sum, f) => sum + (f.rating || 0), 0) / total).toFixed(1)
        : '0.0';
    const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

    animateValue('kpiTotal', total);
    animateValue('kpiResolved', resolved);
    animateValue('kpiProgress', inProgress);
    animateValue('kpiCritical', critical);
    document.getElementById('kpiRating').textContent = avgRating;
    document.getElementById('kpiResolution').textContent = resolutionRate + '%';
}

function animateValue(id, target) {
    const el = document.getElementById(id);
    if (!el) return;
    let current = 0;
    const increment = Math.ceil(target / 20);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = current;
    }, 40);
}

function renderAllCharts(data) {
    ChartManager.createCategoryChart(data);
    ChartManager.createStatusChart(data);
    ChartManager.createWardChart(data);
    ChartManager.createUrgencyChart(data);
    ChartManager.createSentimentChart(data);
    ChartManager.createTrendChart(data);
    ChartManager.createKeywordCloud(data);
}

function applyFilters() {
    const category = document.getElementById('filterCategory').value;
    const ward = document.getElementById('filterWard').value;
    const status = document.getElementById('filterStatus').value;

    let filtered = StorageManager.getAllFeedback();

    if (category !== 'all') {
        filtered = filtered.filter(f => f.category === category);
    }
    if (ward !== 'all') {
        filtered = filtered.filter(f => f.ward === ward);
    }
    if (status !== 'all') {
        filtered = filtered.filter(f => f.status === status);
    }

    dashboardData = filtered;
    updateKPIs(filtered);
    renderAllCharts(filtered);
}

function resetFilters() {
    document.getElementById('filterCategory').value = 'all';
    document.getElementById('filterWard').value = 'all';
    document.getElementById('filterStatus').value = 'all';
    loadDashboard();
}

function loadSampleData() {
    if (confirm('This will add 50 sample feedback entries. Continue?')) {
        StorageManager.loadSampleData();
        loadDashboard();
        alert('Sample data loaded! Dashboard updated.');
    }
}