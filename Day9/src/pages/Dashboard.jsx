import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const { user, transactions } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Welcome, {user?.name}!</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/recharge" className="bg-[#F3E2D4] hover:bg-[#E6D1C1] text-gray-800 rounded p-8 hover:shadow-2xl transform hover:scale-105 transition">
            <h3 className="text-2xl font-bold mb-2">Recharge Now</h3>
            <p>Quick mobile recharge</p>
          </Link>
          
          <Link to="/plans" className="bg-[#F3E2D4] hover:bg-[#E6D1C1] text-gray-800 rounded p-8 hover:shadow-2xl transform hover:scale-105 transition">
            <h3 className="text-2xl font-bold mb-2">Browse Plans</h3>
            <p>All operators & plans</p>
          </Link>
          
          <Link to="/profile" className="bg-[#F3E2D4] hover:bg-[#E6D1C1] text-gray-800 rounded p-8 hover:shadow-2xl transform hover:scale-105 transition">
            <h3 className="text-2xl font-bold mb-2">My Profile</h3>
            <p>Edit your details</p>
          </Link>
        </div>

        <div className="bg-[#F3E2D4] dark:bg-gray-800 rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Recent Transactions</h3>
          {transactions.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No transactions yet</p>
          ) : (
            <div className="space-y-4">
              {transactions.slice(0, 5).map(t => (
                <div key={t.id} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{t.mobile}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">₹{t.amount}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.operator}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link to="/transactions" className="block mt-6 text-center text-[#018790] dark:text-[#00B7B5] font-semibold hover:underline">
            View All Transactions
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
