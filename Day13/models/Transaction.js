const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mobile: { type: String, required: true },
  operator: { type: String, required: true },
  amount: { type: Number, required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
  status: { type: String, enum: ['Success', 'Failed', 'Pending'], default: 'Success' }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);