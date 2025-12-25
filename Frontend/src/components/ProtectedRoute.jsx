import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, hasRole } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const isAuth = isAuthenticated();
  
  // Agar authenticated nahi hai toh login page par redirect
  if (!isAuth) {
    return <Navigate to="/auth/login" replace />;
  }
  
  // Agar specific roles required hain toh check karein
  if (allowedRoles.length > 0) {
    const hasAccess = hasRole(allowedRoles);
    
    if (!hasAccess) {
      return <Navigate to="/auth/unauthorized" replace />;
    }
  }
  
  return children;
};

export default ProtectedRoute;