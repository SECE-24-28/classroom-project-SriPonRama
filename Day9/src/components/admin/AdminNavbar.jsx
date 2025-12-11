import { useAuth } from '../../context/AuthContext.jsx';
import ThemeToggle from '../ThemeToggle';

const AdminNavbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#F3E2D4] dark:bg-gray-800 shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center flex-nowrap">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Admin Panel
        </h1>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;