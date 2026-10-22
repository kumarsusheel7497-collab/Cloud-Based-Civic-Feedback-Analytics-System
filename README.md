# 🏙️ CivicPulse - Cloud-Based Civic Feedback Analytics System

A **client-side** civic feedback analytics platform that runs entirely on 
**GitHub Pages** — no backend or database server required.


## ✨ Features

### 📝 Feedback Submission
- Multi-field form with validation
- Category auto-classification (Roads, Water, Sanitation, etc.)
- Star rating system
- Sentiment selection with emoji indicators
- Auto-generated unique feedback IDs

### 📊 Analytics Dashboard
- **6 KPI Cards** — Total, Resolved, In Progress, Critical, Avg Rating, Resolution Rate
- **6 Interactive Charts** (Chart.js):
  - Category Distribution (Doughnut)
  - Status Distribution (Pie)
  - Ward-wise Feedback (Bar)
  - Urgency Levels (Bar)
  - Sentiment Analysis (Doughnut)
  - 7-Day Trend (Line)
- **Keyword Cloud** from feedback text
- **Real-time Filters** by Category, Ward, Status

### 📋 Reports
- Searchable & sortable feedback table
- Pagination (10 per page)
- Detailed modal view for each feedback
- **Export to CSV** and **JSON**
- **Print** functionality

### ⚙️ Admin Panel
- Update feedback status (Pending → In Progress → Resolved)
- Delete individual feedbacks
- Load 50 sample feedbacks for demo
- Clear all data

### 🎨 UI/UX
- Fully responsive design (mobile-first)
- Animated building illustrations
- Smooth counter animations
- Professional color scheme
- Print-friendly styles

## 🚀 Deployment on GitHub Pages

1. **Create a new repository** on GitHub
2. **Push the project files:**

```bash
git init
git add .
git commit -m "Initial commit - CivicPulse"
git branch -M main
git remote add origin https://github.com/<username>/civic-feedback-analytics.git
git push -u origin main
