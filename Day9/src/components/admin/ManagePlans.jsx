import { useState } from 'react';
import { usePlans } from '../../context/PlanContext';
import PlanEditModal from './PlanEditModal';

const ManagePlans = () => {
  const { plans, deletePlan } = usePlans();
  const [editingPlan, setEditingPlan] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      deletePlan(id);
    }
  };

  return (
    <div className="bg-[#F3E2D4] dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Manage Plans</h2>
      
      {plans.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No plans available. Add some plans first.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-[#E6D1C1] dark:bg-gray-700">
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
      
      {editingPlan && (
        <PlanEditModal
          plan={editingPlan}
          onClose={() => setEditingPlan(null)}
        />
      )}
    </div>
  );
};

export default ManagePlans;