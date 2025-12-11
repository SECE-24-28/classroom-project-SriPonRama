import { useTransactions } from '../context/TransactionContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Transactions = () => {
  const { transactions } = useTransactions();

  const handlePrint = () => {
    const printContent = `
      <h2>Transaction History</h2>
      <table border="1" style="width:100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Date</th>
            <th>Mobile</th>
            <th>Operator</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${transactions.map(t => `
            <tr>
              <td>${t.date}</td>
              <td>${t.mobile}</td>
              <td>${t.operator}</td>
              <td>₹${t.amount}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const handleDownload = () => {
    const csvContent = [
      ['Date', 'Mobile', 'Operator', 'Amount'],
      ...transactions.map(t => [t.date, t.mobile, t.operator, t.amount])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Transaction History</h2>
          {transactions.length > 0 && (
            <div className="flex gap-4">
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-[#F3E2D4] hover:bg-[#E6D1C1] text-gray-800 rounded font-semibold transition"
              >
                Print
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-[#F3E2D4] hover:bg-[#E6D1C1] text-gray-800 rounded font-semibold transition"
              >
                Download CSV
              </button>
            </div>
          )}
        </div>
        
        {transactions.length === 0 ? (
          <div className="bg-[#F3E2D4] dark:bg-gray-800 rounded shadow-lg p-12 text-center">
            <p className="text-xl text-gray-800 dark:text-gray-400">No transactions yet</p>
          </div>
        ) : (
          <div className="bg-[#F3E2D4] dark:bg-gray-800 rounded shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#E6D1C1] dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Date</th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Mobile</th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Operator</th>
                    <th className="px-6 py-4 text-left text-gray-700 dark:text-gray-300 font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(t => (
                    <tr key={t.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{t.date}</td>
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{t.mobile}</td>
                      <td className="px-6 py-4 text-gray-800 dark:text-gray-300">{t.operator}</td>
                      <td className="px-6 py-4 text-green-600 dark:text-green-400 font-bold">₹{t.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Transactions;
