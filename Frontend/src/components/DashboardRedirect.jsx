import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole, getUserRoles } from '../utils/auth';

const DashboardRedirect = () => {
  const userRole = getUserRole();
  const userRoles = getUserRoles();
  
  // SUPER ADMIN ko Admin dashboard par redirect karein
  if (userRoles.some(role => 
    role.toLowerCase() === 'superadmin' || 
    role.toLowerCase() === 'super_admin'
  )) {
    return <Navigate to="/dashboard/admin" replace />;
  }
  
  switch (userRole?.toLowerCase()) {
    case 'admin':
      return <Navigate to="/dashboard/admin" replace />;
    case 'doctor':
      return <Navigate to="/dashboard/doctor" replace />;
    case 'patient':
      return <Navigate to="/dashboard/patient" replace />;
    case 'radiographer':
    case 'radiologist':
      return <Navigate to="/dashboard/radiographer" replace />;
    default:
      return <Navigate to="/auth/login" replace />;
  }
};

export default DashboardRedirect;