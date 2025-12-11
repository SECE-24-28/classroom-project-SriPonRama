import { useState } from 'react';
import AdminStats from './AdminStats';
import UserList from './UserList';
import ManagePlans from './ManagePlans';
import AllTransactions from './AllTransactions';
import AdminNavbar from './AdminNavbar';
import Footer from '../Footer';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('stats');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      <AdminNavbar />
      
      <header className="fixed top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-2 rounded ${
                activeTab === 'stats'
                  ? 'bg-[#F3E2D4] text-gray-800'
                  : 'bg-[#E6D1C1] text-gray-700 hover:bg-[#F3E2D4]'
              }`}
            >
              Statistics
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded ${
                activeTab === 'users'
                  ? 'bg-[#F3E2D4] text-gray-800'
                  : 'bg-[#E6D1C1] text-gray-700 hover:bg-[#F3E2D4]'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('plans')}
              className={`px-4 py-2 rounded ${
                activeTab === 'plans'
                  ? 'bg-[#F3E2D4] text-gray-800'
                  : 'bg-[#E6D1C1] text-gray-700 hover:bg-[#F3E2D4]'
              }`}
            >
              Manage Plans
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-4 py-2 rounded ${
                activeTab === 'transactions'
                  ? 'bg-[#F3E2D4] text-gray-800'
                  : 'bg-[#E6D1C1] text-gray-700 hover:bg-[#F3E2D4]'
              }`}
            >
              Transactions
            </button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 pt-32 pb-8">

        <div>
          {activeTab === 'stats' && <AdminStats />}
          {activeTab === 'users' && <UserList />}
          {activeTab === 'plans' && <ManagePlans />}
          {activeTab === 'transactions' && <AllTransactions />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;