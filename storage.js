// =============================================
// STORAGE MANAGER - LocalStorage CRUD Operations
// =============================================

const StorageManager = {
    STORAGE_KEY: 'civicpulse_feedback',

    // Get all feedback
    getAllFeedback() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    // Save all feedback
    saveAllFeedback(feedbackArray) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(feedbackArray));
    },

    // Add new feedback
    addFeedback(feedback) {
        const all = this.getAllFeedback();
        feedback.id = this.generateId();
        feedback.date = new Date().toISOString();
        feedback.status = 'Pending';
        all.push(feedback);
        this.saveAllFeedback(all);
        return feedback;
    },

    // Get feedback by ID
    getFeedbackById(id) {
        const all = this.getAllFeedback();
        return all.find(f => f.id === id);
    },

    // Update feedback status
    updateFeedbackStatus(id, newStatus) {
        const all = this.getAllFeedback();
        const index = all.findIndex(f => f.id === id);
        if (index !== -1) {
            all[index].status = newStatus;
            if (newStatus === 'Resolved') {
                all[index].resolvedDate = new Date().toISOString();
            }
            this.saveAllFeedback(all);
        }
    },

    // Delete feedback
    deleteFeedback(id) {
        let all = this.getAllFeedback();
        all = all.filter(f => f.id !== id);
        this.saveAllFeedback(all);
    },

    // Clear all
    clearAll() {
        localStorage.removeItem(this.STORAGE_KEY);
    },

    // Generate unique ID
    generateId() {
        const prefix = 'CF';
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `${prefix}-${timestamp}-${random}`;
    },

    // Get stats
    getStats() {
        const all = this.getAllFeedback();
        const categories = [...new Set(all.map(f => f.category))];
        const resolved = all.filter(f => f.status === 'Resolved').length;
        const pending = all.filter(f => f.status === 'Pending').length;
        const inProgress = all.filter(f => f.status === 'In Progress').length;
        const critical = all.filter(f => f.urgency === 'Critical').length;
        const avgRating = all.length > 0
            ? (all.reduce((sum, f) => sum + (f.rating || 0), 0) / all.length).toFixed(1)
            : 0;
        const resolutionRate = all.length > 0
            ? Math.round((resolved / all.length) * 100)
            : 0;

        return {
            total: all.length,
            resolved,
            pending,
            inProgress,
            critical,
            departments: categories.length,
            avgRating,
            resolutionRate
        };
    },

    // Load sample data
    loadSampleData() {
        const categories = ['Roads & Transport', 'Water Supply', 'Sanitation', 'Electricity', 'Parks & Recreation', 'Public Safety', 'Healthcare', 'Education', 'Noise Pollution'];
        const wards = ['Ward 1 - Downtown', 'Ward 2 - Riverside', 'Ward 3 - Hillside', 'Ward 4 - Lakefront', 'Ward 5 - Industrial', 'Ward 6 - Suburbs', 'Ward 7 - Old Town', 'Ward 8 - Market Area'];
        const urgencies = ['Low', 'Medium', 'High', 'Critical'];
        const statuses = ['Pending', 'In Progress', 'Resolved', 'Rejected'];
        const sentiments = ['positive', 'neutral', 'negative'];
        const names = ['Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Reddy', 'Vikram Singh', 'Anita Joshi', 'Ravi Verma', 'Deepa Nair', 'Suresh Gupta', 'Kavita Desai', 'Mohan Rao', 'Geeta Mishra', 'Arjun Das', 'Lakshmi Iyer', 'Nitin Jain'];

        const subjects = {
            'Roads & Transport': ['Pothole on Main Street', 'Broken traffic signal', 'Need speed breaker near school', 'Road resurfacing needed', 'Bus stop shelter damaged', 'Missing road signs'],
            'Water Supply': ['No water supply since 3 days', 'Low water pressure', 'Contaminated water', 'Water pipeline leaking', 'Need new water connection', 'Irregular supply timing'],
            'Sanitation': ['Garbage not collected', 'Open drain overflowing', 'Need public toilet', 'Waste dump near residential area', 'Mosquito breeding in drains', 'Street sweeping irregular'],
            'Electricity': ['Street light not working', 'Power cuts daily', 'Transformer damaged', 'Low voltage issue', 'Dangling electric wires', 'Need new street lights'],
            'Parks & Recreation': ['Park benches broken', 'Need playground equipment', 'Garden not maintained', 'Walking track damaged', 'Need more trees', 'Public gym equipment broken'],
            'Public Safety': ['No CCTV cameras', 'Dark alley unsafe', 'Need police patrolling', 'Stray dog menace', 'Eve-teasing near bus stop', 'Illegal encroachment'],
            'Healthcare': ['Need primary health center', 'Hospital staff shortage', 'Ambulance service needed', 'Vaccination camp request', 'Medicine shortage', 'Cleanliness in hospital'],
            'Education': ['School building needs repair', 'Need more teachers', 'No library facility', 'Mid-day meal quality poor', 'Need computer lab', 'School bus needed'],
            'Noise Pollution': ['Loud music at night', 'Construction noise', 'Factory noise pollution', 'Vehicle horn noise', 'DJ music during exams', 'Temple loudspeaker issue']
        };

        const descriptions = [
            'This has been an ongoing issue for several weeks. Multiple complaints have been made but no action has been taken yet. The residents are frustrated and demand immediate attention.',
            'This problem affects hundreds of families in our area. We need urgent intervention from the authorities. The situation is getting worse day by day.',
            'I am writing to bring to your notice a serious concern in our locality. This needs to be addressed as soon as possible for the safety and well-being of residents.',
            'Despite repeated complaints to the local authorities, this issue remains unresolved. We request immediate action as it is causing great inconvenience to the public.',
            'This is a humble request to the civic authorities to look into this matter. The current situation is unacceptable and needs prompt attention.'
        ];

        const existing = this.getAllFeedback();
        const samples = [];

        for (let i = 0; i < 50; i++) {
            const category = categories[Math.floor(Math.random() * categories.length)];
            const subjectList = subjects[category] || ['General Issue'];
            const daysAgo = Math.floor(Math.random() * 30);
            const date = new Date();
            date.setDate(date.getDate() - daysAgo);
            date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));

            samples.push({
                id: this.generateId() + i,
                name: names[Math.floor(Math.random() * names.length)],
                email: `user${i + 1}@example.com`,
                phone: `98${Math.floor(10000000 + Math.random() * 90000000)}`,
                ward: wards[Math.floor(Math.random() * wards.length)],
                category: category,
                subject: subjectList[Math.floor(Math.random() * subjectList.length)],
                description: descriptions[Math.floor(Math.random() * descriptions.length)],
                urgency: urgencies[Math.floor(Math.random() * urgencies.length)],
                sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
                rating: Math.floor(Math.random() * 5) + 1,
                location: `${Math.floor(Math.random() * 200) + 1}, ${wards[Math.floor(Math.random() * wards.length)].split(' - ')[1]} Area`,
                status: statuses[Math.floor(Math.random() * statuses.length)],
                date: date.toISOString()
            });
        }

        this.saveAllFeedback([...existing, ...samples]);
    }
};