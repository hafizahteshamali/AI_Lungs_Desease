import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../Layout/DashboardLayout/DashboardLayout';
import Login from '../pages/Authentication/Login';
import Register from '../pages/Authentication/Register';
import Forgot_Password from '../pages/Authentication/Forgot_Password';
import ResetPassword from '../pages/Authentication/Reset_Password';
import Admin_Dashboard from '../pages/Dashboards_pages/dashboard/Admin_Dashboard';
import Doctor_Dashboard from '../pages/Dashboards_pages/dashboard/Doctor_Dashboard';
import Patient_Dashboard from '../pages/Dashboards_pages/dashboard/Patient_Dashboard';
import Radiographer_Dashboard from '../pages/Dashboards_pages/dashboard/Radiographer_Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect root → login */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />

      {/* Authentication */}
      <Route path="/auth">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<Forgot_Password />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      {/* Dashboard Base Layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* Role-based dashboards */}
        <Route path="admin" element={<Admin_Dashboard />} />
        <Route path="doctor" element={<Doctor_Dashboard />} />
        <Route path="patient" element={<Patient_Dashboard />} />
        <Route path="radiographer" element={<Radiographer_Dashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
