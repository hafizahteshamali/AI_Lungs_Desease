import React, { useState, useEffect, useCallback } from 'react';
import {
  FaUser, FaEnvelope, FaPhone, FaHospital,
  FaUserMd, FaCamera, FaSave,
  FaTimes, FaEye, FaEyeSlash, FaCheckCircle,
  FaMapMarkerAlt, FaCalendarAlt, FaIdCard,
  FaKey, FaUserCircle, FaEdit, FaUpload,
  FaLock, FaUnlock, FaTrash, FaStethoscope,
  FaFileMedical, FaNotesMedical, FaUserNurse
} from 'react-icons/fa';
import { postReq } from '../../../api/axios';
import { toast } from 'react-toastify';

// User type options - component ke bahar define kiya taake har baar re-render na ho
const userTypeOptions = [
  { value: 'doctor', label: 'Doctor', icon: FaUserMd },
  { value: 'radiographer', label: 'Radiographer', icon: FaUserNurse }
];

// Create Doctor Section Component
const CreateDoctorSection = ({ doctorData, handleDoctorChange, createDoctor, isCreatingDoctor, getSpecialtyOptions }) => {
  const specialtyOptions = getSpecialtyOptions(doctorData.userType);

  return (
    <div className="rounded-xl p-4 sm:p-6 shadow-sm border bg-white border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-green-100 text-green-600">
          <FaStethoscope />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Create Healthcare Professional</h3>
          <p className="text-xs sm:text-sm text-gray-600">Add a new doctor or radiographer to the system</p>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* User Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            User Type <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            {userTypeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <label
                  key={option.value}
                  className={`flex-1 flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                    doctorData.userType === option.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-green-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="userType"
                    value={option.value}
                    checked={doctorData.userType === option.value}
                    onChange={(e) => handleDoctorChange('userType', e.target.value)}
                    className="hidden"
                  />
                  <Icon className={`text-xl ${
                    doctorData.userType === option.value ? 'text-green-600' : 'text-gray-400'
                  }`} />
                  <span className={`font-medium ${
                    doctorData.userType === option.value ? 'text-green-700' : 'text-gray-700'
                  }`}>
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <FaUser className="text-gray-400" />
            <input
              type="text"
              value={doctorData.name}
              onChange={(e) => handleDoctorChange('name', e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base border-gray-300 text-gray-900"
              placeholder={`Enter ${doctorData.userType === 'doctor' ? "doctor's" : "radiographer's"} full name`}
            />
          </div>
        </div>

        {/* Specialty Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specialty <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <FaFileMedical className="text-gray-400" />
            <select
              value={doctorData.specialty}
              onChange={(e) => handleDoctorChange('specialty', e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base border-gray-300 text-gray-900 bg-white"
            >
              <option value="">Select Specialty</option>
              {specialtyOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <div className="flex items-start gap-2">
            <FaNotesMedical className="text-gray-400 mt-3" />
            <textarea
              value={doctorData.description}
              onChange={(e) => handleDoctorChange('description', e.target.value)}
              rows="4"
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base border-gray-300 text-gray-900"
              placeholder={`Enter ${doctorData.userType === 'doctor' ? "doctor's" : "radiographer's"} qualifications, experience, and other details...`}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            onClick={createDoctor}
            disabled={isCreatingDoctor}
            className="py-2 px-4 sm:px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto bg-green-600 text-white hover:bg-green-700"
          >
            {isCreatingDoctor ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating...
              </>
            ) : (
              <>
                <FaUserMd />
                Create {doctorData.userType === 'doctor' ? 'Doctor' : 'Radiographer'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const Profile_Settings = () => {
  // User profile data
  const [profile, setProfile] = useState({
    name: 'Dr. Ahmed Raza',
    email: 'ahmed.raza@precisionmed.com',
    phone: '+92 300 1234567',
    specialization: 'Radiology',
    hospital: 'Aga Khan University Hospital',
    location: 'Karachi, Pakistan',
    experience: '8 years',
    registrationId: 'PMDC-2023-04567',
    bio: 'Senior Radiologist specializing in AI-assisted diagnostics with expertise in chest X-ray and mammogram analysis.'
  });

  // Password change state
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Profile picture state
  const [profilePicture, setProfilePicture] = useState(null);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  // Settings tabs
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Doctor/Radiographer creation state
  const [doctorData, setDoctorData] = useState({
    name: '',
    userType: 'doctor',
    specialty: '',
    description: ''
  });
  const [isCreatingDoctor, setIsCreatingDoctor] = useState(false);

  // Specialty options based on user type
  const getSpecialtyOptions = useCallback((userType) => {
    if (userType === 'doctor') {
      return [
        { value: 'cardiology', label: 'Cardiology' },
        { value: 'radiology', label: 'Radiology' },
        { value: 'neurology', label: 'Neurology' },
        { value: 'orthopedics', label: 'Orthopedics' },
        { value: 'pediatrics', label: 'Pediatrics' },
        { value: 'oncology', label: 'Oncology' },
        { value: 'dermatology', label: 'Dermatology' },
        { value: 'gynecology', label: 'Gynecology' },
        { value: 'ophthalmology', label: 'Ophthalmology' },
        { value: 'ent', label: 'ENT' },
        { value: 'psychiatry', label: 'Psychiatry' },
        { value: 'urology', label: 'Urology' },
        { value: 'nephrology', label: 'Nephrology' },
        { value: 'pulmonology', label: 'Pulmonology' },
        { value: 'endocrinology', label: 'Endocrinology' },
        { value: 'gastroenterology', label: 'Gastroenterology' },
        { value: 'hematology', label: 'Hematology' },
        { value: 'immunology', label: 'Immunology' },
        { value: 'rheumatology', label: 'Rheumatology' },
        { value: 'anesthesiology', label: 'Anesthesiology' },
        { value: 'emergency_medicine', label: 'Emergency Medicine' },
        { value: 'family_medicine', label: 'Family Medicine' },
        { value: 'internal_medicine', label: 'Internal Medicine' },
        { value: 'pathology', label: 'Pathology' },
        { value: 'physical_medicine', label: 'Physical Medicine' },
        { value: 'plastic_surgery', label: 'Plastic Surgery' },
        { value: 'podiatry', label: 'Podiatry' },
        { value: 'proctology', label: 'Proctology' },
        { value: 'psychology', label: 'Psychology' },
        { value: 'sports_medicine', label: 'Sports Medicine' },
        { value: 'surgery', label: 'Surgery' },
        { value: 'thoracic_surgery', label: 'Thoracic Surgery' },
        { value: 'vascular_surgery', label: 'Vascular Surgery' },
        { value: 'other', label: 'Other' }
      ];
    } else {
      return [
        { value: 'xray', label: 'X-Ray' },
        { value: 'mri', label: 'MRI' },
        { value: 'ct_scan', label: 'CT Scan' },
        { value: 'ultrasound', label: 'Ultrasound' },
        { value: 'mammography', label: 'Mammography' },
        { value: 'fluoroscopy', label: 'Fluoroscopy' },
        { value: 'nuclear_medicine', label: 'Nuclear Medicine' },
        { value: 'pet_scan', label: 'PET Scan' },
        { value: 'bone_densitometry', label: 'Bone Densitometry' },
        { value: 'angiography', label: 'Angiography' },
        { value: 'interventional_radiology', label: 'Interventional Radiology' },
        { value: 'radiation_therapy', label: 'Radiation Therapy' },
        { value: 'general_radiography', label: 'General Radiography' },
        { value: 'portable_radiography', label: 'Portable Radiography' },
        { value: 'dental_radiography', label: 'Dental Radiography' },
        { value: 'veterinary_radiography', label: 'Veterinary Radiography' },
        { value: 'other', label: 'Other' }
      ];
    }
  }, []);

  // Handle profile changes
  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  // Handle password changes
  const handlePasswordChange = (field, value) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
  };

  // ✅ FIXED: Handle doctor data changes properly
  const handleDoctorChange = (field, value) => {
    setDoctorData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Reset specialty when user type changes
      if (field === 'userType') {
        newData.specialty = '';
      }
      
      return newData;
    });
  };

  // Handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'File size should be less than 5MB' });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        setMessage({ type: 'success', text: 'Profile picture updated successfully!' });
      };
      reader.readAsDataURL(file);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  // Validate password strength
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return { minLength, hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar };
  };

  // Save profile changes
  const saveProfileChanges = () => {
    setIsEditing(false);
    setMessage({ type: 'success', text: 'Profile updated successfully!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  // Change password
  const changePassword = () => {
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      setMessage({ type: 'error', text: 'All fields are required' });
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    const passwordStrength = validatePassword(passwords.newPassword);
    const strengthScore = Object.values(passwordStrength).filter(Boolean).length;
    
    if (strengthScore < 3) {
      setMessage({ type: 'error', text: 'Password is too weak. Please use a stronger password.' });
      return;
    }

    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setMessage({ type: 'success', text: 'Password changed successfully!' });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  // ✅ FIXED: Create Doctor API call with better error handling
  const createDoctor = async () => {
    // Validation
    if (!doctorData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    if (!doctorData.userType) {
      toast.error('User type is required');
      return;
    }
    if (!doctorData.specialty) {
      toast.error('Specialty is required');
      return;
    }
    if (!doctorData.description.trim()) {
      toast.error('Description is required');
      return;
    }

    // ✅ FIXED: Sirf required fields bhejo (userType aur displayName hata diya)
    const payload = {
      name: doctorData.name,
      specialty: doctorData.specialty,
      description: doctorData.description
    };

    console.log('🚀 Sending payload:', payload); // Debug ke liye

    setIsCreatingDoctor(true);
    try {
      const response = await postReq('/api/Doctors/CreateDoctor', payload, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('🚀 Response:', response); // Debug ke liye

      if (response.status === 200 || response.status === 201) {
        const userTypeDisplay = doctorData.userType === 'doctor' ? 'Doctor' : 'Radiographer';
        toast.success(`${userTypeDisplay} created successfully!`);
        
        // Reset form
        setDoctorData({ 
          name: '', 
          userType: 'doctor',
          specialty: '', 
          description: '' 
        });
        
        setMessage({ type: 'success', text: `${userTypeDisplay} profile created successfully!` });
      }
    } catch (error) {
      // ✅ DETAILED ERROR HANDLING
      console.log('❌ Full error object:', error);
      console.log('❌ Error response:', error.response);
      console.log('❌ Error data:', error.response?.data);
      
      // Try to get the most specific error message
      let errorMessage = 'Failed to create profile';
      
      if (error.response?.data?.Message) {
        errorMessage = error.response.data.Message;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.title) {
        errorMessage = error.response.data.title;
      } else if (error.response?.data) {
        // Agar poora object hai to string bana do
        errorMessage = JSON.stringify(error.response.data);
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      // Specific error ke liye
      if (errorMessage.includes('inner exception') || errorMessage.includes('See the inner exception')) {
        errorMessage = 'Database error occurred. Please check if all required fields are provided.';
      }
      
      toast.error(errorMessage);
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsCreatingDoctor(false);
    }
  };

  // Get password strength color
  const getPasswordStrengthColor = (password) => {
    const strength = validatePassword(password);
    const score = Object.values(strength).filter(Boolean).length;
    
    if (score === 0) return 'bg-gray-200';
    if (score <= 2) return 'bg-red-500';
    if (score <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Profile picture component
  const ProfilePictureSection = () => (
    <div className="rounded-xl p-4 sm:p-6 shadow-sm border bg-white border-gray-200">
      <div className="flex flex-col items-center">
        <div className="relative mb-4 sm:mb-6">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
            {profilePicture ? (
              <img 
                src={profilePicture} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-gray-400 text-4xl sm:text-6xl" />
            )}
          </div>
          <label htmlFor="profile-upload" className="absolute bottom-0 right-0 p-1 sm:p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full cursor-pointer transition-colors text-xs sm:text-base">
            <FaCamera />
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="text-center mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{profile.name}</h3>
          <p className="text-gray-600 text-sm sm:text-base">{profile.specialization}</p>
          <p className="text-gray-500 text-xs sm:text-sm">{profile.hospital}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
          <button
            onClick={() => document.getElementById('profile-upload').click()}
            className="py-2 px-4 w-full rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base bg-blue-600 text-white hover:bg-blue-700"
          >
            <FaUpload className="text-sm sm:text-xl" />
            Upload New
          </button>
          {profilePicture && (
            <button
              onClick={() => {
                setProfilePicture(null);
                setMessage({ type: 'success', text: 'Profile picture removed' });
              }}
              className="py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              <FaTrash />
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Profile info component
  const ProfileInfoSection = () => (
    <div className="rounded-xl p-4 sm:p-6 shadow-sm border bg-white border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
            <FaUserMd />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Personal Information</h3>
            <p className="text-xs sm:text-sm text-gray-600">Update your personal details</p>
          </div>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700"
        >
          <FaEdit />
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
          {[
            { key: 'name', label: 'Full Name', icon: FaUser },
            { key: 'email', label: 'Email Address', icon: FaEnvelope },
            { key: 'phone', label: 'Phone Number', icon: FaPhone },
            { key: 'specialization', label: 'Specialization', icon: FaUserMd },
            { key: 'hospital', label: 'Hospital/Clinic', icon: FaHospital },
            { key: 'location', label: 'Location', icon: FaMapMarkerAlt },
          ].map(({ key, label, icon: Icon }) => (
            <div key={key} className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
              </label>
              <div className="flex items-center gap-2">
                <Icon className="text-gray-400" />
                <input
                  type="text"
                  value={profile[key]}
                  onChange={(e) => handleProfileChange(key, e.target.value)}
                  disabled={!isEditing}
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base border-gray-300 text-gray-900 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Bio
          </label>
          <textarea
            value={profile.bio}
            onChange={(e) => handleProfileChange('bio', e.target.value)}
            disabled={!isEditing}
            rows="3"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base border-gray-300 text-gray-900 disabled:bg-gray-50 disabled:text-gray-500"
            placeholder="Tell us about your experience and expertise..."
          />
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
          {[
            { key: 'experience', label: 'Experience', icon: FaCalendarAlt },
            { key: 'registrationId', label: 'Registration ID', icon: FaIdCard },
          ].map(({ key, label, icon: Icon }) => (
            <div key={key} className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
              </label>
              <div className="flex items-center gap-2">
                <Icon className="text-gray-400" />
                <input
                  type="text"
                  value={profile[key]}
                  onChange={(e) => handleProfileChange(key, e.target.value)}
                  disabled={!isEditing}
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base border-gray-300 text-gray-900 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
          ))}
        </div>

        {isEditing && (
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setIsEditing(false)}
              className="py-2 px-4 rounded-lg transition-colors text-sm sm:text-base w-full sm:w-auto text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={saveProfileChanges}
              className="py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto bg-green-600 text-white hover:bg-green-700"
            >
              <FaSave />
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Password change component
  const PasswordChangeSection = () => {
    const newPasswordStrength = validatePassword(passwords.newPassword);
    const strengthScore = Object.values(newPasswordStrength).filter(Boolean).length;
    
    return (
      <div className="rounded-xl p-4 sm:p-6 shadow-sm border bg-white border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-red-100 text-red-600">
            <FaLock />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Change Password</h3>
            <p className="text-xs sm:text-sm text-gray-600">Update your account password</p>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {[
            { key: 'currentPassword', label: 'Current Password', icon: FaKey, placeholder: 'Enter current password' },
            { key: 'newPassword', label: 'New Password', icon: FaLock, placeholder: 'Enter new password' },
            { key: 'confirmPassword', label: 'Confirm New Password', icon: FaUnlock, placeholder: 'Confirm new password' },
          ].map(({ key, label, icon: Icon, placeholder }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
              </label>
              <div className="relative">
                <div className="flex items-center gap-2">
                  <Icon className="text-gray-400" />
                  <input
                    type={showPassword[key] ? "text" : "password"}
                    value={passwords[key]}
                    onChange={(e) => handlePasswordChange(key, e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base border-gray-300 text-gray-900"
                    placeholder={placeholder}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility(key)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword[key] ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              
              {key === 'newPassword' && passwords.newPassword && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Password strength:</span>
                    <span className={`text-xs font-medium ${
                      strengthScore <= 2 ? 'text-red-500' :
                      strengthScore <= 3 ? 'text-yellow-500' :
                      'text-green-600'
                    }`}>
                      {strengthScore <= 2 ? 'Weak' : strengthScore <= 3 ? 'Fair' : 'Strong'}
                    </span>
                  </div>
                  <div className="w-full rounded-full h-2 bg-gray-200">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwords.newPassword)}`}
                      style={{ width: `${(strengthScore / 5) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex flex-col sm:grid sm:grid-cols-2 gap-1 mt-2">
                    {Object.entries(newPasswordStrength).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2">
                        {value ? (
                          <FaCheckCircle className="text-green-500 text-xs" />
                        ) : (
                          <FaTimes className="text-xs text-gray-300" />
                        )}
                        <span className={`text-xs ${value ? 'text-green-600' : 'text-gray-400'}`}>
                          {key === 'minLength' && `8+ characters`}
                          {key === 'hasUpperCase' && 'Uppercase'}
                          {key === 'hasLowerCase' && 'Lowercase'}
                          {key === 'hasNumbers' && 'Numbers'}
                          {key === 'hasSpecialChar' && 'Special chars'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {key === 'confirmPassword' && passwords.confirmPassword && passwords.newPassword !== passwords.confirmPassword && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">Passwords do not match</p>
              )}
            </div>
          ))}

          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              onClick={changePassword}
              disabled={!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword || passwords.newPassword !== passwords.confirmPassword}
              className="py-2 px-4 sm:px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto bg-red-600 text-white hover:bg-red-700"
            >
              <FaKey />
              Change Password
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 bg-gradient-to-b from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-gray-900">
            Profile Settings
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your account settings and create healthcare professional profiles
          </p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            message.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
            'bg-blue-50 border-blue-200 text-blue-800'
          } border`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm sm:text-base">
                {message.type === 'success' && <FaCheckCircle />}
                {message.type === 'error' && <FaTimes />}
                <span>{message.text}</span>
              </div>
              <button onClick={() => setMessage({ type: '', text: '' })} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>
          </div>
        )}

        {/* Tabs Navigation */}
        <div className="rounded-xl shadow-sm border mb-6 sm:mb-8 overflow-hidden bg-white border-gray-200">
          <div className="flex flex-col sm:flex-row border-b border-gray-200">
            {[
              { key: 'profile', icon: FaUser, label: 'Profile Info', shortLabel: 'Profile' },
              { key: 'password', icon: FaKey, label: 'Password', shortLabel: 'Password' },
              { key: 'createDoctor', icon: FaStethoscope, label: 'Create Professional', shortLabel: 'Create' },
            ].map(({ key, icon: Icon, label, shortLabel }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium flex items-center justify-center gap-2 ${
                  activeTab === key 
                    ? 'text-blue-600 border-blue-600 border-b-2' 
                    : 'text-gray-500 hover:text-gray-700 border-transparent'
                }`}
              >
                <Icon />
                <span className="hidden xs:inline">{label}</span>
                <span className="xs:hidden">{shortLabel}</span>
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === 'profile' && (
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/3">
                  <ProfilePictureSection />
                </div>
                <div className="w-full lg:w-2/3">
                  <ProfileInfoSection />
                </div>
              </div>
            )}
            
            {activeTab === 'password' && (
              <div className="max-w-2xl mx-auto w-full">
                <PasswordChangeSection />
              </div>
            )}
            
            {activeTab === 'createDoctor' && (
              <div className="max-w-3xl mx-auto w-full">
                <CreateDoctorSection
                  doctorData={doctorData}
                  handleDoctorChange={handleDoctorChange}
                  createDoctor={createDoctor}
                  isCreatingDoctor={isCreatingDoctor}
                  getSpecialtyOptions={getSpecialtyOptions}
                />
              </div>
            )}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-xl shadow-sm border border-red-200 bg-white">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-red-700">Danger Zone</h3>
                <p className="text-xs sm:text-sm text-red-600">Permanent account actions</p>
              </div>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                    setMessage({ type: 'success', text: 'Account deletion request submitted. You will receive a confirmation email.' });
                  }
                }}
                className="py-2 px-4 sm:px-6 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto bg-red-600 text-white hover:bg-red-700"
              >
                <FaTrash />
                Delete Account
              </button>
            </div>
            <p className="text-xs sm:text-sm mt-2 text-gray-600">
              Deleting your account will permanently remove all your data, including uploads, predictions, and reports. This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile_Settings;