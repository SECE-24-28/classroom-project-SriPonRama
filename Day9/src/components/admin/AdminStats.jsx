import { usePlans } from '../../context/PlanContext';
import { useTransactions } from '../../context/TransactionContext';

const AdminStats = () => {
  const { plans } = usePlans();
  const { transactions } = useTransactions();

  const totalUsers = JSON.parse(localStorage.getItem('users') || '[]').length;

  const stats = [
    { title: 'Total Users', value: totalUsers, color: 'bg-blue-500' },
    { title: 'Total Transactions', value: transactions.length, color: 'bg-green-500' },
    { title: 'Active Plans', value: plans.length, color: 'bg-purple-500' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dashboard Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-[#F3E2D4] dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#F3E2D4] dark:bg-gray-800 rounded-lg shadow-lg p-6">
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

        <div className="bg-[#F3E2D4] dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Plan Distribution</h3>
          {['Airtel', 'Jio', 'Vi', 'BSNL'].map((operator) => {
            const count = plans.filter(p => p.operator === operator).length;
            return (
              <div key={operator} className="flex justify-between items-center py-2">
                <span className="text-gray-800 dark:text-white">{operator}</span>
                <span className="bg-[#F3E2D4] text-gray-800 px-2 py-1 rounded">{count} plans</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminStats;