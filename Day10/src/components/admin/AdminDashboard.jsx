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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-slate-100 dark:bg-gray-900 pb-24">
      <AdminNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      

      
      <div className="container mx-auto px-4 pt-20 pb-8">

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