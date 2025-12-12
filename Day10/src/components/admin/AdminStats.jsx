import { useState, useEffect } from 'react';
import { useTransactions } from '../../context/TransactionContext';
import axios from 'axios';

const AdminStats = () => {
  const [plans, setPlans] = useState([]);
  const { transactions } = useTransactions();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('https://6932a690e5a9e342d27043e1.mockapi.io/plans');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setPlans([]);
    }
  };

  const totalUsers = JSON.parse(localStorage.getItem('users') || '[]').length;

  const stats = [
    { title: 'Total Users', value: totalUsers, color: 'bg-gradient-to-br from-purple-500 to-purple-600' },
    { title: 'Total Transactions', value: transactions.length, color: 'bg-gradient-to-br from-indigo-500 to-indigo-600' },
    { title: 'Active Plans', value: plans.length, color: 'bg-gradient-to-br from-slate-500 to-slate-600' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dashboard Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Recent Transactions</h3>
          {transactions.slice(-5).map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center py-2 border-b dark:border-gray-600">
              <div>
                <p className="text-gray-800 dark:text-white font-semibold">{transaction.mobile}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">₹{transaction.amount}</p>
              </div>
              <span className="text-green-600 text-sm">{transaction.status}</span>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Plan Distribution</h3>
          {['Airtel', 'Jio', 'Vi', 'BSNL'].map((operator) => {
            const count = plans.filter(p => p.operator === operator).length;
            return (
              <div key={operator} className="flex justify-between items-center py-2">
                <span className="text-gray-800 dark:text-white">{operator}</span>
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">{count} plans</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminStats;