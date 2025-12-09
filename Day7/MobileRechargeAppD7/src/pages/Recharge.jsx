import { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Navbar from '../components/Navbar';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/Footer';

const Recharge = () => {
  const { user, addTransaction } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mobile: user?.mobile || '',
    operator: user?.operator || 'Airtel',
    amount: ''
  });

  useEffect(() => {
    if (location.state?.selectedPlan) {
      setFormData(prev => ({
        ...prev,
        amount: location.state.selectedPlan.price,
        operator: location.state.operator
      }));
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.mobile.length === 10 && formData.amount > 0) {
      addTransaction(formData);
      alert('Recharge Successful!');
      navigate('/transactions');
    } else {
      alert('Please enter valid details');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Recharge Now</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Mobile Number</label>
              <input
                type="tel"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                maxLength="10"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#00B7B5] outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Operator</label>
              <select
                value={formData.operator}
                onChange={(e) => setFormData({ ...formData, operator: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#00B7B5] outline-none"
              >
                <option>Airtel</option>
                <option>Jio</option>
                <option>Vi</option>
                <option>BSNL</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Amount (₹)</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                min="10"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#00B7B5] outline-none"
                required
              />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-[#005461] to-[#018790] text-white py-3 rounded-lg font-bold text-lg hover:shadow-lg transform hover:scale-105 transition">
              Complete Recharge
            </button>
          </form>
        </div>
      </div>
      <ThemeToggle />
      <Footer />
    </div>
  );
};

export default Recharge;
