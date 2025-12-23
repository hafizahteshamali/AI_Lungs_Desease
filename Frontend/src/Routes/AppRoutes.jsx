import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../Layout/DashboardLayout/DashboardLayout';
import Login from '../pages/Authentication/Login';
import Register from '../pages/Authentication/Register';
import Forgot_Password from '../pages/Authentication/Forgot_Password';
import ResetPassword from '../pages/Authentication/Reset_Password';
import Admin_Dashboard from '../pages/Dashboards_pages/dashboard/Admin_Dashboard/Admin_Dashboard';
import Doctor_Dashboard from '../pages/Dashboards_pages/dashboard/Doctor_Dashboard/Doctor_Dashboard';
import Radiographer_Dashboard from '../pages/Dashboards_pages/dashboard/Radiographer_Dashboard/Radiographer_Dashboard';
import Patient_Dashboard from '../pages/Dashboards_pages/dashboard/Patient_Dashboard/Patient_Dashboard';
import UploadXrays from '../pages/Dashboards_pages/x-rays-management/uploadXrays/UploadXrays';
import XrayHistory from '../pages/Dashboards_pages/x-rays-management/XrayHistory/XrayHistory';
import PredictionView from '../pages/Dashboards_pages/x-rays-management/PredictionView/PredictionView';
import AppointmentBooks from '../pages/Dashboards_pages/Appointments/Appointments_Book/AppointmentBooks';
import ManageAppointments from '../pages/Dashboards_pages/Appointments/ManageAppointments/ManageAppointments';
import AppointmentsHistory from '../pages/Dashboards_pages/Appointments/AppointmentsHistory/AppointmentsHistory';
import AI_Recommend_Medicine from '../pages/Dashboards_pages/Medicine_Prescription/AI_Recommend_Medicine/AI_Recommend_Medicine';
import Prescription_Expert from '../pages/Dashboards_pages/Medicine_Prescription/Prescription_Expert/Prescription_Expert';
import User_Managements from '../pages/Dashboards_pages/Admin_Management/User_Managements/User_Managements';
import Disease_Categories from '../pages/Dashboards_pages/Admin_Management/Disease_Categories/Disease_Categories';
import Medicine_Library from '../pages/Dashboards_pages/Admin_Management/Medicine_Library/Medicine_Library';
import System_Logs from '../pages/Dashboards_pages/Admin_Management/System_Logs/System_Logs';
import Analytical_Reports from '../pages/Dashboards_pages/Admin_Management/Analytical_Reports/Analytical_Reports';
import Notifications from '../pages/Dashboards_pages/Notifications/Notifications';
import Profile_Settings from '../pages/Dashboards_pages/Settings/Profile_Settings/Profile_Settings';
import Theme from '../pages/Dashboards_pages/Settings/Theme/Theme';
import Language_Selection from '../pages/Dashboards_pages/Settings/Language_Selection/Language_Selection';
import Two_FA_Setup from '../pages/Dashboards_pages/Settings/2FA_Setup/Two_FA_Setup';
import FAQs from '../pages/Dashboards_pages/Help_Support/FAQ/FAQs';
import Contact_Support from '../pages/Dashboards_pages/Help_Support/Contact_Support/Contact_Support';
import Documentation from '../pages/Dashboards_pages/Help_Support/Documentation/Documentation';

// Import new components (you'll need to create these)

import Home from '../pages/Home/Home';
import Contact from '../pages/Contact/Contact';
import About from '../pages/About/About';
import Layout from '../Layout/Layout/Layout';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home Page as root */}
      <Route path="/" element={<Layout />}>
      {/* Public Pages */}
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      </Route>
      

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
        <Route path="xray/upload" element={<UploadXrays />} />
        <Route path="xray/history" element={<XrayHistory />} />
        <Route path="xray/prediction" element={<PredictionView />} />
        <Route path="appointments/book" element={<AppointmentBooks />} />
        <Route path="appointments/manage" element={<ManageAppointments />} />
        <Route path="appointments/history" element={<AppointmentsHistory />} />
        <Route path="medicines/ai" element={<AI_Recommend_Medicine />} />
        <Route path="medicines/export" element={<Prescription_Expert />} />
        <Route path="admin/users" element={<User_Managements />} />
        <Route path="admin/diseases" element={<Disease_Categories />} />
        <Route path="admin/medicines" element={<Medicine_Library />} />
        <Route path="admin/logs" element={<System_Logs />} />
        <Route path="admin/reports" element={<Analytical_Reports />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings/profile" element={<Profile_Settings />} />
        <Route path="settings/theme" element={<Theme />} />
        <Route path="settings/language" element={<Language_Selection />} />
        <Route path="settings/2fa" element={<Two_FA_Setup />} />
        <Route path="help/faq" element={<FAQs />} />
        <Route path="help/contact" element={<Contact_Support />} />
        <Route path="help/docs" element={<Documentation />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;