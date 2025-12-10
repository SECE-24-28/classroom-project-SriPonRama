import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ThemeToggle from '../components/ThemeToggle';
import Footer from '../components/Footer';

const Plans = () => {
  const [selectedOperator, setSelectedOperator] = useState('Airtel');
  const navigate = useNavigate();

  const allPlans = {
    Airtel: [
      { price: 155, validity: 24, data: '1GB/day', benefits: ['Unlimited Calls', '300 SMS'] },
      { price: 299, validity: 28, data: '1.5GB/day', benefits: ['Unlimited Calls', '100 SMS/day', 'Wynk Premium'] },
      { price: 479, validity: 56, data: '1.5GB/day', benefits: ['Unlimited Calls', '100 SMS/day', 'Disney+ Hotstar'] },
      { price: 719, validity: 84, data: '2GB/day', benefits: ['Unlimited Calls', '100 SMS/day', 'Amazon Prime'] }
    ],
    Jio: [
      { price: 149, validity: 20, data: '1GB/day', benefits: ['Unlimited Calls', '300 SMS'] },
      { price: 299, validity: 28, data: '2GB/day', benefits: ['Unlimited Calls', '100 SMS/day', 'JioTV'] },
      { price: 533, validity: 56, data: '2GB/day', benefits: ['Unlimited Calls', '100 SMS/day', 'JioCinema'] },
      { price: 999, validity: 84, data: '2.5GB/day', benefits: ['Unlimited Calls', '100 SMS/day', 'Netflix Basic'] }
    ],
    Vi: [
      { price: 179, validity: 24, data: '1GB/day', benefits: ['Unlimited Calls', '300 SMS'] },
      { price: 299, validity: 28, data: '1.5GB/day', benefits: ['Unlimited Calls', '100 SMS/day', 'Vi Movies & TV'] },
      { price: 479, validity: 56, data: '1.5GB/day', benefits: ['Unlimited Calls', '100 SMS/day', 'Weekend Data'] },
      { price: 719, validity: 84, data: '2GB/day', benefits: ['Unlimited Calls', '100 SMS/day', 'Binge All Night'] }
    ],
    BSNL: [
      { price: 107, validity: 26, data: '1GB/day', benefits: ['Unlimited Calls', '300 SMS'] },
      { price: 187, validity: 28, data: '2GB/day', benefits: ['Unlimited Calls', '100 SMS/day'] },
      { price: 397, validity: 56, data: '2GB/day', benefits: ['Unlimited Calls', '100 SMS/day'] },
      { price: 797, validity: 84, data: '2GB/day', benefits: ['Unlimited Calls', '100 SMS/day'] }
    ]
  };

  const handleSelectPlan = (plan) => {
    navigate('/recharge', { state: { selectedPlan: plan, operator: selectedOperator } });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Browse All Plans</h2>
        
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {['Airtel', 'Jio', 'Vi', 'BSNL'].map(op => (
            <button
              key={op}
              onClick={() => setSelectedOperator(op)}
              className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition ${
                selectedOperator === op
                  ? 'bg-[#018790] text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {op}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allPlans[selectedOperator].map((plan, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-105 transition">
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
                className="w-full bg-[#018790] hover:bg-[#005461] text-white py-2 rounded-lg font-semibold transition"
              >
                Recharge Now
              </button>
            </div>
          ))}
        </div>
      </div>
      <ThemeToggle />
      <Footer />
    </div>
  );
};

export default Plans;
