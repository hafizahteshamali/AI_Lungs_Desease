import React, { useState } from "react";
import Sidebar from "../../Navigation/Sidebar";
import { Outlet } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop - Fixed */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-[23%] bg-white shadow-md">
        <Sidebar />
      </div>

      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed bottom-6 right-6 !z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Mobile sidebar */}
      <div
        className={`md:hidden fixed top-0 left-0 z-40 h-full w-[100%] bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Content Section */}
      <div className="flex flex-1 md:ml-[23%] p-6 bg-gray-50 overflow-y-auto h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
