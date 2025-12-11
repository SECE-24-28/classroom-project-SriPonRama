import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-500 to-teal-400 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/70 via-emerald-500/70 to-teal-400/70"></div>
      <div className="relative z-10">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">
          QuickRecharge
        </h1>
        <div className="space-x-4">
          <Link to="/login" className="px-6 py-2 bg-[#F3E2D4] text-gray-800 rounded-lg font-semibold hover:bg-[#E6D1C1] transition">
            Login
          </Link>
          <Link to="/signup" className="px-6 py-2 bg-[#F3E2D4] text-gray-800 rounded-lg font-semibold hover:bg-[#E6D1C1] transition">
            Sign Up
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-20 text-center text-white">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">
          Instant Mobile Recharge
        </h2>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
          Recharge your mobile in seconds. All operators. Best plans. Secure payments.
        </p>
        <Link to="/signup" className="inline-block px-10 py-4 bg-[#F3E2D4] text-gray-800 rounded text-xl font-bold hover:bg-[#E6D1C1] transform hover:scale-105 transition">
          Get Started Free
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded p-8">
            <h3 className="text-2xl font-bold mb-2">Instant Recharge</h3>
            <p>Recharge in seconds with just a few clicks</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded p-8">
            <h3 className="text-2xl font-bold mb-2">Best Plans</h3>
            <p>Compare and choose from hundreds of plans</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded p-8">
            <h3 className="text-2xl font-bold mb-2">100% Secure</h3>
            <p>Your data and payments are completely safe</p>
          </div>
        </div>
      </div>
      <Footer />
      </div>
    </div>
  );
};

export default Landing;
