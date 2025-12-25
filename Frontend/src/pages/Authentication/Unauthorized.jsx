import React from 'react';
import { Link } from 'react-router-dom';
import { FiLock, FiHome, FiLogIn } from 'react-icons/fi';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiLock className="text-red-600 text-3xl" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Access Denied
        </h1>
        
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        
        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiHome />
            Go to Dashboard
          </Link>
          
          <Link
            to="/auth/login"
            className="inline-flex items-center justify-center gap-2 w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FiLogIn />
            Login with Different Account
          </Link>
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            If you need access to this page, please contact your system administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;