import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardLayout from '../Layout/DashboardLayout/DashboardLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import Doctors from '../pages/Dashboard/Doctors/Doctors';
import Messages from '../pages/Dashboard/Messages/Messages';
import AI_Care from '../pages/Dashboard/AI_Care/AI_Care';
import Health_Records from '../pages/Dashboard/Health_Records/Health_Records';
import Prescriptions from '../pages/Dashboard/Prescriptions/Prescriptions';
import Billing_Insurance from '../pages/Dashboard/Billing_Insurance/Billing_Insurance';
import Resources from '../pages/Dashboard/Resources/Resources';
import Settings from '../pages/Dashboard/Settings/Settings';
import Help_Center from '../pages/Dashboard/Help_Center/Help_Center';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Dashboard Base Layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* Main Dashboard */}
        <Route index element={<Dashboard />} />

        {/* Appointments Nested Routes */}
        <Route path="appointments">
          <Route path="doctors" element={<Doctors />} />
          <Route path="messages" element={<Messages />} />
          <Route path="ai-care" element={<AI_Care />} />
        </Route>

        {/* Other Menu */}
        <Route path="health-records" element={<Health_Records />} />
        <Route path="prescriptions" element={<Prescriptions />} />
        <Route path="billing-insurance" element={<Billing_Insurance />} />
        <Route path="resources" element={<Resources />} />

        {/* Support */}
        <Route path="settings" element={<Settings />} />
        <Route path="help-center" element={<Help_Center />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
