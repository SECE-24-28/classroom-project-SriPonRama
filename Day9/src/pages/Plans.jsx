import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Plans = () => {
  const [selectedOperator, setSelectedOperator] = useState('Airtel');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('https://6932a690e5a9e342d27043e1.mockapi.io/plans');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setPlans([
        { id: 1, operator: 'Airtel', price: 299, validity: 28, data: '1.5GB/day', benefits: ['Unlimited Calls', '100 SMS/day'] },
        { id: 2, operator: 'Jio', price: 299, validity: 28, data: '2GB/day', benefits: ['Unlimited Calls', '100 SMS/day'] }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPlans = plans.filter(plan => plan.operator === selectedOperator);

  const handleSelectPlan = (plan) => {
    navigate('/recharge', { state: { selectedPlan: plan, operator: selectedOperator } });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Browse All Plans</h2>
        
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {['Airtel', 'Jio', 'Vi', 'BSNL'].map(op => (
            <button
              key={op}
              onClick={() => setSelectedOperator(op)}
              className={`px-6 py-3 rounded font-semibold whitespace-nowrap transition ${
                selectedOperator === op
                  ? 'bg-[#F3E2D4] text-gray-800'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-[#F3E2D4] hover:text-gray-800 dark:hover:bg-gray-700'
              }`}
            >
              {op}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">Loading plans...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPlans.map((plan) => (
              <div key={plan.id} className="bg-white dark:bg-gray-800 rounded shadow-lg p-6 hover:shadow-2xl transform hover:scale-105 transition">
              <div className="text-center mb-4">
                <h4 className="text-3xl font-bold text-[#018790] dark:text-[#00B7B5]">₹{plan.price}</h4>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{plan.validity} days</p>
              </div>
              <div className="space-y-2 mb-6">
                <p className="text-gray-700 dark:text-gray-300 font-semibold">{plan.data}</p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  {plan.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleSelectPlan(plan)}
                className="w-full bg-[#F3E2D4] hover:bg-[#E6D1C1] text-gray-800 py-2 rounded font-semibold transition"
              >
                Recharge Now
              </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Plans;
