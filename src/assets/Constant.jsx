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
import { FaEye, FaHeart } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";


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

export const healthMetrics = [
  {
    label: "Heart Rate",
    value: "72 bpm",
    status: "Normal",
    icon: <FaHeart className="text-red-500" />,
    color: "bg-red-50",
    category: "Heart",
  },
  {
    label: "Blood Pressure",
    value: "120/80",
    status: "Normal",
    icon: <FaDroplet className="text-blue-500" />,
    color: "bg-blue-50",
    category: "Heart",
  },
  {
    label: "Oxygen Level",
    value: "98%",
    status: "Good",
    icon: <FaDroplet className="text-green-500" />,
    color: "bg-green-50",
    category: "Lungs",
  },
  {
    label: "Vision Test",
    value: "20/20",
    status: "Clear",
    icon: <FaEye className="text-indigo-500" />,
    color: "bg-indigo-50",
    category: "Eye",
  },
];


export const diagnoses = [
  {
    title: "Heart Problem",
    description:
      "Coronary artery disease is a common heart condition that affects the major blood vessels that supply the heart muscle.",
    doctor: "Dr Ronald Richards",
    image: "/assets/images/dashboard/0725LifeExpectancy_SC.jpg",
  },
  {
    title: "Kidney Problem",
    description:
    "Coronary artery disease is a common heart condition that affects the major blood vessels that supply the heart muscle.",
    doctor: "Dr Leslie Alexander",
    image: "/assets/images/dashboard/istockphoto-1334724346-640x640-1.jpg",
  },
  {
    title: "Knee Problem",
    description:
      "Coronary artery disease is a common heart condition that affects the major blood vessels that supply the heart muscle.",
    doctor: "Dr Robert Fox",
    image: "/assets/images/dashboard/knee pain hero.jpg",
  },
]

export const prescriptions = [
  {
    name: "Paracetamol - 500mg",
    dosage: "1 tablet every day for 4 weeks",
    remaining: "4 Remaining",
    color: "bg-purple-100",
  },
  {
    name: "Liquifying - 450ml",
    dosage: "1 teaspoon every day for 2 weeks",
    remaining: "8 Remaining",
    color: "bg-blue-100",
  },
]

export const appointments = [
  {
    date: "10",
    day: "Tue",
    title: "MRI-Right thing",
    doctor: "Dr. Damian Lewis",
    specialty: "Cardiologist",
    time: "10:00 AM",
    imgUrl: "/assets/images/dashboard/mri.png"
  },
  {
    title: "Surgery preparation",
    doctor: "Dr. Dianne Russell",
    specialty: "Cardiologist",
    time: "2:00 PM",
    imgUrl: "/assets/images/dashboard/operation-preparation.jpg"
  },
]
