import { useState, useEffect } from "react";
import axios from "axios";
import { ClipboardList, CalendarDays, BadgeCheck } from "lucide-react";

const Assignments = () => {
  const [form, setForm] = useState({
    base: "",
    equipmentType: "",
    assignedTo: "",
    quantity: "",
    date: "",
  });

  const [assignmentHistory, setAssignmentHistory] = useState([]);
  const [filter, setFilter] = useState({
    date: "",
    equipmentType: "",
  });

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/assignments");
      setAssignmentHistory(res.data);
    } catch (err) {
      console.error("Error fetching assignments", err);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFilterChange = (e) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/assignments", form);
      setAssignmentHistory((prev) => [res.data.data, ...prev]);
      setForm({ base: "", equipmentType: "", assignedTo: "", quantity: "", date: "" });
    } catch (err) {
      console.error("Error submitting assignment", err);
    }
  };

  const filteredHistory = assignmentHistory.filter((entry) => {
    const matchesDate = !filter.date || entry.date === filter.date;
    const matchesType = !filter.equipmentType || entry.equipmentType === filter.equipmentType;
    return matchesDate && matchesType;
  });

  return (
    <div className="space-y-10 p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-2">
        <ClipboardList className="text-blue-600" size={30} />
        <h2 className="text-3xl font-bold text-gray-800">Assign Assets</h2>
      </div>

      {/* ➕ Assignment Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 bg-white p-6 rounded-xl shadow-lg"
      >
        {["base", "equipmentType", "assignedTo", "quantity"].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            required
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="p-2 border rounded-md"
            type={field === "quantity" ? "number" : "text"}
          />
        ))}
        <input
          name="date"
          value={form.date}
          onChange={handleChange}
          type="date"
          required
          className="p-2 border rounded-md"
        />
        <button
          type="submit"
          className="col-span-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit Assignment
        </button>
      </form>

      {/* 🔍 Filter Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <CalendarDays className="text-gray-600" /> Filter Assignment History
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="date"
            name="date"
            value={filter.date}
            onChange={handleFilterChange}
            className="p-2 border rounded-md"
          />
          <select
            name="equipmentType"
            value={filter.equipmentType}
            onChange={handleFilterChange}
            className="p-2 border rounded-md"
          >
            <option value="">All Types</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Weapon">Weapon</option>
            <option value="Ammunition">Ammunition</option>
          </select>
        </div>
      </div>

      {/* 📋 Assignment History */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BadgeCheck className="text-gray-600" /> Assignment History
        </h3>
        {filteredHistory.length === 0 ? (
          <p className="text-gray-500">No assignments match the filter.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border text-center text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border">Base</th>
                  <th className="p-2 border">Type</th>
                  <th className="p-2 border">Assigned To</th>
                  <th className="p-2 border">Qty</th>
                  <th className="p-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="p-2 border">{entry.base}</td>
                    <td className="p-2 border">{entry.equipmentType}</td>
                    <td className="p-2 border">{entry.assignedTo}</td>
                    <td className="p-2 border">{entry.quantity}</td>
                    <td className="p-2 border">{entry.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignments;
