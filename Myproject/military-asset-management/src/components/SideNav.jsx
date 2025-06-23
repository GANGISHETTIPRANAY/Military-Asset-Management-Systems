import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  ArrowRightLeft,
  ClipboardList,
  Shield,
  LogOut,
} from "lucide-react";

const SideNav = () => {
  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Purchases", path: "/purchases", icon: <ShoppingCart size={20} /> },
    { name: "Transfers", path: "/transfers", icon: <ArrowRightLeft size={20} /> },
    { name: "Assignments", path: "/assignments", icon: <ClipboardList size={20} /> },
    { name: "Expenditures", path: "/expenditures", icon: <Shield size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-white to-blue-50 shadow-xl border-r fixed top-0 left-0 flex flex-col justify-between">
      <div>
        <div className="p-6 border-b border-blue-200">
          <h1 className="text-2xl font-bold text-blue-600">Asset Tracker</h1>
          <p className="text-xs text-gray-500 mt-1">Military Inventory System</p>
        </div>

        <nav className="mt-4 px-4">
          <p className="text-sm text-gray-500 mb-2 px-2">Main Navigation</p>
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 my-1 rounded-md text-sm transition-all
                ${isActive ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-700 hover:bg-gray-100"}`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="m-4 flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-100 rounded-md transition"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
};

export default SideNav;
