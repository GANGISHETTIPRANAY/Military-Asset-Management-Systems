import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart3,
  Building,
  Truck,
  ClipboardCheck,
  PackageCheck,
  PackageX,
  PlusCircle,
} from "lucide-react";

function Dashboard() {
  const role = localStorage.getItem("userRole");

  const [filters, setFilters] = useState({
    date: "",
    base: "",
    type: "",
  });

  const [stats, setStats] = useState({
    purchases: 0,
    transfersIn: 0,
    transfersOut: 0,
    assigned: 0,
    expended: 0,
    openingBalance: 100,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [purchaseRes, transferRes, assignmentRes] = await Promise.all([
        axios.get("http://localhost:5000/api/purchases"),
        axios.get("http://localhost:5000/api/transfers"),
        axios.get("http://localhost:5000/api/assignments"),
      ]);

      const purchases = purchaseRes.data;
      const transfers = transferRes.data;
      const assignments = assignmentRes.data;

      const filtered = (arr) =>
        arr.filter(
          (item) =>
            (!filters.date || item.date === filters.date) &&
            (!filters.base || item.base === filters.base || item.toBase === filters.base || item.fromBase === filters.base) &&
            (!filters.type || item.equipmentType === filters.type)
        );

      const filteredPurchases = filtered(purchases);
      const filteredTransfersIn = filtered(transfers.filter((t) => t.toBase === filters.base));
      const filteredTransfersOut = filtered(transfers.filter((t) => t.fromBase === filters.base));
      const filteredAssignments = filtered(assignments);

      const sum = (arr) =>
        arr.reduce((acc, item) => acc + Number(item.quantity || 0), 0);

      setStats({
        ...stats,
        purchases: sum(filteredPurchases),
        transfersIn: sum(filteredTransfersIn),
        transfersOut: sum(filteredTransfersOut),
        assigned: sum(filteredAssignments),
        expended: 0,
      });
    } catch (err) {
      console.error("Failed to fetch dashboard stats:", err);
    }
  };

  const netMovement = stats.purchases + stats.transfersIn - stats.transfersOut;

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchStats();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <BarChart3 size={28} className="text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      </div>

      <p className="text-gray-600 mb-6">
        Logged in as: <span className="font-semibold">{role}</span>
      </p>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleChange}
          className="border rounded p-2"
        />
        <select
          name="base"
          value={filters.base}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="">Select Base</option>
          <option value="Base A">Base A</option>
          <option value="Base B">Base B</option>
        </select>
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="border rounded p-2"
        >
          <option value="">Select Equipment Type</option>
          <option value="Vehicle">Vehicle</option>
          <option value="Weapon">Weapon</option>
          <option value="Ammunition">Ammunition</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Opening Balance" value={stats.openingBalance} icon={<Building />} color="bg-gray-300" />
        <Card title="Purchases" value={stats.purchases} icon={<PlusCircle />} color="bg-green-200" />
        <Card title="Transfers In" value={stats.transfersIn} icon={<Truck />} color="bg-blue-200" />
        <Card title="Transfers Out" value={stats.transfersOut} icon={<Truck />} color="bg-red-200" />
        <Card title="Assigned" value={stats.assigned} icon={<ClipboardCheck />} color="bg-yellow-200" />
        <Card title="Expended" value={stats.expended} icon={<PackageX />} color="bg-pink-200" />
        <Card
          title="Net Movement"
          value={netMovement}
          clickable
          breakdown={{
            purchases: stats.purchases,
            transfersIn: stats.transfersIn,
            transfersOut: stats.transfersOut,
          }}
          icon={<PackageCheck />}
          color="bg-indigo-200"
        />
      </div>
    </div>
  );
}

function Card({ title, value, icon, clickable = false, breakdown, color }) {
  const handleClick = () => {
    if (clickable && breakdown) {
      alert(`Net Movement Breakdown:
Purchases: ${breakdown.purchases}
Transfers In: ${breakdown.transfersIn}
Transfers Out: ${breakdown.transfersOut}

Formula: Purchases + Transfers In - Transfers Out`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`p-4 rounded-lg shadow-md border-l-4 ${color} transition hover:shadow-lg ${
        clickable ? "cursor-pointer border-blue-500" : "border-gray-300"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <span className="text-gray-600">{icon}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

export default Dashboard;
