import React, { useState, useEffect } from "react";
import Sidebar from "../../Navigation/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { isAuthenticated, getUserRole, logout } from "../../utils/auth";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Check authentication on mount
    if (!isAuthenticated()) {
      navigate('/auth/login');
      return;
    }

    // Get user role
    const role = getUserRole();
    if (!role) {
      logout();
      navigate('/auth/login');
      return;
    }

    setUserRole(role);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  if (!userRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Sidebar for desktop - Fixed */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-[24%] shadow-md z-30">
        <Sidebar />
      </div>

      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed bottom-10 right-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Mobile sidebar */}
      <div
        className={`lg:hidden fixed top-0 left-0 z-40 h-full w-[75%] shadow-md transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Content Section */}
      <div className="flex flex-1 lg:ml-[24%] bg-gray-50 overflow-y-auto min-h-screen">
        {/* Top Header */}
        <div className="w-full">
          <header className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  Welcome to Precision Scan Dashboard
                </h1>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="hidden md:block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  Role: <span className="font-bold">{userRole}</span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FiLogOut />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            </div>
          </header>
          
          {/* Main Content */}
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;