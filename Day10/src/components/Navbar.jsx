import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-amber-600 to-orange-600 shadow-xl">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-white">MobileHub</h1>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="text-white hover:text-gray-200 font-medium hidden sm:block">Dashboard</Link>
          <Link to="/recharge" className="text-white hover:text-gray-200 font-medium hidden sm:block">Recharge</Link>
          <Link to="/plans" className="text-white hover:text-gray-200 font-medium hidden sm:block">Plans</Link>
          <Link to="/transactions" className="text-white hover:text-gray-200 font-medium hidden sm:block">History</Link>
          <Link to="/profile" className="text-white hover:text-gray-200 font-medium hidden sm:block">Profile</Link>
          <button onClick={toggleTheme} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-all duration-200">
            {isDark ? 'Light' : 'Dark'}
          </button>
          <button onClick={handleLogout} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-all duration-200">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
