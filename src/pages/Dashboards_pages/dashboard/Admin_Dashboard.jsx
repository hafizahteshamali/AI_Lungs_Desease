import React, { useState, useEffect } from 'react';
import { 
  MdPeople, MdMedicalInformation, MdLocalPharmacy, MdHistory, 
  MdAssessment, MdNotifications, MdEdit, MdDelete, MdAdd,
  MdSearch, MdFilterList, MdFileDownload, MdRefresh
} from "react-icons/md";

const Admin_Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [logs, setLogs] = useState([]);

  // Sample data initialization
  useEffect(() => {
    // Mock users data
    setUsers([
      { id: 1, name: 'Dr. Ronald Richards', email: 'ronald@hospital.com', role: 'Doctor', status: 'Active', joinDate: '2024-01-15' },
      { id: 2, name: 'Dr. Leslie Alexander', email: 'leslie@hospital.com', role: 'Radiographer', status: 'Active', joinDate: '2024-02-20' },
      { id: 3, name: 'Robert Fox', email: 'robert@hospital.com', role: 'Patient', status: 'Inactive', joinDate: '2024-03-10' },
      { id: 4, name: 'Dr. Damion Lewis', email: 'damion@hospital.com', role: 'Doctor', status: 'Active', joinDate: '2024-01-05' },
      { id: 5, name: 'Dianne Russell', email: 'dianne@hospital.com', role: 'Patient', status: 'Active', joinDate: '2024-04-01' }
    ]);

    // Mock diseases data
    setDiseases([
      { id: 1, name: 'Coronary Artery Disease', category: 'Cardiology', severity: 'High', cases: 125 },
      { id: 2, name: 'Diabetes Mellitus', category: 'Endocrinology', severity: 'Medium', cases: 89 },
      { id: 3, name: 'Chronic Kidney Disease', category: 'Nephrology', severity: 'High', cases: 67 },
      { id: 4, name: 'Pneumonia', category: 'Pulmonology', severity: 'Medium', cases: 156 },
      { id: 5, name: 'Osteoarthritis', category: 'Orthopedics', severity: 'Low', cases: 203 }
    ]);

    // Mock medicines data
    setMedicines([
      { id: 1, name: 'Paracetamol', dosage: '500mg', type: 'Tablet', stock: 4500, price: 2.50 },
      { id: 2, name: 'Amoxicillin', dosage: '250mg', type: 'Capsule', stock: 1200, price: 5.75 },
      { id: 3, name: 'Metformin', dosage: '500mg', type: 'Tablet', stock: 890, price: 3.20 },
      { id: 4, name: 'Atorvastatin', dosage: '20mg', type: 'Tablet', stock: 670, price: 8.90 },
      { id: 5, name: 'Losartan', dosage: '50mg', type: 'Tablet', stock: 340, price: 6.45 }
    ]);

    // Mock system logs
    setLogs([
      { id: 1, action: 'User Login', user: 'Dr. Ronald Richards', timestamp: '2024-12-26 09:15:23', ip: '192.168.1.45' },
      { id: 2, action: 'X-ray Upload', user: 'Dr. Leslie Alexander', timestamp: '2024-12-26 10:30:45', ip: '192.168.1.67' },
      { id: 3, action: 'Medicine Updated', user: 'Admin', timestamp: '2024-12-26 11:45:12', ip: '192.168.1.10' },
      { id: 4, action: 'Appointment Booked', user: 'Robert Fox', timestamp: '2024-12-26 13:20:34', ip: '192.168.1.89' },
      { id: 5, action: 'System Backup', user: 'System', timestamp: '2024-12-26 03:00:00', ip: '127.0.0.1' }
    ]);
  }, []);

  // Overview Cards Component
  const OverviewCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">1,248</h3>
            <p className="text-gray-600">Total Users</p>
          </div>
          <MdPeople className="text-3xl text-blue-500" />
        </div>
        <div className="mt-2 text-sm text-green-600">↑ 12% from last month</div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">45</h3>
            <p className="text-gray-600">Disease Categories</p>
          </div>
          <MdMedicalInformation className="text-3xl text-green-500" />
        </div>
        <div className="mt-2 text-sm text-green-600">↑ 5% from last month</div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">289</h3>
            <p className="text-gray-600">Medicines</p>
          </div>
          <MdLocalPharmacy className="text-3xl text-purple-500" />
        </div>
        <div className="mt-2 text-sm text-red-600">↓ 3% from last month</div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-orange-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">98.7%</h3>
            <p className="text-gray-600">System Uptime</p>
          </div>
          <MdAssessment className="text-3xl text-orange-500" />
        </div>
        <div className="mt-2 text-sm text-green-600">↑ 0.3% from last month</div>
      </div>
    </div>
  );

  // Users Management Component
  const UsersManagement = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Manage Users</h3>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <MdAdd /> Add New User
        </button>
      </div>
      
      <div className="flex gap-4 mb-4">
        <div className="flex-1 relative">
          <MdSearch className="absolute left-3 top-3 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg">
          <MdFilterList /> Filter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Join Date</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === 'Doctor' ? 'bg-blue-100 text-blue-800' :
                    user.role === 'Patient' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3">{user.joinDate}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <MdEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Diseases Management Component
  const DiseasesManagement = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Disease Categories</h3>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <MdAdd /> Add Disease
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {diseases.map(disease => (
          <div key={disease.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-gray-800">{disease.name}</h4>
              <span className={`px-2 py-1 rounded text-xs ${
                disease.severity === 'High' ? 'bg-red-100 text-red-800' :
                disease.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {disease.severity}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-2">Category: {disease.category}</p>
            <p className="text-blue-600 font-semibold">Cases: {disease.cases}</p>
            <div className="flex gap-2 mt-3">
              <button className="text-blue-600 text-sm flex items-center gap-1">
                <MdEdit /> Edit
              </button>
              <button className="text-red-600 text-sm flex items-center gap-1">
                <MdDelete /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Medicines Management Component
  const MedicinesManagement = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Medicine Library</h3>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg">
            <MdFileDownload /> Export
          </button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <MdAdd /> Add Medicine
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left">Medicine Name</th>
              <th className="px-4 py-3 text-left">Dosage</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map(medicine => (
              <tr key={medicine.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{medicine.name}</td>
                <td className="px-4 py-3">{medicine.dosage}</td>
                <td className="px-4 py-3">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs">{medicine.type}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={medicine.stock < 500 ? 'text-red-600 font-semibold' : 'text-green-600'}>
                    {medicine.stock.toLocaleString()}
                  </span>
                </td>
                <td className="px-4 py-3">${medicine.price}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <MdEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // System Logs Component
  const SystemLogs = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">System Logs</h3>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg">
          <MdRefresh /> Refresh
        </button>
      </div>

      <div className="space-y-4">
        {logs.map(log => (
          <div key={log.id} className="border-l-4 border-blue-500 pl-4 py-2 hover:bg-gray-50 rounded">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-gray-800">{log.action}</h4>
                <p className="text-sm text-gray-600">By: {log.user}</p>
              </div>
              <span className="text-xs text-gray-500">{log.timestamp}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">IP: {log.ip}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Good Morning, Admin!</h1>
        <p className="text-gray-600">Welcome to your dashboard</p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-md">
          {['overview', 'users', 'diseases', 'medicines', 'logs'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <>
            <OverviewCards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UsersManagement />
              <SystemLogs />
            </div>
          </>
        )}
        
        {activeTab === 'users' && <UsersManagement />}
        {activeTab === 'diseases' && <DiseasesManagement />}
        {activeTab === 'medicines' && <MedicinesManagement />}
        {activeTab === 'logs' && <SystemLogs />}
      </div>
    </div>
  );
};

export default Admin_Dashboard;