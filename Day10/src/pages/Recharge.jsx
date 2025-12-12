import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useTransactions } from '../context/TransactionContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Validation schema
const schema = yup.object({
  mobile: yup
    .string()
    .required('Mobile number is required')
    .matches(/^[6-9]\d{9}$/, 'Enter valid 10-digit mobile number'),
  operator: yup.string().required('Please select an operator'),
  amount: yup
    .number()
    .required('Amount is required')
    .min(10, 'Minimum amount is ₹10')
    .max(5000, 'Maximum amount is ₹5000')
});

const Recharge = () => {
  const { user } = useContext(UserContext);
  const { addTransaction } = useTransactions();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      mobile: user?.mobile || '',
      operator: 'Airtel',
      amount: ''
    }
  });

  useEffect(() => {
    if (location.state?.selectedPlan) {
      setValue('amount', location.state.selectedPlan.price);
      setValue('operator', location.state.operator);
    }
  }, [location.state, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // MockAPI call
      const response = await axios.post('https://6932a690e5a9e342d27043e1.mockapi.io/recharges', {
        mobile: data.mobile,
        operator: data.operator,
        amount: data.amount,
        timestamp: new Date().toISOString()
      });
      
      if (response.status === 201) {
        addTransaction({
          mobile: data.mobile,
          amount: data.amount,
          operator: data.operator,
          planName: location.state?.selectedPlan?.name || `₹${data.amount} Recharge`,
          userName: user?.name || 'User'
        });
        alert('Recharge Successful!');
        navigate('/transactions');
      }
    } catch (error) {
      alert('Recharge failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:bg-gray-900 pb-24">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Recharge Now</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Mobile Number</label>
              <input
                type="tel"
                {...register('mobile')}
                maxLength="10"
                className={`w-full px-4 py-3 rounded border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#00B7B5] outline-none`}
              />
              {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Operator</label>
              <select
                {...register('operator')}
                className={`w-full px-4 py-3 rounded border ${errors.operator ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#00B7B5] outline-none`}
              >
                <option value="Airtel">Airtel</option>
                <option value="Jio">Jio</option>
                <option value="Vi">Vi</option>
                <option value="BSNL">BSNL</option>
              </select>
              {errors.operator && <p className="text-red-500 text-sm mt-1">{errors.operator.message}</p>}
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">Amount (₹)</label>
              <input
                type="number"
                {...register('amount')}
                min="10"
                max="5000"
                className={`w-full px-4 py-3 rounded border ${errors.amount ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#00B7B5] outline-none`}
              />
              {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#F3E2D4] hover:bg-[#E6D1C1] text-gray-800 py-3 rounded font-bold text-lg hover:shadow-lg transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Complete Recharge'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Recharge;
