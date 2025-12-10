import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-[#005461] to-[#018790] dark:from-gray-800 dark:to-gray-900 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-white">QuickRecharge</h1>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="text-white hover:text-gray-200 font-medium hidden sm:block">Dashboard</Link>
          <Link to="/recharge" className="text-white hover:text-gray-200 font-medium hidden sm:block">Recharge</Link>
          <Link to="/plans" className="text-white hover:text-gray-200 font-medium hidden sm:block">Plans</Link>
          <Link to="/transactions" className="text-white hover:text-gray-200 font-medium hidden sm:block">History</Link>
          <Link to="/profile" className="text-white hover:text-gray-200 font-medium hidden sm:block">Profile</Link>
          <button onClick={handleLogout} className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-semibold transition">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
