// User session management
let currentUser = null;

// Load user from localStorage on page load
function loadUserSession() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
}

// Save user to localStorage
function saveUserSession() {
    if (currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}

// Section Navigation
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update profile if viewing profile section
    if (sectionId === 'profile') {
        updateProfileDisplay();
    }
    
    // Check login for recharge section
    if (sectionId === 'recharge') {
        checkRechargeAccess();
    }
    
    // Check login for transactions section
    if (sectionId === 'transactions') {
        checkTransactionsAccess();
    }
    
    // Close mobile menu if open
    const navList = document.querySelector('.nav-list');
    navList.classList.remove('active');
}

// Check if user can access recharge
function checkRechargeAccess() {
    const rechargeForm = document.getElementById('rechargeFormContainer');
    const loginPrompt = document.getElementById('rechargeLoginPrompt');
    
    if (currentUser) {
        rechargeForm.style.display = 'block';
        loginPrompt.style.display = 'none';
        
        // Pre-fill mobile number from profile
        const mobileInput = document.getElementById('mobile');
        if (mobileInput && currentUser.phone) {
            mobileInput.value = currentUser.phone;
        }
    } else {
        rechargeForm.style.display = 'none';
        loginPrompt.style.display = 'block';
    }
}

// Check if user can access transactions
function checkTransactionsAccess() {
    const transactionsList = document.getElementById('transactionsList');
    const loginPrompt = document.getElementById('transactionsLoginPrompt');
    
    if (currentUser) {
        transactionsList.style.display = 'block';
        loginPrompt.style.display = 'none';
        loadTransactions();
    } else {
        transactionsList.style.display = 'none';
        loginPrompt.style.display = 'block';
    }
}

// Load and display transactions
function loadTransactions() {
    const transactions = JSON.parse(localStorage.getItem(`transactions_${currentUser.email}`) || '[]');
    const noTransactions = document.getElementById('noTransactions');
    
    if (transactions.length === 0) {
        noTransactions.style.display = 'block';
        return;
    }
    
    noTransactions.style.display = 'none';
    
    const transactionsHTML = transactions.map(transaction => `
        <div class="transaction-item">
            <div class="transaction-header">
                <div class="transaction-id">TXN${transaction.id}</div>
                <div class="transaction-status">Success</div>
            </div>
            <div class="transaction-details">
                <div class="transaction-detail">
                    <strong>Mobile Number</strong>
                    <span>${transaction.mobile}</span>
                </div>
                <div class="transaction-detail">
                    <strong>Operator</strong>
                    <span>${transaction.operator.toUpperCase()}</span>
                </div>
                <div class="transaction-detail">
                    <strong>Amount</strong>
                    <span>₹${transaction.amount}</span>
                </div>
                <div class="transaction-detail">
                    <strong>Date & Time</strong>
                    <span>${transaction.datetime}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    document.getElementById('transactionsDisplay').innerHTML = transactionsHTML;
}

// Filter transactions by date range
function filterTransactions() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    if (!startDate || !endDate) {
        alert('Please select both start and end dates');
        return;
    }
    
    const transactions = JSON.parse(localStorage.getItem(`transactions_${currentUser.email}`) || '[]');
    const filteredTransactions = transactions.filter(transaction => {
        const transactionDate = new Date(transaction.datetime.split(',')[0].split('/').reverse().join('-'));
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        return transactionDate >= start && transactionDate <= end;
    });
    
    displayFilteredTransactions(filteredTransactions);
}

// Display filtered transactions
function displayFilteredTransactions(transactions) {
    const transactionsDisplay = document.getElementById('transactionsDisplay');
    const noTransactions = document.getElementById('noTransactions');
    
    if (transactions.length === 0) {
        noTransactions.style.display = 'block';
        transactionsDisplay.innerHTML = '';
        return;
    }
    
    noTransactions.style.display = 'none';
    
    const transactionsHTML = transactions.map(transaction => `
        <div class="transaction-item">
            <div class="transaction-header">
                <div class="transaction-id">TXN${transaction.id}</div>
                <div class="transaction-status">Success</div>
            </div>
            <div class="transaction-details">
                <div class="transaction-detail">
                    <strong>Mobile Number</strong>
                    <span>${transaction.mobile}</span>
                </div>
                <div class="transaction-detail">
                    <strong>Operator</strong>
                    <span>${transaction.operator.toUpperCase()}</span>
                </div>
                <div class="transaction-detail">
                    <strong>Amount</strong>
                    <span>₹${transaction.amount}</span>
                </div>
                <div class="transaction-detail">
                    <strong>Date & Time</strong>
                    <span>${transaction.datetime}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    transactionsDisplay.innerHTML = transactionsHTML;
}

// Print transactions
function printTransactions() {
    const printContent = document.getElementById('transactionsDisplay').innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    
    printWindow.document.write(`
        <html>
        <head>
            <title>Transaction History</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .transaction-item { border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 5px; }
                .transaction-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
                .transaction-id { font-weight: bold; color: #6B3F69; }
                .transaction-status { background: #28a745; color: white; padding: 4px 8px; border-radius: 10px; }
                .transaction-details { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
                .transaction-detail strong { display: block; margin-bottom: 5px; }
            </style>
        </head>
        <body>
            <h2>Transaction History - ${currentUser.name}</h2>
            ${printContent}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

// Download transactions as CSV
function downloadTransactions() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    let transactions = JSON.parse(localStorage.getItem(`transactions_${currentUser.email}`) || '[]');
    
    if (startDate && endDate) {
        transactions = transactions.filter(transaction => {
            const transactionDate = new Date(transaction.datetime.split(',')[0].split('/').reverse().join('-'));
            const start = new Date(startDate);
            const end = new Date(endDate);
            
            return transactionDate >= start && transactionDate <= end;
        });
    }
    
    if (transactions.length === 0) {
        alert('No transactions found for the selected date range');
        return;
    }
    
    const csvContent = [
        ['Transaction ID', 'Mobile Number', 'Operator', 'Amount', 'Date & Time'],
        ...transactions.map(t => [
            `TXN${t.id}`,
            t.mobile,
            t.operator.toUpperCase(),
            `₹${t.amount}`,
            t.datetime
        ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${currentUser.name}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Save transaction to history
function saveTransaction(mobile, operator, amount) {
    if (!currentUser) return;
    
    const transaction = {
        id: Date.now(),
        mobile: mobile,
        operator: operator,
        amount: amount,
        datetime: new Date().toLocaleString('en-IN', {
            day: '2-digit',
            month: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    };
    
    const transactions = JSON.parse(localStorage.getItem(`transactions_${currentUser.email}`) || '[]');
    transactions.unshift(transaction);
    localStorage.setItem(`transactions_${currentUser.email}`, JSON.stringify(transactions));
}

// Toggle between view and edit mode
function toggleEditMode() {
    const profileView = document.getElementById('profileView');
    const profileEdit = document.getElementById('profileEdit');
    
    if (profileEdit.style.display === 'none') {
        profileView.style.display = 'none';
        profileEdit.style.display = 'block';
        
        document.getElementById('editName').value = currentUser.name || '';
        document.getElementById('editPhone').value = currentUser.phone || '';
        document.getElementById('editEmail').value = currentUser.email || '';
    } else {
        profileView.style.display = 'block';
        profileEdit.style.display = 'none';
    }
}

// Logout function
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateProfileDisplay();
    showSection('dashboard');
    alert('Logged out successfully!');
}

// Update profile display based on login status
function updateProfileDisplay() {
    const profileName = document.getElementById('profileName');
    const profilePhone = document.getElementById('profilePhone');
    const profileEmail = document.getElementById('profileEmail');
    const profileMember = document.getElementById('profileMember');
    const editBtn = document.getElementById('editProfileBtn');
    const loginBtn = document.getElementById('loginPromptBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (currentUser) {
        profileName.textContent = currentUser.name || 'Name not set';
        profilePhone.innerHTML = `<strong>Phone:</strong> ${currentUser.phone || 'Not provided'}`;
        profileEmail.innerHTML = `<strong>Email:</strong> ${currentUser.email || 'Not provided'}`;
        profileMember.innerHTML = `<strong>Member Since:</strong> ${currentUser.memberSince || 'Unknown'}`;
        editBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'inline-block';
        loginBtn.style.display = 'none';
    } else {
        profileName.textContent = 'Please login to view profile';
        profilePhone.innerHTML = '<strong>Phone:</strong> Not available';
        profileEmail.innerHTML = '<strong>Email:</strong> Not available';
        profileMember.innerHTML = '<strong>Member Since:</strong> Not available';
        editBtn.style.display = 'none';
        logoutBtn.style.display = 'none';
        loginBtn.style.display = 'inline-block';
    }
}

// Mobile Menu Toggle
function toggleMenu() {
    const navList = document.querySelector('.nav-list');
    navList.classList.toggle('active');
}

// Plan filtering functions
let currentOperator = 'all';
let currentCategory = 'recharge';

function filterPlans(operator) {
    currentOperator = operator;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show/hide category tabs
    const categoryTabs = document.getElementById('planCategories');
    if (operator === 'all') {
        categoryTabs.style.display = 'none';
        showAllPlans();
    } else {
        categoryTabs.style.display = 'flex';
        showCategory('recharge');
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector('.category-btn').classList.add('active');
    }
}

function showCategory(category) {
    currentCategory = category;
    
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    filterPlansByOperatorAndCategory();
}

function showAllPlans() {
    document.querySelectorAll('.plan-card').forEach(card => {
        card.classList.remove('hidden');
    });
}

function filterPlansByOperatorAndCategory() {
    document.querySelectorAll('.plan-card').forEach(card => {
        const cardOperator = card.getAttribute('data-operator');
        const cardCategory = card.getAttribute('data-category');
        
        if (cardOperator === currentOperator && cardCategory === currentCategory) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Form Validations and Submissions
document.addEventListener('DOMContentLoaded', function() {
    // Load user session on page load
    loadUserSession();
    
    // Profile Form Handler
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('editName').value;
            const phone = document.getElementById('editPhone').value;
            const email = document.getElementById('editEmail').value;
            
            if (!name || !email) {
                alert('Name and email are required');
                return;
            }
            
            // Update current user
            currentUser.name = name;
            currentUser.phone = phone;
            currentUser.email = email;
            
            // Update in registered users list
            const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const userIndex = existingUsers.findIndex(u => u.email === currentUser.email);
            if (userIndex !== -1) {
                existingUsers[userIndex] = currentUser;
                localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
            }
            
            saveUserSession();
            toggleEditMode();
            updateProfileDisplay();
            alert('Profile updated successfully!');
        });
    }
    
    // Recharge Form Handler
    const rechargeForm = document.getElementById('rechargeForm');
    if (rechargeForm) {
        rechargeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const mobile = document.getElementById('mobile').value;
            const operator = document.getElementById('operator').value;
            const amount = document.getElementById('amount').value;
            
            // Validate mobile number
            if (!/^\d{10}$/.test(mobile)) {
                alert('Please enter a valid 10-digit mobile number');
                return;
            }
            
            // Validate operator selection
            if (!operator) {
                alert('Please select an operator');
                return;
            }
            
            // Validate amount
            if (amount < 10) {
                alert('Minimum recharge amount is ₹10');
                return;
            }
            
            // Update user's phone if changed
            if (mobile !== currentUser.phone) {
                currentUser.phone = mobile;
                const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
                const userIndex = existingUsers.findIndex(u => u.email === currentUser.email);
                if (userIndex !== -1) {
                    existingUsers[userIndex].phone = mobile;
                    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
                }
                saveUserSession();
            }
            
            // Save transaction
            saveTransaction(mobile, operator, amount);
            
            // Show success message
            alert(`Recharge Successful!\nMobile: ${mobile}\nOperator: ${operator.toUpperCase()}\nAmount: ₹${amount}\nTransaction ID: TXN${Date.now()}`);
            
            // Reset form but keep mobile number
            const mobileValue = mobile;
            rechargeForm.reset();
            document.getElementById('mobile').value = mobileValue;
        });
    }
    
    // Login Form Handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Basic validation
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const user = existingUsers.find(u => u.email === email);
            
            if (user) {
                currentUser = user;
                saveUserSession();
                alert('Login Successful! Welcome back!');
                showSection('dashboard');
                loginForm.reset();
            } else {
                alert('User not found. Please sign up first.');
            }
        });
    }
    
    // Signup Form Handler
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signupName').value;
            const phone = document.getElementById('signupPhone').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            
            // Basic validation
            if (!name || !phone || !email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            if (!/^\d{10}$/.test(phone)) {
                alert('Please enter a valid 10-digit phone number');
                return;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters long');
                return;
            }
            
            const newUser = {
                name: name,
                email: email,
                phone: phone,
                memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            };
            
            const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            existingUsers.push(newUser);
            localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
            
            currentUser = newUser;
            saveUserSession();
            
            alert('Account Created Successfully! Welcome to RechargeApp!');
            showSection('dashboard');
            signupForm.reset();
        });
    }
    
    // Plan Recharge Buttons (using event delegation)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-secondary') && e.target.closest('.plan-card')) {
            const planCard = e.target.closest('.plan-card');
            const price = planCard.querySelector('.plan-price').textContent;
            const validity = planCard.querySelector('.plan-validity').textContent;
            const operator = planCard.querySelector('.plan-operator').textContent;
            
            const confirmRecharge = confirm(`Recharge with ${operator} ${price} plan for ${validity}?\nClick OK to proceed to recharge page.`);
            
            if (confirmRecharge) {
                if (currentUser) {
                    showSection('recharge');
                    setTimeout(() => {
                        const amountField = document.getElementById('amount');
                        const operatorField = document.getElementById('operator');
                        if (amountField) {
                            amountField.value = price.replace('₹', '');
                        }
                        if (operatorField) {
                            operatorField.value = operator.toLowerCase();
                        }
                    }, 100);
                } else {
                    alert('Please login first to recharge');
                    showSection('login');
                }
            }
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const nav = document.querySelector('.nav');
        const navList = document.querySelector('.nav-list');
        
        if (!nav.contains(e.target) && navList.classList.contains('active')) {
            navList.classList.remove('active');
        }
    });
    
    // Smooth scroll for better UX
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
    
    // Add loading animation for form submissions
    function showLoading(button) {
        const originalText = button.textContent;
        button.textContent = 'Processing...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
    }
    
    // Enhanced mobile number formatting
    const mobileInput = document.getElementById('mobile');
    if (mobileInput) {
        mobileInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            e.target.value = value;
        });
    }
    
    // Phone number formatting for signup
    const signupPhoneInput = document.getElementById('signupPhone');
    if (signupPhoneInput) {
        signupPhoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            e.target.value = value;
        });
    }
    
    // Amount input validation
    const amountInput = document.getElementById('amount');
    if (amountInput) {
        amountInput.addEventListener('input', function(e) {
            const value = parseInt(e.target.value);
            if (value && value < 10) {
                e.target.setCustomValidity('Minimum amount is ₹10');
            } else {
                e.target.setCustomValidity('');
            }
        });
    }
});

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

// Add some interactive features
function addHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .plan-card, .profile-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize hover effects when DOM is loaded
document.addEventListener('DOMContentLoaded', addHoverEffects);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navList = document.querySelector('.nav-list');
        navList.classList.remove('active');
    }
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Apply ripple effect to all buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);