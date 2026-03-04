import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, hasRole } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Check authentication
    const checkAuth = () => {
      const isAuth = isAuthenticated();
      
      if (!isAuth) {
        setIsValid(false);
        setIsChecking(false);
        return;
      }
      
      // Agar specific roles required hain toh check karein
      if (allowedRoles.length > 0) {
        const hasAccess = hasRole(allowedRoles);
        setIsValid(hasAccess);
      } else {
        setIsValid(true);
      }
      
      setIsChecking(false);
    };
    
    checkAuth();
    
    // ✅ FIX: Listen for storage changes (logout from other tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'token' && !e.newValue) {
        // Token remove ho gaya (kisi aur tab mein logout hua)
        setIsValid(false);
        setIsChecking(false);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [allowedRoles]);

  if (isChecking) {
    // Loading state
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isValid) {
    // Agar authenticated nahi hai toh login page par redirect
    if (!isAuthenticated()) {
      return <Navigate to="/auth/login" replace />;
    }
    // Agar role access nahi hai toh unauthorized page
    return <Navigate to="/auth/unauthorized" replace />;
  }
  
  return children;
};

export default ProtectedRoute;