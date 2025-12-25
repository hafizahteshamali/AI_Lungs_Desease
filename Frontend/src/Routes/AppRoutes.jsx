import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import DashboardLayout from '../Layout/DashboardLayout/DashboardLayout';
import Layout from '../Layout/Layout/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

// Authentication Pages
import Login from '../pages/Authentication/Login';
import Register from '../pages/Authentication/Register';
import Forgot_Password from '../pages/Authentication/Forgot_Password';
import ResetPassword from '../pages/Authentication/Reset_Password';

// Dashboard Pages
import Admin_Dashboard from '../pages/Dashboards_pages/dashboard/Admin_Dashboard/Admin_Dashboard';
import Doctor_Dashboard from '../pages/Dashboards_pages/dashboard/Doctor_Dashboard/Doctor_Dashboard';
import Radiographer_Dashboard from '../pages/Dashboards_pages/dashboard/Radiographer_Dashboard/Radiographer_Dashboard';
import Patient_Dashboard from '../pages/Dashboards_pages/dashboard/Patient_Dashboard/Patient_Dashboard';

// X-Ray Management
import UploadXrays from '../pages/Dashboards_pages/x-rays-management/uploadXrays/UploadXrays';
import XrayHistory from '../pages/Dashboards_pages/x-rays-management/XrayHistory/XrayHistory';
import PredictionView from '../pages/Dashboards_pages/x-rays-management/PredictionView/PredictionView';

// Medicine Prescription
import AI_Recommend_Medicine from '../pages/Dashboards_pages/Medicine_Prescription/AI_Recommend_Medicine/AI_Recommend_Medicine';
import Prescription_Expert from '../pages/Dashboards_pages/Medicine_Prescription/Prescription_Expert/Prescription_Expert';

// Admin Management
import User_Managements from '../pages/Dashboards_pages/Admin_Management/User_Managements/User_Managements';
import Disease_Categories from '../pages/Dashboards_pages/Admin_Management/Disease_Categories/Disease_Categories';
import Medicine_Library from '../pages/Dashboards_pages/Admin_Management/Medicine_Library/Medicine_Library';
import System_Logs from '../pages/Dashboards_pages/Admin_Management/System_Logs/System_Logs';
import Analytical_Reports from '../pages/Dashboards_pages/Admin_Management/Analytical_Reports/Analytical_Reports';

// Settings
import Notifications from '../pages/Dashboards_pages/Notifications/Notifications';
import Profile_Settings from '../pages/Dashboards_pages/Settings/Profile_Settings/Profile_Settings';
import Theme from '../pages/Dashboards_pages/Settings/Theme/Theme';
import Language_Selection from '../pages/Dashboards_pages/Settings/Language_Selection/Language_Selection';
import Two_FA_Setup from '../pages/Dashboards_pages/Settings/2FA_Setup/Two_FA_Setup';

// Help & Support
import FAQs from '../pages/Dashboards_pages/Help_Support/FAQ/FAQs';
import Contact_Support from '../pages/Dashboards_pages/Help_Support/Contact_Support/Contact_Support';
import Documentation from '../pages/Dashboards_pages/Help_Support/Documentation/Documentation';

// Public Pages
import Home from '../pages/Home/Home';
import Contact from '../pages/Contact/Contact';
import About from '../pages/About/About';

// Unauthorized Page
import Unauthorized from '../pages/Authentication/Unauthorized';

// Dashboard Redirect Component
import DashboardRedirect from '../components/DashboardRedirect';

// Helper function for SuperAdmin access
const getAllowedRoles = (roles) => {
  // SUPER ADMIN ko automatically include karein (case-insensitive)
  return [...roles, 'SuperAdmin', 'superadmin', 'Super_Admin', 'super_admin'];
};

const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* Home Page with Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Authentication */}
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<Forgot_Password />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          {/* Default Dashboard - Auto Redirect based on role */}
          <Route index element={<DashboardRedirect />} />

          {/* Role-based dashboards - SuperAdmin ko sab ka access */}
          <Route path="admin" element={
            <ProtectedRoute allowedRoles={getAllowedRoles(['Admin'])}>
              <Admin_Dashboard />
            </ProtectedRoute>
          } />

          <Route path="doctor" element={
            <ProtectedRoute allowedRoles={getAllowedRoles(['Doctor'])}>
              <Doctor_Dashboard />
            </ProtectedRoute>
          } />

          <Route path="patient" element={
            <ProtectedRoute allowedRoles={getAllowedRoles(['Patient'])}>
              <Patient_Dashboard />
            </ProtectedRoute>
          } />

          <Route path="radiographer" element={
            <ProtectedRoute allowedRoles={getAllowedRoles(['Radiographer', 'Radiologist'])}>
              <Radiographer_Dashboard />
            </ProtectedRoute>
          } />

          {/* X-Ray Management - Role-based access */}
          <Route path="xray/upload" element={
            <ProtectedRoute allowedRoles={getAllowedRoles(['Doctor', 'Radiographer', 'Radiologist', 'Patient'])}>
              <UploadXrays />
            </ProtectedRoute>
          } />

          <Route path="xray/history" element={
            <ProtectedRoute allowedRoles={getAllowedRoles(['Doctor', 'Radiographer', 'Radiologist', 'Admin', 'Patient'])}>
              <XrayHistory />
            </ProtectedRoute>
          } />

          <Route path="xray/prediction/:id?" element={
            <ProtectedRoute allowedRoles={getAllowedRoles(['Doctor', 'Radiographer', 'Radiologist', 'Admin', 'Patient'])}>
              <PredictionView />
            </ProtectedRoute>
          } />

          {/* Medicine Prescription */}
          <Route path="medicines/ai" element={
            <ProtectedRoute allowedRoles={getAllowedRoles(['Doctor', 'Admin'])}>
              <AI_Recommend_Medicine />
            </ProtectedRoute>
          } />

          <Route path="medicines/export" element={
            <ProtectedRoute allowedRoles={getAllowedRoles(['Doctor', 'Admin', 'Patient'])}>
              <Prescription_Expert />
            </ProtectedRoute>
          } />

          {/* Admin Management - Admin & SuperAdmin */}
          <Route path="admin/users" element={
            <ProtectedRoute allowedRoles={getAllowedRoles(['Admin'])}>
              <User_Managements />
            </ProtectedRoute>
          } />

          <Route path="admin/diseases" element={
            <ProtectedRoute allowedRoles={getAllowedRoles(['Admin'])}>
              <Disease_Categories />
            </ProtectedRoute>
          } />

          <Route path="admin/medicines" element={
            <ProtectedRoute allowedRoles={getAllowedRoles(['Admin'])}>
              <Medicine_Library />
            </ProtectedRoute>
          } />

          <Route path="admin/logs" element={
            <ProtectedRoute allowedRoles={getAllowedRoles(['Admin'])}>
              <System_Logs />
            </ProtectedRoute>
          } />

          <Route path="admin/reports" element={
            <ProtectedRoute allowedRoles={getAllowedRoles(['Admin'])}>
              <Analytical_Reports />
            </ProtectedRoute>
          } />

          {/* Notifications - All roles */}
          <Route path="notifications" element={
            <ProtectedRoute allowedRoles={getAllowedRoles(['Patient', 'Doctor', 'Radiographer', 'Radiologist', 'Admin'])}>
              <Notifications />
            </ProtectedRoute>
          } />

          {/* Settings - All roles */}
          <Route path="settings/profile" element={
            <ProtectedRoute allowedRoles={getAllowedRoles(['Patient', 'Doctor', 'Radiographer', 'Radiologist', 'Admin'])}>
              <Profile_Settings />
            </ProtectedRoute>
          } />

          <Route path="settings/theme" element={
            <ProtectedRoute allowedRoles={getAllowedRoles(['Patient', 'Doctor', 'Radiographer', 'Radiologist', 'Admin'])}>
              <Theme />
            </ProtectedRoute>
          } />

          <Route path="settings/language" element={
            <ProtectedRoute allowedRoles={getAllowedRoles(['Patient', 'Doctor', 'Radiographer', 'Radiologist', 'Admin'])}>
              <Language_Selection />
            </ProtectedRoute>
          } />

          <Route path="settings/2fa" element={
            <ProtectedRoute allowedRoles={getAllowedRoles(['Patient', 'Doctor', 'Radiographer', 'Radiologist', 'Admin'])}>
              <Two_FA_Setup />
            </ProtectedRoute>
          } />

          {/* Help & Support - All roles */}
          <Route path="help/faq" element={
            <ProtectedRoute allowedRoles={getAllowedRoles(['Patient', 'Doctor', 'Radiographer', 'Radiologist', 'Admin'])}>
              <FAQs />
            </ProtectedRoute>
          } />

          <Route path="help/contact" element={
            <ProtectedRoute allowedRoles={getAllowedRoles(['Patient', 'Doctor', 'Radiographer', 'Radiologist', 'Admin'])}>
              <Contact_Support />
            </ProtectedRoute>
          } />

          <Route path="help/docs" element={
            <ProtectedRoute allowedRoles={getAllowedRoles(['Patient', 'Doctor', 'Radiographer', 'Radiologist', 'Admin'])}>
              <Documentation />
            </ProtectedRoute>
          } />

          {/* Catch-all route for dashboard */}
          <Route path="*" element={<DashboardRedirect />} />
        </Route>

        {/* Catch-all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default AppRoutes;