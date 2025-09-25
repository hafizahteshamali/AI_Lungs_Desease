import {
  MdDashboard,
  MdEventAvailable,
  MdHelp,
  MdLocalPharmacy,
  MdLogout,
  MdMedicalInformation,
  MdMenuBook,
  MdMessage,
  MdPeople,
  MdSettings,
  MdSmartToy,
  MdCloudUpload,
  MdHistory,
  MdAssessment,
  MdNotifications,
} from "react-icons/md";

const DashboardUrl = [
  {
    items: [
      {
        icon: <MdDashboard />,
        text: "Dashboards",
        children: [
          { icon: <MdDashboard />, text: "Admin Dashboard", url: "admin", roles: ["admin"] },
          { icon: <MdDashboard />, text: "Doctor Dashboard", url: "doctor", roles: ["doctor"] },
          { icon: <MdDashboard />, text: "Radiographer Dashboard", url: "radiographer", roles: ["radiographer"] },
          { icon: <MdDashboard />, text: "Patient Dashboard", url: "patient", roles: ["patient"] },
        ],
      },
    ],
  },
  {
    items: [
      {
        icon: <MdCloudUpload />,
        text: "X-ray Management",
        children: [
          { icon: <MdCloudUpload />, text: "Upload X-ray", url: "xray/upload", roles: ["doctor", "radiographer"] },
          { icon: <MdHistory />, text: "All X-rays / History", url: "xray/history", roles: ["doctor", "radiographer", "patient"] },
          { icon: <MdAssessment />, text: "Prediction View", url: "xray/prediction", roles: ["doctor", "radiographer", "patient"] },
        ],
      },
    ],
  },
  {
    items: [
      {
        icon: <MdEventAvailable />,
        text: "Appointments",
        children: [
          { icon: <MdEventAvailable />, text: "Book Appointment", url: "appointments/book", roles: ["patient"] },
          { icon: <MdPeople />, text: "Manage Appointments", url: "appointments/manage", roles: ["doctor"] },
          { icon: <MdHistory />, text: "Appointment History", url: "appointments/history", roles: ["doctor", "patient"] },
        ],
      },
    ],
  },
  {
    items: [
      {
        icon: <MdLocalPharmacy />,
        text: "Medicines & Prescriptions",
        children: [
          { icon: <MdLocalPharmacy />, text: "AI-Recommended Medicines", url: "medicines/ai", roles: ["doctor"] },
          { icon: <MdMenuBook />, text: "Prescription Export", url: "medicines/export", roles: ["doctor", "patient"] },
        ],
      },
    ],
  },
  {
    items: [
      {
        icon: <MdPeople />,
        text: "Admin Management",
        children: [
          { icon: <MdPeople />, text: "User Management", url: "admin/users", roles: ["admin"] },
          { icon: <MdMedicalInformation />, text: "Disease Categories", url: "admin/diseases", roles: ["admin"] },
          { icon: <MdLocalPharmacy />, text: "Medicine Library", url: "admin/medicines", roles: ["admin"] },
          { icon: <MdHistory />, text: "System Logs", url: "admin/logs", roles: ["admin"] },
          { icon: <MdAssessment />, text: "Analytics & Reports", url: "admin/reports", roles: ["admin"] },
        ],
      },
    ],
  },
  {
    items: [
      {
        icon: <MdNotifications />,
        text: "Notifications",
        children: [
          { icon: <MdNotifications />, text: "Notifications", url: "notifications", roles: ["admin", "doctor", "patient", "radiographer"] },
        ],
      },
    ],
  },
  {
    items: [
      {
        icon: <MdSettings />,
        text: "Settings",
        children: [
          { icon: <MdSettings />, text: "Profile Settings", url: "settings/profile", roles: ["admin", "doctor", "patient", "radiographer"] },
          { icon: <MdSmartToy />, text: "Theme", url: "settings/theme", roles: ["admin", "doctor", "patient", "radiographer"] },
          { icon: <MdMenuBook />, text: "Language Selection", url: "settings/language", roles: ["admin", "doctor", "patient", "radiographer"] },
          { icon: <MdSmartToy />, text: "2FA Setup", url: "settings/2fa", roles: ["admin", "doctor", "patient", "radiographer"] },
        ],
      },
    ],
  },
  {
    items: [
      {
        icon: <MdHelp />,
        text: "Help & Support",
        children: [
          { icon: <MdHelp />, text: "FAQ", url: "help/faq", roles: ["admin", "doctor", "patient", "radiographer"] },
          { icon: <MdMessage />, text: "Contact Support", url: "help/contact", roles: ["admin", "doctor", "patient", "radiographer"] },
          { icon: <MdMenuBook />, text: "Documentation", url: "help/docs", roles: ["admin", "doctor", "patient", "radiographer"] },
          { icon: <MdLogout />, text: "Logout", url: "/logout", danger: true, roles: ["admin", "doctor", "patient", "radiographer"] },
        ],
      },
    ],
  },
];

export { DashboardUrl };
