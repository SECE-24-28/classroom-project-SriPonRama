import { useState, useEffect } from 'react';
import axios from 'axios';
import PlanEditModal from './PlanEditModal';

const ManagePlans = () => {
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: '',
    operator: 'Airtel',
    price: '',
    validity: '',
    data: '',
    benefits: []
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await axios.get('https://6932a690e5a9e342d27043e1.mockapi.io/plans');
      setPlans(response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const handleAddPlan = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://6932a690e5a9e342d27043e1.mockapi.io/plans', {
        ...newPlan,
        price: parseInt(newPlan.price),
        validity: parseInt(newPlan.validity),
        benefits: newPlan.benefits.filter(b => b.trim() !== '')
      });
      setPlans([...plans, response.data]);
      setNewPlan({ name: '', operator: 'Airtel', price: '', validity: '', data: '', benefits: [] });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding plan:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        await axios.delete(`https://6932a690e5a9e342d27043e1.mockapi.io/plans/${id}`);
        setPlans(plans.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting plan:', error);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Manage Plans</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition"
        >
          Add New Plan
        </button>
      </div>
      
      {plans.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No plans available. Add some plans first.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-slate-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Name</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Operator</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Price</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Validity</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Data</th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} className="border-b dark:border-gray-600">
                  <td className="px-4 py-2 text-gray-800 dark:text-white">{plan.name}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-white">{plan.operator}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-white">₹{plan.price}</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-white">{plan.validity} days</td>
                  <td className="px-4 py-2 text-gray-800 dark:text-white">{plan.data}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => setEditingPlan(plan)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(plan.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Add New Plan</h3>
            <form onSubmit={handleAddPlan} className="space-y-4">
              <input
                type="text"
                placeholder="Plan Name"
                value={newPlan.name}
                onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                className="w-full p-2 border rounded text-black"
                required
              />
              <select
                value={newPlan.operator}
                onChange={(e) => setNewPlan({...newPlan, operator: e.target.value})}
                className="w-full p-2 border rounded text-black"
              >
                <option value="Airtel">Airtel</option>
                <option value="Jio">Jio</option>
                <option value="Vi">Vi</option>
                <option value="BSNL">BSNL</option>
              </select>
              <input
                type="number"
                placeholder="Price"
                value={newPlan.price}
                onChange={(e) => setNewPlan({...newPlan, price: e.target.value})}
                className="w-full p-2 border rounded text-black"
                required
              />
              <input
                type="number"
                placeholder="Validity (days)"
                value={newPlan.validity}
                onChange={(e) => setNewPlan({...newPlan, validity: e.target.value})}
                className="w-full p-2 border rounded text-black"
                required
              />
              <input
                type="text"
                placeholder="Data (e.g., 1.5GB/day)"
                value={newPlan.data}
                onChange={(e) => setNewPlan({...newPlan, data: e.target.value})}
                className="w-full p-2 border rounded text-black"
                required
              />
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add Plan</button>
                <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {editingPlan && (
        <PlanEditModal
          plan={editingPlan}
          onClose={() => setEditingPlan(null)}
          onUpdate={fetchPlans}
        />
      )}
    </div>
  );
};

export default ManagePlans;