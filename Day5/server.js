const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Mock data
let users = [];
let transactions = [];

// Auth endpoints
app.post('/api/signup', (req, res) => {
    const { name, phone, email, password } = req.body;
    
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'User already exists' });
    }
    
    const user = {
        id: Date.now(),
        name,
        email,
        phone,
        memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
    
    users.push(user);
    res.json({ user, token: 'mock-token-' + user.id });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    
    if (!user) {
        return res.status(401).json({ error: 'User not found' });
    }
    
    res.json({ user, token: 'mock-token-' + user.id });
});

// Profile endpoints
app.get('/api/profile/:email', (req, res) => {
    const user = users.find(u => u.email === req.params.email);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});

app.put('/api/profile/:email', (req, res) => {
    const { name, phone, email } = req.body;
    const userIndex = users.findIndex(u => u.email === req.params.email);
    
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    users[userIndex] = { ...users[userIndex], name, phone, email };
    res.json(users[userIndex]);
});

// Plans endpoint
app.get('/api/plans', (req, res) => {
    const { operator, category } = req.query;
    
    const plans = [
        { id: 1, operator: 'airtel', category: 'recharge', price: 199, validity: '28 Days', data: '2GB/Day', calls: 'Unlimited', sms: '100/Day' },
        { id: 2, operator: 'airtel', category: 'topup', price: 48, validity: '28 Days', data: '3GB', calls: 'No', sms: 'No' },
        { id: 3, operator: 'jio', category: 'recharge', price: 209, validity: '28 Days', data: '1GB/Day', calls: 'Unlimited', sms: '100/Day' },
        { id: 4, operator: 'jio', category: 'topup', price: 15, validity: '1 Day', data: '1GB', calls: 'No', sms: 'No' },
        { id: 5, operator: 'vi', category: 'recharge', price: 219, validity: '28 Days', data: '1GB/Day', calls: 'Unlimited', sms: '100/Day' },
        { id: 6, operator: 'bsnl', category: 'recharge', price: 187, validity: '28 Days', data: '2GB/Day', calls: 'Unlimited', sms: '100/Day' }
    ];
    
    let filteredPlans = plans;
    if (operator && operator !== 'all') {
        filteredPlans = filteredPlans.filter(p => p.operator === operator);
    }
    if (category) {
        filteredPlans = filteredPlans.filter(p => p.category === category);
    }
    
    res.json(filteredPlans);
});

// Recharge endpoint
app.post('/api/recharge', (req, res) => {
    const { mobile, operator, amount, userEmail } = req.body;
    
    if (!/^\d{10}$/.test(mobile)) {
        return res.status(400).json({ error: 'Invalid mobile number' });
    }
    
    if (amount < 10) {
        return res.status(400).json({ error: 'Minimum amount is ₹10' });
    }
    
    const transaction = {
        id: Date.now(),
        mobile,
        operator,
        amount,
        userEmail,
        status: 'success',
        datetime: new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    };
    
    transactions.push(transaction);
    res.json({ transaction, message: 'Recharge successful' });
});

// Transactions endpoint
app.get('/api/transactions/:email', (req, res) => {
    const userTransactions = transactions
        .filter(t => t.userEmail === req.params.email)
        .sort((a, b) => b.id - a.id);
    
    res.json(userTransactions);
});

// Operators endpoint
app.get('/api/operators', (req, res) => {
    res.json([
        { id: 'airtel', name: 'Airtel' },
        { id: 'jio', name: 'Jio' },
        { id: 'vi', name: 'Vi (Vodafone Idea)' },
        { id: 'bsnl', name: 'BSNL' }
    ]);
});

app.listen(PORT, () => {
    console.log(`Mock API server running on http://localhost:${PORT}`);
});