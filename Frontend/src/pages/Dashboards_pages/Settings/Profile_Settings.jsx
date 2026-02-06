import React, { useState, useEffect } from 'react';
import {
  FaUser, FaEnvelope, FaPhone, FaHospital,
  FaUserMd, FaShieldAlt, FaCamera, FaSave,
  FaTimes, FaEye, FaEyeSlash, FaCheckCircle,
  FaMapMarkerAlt, FaCalendarAlt, FaIdCard,
  FaKey, FaUserCircle, FaEdit, FaUpload,
  FaLock, FaUnlock, FaCog, FaBell,
  FaGlobe, FaPalette, FaLanguage, FaMoon,
  FaTrash, FaCloudUploadAlt, FaImage, FaSun
} from 'react-icons/fa';

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
    bio: 'Senior Radiologist specializing in AI-assisted diagnostics with expertise in chest X-ray and mammogram analysis.',
    notifications: true,
    emailUpdates: true,
    language: 'english'
  });

  // Initialize darkMode from localStorage or default to false
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    return savedDarkMode ? JSON.parse(savedDarkMode) : false;
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

  // Language translations
  const translations = {
    english: {
      profileSettings: 'Profile Settings',
      manageAccount: 'Manage your account settings and preferences',
      profileInfo: 'Profile Info',
      password: 'Password',
      preferences: 'Preferences',
      profile: 'Profile',
      personalInfo: 'Personal Information',
      updateDetails: 'Update your personal details',
      editProfile: 'Edit Profile',
      cancel: 'Cancel',
      fullName: 'Full Name',
      emailAddress: 'Email Address',
      phoneNumber: 'Phone Number',
      specialization: 'Specialization',
      hospitalClinic: 'Hospital/Clinic',
      location: 'Location',
      professionalBio: 'Professional Bio',
      experience: 'Experience',
      registrationId: 'Registration ID',
      saveChanges: 'Save Changes',
      changePassword: 'Change Password',
      updatePassword: 'Update your account password',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm New Password',
      passwordStrength: 'Password strength',
      weak: 'Weak',
      fair: 'Fair',
      strong: 'Strong',
      chars: 'characters',
      uppercase: 'Uppercase',
      lowercase: 'Lowercase',
      numbers: 'Numbers',
      specialChars: 'Special chars',
      pushNotifications: 'Push Notifications',
      receiveNotifications: 'Receive notifications for new updates',
      emailUpdates: 'Email Updates',
      receiveEmails: 'Receive email newsletters and updates',
      darkMode: 'Dark Mode',
      switchTheme: 'Switch to dark theme',
      language: 'Language',
      selectLanguage: 'Select your preferred language',
      dangerZone: 'Danger Zone',
      permanentActions: 'Permanent account actions',
      deleteAccount: 'Delete Account',
      deleteWarning: 'Deleting your account will permanently remove all your data, including uploads, predictions, and reports. This action cannot be undone.',
      fileSizeError: 'File size should be less than 5MB',
      pictureUpdated: 'Profile picture updated successfully!',
      pictureRemoved: 'Profile picture removed',
      profileUpdated: 'Profile updated successfully!',
      allFieldsRequired: 'All fields are required',
      passwordsDontMatch: 'New passwords do not match',
      passwordTooWeak: 'Password is too weak. Please use a stronger password.',
      passwordChanged: 'Password changed successfully!',
      confirmDelete: 'Are you sure you want to delete your account? This action cannot be undone.',
      deleteRequested: 'Account deletion request submitted. You will receive a confirmation email.',
      uploadNew: 'Upload New',
      remove: 'Remove',
      enterCurrentPassword: 'Enter current password',
      enterNewPassword: 'Enter new password',
      confirmNewPassword: 'Confirm new password',
      cancelEdit: 'Cancel',
      saveChanges: 'Save Changes',
      languages: {
        english: 'English',
        urdu: 'Urdu',
        spanish: 'Spanish',
        arabic: 'Arabic'
      }
    },
    urdu: {
      profileSettings: 'پروفائل سیٹنگز',
      manageAccount: 'اپنی اکاؤنٹ کی سیٹنگز اور ترجیحات کا انتظام کریں',
      profileInfo: 'پروفائل کی معلومات',
      password: 'پاس ورڈ',
      preferences: 'ترجیحات',
      profile: 'پروفائل',
      personalInfo: 'ذاتی معلومات',
      updateDetails: 'اپنی ذاتی تفصیلات اپ ڈیٹ کریں',
      editProfile: 'پروفائل میں ترمیم کریں',
      cancel: 'منسوخ کریں',
      fullName: 'پورا نام',
      emailAddress: 'ای میل پتہ',
      phoneNumber: 'فون نمبر',
      specialization: 'مہارت',
      hospitalClinic: 'ہسپتال/کلینک',
      location: 'مقام',
      professionalBio: 'پیشہ ورانہ تعارف',
      experience: 'تجربہ',
      registrationId: 'رجسٹریشن آئی ڈی',
      saveChanges: 'تبدیلیاں محفوظ کریں',
      changePassword: 'پاس ورڈ تبدیل کریں',
      updatePassword: 'اپنا اکاؤنٹ پاس ورڈ اپ ڈیٹ کریں',
      currentPassword: 'موجودہ پاس ورڈ',
      newPassword: 'نیا پاس ورڈ',
      confirmPassword: 'نیا پاس ورڈ تصدیق کریں',
      passwordStrength: 'پاس ورڈ کی طاقت',
      weak: 'کمزور',
      fair: 'مناسب',
      strong: 'مضبوط',
      chars: 'حروف',
      uppercase: 'بڑے حروف',
      lowercase: 'چھوٹے حروف',
      numbers: 'نمبر',
      specialChars: 'خصوصی حروف',
      pushNotifications: 'پش اطلاعات',
      receiveNotifications: 'نئی اپ ڈیٹس کے لیے اطلاعات موصول کریں',
      emailUpdates: 'ای میل اپ ڈیٹس',
      receiveEmails: 'ای میل نیوز لیٹرز اور اپ ڈیٹس موصول کریں',
      darkMode: 'ڈارک موڈ',
      switchTheme: 'ڈارک تھیم پر سوئچ کریں',
      language: 'زبان',
      selectLanguage: 'اپنی پسندیدہ زبان منتخب کریں',
      dangerZone: 'خطرے کا زون',
      permanentActions: 'مستقل اکاؤنٹ کے اقدامات',
      deleteAccount: 'اکاؤنٹ حذف کریں',
      deleteWarning: 'اپنا اکاؤنٹ حذف کرنے سے آپ کا تمام ڈیٹا مستقل طور پر ہٹ جائے گا، بشمول اپ لوڈز، پیشن گوئیاں اور رپورٹس۔ یہ عمل واپس نہیں کیا جا سکتا۔',
      fileSizeError: 'فائل کا سائز 5MB سے کم ہونا چاہیے',
      pictureUpdated: 'پروفائل پکچر کامیابی سے اپ ڈیٹ ہو گیا!',
      pictureRemoved: 'پروفائل پکچر ہٹا دیا گیا',
      profileUpdated: 'پروفائل کامیابی سے اپ ڈیٹ ہو گیا!',
      allFieldsRequired: 'تمام فیلڈز درکار ہیں',
      passwordsDontMatch: 'نئے پاس ورڈ مماثل نہیں ہیں',
      passwordTooWeak: 'پاس ورڈ بہت کمزور ہے۔ براہ کرم ایک مضبوط پاس ورڈ استعمال کریں۔',
      passwordChanged: 'پاس ورڈ کامیابی سے تبدیل ہو گیا!',
      confirmDelete: 'کیا آپ واقعی اپنا اکاؤنٹ حذف کرنا چاہتے ہیں؟ یہ عمل واپس نہیں کیا جا سکتا۔',
      deleteRequested: 'اکاؤنٹ حذف کرنے کی درخواست جمع کرائی گئی۔ آپ کو ایک تصدیقی ای میل موصول ہوگی۔',
      uploadNew: 'نیا اپ لوڈ کریں',
      remove: 'ہٹائیں',
      enterCurrentPassword: 'موجودہ پاس ورڈ درج کریں',
      enterNewPassword: 'نیا پاس ورڈ درج کریں',
      confirmNewPassword: 'نیا پاس ورڈ تصدیق کریں',
      cancelEdit: 'منسوخ کریں',
      saveChanges: 'تبدیلیاں محفوظ کریں',
      languages: {
        english: 'انگریزی',
        urdu: 'اردو',
        spanish: 'ہسپانوی',
        arabic: 'عربی'
      }
    },
    spanish: {
      profileSettings: 'Configuración del Perfil',
      manageAccount: 'Administre la configuración y preferencias de su cuenta',
      profileInfo: 'Información del Perfil',
      password: 'Contraseña',
      preferences: 'Preferencias',
      profile: 'Perfil',
      personalInfo: 'Información Personal',
      updateDetails: 'Actualice sus detalles personales',
      editProfile: 'Editar Perfil',
      cancel: 'Cancelar',
      fullName: 'Nombre Completo',
      emailAddress: 'Dirección de Correo',
      phoneNumber: 'Número de Teléfono',
      specialization: 'Especialización',
      hospitalClinic: 'Hospital/Clínica',
      location: 'Ubicación',
      professionalBio: 'Biografía Profesional',
      experience: 'Experiencia',
      registrationId: 'ID de Registro',
      saveChanges: 'Guardar Cambios',
      changePassword: 'Cambiar Contraseña',
      updatePassword: 'Actualice la contraseña de su cuenta',
      currentPassword: 'Contraseña Actual',
      newPassword: 'Nueva Contraseña',
      confirmPassword: 'Confirmar Nueva Contraseña',
      passwordStrength: 'Fortaleza de la contraseña',
      weak: 'Débil',
      fair: 'Regular',
      strong: 'Fuerte',
      chars: 'caracteres',
      uppercase: 'Mayúsculas',
      lowercase: 'Minúsculas',
      numbers: 'Números',
      specialChars: 'Caracteres especiales',
      pushNotifications: 'Notificaciones Push',
      receiveNotifications: 'Recibir notificaciones para nuevas actualizaciones',
      emailUpdates: 'Actualizaciones por Correo',
      receiveEmails: 'Recibir boletines y actualizaciones por correo',
      darkMode: 'Modo Oscuro',
      switchTheme: 'Cambiar a tema oscuro',
      language: 'Idioma',
      selectLanguage: 'Seleccione su idioma preferido',
      dangerZone: 'Zona de Peligro',
      permanentActions: 'Acciones permanentes de cuenta',
      deleteAccount: 'Eliminar Cuenta',
      deleteWarning: 'Eliminar su cuenta eliminará permanentemente todos sus datos, incluidas cargas, predicciones e informes. Esta acción no se puede deshacer.',
      fileSizeError: 'El tamaño del archivo debe ser menor a 5MB',
      pictureUpdated: '¡Foto de perfil actualizada exitosamente!',
      pictureRemoved: 'Foto de perfil eliminada',
      profileUpdated: '¡Perfil actualizado exitosamente!',
      allFieldsRequired: 'Todos los campos son obligatorios',
      passwordsDontMatch: 'Las nuevas contraseñas no coinciden',
      passwordTooWeak: 'La contraseña es demasiado débil. Por favor use una contraseña más fuerte.',
      passwordChanged: '¡Contraseña cambiada exitosamente!',
      confirmDelete: '¿Está seguro de que desea eliminar su cuenta? Esta acción no se puede deshacer.',
      deleteRequested: 'Solicitud de eliminación de cuenta enviada. Recibirá un correo de confirmación.',
      uploadNew: 'Subir Nuevo',
      remove: 'Eliminar',
      enterCurrentPassword: 'Ingrese la contraseña actual',
      enterNewPassword: 'Ingrese la nueva contraseña',
      confirmNewPassword: 'Confirmar nueva contraseña',
      cancelEdit: 'Cancelar',
      saveChanges: 'Guardar Cambios',
      languages: {
        english: 'Inglés',
        urdu: 'Urdu',
        spanish: 'Español',
        arabic: 'Árabe'
      }
    },
    arabic: {
      profileSettings: 'إعدادات الملف الشخصي',
      manageAccount: 'إدارة إعدادات وتفضيلات حسابك',
      profileInfo: 'معلومات الملف الشخصي',
      password: 'كلمة المرور',
      preferences: 'التفضيلات',
      profile: 'الملف الشخصي',
      personalInfo: 'المعلومات الشخصية',
      updateDetails: 'قم بتحديث بياناتك الشخصية',
      editProfile: 'تحرير الملف الشخصي',
      cancel: 'إلغاء',
      fullName: 'الاسم الكامل',
      emailAddress: 'عنوان البريد الإلكتروني',
      phoneNumber: 'رقم الهاتف',
      specialization: 'التخصص',
      hospitalClinic: 'المستشفى/العيادة',
      location: 'الموقع',
      professionalBio: 'السيرة الذاتية المهنية',
      experience: 'الخبرة',
      registrationId: 'معرف التسجيل',
      saveChanges: 'حفظ التغييرات',
      changePassword: 'تغيير كلمة المرور',
      updatePassword: 'قم بتحديث كلمة مرور حسابك',
      currentPassword: 'كلمة المرور الحالية',
      newPassword: 'كلمة المرور الجديدة',
      confirmPassword: 'تأكيد كلمة المرور الجديدة',
      passwordStrength: 'قوة كلمة المرور',
      weak: 'ضعيف',
      fair: 'متوسط',
      strong: 'قوي',
      chars: 'أحرف',
      uppercase: 'أحرف كبيرة',
      lowercase: 'أحرف صغيرة',
      numbers: 'أرقام',
      specialChars: 'أحرف خاصة',
      pushNotifications: 'الإشعارات',
      receiveNotifications: 'تلقي إشعارات للتحديثات الجديدة',
      emailUpdates: 'تحديثات البريد الإلكتروني',
      receiveEmails: 'تلقي النشرات الإخبارية والتحديثات عبر البريد الإلكتروني',
      darkMode: 'الوضع الداكن',
      switchTheme: 'التبديل إلى السمة الداكنة',
      language: 'اللغة',
      selectLanguage: 'حدد لغتك المفضلة',
      dangerZone: 'منطقة الخطر',
      permanentActions: 'إجراءات الحساب الدائمة',
      deleteAccount: 'حذف الحساب',
      deleteWarning: 'سيؤدي حذف حسابك إلى إزالة جميع بياناتك بشكل دائم، بما في ذلك التحميلات والتنبؤات والتقارير. لا يمكن التراجع عن هذا الإجراء.',
      fileSizeError: 'يجب أن يكون حجم الملف أقل من 5 ميجابايت',
      pictureUpdated: 'تم تحديث صورة الملف الشخصي بنجاح!',
      pictureRemoved: 'تمت إزالة صورة الملف الشخصي',
      profileUpdated: 'تم تحديث الملف الشخصي بنجاح!',
      allFieldsRequired: 'جميع الحقول مطلوبة',
      passwordsDontMatch: 'كلمات المرور الجديدة غير متطابقة',
      passwordTooWeak: 'كلمة المرور ضعيفة جدًا. الرجاء استخدام كلمة مرور أقوى.',
      passwordChanged: 'تم تغيير كلمة المرور بنجاح!',
      confirmDelete: 'هل أنت متأكد أنك تريد حذف حسابك؟ لا يمكن التراجع عن هذا الإجراء.',
      deleteRequested: 'تم تقديم طلب حذف الحساب. ستصلك رسالة تأكيد بالبريد الإلكتروني.',
      uploadNew: 'تحميل جديد',
      remove: 'إزالة',
      enterCurrentPassword: 'أدخل كلمة المرور الحالية',
      enterNewPassword: 'أدخل كلمة المرور الجديدة',
      confirmNewPassword: 'تأكيد كلمة المرور الجديدة',
      cancelEdit: 'إلغاء',
      saveChanges: 'حفظ التغييرات',
      languages: {
        english: 'الإنجليزية',
        urdu: 'الأردية',
        spanish: 'الإسبانية',
        arabic: 'العربية'
      }
    }
  };

  // Get current translations
  const t = translations[profile.language];

  // Apply dark mode class to body when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-gray-900', 'text-white');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-gray-900', 'text-white');
    }
    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Handle profile changes
  const handleProfileChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  // Handle dark mode toggle
  const handleDarkModeToggle = (checked) => {
    setDarkMode(checked);
  };

  // Handle language change
  const handleLanguageChange = (language) => {
    handleProfileChange('language', language);
  };

  // Handle password changes
  const handlePasswordChange = (field, value) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
  };

  // Handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: t.fileSizeError });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        setMessage({ type: 'success', text: t.pictureUpdated });
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
    setMessage({ type: 'success', text: t.profileUpdated });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  // Change password
  const changePassword = () => {
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      setMessage({ type: 'error', text: t.allFieldsRequired });
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setMessage({ type: 'error', text: t.passwordsDontMatch });
      return;
    }

    const passwordStrength = validatePassword(passwords.newPassword);
    const strengthScore = Object.values(passwordStrength).filter(Boolean).length;
    
    if (strengthScore < 3) {
      setMessage({ type: 'error', text: t.passwordTooWeak });
      return;
    }

    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setMessage({ type: 'success', text: t.passwordChanged });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  // Delete account (with confirmation)
  const deleteAccount = () => {
    if (window.confirm(t.confirmDelete)) {
      setMessage({ type: 'success', text: t.deleteRequested });
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
    <div className={`rounded-xl p-4 sm:p-6 shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex flex-col items-center">
        <div className="relative mb-4 sm:mb-6">
          <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br ${darkMode ? 'from-gray-700 to-gray-800' : 'from-blue-100 to-purple-100'} border-4 ${darkMode ? 'border-gray-700' : 'border-white'} shadow-lg flex items-center justify-center overflow-hidden`}>
            {profilePicture ? (
              <img 
                src={profilePicture} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserCircle className={`${darkMode ? 'text-gray-400' : 'text-gray-400'} text-4xl sm:text-6xl`} />
            )}
          </div>
          <label htmlFor="profile-upload" className={`absolute bottom-0 right-0 p-1 sm:p-2 ${darkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-full cursor-pointer transition-colors text-xs sm:text-base`}>
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
          <h3 className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{profile.name}</h3>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm sm:text-base`}>{profile.specialization}</p>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs sm:text-sm`}>{profile.hospital}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
          <button
            onClick={() => document.getElementById('profile-upload').click()}
            className={`py-2 px-4 w-full rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base ${
              darkMode 
                ? 'bg-blue-700 text-white hover:bg-blue-600' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <FaUpload className="text-sm sm:text-xl" />
            {t.uploadNew}
          </button>
          {profilePicture && (
            <button
              onClick={() => {
                setProfilePicture(null);
                setMessage({ type: 'success', text: t.pictureRemoved });
              }}
              className={`py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base ${
                darkMode
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaTrash />
              {t.remove}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Profile info component
  const ProfileInfoSection = () => (
    <div className={`rounded-xl p-4 sm:p-6 shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'}`}>
            <FaUserMd />
          </div>
          <div>
            <h3 className={`text-base sm:text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t.personalInfo}</h3>
            <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.updateDetails}</p>
          </div>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto ${
            darkMode
              ? 'bg-blue-700 text-white hover:bg-blue-600'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <FaEdit />
          {isEditing ? t.cancel : t.editProfile}
        </button>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
          {[
            { key: 'name', label: t.fullName, icon: FaUser },
            { key: 'email', label: t.emailAddress, icon: FaEnvelope },
            { key: 'phone', label: t.phoneNumber, icon: FaPhone },
            { key: 'specialization', label: t.specialization, icon: FaUserMd },
            { key: 'hospital', label: t.hospitalClinic, icon: FaHospital },
            { key: 'location', label: t.location, icon: FaMapMarkerAlt },
          ].map(({ key, label, icon: Icon }) => (
            <div key={key} className="flex-1 min-w-[200px]">
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                {label}
              </label>
              <div className="flex items-center gap-2">
                <Icon className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="text"
                  value={profile[key]}
                  onChange={(e) => handleProfileChange(key, e.target.value)}
                  disabled={!isEditing}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white disabled:bg-gray-800 disabled:text-gray-400'
                      : 'border-gray-300 text-gray-900 disabled:bg-gray-50 disabled:text-gray-500'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            {t.professionalBio}
          </label>
          <textarea
            value={profile.bio}
            onChange={(e) => handleProfileChange('bio', e.target.value)}
            disabled={!isEditing}
            rows="3"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
              darkMode
                ? 'bg-gray-700 border-gray-600 text-white disabled:bg-gray-800 disabled:text-gray-400'
                : 'border-gray-300 text-gray-900 disabled:bg-gray-50 disabled:text-gray-500'
            }`}
            placeholder="Tell us about your experience and expertise..."
          />
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
          {[
            { key: 'experience', label: t.experience, icon: FaCalendarAlt },
            { key: 'registrationId', label: t.registrationId, icon: FaIdCard },
          ].map(({ key, label, icon: Icon }) => (
            <div key={key} className="flex-1 min-w-[200px]">
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                {label}
              </label>
              <div className="flex items-center gap-2">
                <Icon className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="text"
                  value={profile[key]}
                  onChange={(e) => handleProfileChange(key, e.target.value)}
                  disabled={!isEditing}
                  className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white disabled:bg-gray-800 disabled:text-gray-400'
                      : 'border-gray-300 text-gray-900 disabled:bg-gray-50 disabled:text-gray-500'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {isEditing && (
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setIsEditing(false)}
              className={`py-2 px-4 rounded-lg transition-colors text-sm sm:text-base w-full sm:w-auto ${
                darkMode
                  ? 'text-gray-300 hover:bg-gray-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {t.cancelEdit}
            </button>
            <button
              onClick={saveProfileChanges}
              className={`py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto ${
                darkMode
                  ? 'bg-green-700 text-white hover:bg-green-600'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <FaSave />
              {t.saveChanges}
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
      <div className={`rounded-xl p-4 sm:p-6 shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 rounded-lg ${darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-600'}`}>
            <FaLock />
          </div>
          <div>
            <h3 className={`text-base sm:text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t.changePassword}</h3>
            <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.updatePassword}</p>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {[
            { key: 'currentPassword', label: t.currentPassword, icon: FaKey, placeholder: t.enterCurrentPassword },
            { key: 'newPassword', label: t.newPassword, icon: FaLock, placeholder: t.enterNewPassword },
            { key: 'confirmPassword', label: t.confirmPassword, icon: FaUnlock, placeholder: t.confirmNewPassword },
          ].map(({ key, label, icon: Icon, placeholder }) => (
            <div key={key}>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                {label}
              </label>
              <div className="relative">
                <div className="flex items-center gap-2">
                  <Icon className={`${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input
                    type={showPassword[key] ? "text" : "password"}
                    value={passwords[key]}
                    onChange={(e) => handlePasswordChange(key, e.target.value)}
                    className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white'
                        : 'border-gray-300 text-gray-900'
                    }`}
                    placeholder={placeholder}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility(key)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {showPassword[key] ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              
              {/* Password strength meter for new password */}
              {key === 'newPassword' && passwords.newPassword && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.passwordStrength}:</span>
                    <span className={`text-xs font-medium ${
                      strengthScore <= 2 ? 'text-red-500' :
                      strengthScore <= 3 ? 'text-yellow-500' :
                      darkMode ? 'text-green-400' : 'text-green-600'
                    }`}>
                      {strengthScore <= 2 ? t.weak : strengthScore <= 3 ? t.fair : t.strong}
                    </span>
                  </div>
                  <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
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
                          <FaTimes className={`text-xs ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
                        )}
                        <span className={`text-xs ${value ? (darkMode ? 'text-green-400' : 'text-green-600') : (darkMode ? 'text-gray-500' : 'text-gray-400')}`}>
                          {key === 'minLength' && `8+ ${t.chars}`}
                          {key === 'hasUpperCase' && t.uppercase}
                          {key === 'hasLowerCase' && t.lowercase}
                          {key === 'hasNumbers' && t.numbers}
                          {key === 'hasSpecialChar' && t.specialChars}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Password match validation */}
              {key === 'confirmPassword' && passwords.confirmPassword && passwords.newPassword !== passwords.confirmPassword && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">{t.passwordsDontMatch}</p>
              )}
            </div>
          ))}

          <div className="flex justify-end pt-4 border-t border-gray-700">
            <button
              onClick={changePassword}
              disabled={!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword || passwords.newPassword !== passwords.confirmPassword}
              className={`py-2 px-4 sm:px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto ${
                darkMode
                  ? 'bg-red-700 text-white hover:bg-red-600'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              <FaKey />
              {t.changePassword}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Preferences component
  const PreferencesSection = () => (
    <div className={`rounded-xl p-4 sm:p-6 shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${darkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-600'}`}>
          <FaCog />
        </div>
        <div>
          <h3 className={`text-base sm:text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t.preferences}</h3>
          <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t.selectLanguage}</p>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {[
          { 
            key: 'notifications', 
            label: t.pushNotifications, 
            description: t.receiveNotifications, 
            icon: FaBell,
            checked: profile.notifications,
            onChange: (e) => handleProfileChange('notifications', e.target.checked)
          },
          { 
            key: 'emailUpdates', 
            label: t.emailUpdates, 
            description: t.receiveEmails, 
            icon: FaEnvelope,
            checked: profile.emailUpdates,
            onChange: (e) => handleProfileChange('emailUpdates', e.target.checked)
          },
          { 
            key: 'darkMode', 
            label: t.darkMode, 
            description: t.switchTheme, 
            icon: darkMode ? FaSun : FaMoon,
            checked: darkMode,
            onChange: (e) => handleDarkModeToggle(e.target.checked)
          },
        ].map(({ key, label, description, icon: Icon, checked, onChange }) => (
          <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-gray-700 gap-2">
            <div className="flex items-center gap-3">
              <Icon className={`${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              <div>
                <h4 className={`font-medium text-sm sm:text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>{label}</h4>
                <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>{description}</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer mt-2 sm:mt-0">
              <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="sr-only peer"
              />
              <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:rounded-full after:h-5 after:w-5 after:transition-all ${
                darkMode
                  ? 'bg-gray-700 peer-checked:bg-blue-600 after:bg-gray-300 after:border-gray-600'
                  : 'bg-gray-200 peer-checked:bg-blue-600 after:bg-white after:border-gray-300'
              } after:border`}></div>
            </label>
          </div>
        ))}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-2">
          <div className="flex items-center gap-3">
            <FaLanguage className={`${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
            <div>
              <h4 className={`font-medium text-sm sm:text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t.language}</h4>
              <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>{t.selectLanguage}</p>
            </div>
          </div>
          <select
            value={profile.language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base mt-2 sm:mt-0 w-full sm:w-auto ${
              darkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'border-gray-300 text-gray-900'
            }`}
          >
            <option value="english">{t.languages.english}</option>
            <option value="urdu">{t.languages.urdu}</option>
            <option value="spanish">{t.languages.spanish}</option>
            <option value="arabic">{t.languages.arabic}</option>
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 ${darkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-gray-50 to-blue-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {t.profileSettings}
          </h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm sm:text-base`}>
            {t.manageAccount}
          </p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg ${
            message.type === 'success' ? `${darkMode ? 'bg-green-900 border-green-800 text-green-300' : 'bg-green-50 border-green-200 text-green-800'}` :
            message.type === 'error' ? `${darkMode ? 'bg-red-900 border-red-800 text-red-300' : 'bg-red-50 border-red-200 text-red-800'}` :
            `${darkMode ? 'bg-blue-900 border-blue-800 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-800'}`
          } border`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm sm:text-base">
                {message.type === 'success' && <FaCheckCircle />}
                {message.type === 'error' && <FaTimes />}
                <span>{message.text}</span>
              </div>
              <button onClick={() => setMessage({ type: '', text: '' })} className={`${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}>
                <FaTimes />
              </button>
            </div>
          </div>
        )}

        {/* Tabs Navigation */}
        <div className={`rounded-xl shadow-sm border mb-6 sm:mb-8 overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="flex flex-col sm:flex-row border-b border-gray-700">
            {[
              { key: 'profile', icon: FaUser, label: t.profileInfo, shortLabel: t.profile },
              { key: 'password', icon: FaShieldAlt, label: t.password, shortLabel: t.password },
              { key: 'preferences', icon: FaCog, label: t.preferences, shortLabel: t.preferences },
            ].map(({ key, icon: Icon, label, shortLabel }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium flex items-center justify-center gap-2 ${
                  activeTab === key 
                    ? `${darkMode ? 'text-blue-400 border-blue-500' : 'text-blue-600 border-blue-600'} border-b-2` 
                    : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} border-transparent`
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
            
            {activeTab === 'preferences' && (
              <div className="max-w-3xl mx-auto w-full">
                <PreferencesSection />
              </div>
            )}
          </div>
        </div>

        {/* Danger Zone */}
        <div className={`rounded-xl shadow-sm border ${darkMode ? 'border-red-800 bg-gray-800' : 'border-red-200 bg-white'}`}>
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className={`text-base sm:text-lg font-semibold ${darkMode ? 'text-red-400' : 'text-red-700'}`}>{t.dangerZone}</h3>
                <p className={`text-xs sm:text-sm ${darkMode ? 'text-red-300' : 'text-red-600'}`}>{t.permanentActions}</p>
              </div>
              <button
                onClick={deleteAccount}
                className={`py-2 px-4 sm:px-6 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto ${
                  darkMode
                    ? 'bg-red-700 text-white hover:bg-red-600'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                <FaTrash />
                {t.deleteAccount}
              </button>
            </div>
            <p className={`text-xs sm:text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.deleteWarning}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile_Settings;