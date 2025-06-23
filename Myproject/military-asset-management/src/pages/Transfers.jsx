import { useState } from 'react';
import { ArrowRightLeft, ClipboardList, Send } from 'lucide-react';

const Transfers = () => {
  const [form, setForm] = useState({
    fromBase: '',
    toBase: '',
    equipmentType: '',
    quantity: '',
    date: '',
  });

  const [transferHistory, setTransferHistory] = useState([]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.fromBase === form.toBase) {
      alert("❌ 'From Base' and 'To Base' cannot be the same.");
      return;
    }

    const newTransfer = {
      ...form,
      id: Date.now(),
    };

    setTransferHistory((prev) => [newTransfer, ...prev]);

    alert('✅ Transfer recorded successfully!');

    setForm({
      fromBase: '',
      toBase: '',
      equipmentType: '',
      quantity: '',
      date: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-10">
      <div className="flex items-center gap-3">
        <ArrowRightLeft size={28} className="text-green-600" />
        <h2 className="text-3xl font-bold text-gray-800">Transfer Assets Between Bases</h2>
      </div>

      {/* 🔁 Transfer Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 bg-white p-6 rounded-lg shadow-md"
      >
        <input
          name="fromBase"
          value={form.fromBase}
          onChange={handleChange}
          required
          placeholder="From Base"
          className="p-2 border rounded"
        />
        <input
          name="toBase"
          value={form.toBase}
          onChange={handleChange}
          required
          placeholder="To Base"
          className="p-2 border rounded"
        />
        <input
          name="equipmentType"
          value={form.equipmentType}
          onChange={handleChange}
          required
          placeholder="Equipment Type"
          className="p-2 border rounded"
        />
        <input
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          type="number"
          required
          placeholder="Quantity"
          className="p-2 border rounded"
        />
        <input
          name="date"
          value={form.date}
          onChange={handleChange}
          type="date"
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="col-span-full bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-2"
        >
          <Send size={18} /> Add Transfer
        </button>
      </form>

      {/* 📋 Transfer History */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList size={20} className="text-gray-600" />
          <h3 className="text-xl font-semibold text-gray-800">Transfer History</h3>
        </div>
        {transferHistory.length === 0 ? (
          <p className="text-gray-500">No transfers yet.</p>
        ) : (
          <table className="w-full border text-center">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-2 border">From</th>
                <th className="p-2 border">To</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {transferHistory.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-100 transition">
                  <td className="p-2 border">{entry.fromBase}</td>
                  <td className="p-2 border">{entry.toBase}</td>
                  <td className="p-2 border">{entry.equipmentType}</td>
                  <td className="p-2 border">{entry.quantity}</td>
                  <td className="p-2 border">{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Transfers;
