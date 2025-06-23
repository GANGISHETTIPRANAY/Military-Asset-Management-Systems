import { useState, useEffect } from "react";
import axios from "axios";
import { PackagePlus, Filter, ShoppingCart } from "lucide-react";

const Purchases = () => {
  const [form, setForm] = useState({
    base: "",
    equipmentType: "",
    quantity: "",
    date: "",
  });

  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [filter, setFilter] = useState({
    date: "",
    equipmentType: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/purchases")
      .then((res) => setPurchaseHistory(res.data))
      .catch((err) => console.error("Error fetching purchases:", err));
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFilterChange = (e) => {
    setFilter((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/purchases", form);
      setPurchaseHistory((prev) => [res.data.data, ...prev]);
      setForm({ base: "", equipmentType: "", quantity: "", date: "" });
    } catch (err) {
      console.error("Failed to submit purchase:", err);
    }
  };

  const filteredHistory = purchaseHistory.filter((entry) => {
    const matchesDate = !filter.date || entry.date === filter.date;
    const matchesType =
      !filter.equipmentType || entry.equipmentType === filter.equipmentType;
    return matchesDate && matchesType;
  });

  return (
    <div className="space-y-10 p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center gap-3">
        <ShoppingCart size={28} className="text-blue-600" />
        <h2 className="text-3xl font-bold text-gray-800">Purchase Assets</h2>
      </div>

      {/* ➕ Purchase Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-6 rounded-lg shadow-md"
      >
        <input
          name="base"
          value={form.base}
          onChange={handleChange}
          required
          placeholder="Base Name"
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
          <PackagePlus size={18} /> Add Purchase
        </button>
      </form>

      {/* 🔍 Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-gray-600" />
          <h3 className="text-xl font-semibold text-gray-800">Filter Purchase History</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="date"
            name="date"
            value={filter.date}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          />
          <select
            name="equipmentType"
            value={filter.equipmentType}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">All Types</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Weapon">Weapon</option>
            <option value="Ammunition">Ammunition</option>
          </select>
        </div>
      </div>

      {/* 📋 Purchase History */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Purchase History</h3>
        {filteredHistory.length === 0 ? (
          <p className="text-gray-500">No purchases match the filter.</p>
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
              {filteredHistory.map((entry) => (
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
