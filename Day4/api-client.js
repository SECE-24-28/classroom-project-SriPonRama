// API Client for Mobile Recharge App
const MOCKAPI_BASE = 'https://6932a690e5a9e342d27043e1.mockapi.io';

class ApiClient {
    // Auth methods
    static async signup(name, email, password) {
        const response = await fetch(`${API_BASE}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        return response.json();
    }
    
    static async login(email, password) {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return response.json();
    }
    
    // Profile methods
    static async getProfile(email) {
        const response = await fetch(`${API_BASE}/profile/${email}`);
        return response.json();
    }
    
    static async updateProfile(email, data) {
        const response = await fetch(`${API_BASE}/profile/${email}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    }
    
    // Plans methods - fetch from MockAPI
    static async getPlans(operator = 'all', category = null) {
        try {
            const response = await fetch(`${MOCKAPI_BASE}/plans`);
            const allPlans = await response.json();
            
            let filteredPlans = allPlans;
            
            if (operator !== 'all') {
                filteredPlans = filteredPlans.filter(plan => plan.operator === operator);
            }
            
            if (category) {
                filteredPlans = filteredPlans.filter(plan => plan.category === category);
            }
            
            return filteredPlans;
        } catch (error) {
            console.error('Error fetching plans:', error);
            return [];
        }
    }
    
    // Recharge methods
    static async recharge(mobile, operator, amount, userEmail) {
        const response = await fetch(`${API_BASE}/recharge`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile, operator, amount, userEmail })
        });
        return response.json();
    }
    
    // Transactions methods
    static async getTransactions(email) {
        const response = await fetch(`${API_BASE}/transactions/${email}`);
        return response.json();
    }
    
    // Operators methods - fetch from MockAPI
    static async getOperators() {
        try {
            const response = await fetch(`${MOCKAPI_BASE}/operators`);
            return response.json();
        } catch (error) {
            console.error('Error fetching operators:', error);
            return [];
        }
    }
}

// Export for use in main script
window.ApiClient = ApiClient;