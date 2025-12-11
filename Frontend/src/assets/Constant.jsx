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
} from "react-icons/md"
import { FaAppleAlt, FaEye, FaHeart } from "react-icons/fa"
import { FaBottleDroplet, FaDroplet, FaLungs } from "react-icons/fa6"

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
          {
            icon: <MdHistory />,
            text: "All X-rays / History",
            url: "xray/history",
            roles: ["doctor", "radiographer", "patient"],
          },
          {
            icon: <MdAssessment />,
            text: "Prediction View",
            url: "xray/prediction",
            roles: ["doctor", "radiographer", "patient"],
          },
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
          {
            icon: <MdHistory />,
            text: "Appointment History",
            url: "appointments/history",
            roles: ["doctor", "patient"],
          },
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
          {
            icon: <MdNotifications />,
            text: "Notifications",
            url: "notifications",
            roles: ["admin", "doctor", "patient", "radiographer"],
          },
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
          {
            icon: <MdSettings />,
            text: "Profile Settings",
            url: "settings/profile",
            roles: ["admin", "doctor", "patient", "radiographer"],
          },
          {
            icon: <MdSmartToy />,
            text: "Theme",
            url: "settings/theme",
            roles: ["admin", "doctor", "patient", "radiographer"],
          },
          {
            icon: <MdMenuBook />,
            text: "Language Selection",
            url: "settings/language",
            roles: ["admin", "doctor", "patient", "radiographer"],
          },
          {
            icon: <MdSmartToy />,
            text: "2FA Setup",
            url: "settings/2fa",
            roles: ["admin", "doctor", "patient", "radiographer"],
          },
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
          {
            icon: <MdMessage />,
            text: "Contact Support",
            url: "help/contact",
            roles: ["admin", "doctor", "patient", "radiographer"],
          },
          {
            icon: <MdMenuBook />,
            text: "Documentation",
            url: "help/docs",
            roles: ["admin", "doctor", "patient", "radiographer"],
          },
          {
            icon: <MdLogout />,
            text: "Logout",
            url: "/logout",
            danger: true,
            roles: ["admin", "doctor", "patient", "radiographer"],
          },
        ],
      },
    ],
  },
]

export { DashboardUrl }

export const healthMetrics = [
  {
    label: "Heart Rate",
    value: "72",
    status: "Normal",
    category: "Heart",
    icon: <FaHeart className="text-red-500" />,
    color: "text-red-500",
  },
  {
    label: "Blood Pressure",
    value: "120/80",
    status: "Normal",
    category: "Heart",
    icon: <FaDroplet className="text-red-500" />,
    color: "text-red-500",
  },
  {
    label: "Oxygen Level",
    value: "98%",
    status: "Normal",
    category: "Lungs",
    icon: <FaDroplet className="text-blue-500" />,
    color: "text-blue-500",
  },
  {
    label: "Respiratory Rate",
    value: "16",
    status: "Normal",
    category: "Lungs",
    icon: <FaDroplet className="text-blue-500" />,
    color: "text-blue-500",
  },
  {
    label: "Digestion",
    value: "Good",
    status: "Normal",
    category: "Stomach",
    icon: <FaDroplet className="text-yellow-500" />,
    color: "text-yellow-500",
  },
  {
    label: "Hydration",
    value: "85%",
    status: "Normal",
    category: "Stomach",
    icon: <FaDroplet className="text-yellow-500" />,
    color: "text-yellow-500",
  },
  {
    label: "Temperature",
    value: "98.6°F",
    status: "Normal",
    category: "Body",
    icon: <FaDroplet className="text-orange-500" />,
    color: "text-orange-500",
  },
  {
    label: "Weight",
    value: "72kg",
    status: "Normal",
    category: "Body",
    icon: <FaDroplet className="text-orange-500" />,
    color: "text-orange-500",
  },
  {
    label: "Vision",
    value: "20/20",
    status: "Normal",
    category: "Eye",
    icon: <FaEye className="text-purple-500" />,
    color: "text-purple-500",
  },
  {
    label: "Eye Pressure",
    value: "15",
    status: "Normal",
    category: "Eye",
    icon: <FaEye className="text-purple-500" />,
    color: "text-purple-500",
  },
]

export const diagnoses = [
  {
    title: "Heart Problem",
    description: "Condition involving irregular heartbeat or poor blood flow; requires regular checkups and medication.",
    doctor: "Dr. Ronald Richards",
    image: "/assets/images/dashboard/0725LifeExpectancy_SC.jpg",
  },
  {
    title: "Kidney Problem",
    description: "Reduced kidney function causing imbalance of fluids and waste in the body; requires medical management.",
    doctor: "Dr. Leslie Alexander",
    image: "/assets/images/dashboard/istockphoto-1334724346-640x640-1.jpg",
  }
]


export const prescriptions = [
  {
    name: "Lisinopril",
    dosage: "10mg - Once daily",
    remaining: "28 days remaining",
    color: "bg-blue-50",
  },
  {
    name: "Metformin",
    dosage: "500mg - Twice daily",
    remaining: "45 days remaining",
    color: "bg-green-50",
  },
  {
    name: "Atorvastatin",
    dosage: "20mg - Once daily",
    remaining: "35 days remaining",
    color: "bg-purple-50",
  },
  {
    name: "Aspirin",
    dosage: "81mg - Once daily",
    remaining: "60 days remaining",
    color: "bg-orange-50",
  },
]

export const appointments = [
  {
    title: "MRI - Right Thigh",
    doctor: "Dr. Damian Lewis",
    specialty: "Radiologist",
    imgUrl: "/assets/images/dashboard/mri.png",
  },
  {
    title: "Surgery Preparation",
    doctor: "Dr. Dianne Russell",
    specialty: "Cardiologist",
    imgUrl: "/assets/images/dashboard/operation-preparation.jpg",
  },
  {
    title: "Post-Surgery Follow-up",
    doctor: "Dr. Michael Chen",
    specialty: "General Practitioner",
    imgUrl: "/assets/images/dashboard/PostOperative.jpg",
  },
]

export const initialAppointments = [
  {
    id: 1,
    patientName: "John Smith",
    patientAge: 45,
    appointmentTime: "2024-01-15T10:30:00",
    type: "Follow-up",
    status: "confirmed",
    reason: "Diabetes checkup",
    priority: "high",
  },
  {
    id: 2,
    patientName: "Sarah Johnson",
    patientAge: 32,
    appointmentTime: "2024-01-15T14:15:00",
    type: "New Patient",
    status: "confirmed",
    reason: "Chest pain evaluation",
    priority: "urgent",
  },
  {
    id: 3,
    patientName: "Michael Brown",
    patientAge: 58,
    appointmentTime: "2024-01-16T09:00:00",
    type: "Consultation",
    status: "pending",
    reason: "Blood test results review",
    priority: "medium",
  },
  {
    id: 4,
    patientName: "Emily Davis",
    patientAge: 28,
    appointmentTime: "2024-01-16T11:45:00",
    type: "Routine Check",
    status: "confirmed",
    reason: "Annual physical examination",
    priority: "low",
  },
]

export const initialScans = [
  {
    id: 1,
    patientName: "Robert Wilson",
    scanType: "CT Scan",
    bodyPart: "Chest",
    reviewDate: "2024-01-14T16:30:00",
    status: "abnormal",
    findings: "Pulmonary nodules detected",
    urgency: "high",
    imageUrl: "#",
  },
  {
    id: 2,
    patientName: "Lisa Anderson",
    scanType: "MRI",
    bodyPart: "Brain",
    reviewDate: "2024-01-14T14:20:00",
    status: "normal",
    findings: "No significant abnormalities",
    urgency: "low",
    imageUrl: "#",
  },
  {
    id: 3,
    patientName: "David Miller",
    scanType: "X-Ray",
    bodyPart: "Knee",
    reviewDate: "2024-01-14T11:15:00",
    status: "abnormal",
    findings: "Fracture detected",
    urgency: "medium",
    imageUrl: "#",
  },
  {
    id: 4,
    patientName: "Jennifer Taylor",
    scanType: "Ultrasound",
    bodyPart: "Abdomen",
    reviewDate: "2024-01-13T17:45:00",
    status: "normal",
    findings: "All organs appear healthy",
    urgency: "low",
    imageUrl: "#",
  },
]

export const initialNotifications = [
  {
    id: 1,
    type: "appointment",
    title: "New Appointment Request",
    message: "Sarah Johnson requested an appointment for chest pain evaluation",
    time: "2024-01-14T08:30:00",
    read: false,
    priority: "high",
  },
  {
    id: 2,
    type: "scan",
    title: "Scan Results Ready",
    message: "CT Scan results for Robert Wilson are available for review",
    time: "2024-01-14T10:15:00",
    read: false,
    priority: "medium",
  },
  {
    id: 3,
    type: "system",
    title: "System Maintenance",
    message: "Scheduled maintenance tonight from 2:00 AM to 4:00 AM",
    time: "2024-01-14T14:00:00",
    read: true,
    priority: "low",
  },
  {
    id: 4,
    type: "patient",
    title: "Patient Message",
    message: "John Smith sent a message regarding medication side effects",
    time: "2024-01-14T16:45:00",
    read: true,
    priority: "medium",
  },
]


export const HEALTH_METRICS = {
  Heart: [
    { label: "Heart Rate", value: "72", status: "Normal", icon: <FaHeart />, color: "text-red-500" },
    { label: "Blood Pressure", value: "120/80", status: "Normal", icon: <FaHeart />, color: "text-red-500" },
    { label: "Cholesterol", value: "180", status: "Normal", icon: <FaHeart />, color: "text-red-500" },
    { label: "Pulse", value: "68", status: "Normal", icon: <FaHeart />, color: "text-red-500" },
  ],
  Lungs: [
    { label: "Oxygen Level", value: "98%", status: "Normal", icon: <FaLungs />, color: "text-blue-500" },
    { label: "Respiratory Rate", value: "16", status: "Normal", icon: <FaLungs />, color: "text-blue-500" },
    { label: "Lung Capacity", value: "95%", status: "Normal", icon: <FaLungs />, color: "text-blue-500" },
    { label: "Air Flow", value: "Good", status: "Normal", icon: <FaLungs />, color: "text-blue-500" },
  ],
  Stomach: [
    { label: "Digestion", value: "Good", status: "Normal", icon: <FaAppleAlt />, color: "text-yellow-500" },
    { label: "Hydration", value: "85%", status: "Normal", icon: <FaAppleAlt />, color: "text-yellow-500" },
    { label: "pH Level", value: "7.2", status: "Normal", icon: <FaAppleAlt />, color: "text-yellow-500" },
    { label: "Metabolism", value: "Normal", status: "Normal", icon: <FaAppleAlt />, color: "text-yellow-500" },
  ],
  Body: [
    { label: "Temperature", value: "98.6°F", status: "Normal", icon: <FaBottleDroplet />, color: "text-orange-500" },
    { label: "Weight", value: "72kg", status: "Normal", icon: <FaBottleDroplet />, color: "text-orange-500" },
    { label: "BMI", value: "24.5", status: "Normal", icon: <FaBottleDroplet />, color: "text-orange-500" },
    { label: "Glucose", value: "95", status: "Normal", icon: <FaBottleDroplet />, color: "text-orange-500" },
  ],
  Eye: [
    { label: "Vision", value: "20/20", status: "Normal", icon: <FaEye />, color: "text-purple-500" },
    { label: "Eye Pressure", value: "15", status: "Normal", icon: <FaEye />, color: "text-purple-500" },
    { label: "Contrast", value: "Good", status: "Normal", icon: <FaEye />, color: "text-purple-500" },
    { label: "Color Vision", value: "Normal", status: "Normal", icon: <FaEye />, color: "text-purple-500" },
  ],
}

  // Mock X-ray data
  export const mockXrays = [
    {
      id: 1,
      patientName: "John Doe",
      bodyPart: "Chest",
      date: "2024-10-20",
      time: "10:30 AM",
      status: "Completed",
      thumbnail: "/chest-xray.jpg",
      doctor: "Dr. Smith",
      notes: "Normal findings",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      bodyPart: "Leg",
      date: "2024-10-19",
      time: "2:15 PM",
      status: "Completed",
      thumbnail: "/leg-xray.jpg",
      doctor: "Dr. Johnson",
      notes: "Fracture detected",
    },
    {
      id: 3,
      patientName: "Mike Johnson",
      bodyPart: "Spine",
      date: "2024-10-18",
      time: "11:00 AM",
      status: "Pending Review",
      thumbnail: "/spine-xray.jpg",
      doctor: "Dr. Williams",
      notes: "Awaiting radiologist review",
    },
    {
      id: 4,
      patientName: "Sarah Williams",
      bodyPart: "Hand",
      date: "2024-10-17",
      time: "3:45 PM",
      status: "Completed",
      thumbnail: "/hand-xray.jpg",
      doctor: "Dr. Brown",
      notes: "No abnormalities",
    },
    {
      id: 5,
      patientName: "Robert Davis",
      bodyPart: "Pelvis",
      date: "2024-10-16",
      time: "9:20 AM",
      status: "Completed",
      thumbnail: "/pelvis-xray.jpg",
      doctor: "Dr. Miller",
      notes: "Normal study",
    },
    {
      id: 6,
      patientName: "Emily Brown",
      bodyPart: "Chest",
      date: "2024-10-15",
      time: "1:30 PM",
      status: "Pending Review",
      thumbnail: "/chest-xray-2.jpg",
      doctor: "Dr. Wilson",
      notes: "Awaiting review",
    },
  ]