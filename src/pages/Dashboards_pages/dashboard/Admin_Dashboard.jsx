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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">1,248</h3>
            <p className="text-gray-600">Total Users</p>
          </div>
          <MdPeople className="text-3xl text-blue-500" />
        </div>
        <div className="mt-2 text-sm text-green-600">↑ 12% from last month</div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">45</h3>
            <p className="text-gray-600">Disease Categories</p>
          </div>
          <MdMedicalInformation className="text-3xl text-green-500" />
        </div>
        <div className="mt-2 text-sm text-green-600">↑ 5% from last month</div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">289</h3>
            <p className="text-gray-600">Medicines</p>
          </div>
          <MdLocalPharmacy className="text-3xl text-purple-500" />
        </div>
        <div className="mt-2 text-sm text-red-600">↓ 3% from last month</div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-orange-500">
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

  // Users Management Component - Mobile First Design
  const UsersManagement = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-xl font-bold text-gray-800">Manage Users</h3>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center">
          <MdAdd /> Add New User
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1 relative">
          <MdSearch className="absolute left-3 top-3 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded justify-center text-sm">
          <MdFilterList /> Filter
        </button>
      </div>

      {/* Mobile Cards View */}
      <div className="space-y-3 sm:hidden">
        {users.map(user => (
          <div key={user.id} className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-800">{user.name}</h4>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {user.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div>
                <span className="text-gray-500">Role:</span>
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  user.role === 'Doctor' ? 'bg-blue-100 text-blue-800' :
                  user.role === 'Patient' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {user.role}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Join Date:</span>
                <span className="ml-2">{user.joinDate}</span>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button className="text-blue-600 hover:text-blue-800 p-1">
                <MdEdit className="text-lg" />
              </button>
              <button className="text-red-600 hover:text-red-800 p-1">
                <MdDelete className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-visible">
        <div className="grid grid-cols-1 gap-4">
          {users.map(user => (
            <div key={user.id} className="grid grid-cols-12 gap-4 items-center p-4 border-b hover:bg-gray-50">
              <div className="col-span-3">
                <div className="font-medium text-gray-800">{user.name}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
              </div>
              <div className="col-span-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  user.role === 'Doctor' ? 'bg-blue-100 text-blue-800' :
                  user.role === 'Patient' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {user.role}
                </span>
              </div>
              <div className="col-span-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.status}
                </span>
              </div>
              <div className="col-span-3 text-sm text-gray-600">{user.joinDate}</div>
              <div className="col-span-2 flex gap-2 justify-end">
                <button className="text-blue-600 hover:text-blue-800 p-1">
                  <MdEdit className="text-lg" />
                </button>
                <button className="text-red-600 hover:text-red-800 p-1">
                  <MdDelete className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Diseases Management Component
  const DiseasesManagement = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-xl font-bold text-gray-800">Disease Categories</h3>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center">
          <MdAdd /> Add Disease
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {diseases.map(disease => (
          <div key={disease.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
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
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-xl font-bold text-gray-800">Medicine Library</h3>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded justify-center text-sm w-full sm:w-auto">
            <MdFileDownload /> Export
          </button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center">
            <MdAdd /> Add Medicine
          </button>
        </div>
      </div>

      {/* Mobile Cards View */}
      <div className="space-y-3 sm:hidden">
        {medicines.map(medicine => (
          <div key={medicine.id} className="bg-gray-50 p-4 rounded-lg border">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-800">{medicine.name}</h4>
                <p className="text-sm text-gray-600">{medicine.dosage} • {medicine.type}</p>
              </div>
              <span className={`text-sm font-semibold ${medicine.stock < 500 ? 'text-red-600' : 'text-green-600'}`}>
                {medicine.stock.toLocaleString()}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm mb-3">
              <div>
                <span className="text-gray-500">Type:</span>
                <span className="ml-2 bg-gray-100 px-2 py-1 rounded text-xs">{medicine.type}</span>
              </div>
              <div>
                <span className="text-gray-500">Price:</span>
                <span className="ml-2 font-semibold">${medicine.price}</span>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button className="text-blue-600 hover:text-blue-800 p-1">
                <MdEdit className="text-lg" />
              </button>
              <button className="text-red-600 hover:text-red-800 p-1">
                <MdDelete className="text-lg" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-visible">
        <div className="grid grid-cols-1 gap-4">
          {medicines.map(medicine => (
            <div key={medicine.id} className="grid grid-cols-12 gap-4 items-center p-4 border-b hover:bg-gray-50">
              <div className="col-span-3">
                <div className="font-medium text-gray-800">{medicine.name}</div>
                <div className="text-sm text-gray-600">{medicine.dosage}</div>
              </div>
              <div className="col-span-2">
                <span className="bg-gray-100 px-2 py-1 rounded text-xs">{medicine.type}</span>
              </div>
              <div className="col-span-2">
                <span className={medicine.stock < 500 ? 'text-red-600 font-semibold' : 'text-green-600'}>
                  {medicine.stock.toLocaleString()}
                </span>
              </div>
              <div className="col-span-2 font-semibold">${medicine.price}</div>
              <div className="col-span-3 flex gap-2 justify-end">
                <button className="text-blue-600 hover:text-blue-800 p-1">
                  <MdEdit className="text-lg" />
                </button>
                <button className="text-red-600 hover:text-red-800 p-1">
                  <MdDelete className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // System Logs Component
  const SystemLogs = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-xl font-bold text-gray-800">System Logs</h3>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded justify-center text-sm w-full sm:w-auto">
          <MdRefresh /> Refresh
        </button>
      </div>

      <div className="space-y-4">
        {logs.map(log => (
          <div key={log.id} className="border-l-4 border-blue-500 pl-4 py-3 hover:bg-gray-50 rounded">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{log.action}</h4>
                <p className="text-gray-600 text-sm">By: {log.user}</p>
                <p className="text-gray-500 text-xs mt-1">IP: {log.ip}</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-500 block">{log.timestamp.split(' ')[0]}</span>
                <span className="text-sm text-gray-500">{log.timestamp.split(' ')[1]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Good Morning, Admin!</h1>
        <p className="text-gray-600">Welcome to your dashboard</p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-1 bg-white rounded-lg p-1 shadow-sm">
          {['overview', 'users', 'diseases', 'medicines', 'logs'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[120px] py-3 px-4 rounded-md text-sm font-medium transition-colors ${
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