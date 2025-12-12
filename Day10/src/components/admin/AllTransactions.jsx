import { useTransactions } from '../../context/TransactionContext';

const AllTransactions = () => {
  const { transactions } = useTransactions();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">All User Transactions</h2>
      
      {transactions.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-slate-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">User</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Mobile</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Plan</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Amount</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Date</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b dark:border-gray-600">
                  <td className="px-4 py-2 text-gray-800 dark:text-white">{transaction.userName || 'User'}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-white">{transaction.mobile}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-white">{transaction.planName || `₹${transaction.amount}`}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-white">₹{transaction.amount}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-white">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllTransactions;