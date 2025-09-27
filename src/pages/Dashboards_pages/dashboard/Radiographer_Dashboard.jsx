import React, { useState } from 'react';
import { FaUpload, FaFileMedical, FaClock, FaUserMd, FaCalendarAlt, FaSearch, FaFilter } from 'react-icons/fa';
import { FiUploadCloud, FiFile, FiClock, FiUser } from 'react-icons/fi';

const Radiographer_Dashboard = () => {
  const [recentUploads, setRecentUploads] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      scanType: 'CT Scan',
      date: '2024-01-15',
      time: '10:30 AM',
      status: 'completed',
      doctor: 'Dr. Smith'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      scanType: 'MRI',
      date: '2024-01-14',
      time: '02:15 PM',
      status: 'completed',
      doctor: 'Dr. Johnson'
    },
    {
      id: 3,
      patientName: 'Mike Wilson',
      scanType: 'X-Ray',
      date: '2024-01-14',
      time: '09:45 AM',
      status: 'completed',
      doctor: 'Dr. Brown'
    }
  ]);

  const [pendingReviews, setPendingReviews] = useState([
    {
      id: 1,
      patientName: 'Sarah Johnson',
      scanType: 'MRI',
      date: '2024-01-13',
      time: '11:20 AM',
      doctor: 'Dr. Davis',
      urgency: 'high'
    },
    {
      id: 2,
      patientName: 'Robert Chen',
      scanType: 'CT Scan',
      date: '2024-01-12',
      time: '03:45 PM',
      doctor: 'Dr. Wilson',
      urgency: 'medium'
    },
    {
      id: 3,
      patientName: 'Emily Parker',
      scanType: 'Ultrasound',
      date: '2024-01-12',
      time: '01:30 PM',
      doctor: 'Dr. Taylor',
      urgency: 'low'
    }
  ]);

  const handleQuickUpload = () => {
    // Simulate file upload functionality
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.dcm,.dicom,.png,.jpg,.jpeg';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        alert(`File "${file.name}" uploaded successfully!`);
        // Here you would typically handle the actual file upload
      }
    };
    fileInput.click();
  };

  const StatsCard = ({ icon, title, value, color }) => (
    <div className={`bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300 ${color}`}>
      <div className="text-3xl text-blue-600">{icon}</div>
      <div>
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Radiographer Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your overview for today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard 
          icon={<FiUploadCloud />} 
          title="Today's Uploads" 
          value="12" 
        />
        <StatsCard 
          icon={<FiFile />} 
          title="Total Scans This Month" 
          value="156" 
        />
        <StatsCard 
          icon={<FiClock />} 
          title="Pending Reviews" 
          value={pendingReviews.length} 
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Upload Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <FaUpload className="mr-2 text-blue-600" />
              Quick Upload
            </h2>
            <button
              onClick={handleQuickUpload}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-300"
            >
              <FiUploadCloud className="text-xl" />
              <span>Upload New Scan</span>
            </button>
            <div className="mt-4 text-sm text-gray-600">
              <p className="mb-2">Supported formats:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>DICOM (.dcm, .dicom)</li>
                <li>Images (.png, .jpg, .jpeg)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Uploads Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <FaFileMedical className="mr-2 text-green-600" />
                Recent Uploads
              </h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                <FaSearch className="mr-1" />
                Search
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Patient</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Scan Type</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Date & Time</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Doctor</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUploads.map((upload) => (
                    <tr key={upload.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-2">
                        <div className="font-medium text-gray-900">{upload.patientName}</div>
                      </td>
                      <td className="py-3 px-2 text-gray-700">{upload.scanType}</td>
                      <td className="py-3 px-2 text-gray-600 text-sm">
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-1 text-gray-400" />
                          {upload.date}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <FaClock className="mr-1" />
                          {upload.time}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center text-gray-700">
                          <FiUser className="mr-1" />
                          {upload.doctor}
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pending Doctor Reviews Section */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <FaClock className="mr-2 text-orange-600" />
                Pending Doctor Reviews
              </h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                <FaFilter className="mr-1" />
                Filter
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingReviews.map((review) => (
                <div key={review.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{review.patientName}</h3>
                      <p className="text-sm text-gray-600">{review.scanType}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      review.urgency === 'high' ? 'bg-red-100 text-red-800' :
                      review.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {review.urgency.charAt(0).toUpperCase() + review.urgency.slice(1)} Priority
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-2 text-gray-400" />
                      {review.date} at {review.time}
                    </div>
                    <div className="flex items-center">
                      <FaUserMd className="mr-2 text-gray-400" />
                      {review.doctor}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded transition-colors duration-300">
                      View Details
                    </button>
                    <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-3 rounded transition-colors duration-300">
                      Remind Doctor
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Radiographer_Dashboard;