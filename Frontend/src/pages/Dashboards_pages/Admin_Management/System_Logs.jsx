import React, { useState } from 'react';
import {
  FaSearch, FaFilter, FaEye, FaDownload, FaTrash,
  FaCalendarAlt, FaUser, FaDatabase, FaUpload,
  FaBrain, FaEdit, FaUserShield, FaServer,
  FaClock, FaExclamationTriangle, FaCheckCircle,
  FaTimesCircle, FaInfoCircle, FaSortAmountDown,
  FaSortAmountUp, FaFileMedical, FaShieldAlt,
  FaChartLine, FaHistory, FaListAlt, FaTable,
  FaRegClock, FaUserCheck, FaUserTimes
} from 'react-icons/fa';

const System_Logs = () => {
  // Initial logs data
  const initialLogs = [
    {
      id: 1,
      timestamp: "2024-02-06 10:30:25",
      user: "dr.ahmed@hospital.com",
      action: "X-ray Upload",
      entityType: "Medical Image",
      entityId: "IMG-2024-001",
      details: "Chest X-ray uploaded for patient ID: PT-001",
      ipAddress: "192.168.1.100",
      status: "Success",
      severity: "Info",
      duration: "2.3s",
      icon: <FaUpload className="text-blue-500" />,
      color: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      id: 2,
      timestamp: "2024-02-06 10:31:15",
      user: "system_ai",
      action: "AI Prediction",
      entityType: "Medical Image",
      entityId: "IMG-2024-001",
      details: "COVID-19 detected with 95.2% confidence",
      ipAddress: "127.0.0.1",
      status: "Success",
      severity: "Info",
      duration: "1.8s",
      icon: <FaBrain className="text-purple-500" />,
      color: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      id: 3,
      timestamp: "2024-02-06 10:35:42",
      user: "admin@system.com",
      action: "User Created",
      entityType: "User Account",
      entityId: "USR-045",
      details: "New doctor account created: Dr. Fatima Khan",
      ipAddress: "192.168.1.50",
      status: "Success",
      severity: "Info",
      duration: "0.5s",
      icon: <FaUserCheck className="text-green-500" />,
      color: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      id: 4,
      timestamp: "2024-02-06 11:20:18",
      user: "dr.ahmed@hospital.com",
      action: "Report Edited",
      entityType: "Diagnosis Report",
      entityId: "REP-2024-001",
      details: "Added clinical notes to COVID-19 diagnosis",
      ipAddress: "192.168.1.100",
      status: "Success",
      severity: "Warning",
      duration: "1.2s",
      icon: <FaEdit className="text-yellow-500" />,
      color: "bg-yellow-50",
      borderColor: "border-yellow-200"
    },
    {
      id: 5,
      timestamp: "2024-02-06 12:05:33",
      user: "nurse.sara@clinic.com",
      action: "Failed Login",
      entityType: "Authentication",
      entityId: "AUTH-2024-001",
      details: "Invalid password attempt",
      ipAddress: "192.168.1.75",
      status: "Failed",
      severity: "Error",
      duration: "0.3s",
      icon: <FaUserTimes className="text-red-500" />,
      color: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      id: 6,
      timestamp: "2024-02-06 13:45:12",
      user: "system_backup",
      action: "Database Backup",
      entityType: "System",
      entityId: "SYS-BKP-001",
      details: "Automated daily database backup completed",
      ipAddress: "127.0.0.1",
      status: "Success",
      severity: "Info",
      duration: "45.2s",
      icon: <FaDatabase className="text-indigo-500" />,
      color: "bg-indigo-50",
      borderColor: "border-indigo-200"
    },
    {
      id: 7,
      timestamp: "2024-02-06 14:30:55",
      user: "admin@system.com",
      action: "Permission Changed",
      entityType: "User Role",
      entityId: "USR-045",
      details: "Updated user permissions to 'Senior Doctor'",
      ipAddress: "192.168.1.50",
      status: "Success",
      severity: "Info",
      duration: "0.8s",
      icon: <FaUserShield className="text-cyan-500" />,
      color: "bg-cyan-50",
      borderColor: "border-cyan-200"
    },
    {
      id: 8,
      timestamp: "2024-02-06 15:10:22",
      user: "system_ai",
      action: "Model Training",
      entityType: "AI Model",
      entityId: "MODEL-V2",
      details: "Completed training iteration #245 with 98.3% accuracy",
      ipAddress: "127.0.0.1",
      status: "Success",
      severity: "Info",
      duration: "3600s",
      icon: <FaChartLine className="text-pink-500" />,
      color: "bg-pink-50",
      borderColor: "border-pink-200"
    },
    {
      id: 9,
      timestamp: "2024-02-06 16:20:44",
      user: "lab.tech@diagnostic.com",
      action: "Bulk Upload",
      entityType: "Medical Images",
      entityId: "BATCH-001",
      details: "Uploaded 15 mammogram images for batch processing",
      ipAddress: "192.168.1.120",
      status: "Success",
      severity: "Info",
      duration: "12.5s",
      icon: <FaFileMedical className="text-teal-500" />,
      color: "bg-teal-50",
      borderColor: "border-teal-200"
    },
    {
      id: 10,
      timestamp: "2024-02-06 17:05:19",
      user: "system_monitor",
      action: "System Health Check",
      entityType: "Infrastructure",
      entityId: "HEALTH-001",
      details: "All systems operational. CPU: 45%, Memory: 68%",
      ipAddress: "127.0.0.1",
      status: "Success",
      severity: "Info",
      duration: "2.1s",
      icon: <FaServer className="text-gray-500" />,
      color: "bg-gray-50",
      borderColor: "border-gray-200"
    },
    {
      id: 11,
      timestamp: "2024-02-06 18:30:05",
      user: "admin@system.com",
      action: "Data Export",
      entityType: "Reports",
      entityId: "EXPORT-001",
      details: "Exported 250 diagnosis reports to CSV format",
      ipAddress: "192.168.1.50",
      status: "Success",
      severity: "Info",
      duration: "8.7s",
      icon: <FaDownload className="text-orange-500" />,
      color: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      id: 12,
      timestamp: "2024-02-06 19:15:33",
      user: "system_security",
      action: "Security Alert",
      entityType: "Security",
      entityId: "SEC-ALERT-001",
      details: "Multiple failed login attempts detected from IP: 203.0.113.25",
      ipAddress: "127.0.0.1",
      status: "Warning",
      severity: "Critical",
      duration: "0.1s",
      icon: <FaShieldAlt className="text-red-600" />,
      color: "bg-red-100",
      borderColor: "border-red-300"
    }
  ];

  // State management
  const [logs, setLogs] = useState(initialLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedUser, setSelectedUser] = useState('all');
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedLog, setSelectedLog] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [dateRange, setDateRange] = useState('today');

  // Get unique values for filters
  const actions = ['all', ...new Set(logs.map(log => log.action))];
  const statuses = ['all', ...new Set(logs.map(log => log.status))];
  const severities = ['all', ...new Set(logs.map(log => log.severity))];
  const users = ['all', ...new Set(logs.map(log => log.user))];

  // Filter and sort logs
  const filteredLogs = logs
    .filter(log => {
      const matchesSearch = 
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.entityId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesAction = selectedAction === 'all' || log.action === selectedAction;
      const matchesStatus = selectedStatus === 'all' || log.status === selectedStatus;
      const matchesSeverity = selectedSeverity === 'all' || log.severity === selectedSeverity;
      const matchesUser = selectedUser === 'all' || log.user === selectedUser;
      
      // Date range filtering
      let matchesDate = true;
      if (dateRange !== 'all') {
        const logDate = new Date(log.timestamp.split(' ')[0]);
        const today = new Date();
        const diffDays = Math.floor((today - logDate) / (1000 * 60 * 60 * 24));
        
        if (dateRange === 'today' && diffDays > 0) matchesDate = false;
        if (dateRange === 'week' && diffDays > 7) matchesDate = false;
        if (dateRange === 'month' && diffDays > 30) matchesDate = false;
      }
      
      return matchesSearch && matchesAction && matchesStatus && matchesSeverity && matchesUser && matchesDate;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'timestamp') {
        aValue = new Date(a.timestamp);
        bValue = new Date(b.timestamp);
      }
      
      if (sortOrder === 'desc') {
        return aValue < bValue ? 1 : -1;
      } else {
        return aValue > bValue ? 1 : -1;
      }
    });

  // Get stats
  const stats = {
    totalLogs: logs.length,
    todayLogs: logs.filter(log => {
      const logDate = new Date(log.timestamp.split(' ')[0]);
      const today = new Date();
      return logDate.toDateString() === today.toDateString();
    }).length,
    failedActions: logs.filter(log => log.status === 'Failed').length,
    criticalAlerts: logs.filter(log => log.severity === 'Critical').length,
    aiPredictions: logs.filter(log => log.action === 'AI Prediction').length,
    userUploads: logs.filter(log => log.action === 'X-ray Upload' || log.action === 'Bulk Upload').length
  };

  // Helper functions
  const getStatusIcon = (status) => {
    switch(status) {
      case 'Success':
        return <FaCheckCircle className="text-green-500" />;
      case 'Failed':
        return <FaTimesCircle className="text-red-500" />;
      case 'Warning':
        return <FaExclamationTriangle className="text-yellow-500" />;
      default:
        return <FaInfoCircle className="text-blue-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Error':
        return 'bg-red-50 text-red-700 border-red-100';
      case 'Warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Info':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  // Modal handlers
  const openDetailsModal = (log) => {
    setSelectedLog(log);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedLog(null);
  };

  const clearLogs = () => {
    if (window.confirm('Are you sure you want to clear all logs? This action cannot be undone.')) {
      setLogs([]);
    }
  };

  const exportLogs = () => {
    const csvContent = [
      ['Timestamp', 'User', 'Action', 'Entity Type', 'Entity ID', 'Details', 'IP Address', 'Status', 'Severity', 'Duration'],
      ...filteredLogs.map(log => [
        log.timestamp,
        log.user,
        log.action,
        log.entityType,
        log.entityId,
        log.details,
        log.ipAddress,
        log.status,
        log.severity,
        log.duration
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system_logs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            System Audit Logs
          </h1>
          <p className="text-gray-600">
            Monitor system activities, audit trails, and security events
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Logs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalLogs.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaListAlt className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Today's Logs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayLogs}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FaCalendarAlt className="text-2xl text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">AI Predictions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.aiPredictions}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <FaBrain className="text-2xl text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Critical Alerts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.criticalAlerts}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <FaExclamationTriangle className="text-2xl text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 w-full">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search logs by user, action, or details..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters and Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="all">All Time</option>
              </select>

              <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {actions.map(action => (
                  <option key={action} value={action}>
                    {action === 'all' ? 'All Actions' : action}
                  </option>
                ))}
              </select>

              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {severities.map(severity => (
                  <option key={severity} value={severity}>
                    {severity === 'all' ? 'All Severities' : severity}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2"
              >
                {sortOrder === 'desc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
                Sort
              </button>

              <button
                onClick={exportLogs}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaDownload />
                Export
              </button>

              <button
                onClick={clearLogs}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaTrash />
                Clear All
              </button>
            </div>
          </div>

          {/* Secondary Filters */}
          <div className="mt-4 flex flex-wrap gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status}
                </option>
              ))}
            </select>

            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {users.map(user => (
                <option key={user} value={user}>
                  {user === 'all' ? 'All Users' : user}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time & Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Entity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status & Severity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {log.icon}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {log.action}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <FaRegClock size={10} />
                            {log.timestamp}
                          </div>
                          <div className="text-xs text-gray-400">
                            Duration: {log.duration}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaUser className="text-gray-400 mr-2" size={14} />
                        <div className="text-sm text-gray-900 truncate max-w-[150px]">
                          {log.user}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        IP: {log.ipAddress}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{log.entityType}</div>
                      <div className="text-xs text-gray-500">ID: {log.entityId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {log.details}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(log.status)}
                          <span className="text-sm font-medium">{log.status}</span>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold inline-block ${getSeverityColor(log.severity)}`}>
                          {log.severity}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openDetailsModal(log)}
                          className="text-blue-600 hover:text-blue-900 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FaEye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredLogs.length === 0 && (
            <div className="text-center py-16">
              <FaHistory className="mx-auto text-gray-400 text-4xl mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No logs found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Logs Summary */}
        <div className="mt-4 text-sm text-gray-600 flex justify-between items-center">
          <div>
            Showing {filteredLogs.length} of {logs.length} logs
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs">Success</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs">Failed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs">Warning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span className="text-xs">Critical</span>
            </div>
          </div>
        </div>
      </div>

      {/* Log Details Modal */}
      {showDetailsModal && selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${selectedLog.color} border ${selectedLog.borderColor}`}>
                    {selectedLog.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Log Details</h3>
                    <p className="text-sm text-gray-600">Complete audit trail information</p>
                  </div>
                </div>
                <button onClick={closeDetailsModal} className="text-gray-400 hover:text-gray-600">
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Basic Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Timestamp</p>
                      <p className="text-sm font-medium text-gray-900">{selectedLog.timestamp}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Action</p>
                      <p className="text-sm font-medium text-gray-900">{selectedLog.action}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">User</p>
                      <p className="text-sm font-medium text-gray-900">{selectedLog.user}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="text-sm font-medium text-gray-900">{selectedLog.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Entity Info */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Entity Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Entity Type</p>
                      <p className="text-sm font-medium text-gray-900">{selectedLog.entityType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Entity ID</p>
                      <p className="text-sm font-medium text-gray-900">{selectedLog.entityId}</p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Details</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-900">{selectedLog.details}</p>
                  </div>
                </div>

                {/* Technical Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Technical Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">IP Address</p>
                      <p className="text-sm font-medium text-gray-900">{selectedLog.ipAddress}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(selectedLog.status)}
                        <span className="text-sm font-medium">{selectedLog.status}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Severity</p>
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${getSeverityColor(selectedLog.severity)}`}>
                        {selectedLog.severity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeDetailsModal}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default System_Logs;