// =============================================
// HOME PAGE - app.js
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    updateHomeStats();
    loadRecentFeedback();
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

function updateHomeStats() {
    const stats = StorageManager.getStats();
    animateCounter('totalFeedback', stats.total);
    animateCounter('resolvedCount', stats.resolved);
    animateCounter('pendingCount', stats.pending);
    animateCounter('departmentCount', stats.departments);
}

function animateCounter(elementId, target) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let current = 0;
    const increment = Math.ceil(target / 30);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = current;
    }, 30);
}

function loadRecentFeedback() {
    const feedbackList = document.getElementById('recentFeedbackList');
    if (!feedbackList) return;

    const allFeedback = StorageManager.getAllFeedback();
    const recent = allFeedback
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    if (recent.length === 0) {
        feedbackList.innerHTML = '<p class="empty-state">No feedback submitted yet. Be the first!</p>';
        return;
    }

    feedbackList.innerHTML = recent.map(f => `
        <div class="feedback-item urgency-${f.urgency.toLowerCase()}">
            <div>
                <strong>${f.subject}</strong>
                <p style="color: var(--text-light); font-size: 0.9rem; margin-top: 0.25rem;">
                    ${f.category} · ${f.ward} · ${new Date(f.date).toLocaleDateString()}
                </p>
            </div>
            <div class="feedback-meta">
                <span class="badge badge-${f.urgency.toLowerCase()}">${f.urgency}</span>
                <span class="badge badge-${f.status.toLowerCase().replace(' ', '-')}">${f.status}</span>
            </div>
        </div>
    `).join('');
}