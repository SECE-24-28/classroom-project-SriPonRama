const express = require('express');
const { createTransaction, getUserTransactions, getAllTransactions } = require('../controllers/transactionController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createTransaction);
router.get('/user', auth, getUserTransactions);
router.get('/all', adminAuth, getAllTransactions);

module.exports = router;