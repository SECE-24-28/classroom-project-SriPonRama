const Transaction = require('../models/Transaction');

const createTransaction = async (req, res) => {
  try {
    const { mobile, operator, amount, planId } = req.body;
    
    const transaction = await Transaction.create({
      userId: req.user._id,
      mobile,
      operator,
      amount,
      planId,
      status: 'Success'
    });

    await transaction.populate('planId');
    res.status(201).json({ message: 'Transaction created successfully', transaction });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id })
      .populate('planId')
      .sort({ createdAt: -1 });
    
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('userId', 'name email')
      .populate('planId')
      .sort({ createdAt: -1 });
    
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createTransaction, getUserTransactions, getAllTransactions };