import React, { useState, useEffect } from 'react';
import {
  FaUserMd, FaUser, FaHospital, FaCheckCircle, FaTimesCircle,
  FaEdit, FaTrash, FaSearch, FaFilter, FaEye, FaLock, FaUnlock,
  FaEnvelope, FaPhone, FaCalendarAlt, FaIdCard, FaCity, FaMapMarkerAlt,
  FaUserShield, FaUserCheck, FaUserTimes, FaSortAmountDown, FaSortAmountUp
} from 'react-icons/fa';
import { GiHospitalCross } from 'react-icons/gi';

const User_Managements = () => {
  // State for users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Dr. Ahmed Raza",
      email: "ahmed.raza@hospital.com",
      phone: "+92 300 1234567",
      type: "doctor",
      status: "pending",
      registrationDate: "2024-01-15",
      hospital: "Aga Khan Hospital",
      specialization: "Radiology",
      city: "Karachi",
      verified: false,
      lastActive: "2024-02-05"
    },
    {
      id: 2,
      name: "Dr. Fatima Khan",
      email: "fatima.khan@clinic.com",
      phone: "+92 321 9876543",
      type: "doctor",
      status: "approved",
      registrationDate: "2024-01-10",
      hospital: "Shaukat Khanum Hospital",
      specialization: "Oncology",
      city: "Lahore",
      verified: true,
      lastActive: "2024-02-06"
    },
    {
      id: 3,
      name: "Dr. Zainab Ali",
      email: "zainab.ali@diagnostic.com",
      phone: "+92 333 4567890",
      type: "doctor",
      status: "approved",
      registrationDate: "2024-01-05",
      hospital: "Pakistan Institute of Medical Sciences",
      specialization: "Diagnostic Imaging",
      city: "Islamabad",
      verified: true,
      lastActive: "2024-02-06"
    },
    {
      id: 4,
      name: "Mohammad Hassan",
      email: "mohammad.hassan@gmail.com",
      phone: "+92 311 2345678",
      type: "patient",
      status: "active",
      registrationDate: "2024-01-20",
      hospital: "",
      specialization: "",
      city: "Karachi",
      verified: false,
      lastActive: "2024-02-04"
    },
    {
      id: 5,
      name: "Ayesha Malik",
      email: "ayesha.malik@hotmail.com",
      phone: "+92 322 3456789",
      type: "patient",
      status: "active",
      registrationDate: "2024-01-18",
      hospital: "",
      specialization: "",
      city: "Lahore",
      verified: true,
      lastActive: "2024-02-05"
    },
    {
      id: 6,
      name: "Bilal Abbas",
      email: "bilal.abbas@gmail.com",
      phone: "+92 334 5678901",
      type: "patient",
      status: "inactive",
      registrationDate: "2024-01-12",
      hospital: "",
      specialization: "",
      city: "Rawalpindi",
      verified: false,
      lastActive: "2024-01-25"
    },
    {
      id: 7,
      name: "Dr. Usman Sheikh",
      email: "usman.sheikh@ruralclinic.com",
      phone: "+92 344 6789012",
      type: "doctor",
      status: "pending",
      registrationDate: "2024-01-25",
      hospital: "Rural Health Center",
      specialization: "General Physician",
      city: "Quetta",
      verified: false,
      lastActive: "2024-02-03"
    },
    {
      id: 8,
      name: "Sarah Johnson",
      email: "sarah.j@clinic.com",
      phone: "+92 355 7890123",
      type: "admin",
      status: "active",
      registrationDate: "2024-01-08",
      hospital: "System Administrator",
      specialization: "IT Support",
      city: "Islamabad",
      verified: true,
      lastActive: "2024-02-06"
    }
  ]);

  // State for filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'edit', 'delete', 'view', 'approve'
  const [editedUser, setEditedUser] = useState(null);

  // Get unique cities for filter
  const cities = ['all', ...new Set(users.map(user => user.city).filter(city => city))];
  
  // Filter and sort users
  const filteredUsers = users
    .filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm) ||
        user.hospital.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === 'all' || user.type === selectedType;
      const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
      const matchesCity = selectedCity === 'all' || user.city === selectedCity;
      
      return matchesSearch && matchesType && matchesStatus && matchesCity;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'registrationDate') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Handle user actions
  const handleApproveDoctor = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: 'approved', verified: true }
        : user
    ));
  };

  const handleRejectDoctor = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: 'rejected' }
        : user
    ));
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    setShowModal(false);
  };

  const handleEditUser = () => {
    setUsers(users.map(user => 
      user.id === editedUser.id ? editedUser : user
    ));
    setShowModal(false);
    setEditedUser(null);
  };

  const handleToggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { 
            ...user, 
            status: user.status === 'active' ? 'inactive' : 'active',
            lastActive: user.status === 'active' ? user.lastActive : new Date().toISOString().split('T')[0]
          }
        : user
    ));
  };

  // Modal handlers
  const openModal = (type, user = null) => {
    setModalType(type);
    setSelectedUser(user);
    if (type === 'edit') {
      setEditedUser({ ...user });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setEditedUser(null);
  };

  // Stats calculations
  const stats = {
    total: users.length,
    doctors: users.filter(u => u.type === 'doctor').length,
    patients: users.filter(u => u.type === 'patient').length,
    admins: users.filter(u => u.type === 'admin').length,
    pending: users.filter(u => u.status === 'pending').length,
    approved: users.filter(u => u.status === 'approved').length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case 'approved':
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  // Get user type icon
  const getUserTypeIcon = (type) => {
    switch(type) {
      case 'doctor':
        return <FaUserMd className="text-blue-600" />;
      case 'admin':
        return <FaUserShield className="text-purple-600" />;
      default:
        return <FaUser className="text-green-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            User Management System
          </h1>
          <p className="text-gray-600">
            Manage and approve doctors, edit/delete users, and monitor user activity
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaUser className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Doctors</p>
                <p className="text-2xl font-bold text-gray-900">{stats.doctors}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FaUserMd className="text-2xl text-green-600" />
              </div>
            </div>
            <div className="mt-2 text-sm">
              <span className="text-yellow-600">{stats.pending} pending</span>
              <span className="mx-2">•</span>
              <span className="text-green-600">{stats.approved} approved</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Patients</p>
                <p className="text-2xl font-bold text-gray-900">{stats.patients}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <FaUser className="text-2xl text-purple-600" />
              </div>
            </div>
            <div className="mt-2 text-sm">
              <span className="text-green-600">{stats.active} active</span>
              <span className="mx-2">•</span>
              <span className="text-gray-600">{stats.inactive} inactive</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Admins</p>
                <p className="text-2xl font-bold text-gray-900">{stats.admins}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <FaUserShield className="text-2xl text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 w-full">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name, email, phone, or hospital..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="doctor">Doctors</option>
                <option value="patient">Patients</option>
                <option value="admin">Admins</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city === 'all' ? 'All Cities' : city}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2"
              >
                {sortOrder === 'asc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
                Sort
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hospital/City
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          {getUserTypeIcon(user.type)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                            {user.verified && (
                              <FaCheckCircle className="inline ml-1 text-green-500" size={14} />
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-xs text-gray-400">{user.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">{user.type}</div>
                      {user.type === 'doctor' && (
                        <div className="text-xs text-gray-500">{user.specialization}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.hospital || 'N/A'}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <FaMapMarkerAlt size={10} />
                        {user.city}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.registrationDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {/* View Details */}
                        <button
                          onClick={() => openModal('view', user)}
                          className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FaEye size={16} />
                        </button>

                        {/* Edit User */}
                        <button
                          onClick={() => openModal('edit', user)}
                          className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit User"
                        >
                          <FaEdit size={16} />
                        </button>

                        {/* Approve/Reject for pending doctors */}
                        {user.type === 'doctor' && user.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApproveDoctor(user.id)}
                              className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-lg transition-colors"
                              title="Approve Doctor"
                            >
                              <FaUserCheck size={16} />
                            </button>
                            <button
                              onClick={() => handleRejectDoctor(user.id)}
                              className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                              title="Reject Doctor"
                            >
                              <FaUserTimes size={16} />
                            </button>
                          </>
                        )}

                        {/* Activate/Deactivate for non-pending users */}
                        {user.status !== 'pending' && (
                          <button
                            onClick={() => handleToggleUserStatus(user.id)}
                            className="text-purple-600 hover:text-purple-900 p-2 hover:bg-purple-50 rounded-lg transition-colors"
                            title={user.status === 'active' ? 'Deactivate User' : 'Activate User'}
                          >
                            {user.status === 'active' ? <FaLock size={16} /> : <FaUnlock size={16} />}
                          </button>
                        )}

                        {/* Delete User */}
                        <button
                          onClick={() => openModal('delete', user)}
                          className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete User"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <FaUserTimes className="mx-auto text-gray-400 text-4xl mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* User Count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>

      {/* Modals */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            {/* View User Modal */}
            {modalType === 'view' && selectedUser && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">User Details</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                    <FaTimesCircle size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                      {getUserTypeIcon(selectedUser.type)}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{selectedUser.name}</h4>
                      <p className="text-gray-600">{selectedUser.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaIdCard />
                      <span className="text-sm">ID: {selectedUser.id}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaPhone />
                      <span className="text-sm">{selectedUser.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaCity />
                      <span className="text-sm">{selectedUser.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaCalendarAlt />
                      <span className="text-sm">{selectedUser.registrationDate}</span>
                    </div>
                  </div>

                  {selectedUser.type === 'doctor' && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-blue-900 mb-2">Doctor Information</h5>
                      <p className="text-sm text-blue-800">Hospital: {selectedUser.hospital}</p>
                      <p className="text-sm text-blue-800">Specialization: {selectedUser.specialization}</p>
                    </div>
                  )}

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit User Modal */}
            {modalType === 'edit' && editedUser && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Edit User</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                    <FaTimesCircle size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editedUser.name}
                      onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={editedUser.phone}
                      onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {editedUser.type === 'doctor' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hospital
                      </label>
                      <input
                        type="text"
                        value={editedUser.hospital}
                        onChange={(e) => setEditedUser({...editedUser, hospital: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleEditUser}
                      className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Delete User Modal */}
            {modalType === 'delete' && selectedUser && (
              <div className="p-6">
                <div className="text-center">
                  <FaTrash className="mx-auto text-red-500 text-4xl mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Delete User</h3>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete <span className="font-semibold">{selectedUser.name}</span>? 
                    This action cannot be undone.
                  </p>
                  
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={closeModal}
                      className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeleteUser(selectedUser.id)}
                      className="px-6 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
                    >
                      Delete User
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default User_Managements;