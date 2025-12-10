import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Navbar from '../components/Navbar';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/Footer';

const Transactions = () => {
  const { transactions } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Transaction History</h2>
        
        {transactions.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-xl text-gray-600 dark:text-gray-400">No transactions yet</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Date</th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Mobile</th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Operator</th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(t => (
                    <tr key={t.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{t.date}</td>
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{t.mobile}</td>
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{t.operator}</td>
                      <td className="px-6 py-4 text-green-600 dark:text-green-400 font-bold">₹{t.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <ThemeToggle />
      <Footer />
    </div>
  );
};

export default Transactions;
