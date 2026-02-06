import React, { useState, useEffect } from 'react';
import {
  FaBell, FaCheckCircle, FaExclamationTriangle,
  FaInfoCircle, FaCalendarAlt, FaUserMd,
  FaCog, FaFilter, FaTimes, FaEye,
  FaTrash, FaEnvelope, FaDatabase,
  FaShieldAlt, FaChartLine, FaStethoscope,
  FaHospital, FaFileMedical, FaSync,
  FaCheckDouble, FaChevronDown, FaChevronUp,
  FaRegClock, FaRegBell, FaBellSlash,
  FaBrain,
  FaUpload
} from 'react-icons/fa';
import { GiLungs } from 'react-icons/gi';

const Notifications = () => {
  // Initial notifications data
  const initialNotifications = [
    {
      id: 1,
      title: "AI Model Update Available",
      message: "New AI model version 2.1 is now available for deployment",
      type: "system",
      priority: "high",
      timestamp: "10:30 AM • Just now",
      date: "2024-02-06",
      read: false,
      icon: <FaBrain className="text-purple-500" />,
      color: "bg-purple-50 border-purple-100"
    },
    {
      id: 2,
      title: "New X-ray Upload",
      message: "Patient Ali Ahmed uploaded chest X-ray for analysis",
      type: "upload",
      priority: "medium",
      timestamp: "9:45 AM • 45 min ago",
      date: "2024-02-06",
      read: false,
      icon: <FaUpload className="text-blue-500" />,
      color: "bg-blue-50 border-blue-100"
    },
    {
      id: 3,
      title: "COVID-19 Detection",
      message: "AI detected COVID-19 in X-ray with 95.2% confidence",
      type: "prediction",
      priority: "high",
      timestamp: "9:30 AM • 1 hour ago",
      date: "2024-02-06",
      read: true,
      icon: <GiLungs className="text-red-500" />,
      color: "bg-red-50 border-red-100"
    },
    {
      id: 4,
      title: "System Backup Complete",
      message: "Daily database backup completed successfully",
      type: "system",
      priority: "low",
      timestamp: "Yesterday • 8:00 PM",
      date: "2024-02-05",
      read: true,
      icon: <FaDatabase className="text-green-500" />,
      color: "bg-green-50 border-green-100"
    },
    {
      id: 5,
      title: "New Doctor Registered",
      message: "Dr. Fatima Khan has joined the platform",
      type: "user",
      priority: "medium",
      timestamp: "Yesterday • 3:15 PM",
      date: "2024-02-05",
      read: true,
      icon: <FaUserMd className="text-indigo-500" />,
      color: "bg-indigo-50 border-indigo-100"
    },
    {
      id: 6,
      title: "Performance Report Ready",
      message: "Weekly analytics report is available for review",
      type: "report",
      priority: "low",
      timestamp: "Yesterday • 11:00 AM",
      date: "2024-02-05",
      read: true,
      icon: <FaChartLine className="text-orange-500" />,
      color: "bg-orange-50 border-orange-100"
    },
    {
      id: 7,
      title: "Security Alert",
      message: "Multiple failed login attempts detected",
      type: "security",
      priority: "high",
      timestamp: "Feb 4 • 7:30 PM",
      date: "2024-02-04",
      read: true,
      icon: <FaShieldAlt className="text-red-600" />,
      color: "bg-red-100 border-red-200"
    },
    {
      id: 8,
      title: "Maintenance Scheduled",
      message: "System maintenance scheduled for Feb 10, 2:00 AM - 4:00 AM",
      type: "system",
      priority: "medium",
      timestamp: "Feb 4 • 10:00 AM",
      date: "2024-02-04",
      read: true,
      icon: <FaCog className="text-gray-500" />,
      color: "bg-gray-50 border-gray-100"
    },
    {
      id: 9,
      title: "New Patient Report",
      message: "Diagnosis report generated for patient Sara Khan",
      type: "report",
      priority: "medium",
      timestamp: "Feb 3 • 4:45 PM",
      date: "2024-02-03",
      read: true,
      icon: <FaFileMedical className="text-teal-500" />,
      color: "bg-teal-50 border-teal-100"
    },
    {
      id: 10,
      title: "Model Training Complete",
      message: "AI model training iteration #245 completed successfully",
      type: "system",
      priority: "low",
      timestamp: "Feb 3 • 9:00 AM",
      date: "2024-02-03",
      read: true,
      icon: <FaBrain className="text-purple-500" />,
      color: "bg-purple-50 border-purple-100"
    }
  ];

  // State management
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterRead, setFilterRead] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Get unique types and priorities
  const notificationTypes = ['all', 'system', 'upload', 'prediction', 'user', 'report', 'security'];
  const priorities = ['all', 'high', 'medium', 'low'];
  const readStatus = ['all', 'unread', 'read'];

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesPriority = filterPriority === 'all' || notification.priority === filterPriority;
    const matchesRead = filterRead === 'all' || 
      (filterRead === 'unread' && !notification.read) ||
      (filterRead === 'read' && notification.read);
    const matchesSearch = searchTerm === '' || 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesPriority && matchesRead && matchesSearch;
  });

  // Group notifications by date
  const groupedNotifications = filteredNotifications.reduce((groups, notification) => {
    const date = notification.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(notification);
    return groups;
  }, {});

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Stats
  const stats = {
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    highPriority: notifications.filter(n => n.priority === 'high').length,
    today: notifications.filter(n => n.date === new Date().toISOString().split('T')[0]).length
  };

  // Actions
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const deleteAllRead = () => {
    setNotifications(notifications.filter(notification => !notification.read));
  };

  const toggleNotification = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: !notification.read } : notification
    ));
  };

  const clearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
    }
  };

  // View notification details
  const viewNotificationDetails = (notification) => {
    setSelectedNotification(notification);
    setShowDetails(true);
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  // Get priority icon and color
  const getPriorityInfo = (priority) => {
    switch(priority) {
      case 'high':
        return { 
          icon: <FaExclamationTriangle className="text-red-500" />,
          text: 'text-red-700',
          bg: 'bg-red-100'
        };
      case 'medium':
        return { 
          icon: <FaInfoCircle className="text-yellow-500" />,
          text: 'text-yellow-700',
          bg: 'bg-yellow-100'
        };
      case 'low':
        return { 
          icon: <FaInfoCircle className="text-green-500" />,
          text: 'text-green-700',
          bg: 'bg-green-100'
        };
      default:
        return { 
          icon: <FaInfoCircle className="text-gray-500" />,
          text: 'text-gray-700',
          bg: 'bg-gray-100'
        };
    }
  };

  // Get type label
  const getTypeLabel = (type) => {
    switch(type) {
      case 'system': return 'System';
      case 'upload': return 'Upload';
      case 'prediction': return 'Prediction';
      case 'user': return 'User';
      case 'report': return 'Report';
      case 'security': return 'Security';
      default: return 'Other';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <FaBell className="text-3xl text-blue-600" />
                {stats.unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {stats.unread}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Notifications</h1>
                <p className="text-gray-600">Stay updated with system activities and alerts</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {stats.unread > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
                >
                  <FaCheckDouble />
                  Mark All Read
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <FaBell className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Unread</p>
                <p className="text-2xl font-bold text-gray-900">{stats.unread}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <FaRegBell className="text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">High Priority</p>
                <p className="text-2xl font-bold text-gray-900">{stats.highPriority}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <FaExclamationTriangle className="text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Today</p>
                <p className="text-2xl font-bold text-gray-900">{stats.today}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <FaCalendarAlt className="text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 w-full">
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm"
              >
                <FaFilter />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>

              <button
                onClick={deleteAllRead}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm"
              >
                <FaTrash />
                Clear Read
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    {notificationTypes.map(type => (
                      <option key={type} value={type}>
                        {type === 'all' ? 'All Types' : getTypeLabel(type)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>
                        {priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={filterRead}
                    onChange={(e) => setFilterRead(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    {readStatus.map(status => (
                      <option key={status} value={status}>
                        {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {Object.keys(groupedNotifications).length > 0 ? (
            Object.entries(groupedNotifications).map(([date, dateNotifications]) => (
              <div key={date} className="border-b border-gray-200 last:border-b-0">
                <div className="bg-gray-50 px-6 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">
                        {formatDate(date)}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {dateNotifications.length} notification{dateNotifications.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {dateNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-6 py-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                    >
                      <div className="flex gap-4">
                        {/* Icon */}
                        <div className="flex-shrink-0">
                          <div className={`p-2 rounded-lg ${notification.color} border`}>
                            {notification.icon}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                                {notification.title}
                                {!notification.read && (
                                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                )}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 ml-2">
                              <span className={`text-xs px-2 py-1 rounded-full ${getPriorityInfo(notification.priority).bg} ${getPriorityInfo(notification.priority).text}`}>
                                {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-4">
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <FaRegClock />
                                {notification.timestamp}
                              </span>
                              <span className="text-xs text-gray-500">
                                {getTypeLabel(notification.type)}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              {!notification.read ? (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                  title="Mark as read"
                                >
                                  <FaCheckCircle />
                                  Mark read
                                </button>
                              ) : (
                                <button
                                  onClick={() => toggleNotification(notification.id)}
                                  className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                                  title="Mark as unread"
                                >
                                  <FaBellSlash />
                                  Mark unread
                                </button>
                              )}

                              <button
                                onClick={() => viewNotificationDetails(notification)}
                                className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-1"
                                title="View details"
                              >
                                <FaEye />
                                View
                              </button>

                              <button
                                onClick={() => deleteNotification(notification.id)}
                                className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1"
                                title="Delete"
                              >
                                <FaTrash />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <FaBellSlash className="mx-auto text-gray-400 text-4xl mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-500">You're all caught up!</p>
            </div>
          )}
        </div>

        {/* Empty State Actions */}
        {filteredNotifications.length === 0 && notifications.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setFilterType('all');
                setFilterPriority('all');
                setFilterRead('all');
                setSearchTerm('');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Notification Details Modal */}
      {showDetails && selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${selectedNotification.color} border`}>
                    {selectedNotification.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Notification Details</h3>
                    <p className="text-sm text-gray-600">{selectedNotification.timestamp}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Content */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {selectedNotification.title}
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{selectedNotification.message}</p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Type</p>
                    <p className="text-sm font-medium text-gray-900">
                      {getTypeLabel(selectedNotification.type)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Priority</p>
                    <div className="flex items-center gap-2">
                      {getPriorityInfo(selectedNotification.priority).icon}
                      <span className="text-sm font-medium text-gray-900">
                        {selectedNotification.priority.charAt(0).toUpperCase() + selectedNotification.priority.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(selectedNotification.date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className={`text-sm font-medium ${selectedNotification.read ? 'text-green-600' : 'text-blue-600'}`}>
                      {selectedNotification.read ? 'Read' : 'Unread'}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => {
                      deleteNotification(selectedNotification.id);
                      setShowDetails(false);
                    }}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                  {!selectedNotification.read && (
                    <button
                      onClick={() => {
                        markAsRead(selectedNotification.id);
                        setShowDetails(false);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;