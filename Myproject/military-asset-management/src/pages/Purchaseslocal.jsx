import { useState } from "react";
import { ShoppingCart, ClipboardList, Plus } from "lucide-react";

const Purchases = () => {
  const [form, setForm] = useState({
    base: "",
    equipmentType: "",
    quantity: "",
    date: "",
  });

  const [purchaseHistory, setPurchaseHistory] = useState([]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPurchase = {
      ...form,
      id: Date.now(),
    };

    setPurchaseHistory((prev) => [newPurchase, ...prev]);

    alert("✅ Purchase added successfully!");

    setForm({
      base: "",
      equipmentType: "",
      quantity: "",
      date: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-10">
      <div className="flex items-center gap-3">
        <ShoppingCart size={28} className="text-blue-600" />
        <h2 className="text-3xl font-bold text-gray-800">Record Equipment Purchases</h2>
      </div>

      {/* 🛒 Purchase Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-6 rounded-lg shadow-md"
      >
        <input
          name="base"
          value={form.base}
          onChange={handleChange}
          required
          placeholder="Base"
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
          className="col-span-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Add Purchase
        </button>
      </form>

      {/* 🧾 Purchase History */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList size={20} className="text-gray-600" />
          <h3 className="text-xl font-semibold text-gray-800">Purchase History</h3>
        </div>
        {purchaseHistory.length === 0 ? (
          <p className="text-gray-500">No purchases recorded yet.</p>
        ) : (
          <table className="w-full border text-center">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-2 border">Base</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {purchaseHistory.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-100 transition">
                  <td className="p-2 border">{entry.base}</td>
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

export default Purchases;
