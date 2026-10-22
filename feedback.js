// =============================================
// FEEDBACK SUBMISSION - feedback.js
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    setupStarRating();
    setupForm();
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

function setupStarRating() {
    const stars = document.querySelectorAll('#starRating i');
    const ratingInput = document.getElementById('rating');
    const ratingText = document.getElementById('ratingText');
    const ratingLabels = ['', 'Very Poor', 'Poor', 'Average', 'Good', 'Excellent'];

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.dataset.value);
            ratingInput.value = value;
            ratingText.textContent = ratingLabels[value];

            stars.forEach(s => {
                const sVal = parseInt(s.dataset.value);
                if (sVal <= value) {
                    s.classList.remove('far');
                    s.classList.add('fas', 'active');
                } else {
                    s.classList.remove('fas', 'active');
                    s.classList.add('far');
                }
            });
        });

        star.addEventListener('mouseenter', () => {
            const value = parseInt(star.dataset.value);
            stars.forEach(s => {
                if (parseInt(s.dataset.value) <= value) {
                    s.style.color = '#fbbf24';
                }
            });
        });

        star.addEventListener('mouseleave', () => {
            stars.forEach(s => {
                if (!s.classList.contains('active')) {
                    s.style.color = '#d1d5db';
                } else {
                    s.style.color = '#fbbf24';
                }
            });
        });
    });
}

function setupForm() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const sentimentEl = document.querySelector('input[name="sentiment"]:checked');

        const feedback = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            ward: document.getElementById('ward').value,
            category: document.getElementById('category').value,
            urgency: document.getElementById('urgency').value,
            subject: document.getElementById('subject').value.trim(),
            description: document.getElementById('description').value.trim(),
            location: document.getElementById('location').value.trim(),
            rating: parseInt(document.getElementById('rating').value) || 3,
            sentiment: sentimentEl ? sentimentEl.value : 'neutral'
        };

        // Auto-detect sentiment from description keywords
        feedback.sentiment = analyzeSentiment(feedback.description, feedback.sentiment);

        const saved = StorageManager.addFeedback(feedback);

        // Show success modal
        document.getElementById('feedbackId').textContent = saved.id;
        document.getElementById('successModal').classList.add('show');

        // Reset form
        form.reset();
        resetStars();
    });
}

function analyzeSentiment(text, defaultSentiment) {
    const positiveWords = ['good', 'great', 'excellent', 'happy', 'thank', 'appreciate', 'wonderful', 'satisfied', 'pleased', 'impressed'];
    const negativeWords = ['bad', 'terrible', 'worst', 'angry', 'frustrated', 'disgusted', 'horrible', 'unacceptable', 'pathetic', 'useless', 'corrupt', 'neglect'];

    const lower = text.toLowerCase();
    let posScore = 0, negScore = 0;

    positiveWords.forEach(w => { if (lower.includes(w)) posScore++; });
    negativeWords.forEach(w => { if (lower.includes(w)) negScore++; });

    if (posScore > negScore) return 'positive';
    if (negScore > posScore) return 'negative';
    return defaultSentiment;
}

function resetStars() {
    const stars = document.querySelectorAll('#starRating i');
    stars.forEach(s => {
        s.classList.remove('fas', 'active');
        s.classList.add('far');
        s.style.color = '#d1d5db';
    });
    document.getElementById('rating').value = '0';
    document.getElementById('ratingText').textContent = 'Click to rate';
}

function closeModal() {
    document.getElementById('successModal').classList.remove('show');
}