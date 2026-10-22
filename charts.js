// =============================================
// CHARTS - charts.js
// =============================================

const ChartManager = {
    charts: {},

    destroyAll() {
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.charts = {};
    },

    createCategoryChart(data) {
        const ctx = document.getElementById('categoryChart');
        if (!ctx) return;

        const categoryCounts = {};
        data.forEach(f => {
            categoryCounts[f.category] = (categoryCounts[f.category] || 0) + 1;
        });

        const colors = [
            '#2563eb', '#8b5cf6', '#ec4899', '#f59e0b',
            '#22c55e', '#14b8a6', '#ef4444', '#6366f1', '#f97316'
        ];

        if (this.charts.category) this.charts.category.destroy();
        this.charts.category = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(categoryCounts),
                datasets: [{
                    data: Object.values(categoryCounts),
                    backgroundColor: colors,
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 15, usePointStyle: true }
                    }
                }
            }
        });
    },

    createStatusChart(data) {
        const ctx = document.getElementById('statusChart');
        if (!ctx) return;

        const statusCounts = { Pending: 0, 'In Progress': 0, Resolved: 0, Rejected: 0 };
        data.forEach(f => {
            if (statusCounts.hasOwnProperty(f.status)) {
                statusCounts[f.status]++;
            }
        });

        if (this.charts.status) this.charts.status.destroy();
        this.charts.status = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(statusCounts),
                datasets: [{
                    data: Object.values(statusCounts),
                    backgroundColor: ['#f59e0b', '#2563eb', '#22c55e', '#ef4444'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 15, usePointStyle: true }
                    }
                }
            }
        });
    },

    createWardChart(data) {
        const ctx = document.getElementById('wardChart');
        if (!ctx) return;

        const wardCounts = {};
        data.forEach(f => {
            const wardName = f.ward.split(' - ')[0];
            wardCounts[wardName] = (wardCounts[wardName] || 0) + 1;
        });

        if (this.charts.ward) this.charts.ward.destroy();
        this.charts.ward = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(wardCounts),
                datasets: [{
                    label: 'Feedback Count',
                    data: Object.values(wardCounts),
                    backgroundColor: 'rgba(37, 99, 235, 0.7)',
                    borderColor: '#2563eb',
                    borderWidth: 1,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, ticks: { stepSize: 1 } }
                }
            }
        });
    },

    createUrgencyChart(data) {
        const ctx = document.getElementById('urgencyChart');
        if (!ctx) return;

        const urgencyCounts = { Low: 0, Medium: 0, High: 0, Critical: 0 };
        data.forEach(f => {
            if (urgencyCounts.hasOwnProperty(f.urgency)) {
                urgencyCounts[f.urgency]++;
            }
        });

        if (this.charts.urgency) this.charts.urgency.destroy();
        this.charts.urgency = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(urgencyCounts),
                datasets: [{
                    label: 'Count',
                    data: Object.values(urgencyCounts),
                    backgroundColor: ['#22c55e', '#2563eb', '#f59e0b', '#ef4444'],
                    borderWidth: 0,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, ticks: { stepSize: 1 } }
                }
            }
        });
    },

    createSentimentChart(data) {
        const ctx = document.getElementById('sentimentChart');
        if (!ctx) return;

        const sentimentCounts = { positive: 0, neutral: 0, negative: 0 };
        data.forEach(f => {
            if (sentimentCounts.hasOwnProperty(f.sentiment)) {
                sentimentCounts[f.sentiment]++;
            }
        });

        if (this.charts.sentiment) this.charts.sentiment.destroy();
        this.charts.sentiment = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['😊 Positive', '😐 Neutral', '😠 Negative'],
                datasets: [{
                    data: Object.values(sentimentCounts),
                    backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 15, usePointStyle: true, font: { size: 14 } }
                    }
                }
            }
        });
    },

    createTrendChart(data) {
        const ctx = document.getElementById('trendChart');
        if (!ctx) return;

        const last7Days = [];
        const counts = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const label = date.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' });
            last7Days.push(label);
            counts.push(data.filter(f => f.date.split('T')[0] === dateStr).length);
        }

        if (this.charts.trend) this.charts.trend.destroy();
        this.charts.trend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: last7Days,
                datasets: [{
                    label: 'Feedbacks',
                    data: counts,
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#2563eb',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 5
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, ticks: { stepSize: 1 } }
                }
            }
        });
    },

    createKeywordCloud(data) {
        const container = document.getElementById('keywordCloud');
        if (!container) return;

        const stopWords = ['the', 'is', 'in', 'and', 'to', 'a', 'of', 'for', 'on', 'it', 'this', 'that', 'has', 'been', 'are', 'was', 'not', 'our', 'we', 'i', 'my', 'but', 'with', 'no', 'from', 'have', 'an', 'as', 'at', 'by', 'or'];
        const wordCounts = {};

        data.forEach(f => {
            const words = (f.subject + ' ' + f.description).toLowerCase()
                .replace(/[^a-zA-Z\s]/g, '')
                .split(/\s+/)
                .filter(w => w.length > 3 && !stopWords.includes(w));

            words.forEach(w => {
                wordCounts[w] = (wordCounts[w] || 0) + 1;
            });
        });

        const sorted = Object.entries(wordCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 25);

        if (sorted.length === 0) {
            container.innerHTML = '<p class="empty-state">No keyword data available</p>';
            return;
        }

        const maxCount = sorted[0][1];
        const colors = ['#2563eb', '#8b5cf6', '#ec4899', '#f59e0b', '#22c55e', '#14b8a6', '#ef4444', '#6366f1'];

        container.innerHTML = sorted.map(([word, count], i) => {
            const size = 0.8 + (count / maxCount) * 1.5;
            const color = colors[i % colors.length];
            const bgOpacity = 0.1 + (count / maxCount) * 0.2;
            return `<span class="keyword-tag" style="font-size: ${size}rem; color: ${color}; background: ${color}${Math.round(bgOpacity * 255).toString(16).padStart(2, '0')}">${word} (${count})</span>`;
        }).join('');
    }
};