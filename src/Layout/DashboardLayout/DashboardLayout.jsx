import React from 'react';
import Sidebar from '../../Navigation/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className='flex min-h-screen'>
      {/* Sidebar Section */}
      <div className='w-[250px] bg-white shadow-md'>
        <Sidebar />
      </div>

      {/* Content Section */}
      <div className='flex-1 p-6 bg-gray-50 overflow-y-auto'>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
