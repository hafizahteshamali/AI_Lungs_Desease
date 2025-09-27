import React, { useState, useEffect } from 'react';
import { 
  MdCalendarToday, 
  MdAccessTime, 
  MdPerson, 
  MdMedicalServices,
  MdNotifications,
  MdWarning,
  MdCheckCircle,
  MdPending,
  MdFileDownload,
  MdRefresh,
  MdSearch,
  MdFilterList,
  MdArrowForward,
  MdPlayArrow,
  MdMoreVert
} from 'react-icons/md';

const Doctor_Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock data for appointments
  const upcomingAppointments = [
    {
      id: 1,
      patientName: 'John Smith',
      patientAge: 45,
      appointmentTime: '2024-01-15T10:30:00',
      type: 'Follow-up',
      status: 'confirmed',
      reason: 'Diabetes checkup',
      priority: 'high'
    },
    {
      id: 2,
      patientName: 'Sarah Johnson',
      patientAge: 32,
      appointmentTime: '2024-01-15T14:15:00',
      type: 'New Patient',
      status: 'confirmed',
      reason: 'Chest pain evaluation',
      priority: 'urgent'
    },
    {
      id: 3,
      patientName: 'Michael Brown',
      patientAge: 58,
      appointmentTime: '2024-01-16T09:00:00',
      type: 'Consultation',
      status: 'pending',
      reason: 'Blood test results review',
      priority: 'medium'
    },
    {
      id: 4,
      patientName: 'Emily Davis',
      patientAge: 28,
      appointmentTime: '2024-01-16T11:45:00',
      type: 'Routine Check',
      status: 'confirmed',
      reason: 'Annual physical examination',
      priority: 'low'
    }
  ];

  // Mock data for recently reviewed scans
  const recentScans = [
    {
      id: 1,
      patientName: 'Robert Wilson',
      scanType: 'CT Scan',
      bodyPart: 'Chest',
      reviewDate: '2024-01-14T16:30:00',
      status: 'abnormal',
      findings: 'Pulmonary nodules detected',
      urgency: 'high',
      imageUrl: '#'
    },
    {
      id: 2,
      patientName: 'Lisa Anderson',
      scanType: 'MRI',
      bodyPart: 'Brain',
      reviewDate: '2024-01-14T14:20:00',
      status: 'normal',
      findings: 'No significant abnormalities',
      urgency: 'low',
      imageUrl: '#'
    },
    {
      id: 3,
      patientName: 'David Miller',
      scanType: 'X-Ray',
      bodyPart: 'Knee',
      reviewDate: '2024-01-14T11:15:00',
      status: 'abnormal',
      findings: 'Fracture detected',
      urgency: 'medium',
      imageUrl: '#'
    },
    {
      id: 4,
      patientName: 'Jennifer Taylor',
      scanType: 'Ultrasound',
      bodyPart: 'Abdomen',
      reviewDate: '2024-01-13T17:45:00',
      status: 'normal',
      findings: 'All organs appear healthy',
      urgency: 'low',
      imageUrl: '#'
    }
  ];

  // Initialize notifications
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'appointment',
        title: 'New Appointment Request',
        message: 'Sarah Johnson requested an appointment for chest pain evaluation',
        time: '2024-01-14T08:30:00',
        read: false,
        priority: 'high'
      },
      {
        id: 2,
        type: 'scan',
        title: 'Scan Results Ready',
        message: 'CT Scan results for Robert Wilson are available for review',
        time: '2024-01-14T10:15:00',
        read: false,
        priority: 'medium'
      },
      {
        id: 3,
        type: 'system',
        title: 'System Maintenance',
        message: 'Scheduled maintenance tonight from 2:00 AM to 4:00 AM',
        time: '2024-01-14T14:00:00',
        read: true,
        priority: 'low'
      },
      {
        id: 4,
        type: 'patient',
        title: 'Patient Message',
        message: 'John Smith sent a message regarding medication side effects',
        time: '2024-01-14T16:45:00',
        read: true,
        priority: 'medium'
      }
    ];
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  // Format time function
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
    setUnreadCount(unreadCount - 1);
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    setUnreadCount(0);
  };

  // Overview Cards Component
  const OverviewCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">12</h3>
            <p className="text-gray-600 text-sm">Today's Appointments</p>
          </div>
          <MdCalendarToday className="text-2xl text-blue-500" />
        </div>
        <div className="mt-1 text-xs text-green-600">↑ 2 from yesterday</div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">8</h3>
            <p className="text-gray-600 text-sm">Scans to Review</p>
          </div>
          <MdMedicalServices className="text-2xl text-green-500" />
        </div>
        <div className="mt-1 text-xs text-red-600">↓ 3 from yesterday</div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{unreadCount}</h3>
            <p className="text-gray-600 text-sm">Unread Notifications</p>
          </div>
          <MdNotifications className="text-2xl text-purple-500" />
        </div>
        <div className="mt-1 text-xs text-green-600">↑ 1 new today</div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800">94%</h3>
            <p className="text-gray-600 text-sm">Patient Satisfaction</p>
          </div>
          <MdCheckCircle className="text-2xl text-orange-500" />
        </div>
        <div className="mt-1 text-xs text-green-600">↑ 2% from last month</div>
      </div>
    </div>
  );

  // Appointment Card Component
  const AppointmentCard = ({ appointment }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-800 text-sm truncate">{appointment.patientName}</h4>
          <p className="text-xs text-gray-600">Age: {appointment.patientAge} • {appointment.type}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(appointment.priority)}`}>
          {appointment.priority}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2 text-xs mb-2">
        <span className="flex items-center gap-1 text-gray-600">
          <MdCalendarToday className="text-blue-500" />
          {formatDate(appointment.appointmentTime)}
        </span>
        <span className="flex items-center gap-1 text-gray-600">
          <MdAccessTime className="text-green-500" />
          {formatTime(appointment.appointmentTime)}
        </span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className={`flex items-center gap-1 text-xs ${
          appointment.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'
        }`}>
          {appointment.status === 'confirmed' ? <MdCheckCircle /> : <MdPending />}
          {appointment.status}
        </span>
        <button className="text-blue-600 hover:text-blue-800 p-1">
          <MdPlayArrow className="text-base" />
        </button>
      </div>
      
      <p className="text-xs text-gray-500 mt-2 truncate">Reason: {appointment.reason}</p>
    </div>
  );

  // Scan Card Component
  const ScanCard = ({ scan }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-800 text-sm truncate">{scan.patientName}</h4>
          <p className="text-xs text-gray-600">{scan.scanType} • {scan.bodyPart}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(scan.urgency)}`}>
          {scan.urgency}
        </span>
      </div>
      
      <div className="text-xs text-gray-600 mb-2">
        Reviewed: {formatDate(scan.reviewDate)} at {formatTime(scan.reviewDate)}
      </div>
      
      <div className="flex justify-between items-center mb-2">
        <span className={`flex items-center gap-1 text-xs ${
          scan.status === 'normal' ? 'text-green-600' : 'text-red-600'
        }`}>
          {scan.status === 'normal' ? <MdCheckCircle /> : <MdWarning />}
          {scan.status}
        </span>
      </div>
      
      <p className="text-xs text-gray-700 bg-gray-50 p-2 rounded mb-2 line-clamp-2">
        <strong>Findings:</strong> {scan.findings}
      </p>
      
      <div className="flex justify-between items-center">
        <button className="text-blue-600 text-xs flex items-center gap-1">
          <MdFileDownload /> Download
        </button>
        <button className="text-gray-600 text-xs flex items-center gap-1">
          <MdMoreVert /> More
        </button>
      </div>
    </div>
  );

  // Upcoming Appointments Component
  const UpcomingAppointments = () => (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h3 className="text-lg font-bold text-gray-800">Upcoming Appointments</h3>
        <button className="text-blue-600 text-sm flex items-center gap-1">
          View All <MdArrowForward />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {upcomingAppointments.map(appointment => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>
  );

  // Recently Reviewed Scans Component
  const RecentlyReviewedScans = () => (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h3 className="text-lg font-bold text-gray-800">Recently Reviewed Scans</h3>
        <div className="flex gap-2">
          <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
            <MdRefresh className="text-gray-600 text-sm" />
          </button>
          <button className="text-blue-600 text-sm flex items-center gap-1">
            View All <MdArrowForward />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {recentScans.map(scan => (
          <ScanCard key={scan.id} scan={scan} />
        ))}
      </div>
    </div>
  );

  // Notifications Center Component
  const NotificationsCenter = () => (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h3 className="text-lg font-bold text-gray-800">Notifications Center</h3>
        <div className="flex gap-2">
          <button 
            onClick={markAllAsRead}
            className="text-blue-600 text-sm flex items-center gap-1"
          >
            Mark All Read
          </button>
          <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
            <MdFilterList className="text-gray-600 text-sm" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.map(notification => (
          <div 
            key={notification.id} 
            className={`border-l-4 rounded-r p-3 hover:shadow-sm transition-shadow cursor-pointer ${
              notification.read ? 'border-gray-300 bg-gray-50' : 'border-blue-500 bg-blue-50'
            }`}
            onClick={() => !notification.read && markAsRead(notification.id)}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <h4 className={`font-semibold text-sm truncate ${notification.read ? 'text-gray-700' : 'text-blue-700'}`}>
                  {notification.title}
                </h4>
                {!notification.read && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full shrink-0">New</span>
                )}
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap shrink-0">
                {formatTime(notification.time)}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{notification.message}</p>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
              <span className={`px-2 py-1 rounded-full shrink-0 ${
                notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {notification.priority} priority
              </span>
              <span className="text-gray-500 capitalize">{notification.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Good Morning, Dr. Smith!</h1>
            <p className="text-gray-600">Welcome to your dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <MdNotifications className="text-2xl text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              DS
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-1 bg-white rounded-lg p-1 shadow-sm">
          {['overview', 'appointments', 'scans', 'notifications'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-[120px] py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {tab === 'overview' ? 'Overview' :
               tab === 'appointments' ? 'Appointments' :
               tab === 'scans' ? 'Medical Scans' : 'Notifications'}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <>
            <OverviewCards />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <UpcomingAppointments />
              <RecentlyReviewedScans />
            </div>
            <NotificationsCenter />
          </>
        )}

        {activeTab === 'appointments' && <UpcomingAppointments />}
        {activeTab === 'scans' && <RecentlyReviewedScans />}
        {activeTab === 'notifications' && <NotificationsCenter />}
      </div>
    </div>
  );
};

export default Doctor_Dashboard;