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
  MdArrowBack,
  MdPlayArrow,
  MdMoreVert
} from 'react-icons/md';

const Doctor_Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsiveness
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  // Mobile-friendly appointment card
  const MobileAppointmentCard = ({ appointment }) => (
    <div className="bg-white border rounded-lg p-3 mb-3 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 text-sm">{appointment.patientName}</h4>
          <p className="text-xs text-gray-600">Age: {appointment.patientAge} • {appointment.type}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(appointment.priority)}`}>
          {appointment.priority}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2 text-xs mb-2">
        <span className="flex items-center gap-1 text-gray-600">
          <MdCalendarToday className="text-blue-500 text-xs" />
          {formatDate(appointment.appointmentTime)}
        </span>
        <span className="flex items-center gap-1 text-gray-600">
          <MdAccessTime className="text-green-500 text-xs" />
          {formatTime(appointment.appointmentTime)}
        </span>
      </div>
      
      <div className="flex justify-between items-center">
        <span className={`flex items-center gap-1 text-xs ${
          appointment.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'
        }`}>
          {appointment.status === 'confirmed' ? <MdCheckCircle className="text-xs" /> : <MdPending className="text-xs" />}
          {appointment.status}
        </span>
        <button className="text-blue-600 hover:text-blue-800 p-1">
          <MdPlayArrow className="text-base" />
        </button>
      </div>
      
      <p className="text-xs text-gray-500 mt-2 truncate">Reason: {appointment.reason}</p>
    </div>
  );

  // Mobile-friendly scan card
  const MobileScanCard = ({ scan }) => (
    <div className="bg-white border rounded-lg p-3 mb-3 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 text-sm">{scan.patientName}</h4>
          <p className="text-xs text-gray-600">{scan.scanType} • {scan.bodyPart}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(scan.urgency)}`}>
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
          {scan.status === 'normal' ? <MdCheckCircle className="text-xs" /> : <MdWarning className="text-xs" />}
          {scan.status}
        </span>
      </div>
      
      <p className="text-xs text-gray-700 bg-gray-50 p-2 rounded mb-2 line-clamp-2">
        <strong>Findings:</strong> {scan.findings}
      </p>
      
      <div className="flex justify-between items-center">
        <button className="text-blue-600 text-xs flex items-center gap-1">
          <MdFileDownload className="text-xs" /> Download
        </button>
        <button className="text-gray-600 text-xs flex items-center gap-1">
          <MdMoreVert className="text-xs" /> More
        </button>
      </div>
    </div>
  );

  // Overview Cards Component using Flexbox
  const OverviewCards = () => (
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6">
      <div className="flex-1 min-w-[200px] bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">12</h3>
            <p className="text-gray-600 text-sm">Today's Appointments</p>
          </div>
          <MdCalendarToday className="text-3xl text-blue-500" />
        </div>
        <div className="mt-2 text-xs text-green-600">↑ 2 from yesterday</div>
      </div>

      <div className="flex-1 min-w-[200px] bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">8</h3>
            <p className="text-gray-600 text-sm">Scans to Review</p>
          </div>
          <MdMedicalServices className="text-3xl text-green-500" />
        </div>
        <div className="mt-2 text-xs text-red-600">↓ 3 from yesterday</div>
      </div>

      <div className="flex-1 min-w-[200px] bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{unreadCount}</h3>
            <p className="text-gray-600 text-sm">Unread Notifications</p>
          </div>
          <MdNotifications className="text-3xl text-purple-500" />
        </div>
        <div className="mt-2 text-xs text-green-600">↑ 1 new today</div>
      </div>

      <div className="flex-1 min-w-[200px] bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">94%</h3>
            <p className="text-gray-600 text-sm">Patient Satisfaction</p>
          </div>
          <MdCheckCircle className="text-3xl text-orange-500" />
        </div>
        <div className="mt-2 text-xs text-green-600">↑ 2% from last month</div>
      </div>
    </div>
  );

  // Upcoming Appointments Component using Flexbox
  const UpcomingAppointments = () => (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h3 className="text-lg font-bold text-gray-800">Upcoming Appointments</h3>
        <button className="text-blue-600 text-sm flex items-center gap-1 self-end sm:self-auto">
          View All <MdArrowForward />
        </button>
      </div>

      {isMobile ? (
        <div>
          {upcomingAppointments.map(appointment => (
            <MobileAppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {upcomingAppointments.map(appointment => (
            <div key={appointment.id} className="border border-gray-300 rounded p-3 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-gray-800">{appointment.patientName}</h4>
                  <p className="text-sm text-gray-600">Age: {appointment.patientAge} • {appointment.type}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(appointment.priority)}`}>
                  {appointment.priority}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-gray-600">
                    <MdCalendarToday className="text-blue-500" />
                    {formatDate(appointment.appointmentTime)}
                  </span>
                  <span className="flex items-center gap-1 text-gray-600">
                    <MdAccessTime className="text-green-500" />
                    {formatTime(appointment.appointmentTime)}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1 text-xs ${
                    appointment.status === 'confirmed' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {appointment.status === 'confirmed' ? <MdCheckCircle /> : <MdPending />}
                    {appointment.status}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 p-1">
                    <MdPlayArrow className="text-lg" />
                  </button>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mt-2">Reason: {appointment.reason}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Recently Reviewed Scans Component using Flexbox
  const RecentlyReviewedScans = () => (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h3 className="text-lg font-bold text-gray-800">Recently Reviewed Scans</h3>
        <div className="flex gap-2 self-end sm:self-auto">
          <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
            <MdRefresh className="text-gray-600" />
          </button>
          <button className="text-blue-600 text-sm flex items-center gap-1">
            View All <MdArrowForward />
          </button>
        </div>
      </div>

      {isMobile ? (
        <div>
          {recentScans.map(scan => (
            <MobileScanCard key={scan.id} scan={scan} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {recentScans.map(scan => (
            <div key={scan.id} className="border border-gray-300 rounded p-3 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-gray-800">{scan.patientName}</h4>
                  <p className="text-sm text-gray-600">{scan.scanType} • {scan.bodyPart}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(scan.urgency)}`}>
                  {scan.urgency}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">
                  Reviewed: {formatDate(scan.reviewDate)} at {formatTime(scan.reviewDate)}
                </span>
                <span className={`flex items-center gap-1 text-xs ${
                  scan.status === 'normal' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {scan.status === 'normal' ? <MdCheckCircle /> : <MdWarning />}
                  {scan.status}
                </span>
              </div>
              
              <p className="text-xs text-gray-700 bg-gray-50 p-2 rounded">
                <strong>Findings:</strong> {scan.findings}
              </p>
              
              <div className="flex justify-between items-center mt-2">
                <button className="text-blue-600 text-xs flex items-center gap-1">
                  <MdFileDownload className='text-xl' /> Download
                </button>
                <button className="text-gray-600 text-xs flex items-center gap-1">
                  <MdMoreVert /> More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Notifications Center Component using Flexbox
  const NotificationsCenter = () => (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h3 className="text-lg font-bold text-gray-800">Notifications Center</h3>
        <div className="flex gap-2 self-end sm:self-auto">
          <button 
            onClick={markAllAsRead}
            className="text-blue-600 text-sm flex items-center gap-1"
          >
            Mark All Read
          </button>
          <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
            <MdFilterList className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.map(notification => (
          <div 
            key={notification.id} 
            className={`border-l-4 rounded-r-lg p-3 hover:shadow-md transition-shadow cursor-pointer ${
              notification.read ? 'border-gray-300 bg-gray-50' : 'border-blue-500 bg-blue-50'
            }`}
            onClick={() => !notification.read && markAsRead(notification.id)}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
              <div className="flex items-center gap-2 flex-1">
                <h4 className={`font-semibold text-sm sm:text-base ${notification.read ? 'text-gray-700' : 'text-blue-700'}`}>
                  {notification.title}
                </h4>
                {!notification.read && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">New</span>
                )}
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {formatTime(notification.time)}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
              <span className={`px-2 py-1 rounded-full ${
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
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Good Morning, Dr. Smith!</h1>
            <p className="text-gray-600 text-sm sm:text-base">Welcome to your dashboard</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <MdNotifications className="text-xl sm:text-2xl text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
              DS
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-4 sm:mb-6">
        <div className="flex bg-white rounded-lg p-1 shadow-md overflow-x-auto">
          {['overview', 'appointments', 'scans', 'notifications'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-3 sm:px-4 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap min-w-max ${
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
      <div className="space-y-4 sm:space-y-6">
        {activeTab === 'overview' && (
          <>
            <OverviewCards />
            <div className="flex flex-col xl:flex-row gap-4 sm:gap-6">
              <div className="flex-1">
                <UpcomingAppointments />
              </div>
              <div className="flex-1">
                <RecentlyReviewedScans />
              </div>
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