import { FaEye, FaHeart } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { MdDashboard, MdEventAvailable, MdHelp, MdLocalPharmacy, MdLogout, MdMedicalInformation, MdMenuBook, MdMessage, MdPayments, MdPeople, MdSettings, MdSmartToy } from "react-icons/md";

export const DashboardUrl = [
  {
    label: "",
    items: [
      {
        icon: <MdDashboard />,
        text: "Dashboard",
        url: "", // dashboard index route
      },
    ],
  },
  {
    label: "Appointments",
    items: [
      {
        icon: <MdEventAvailable />,
        text: "Appointments",
        children: [
          {
            icon: <MdPeople />,
            text: "Doctors",
            url: "appointments/doctors",
          },
          {
            icon: <MdMessage />,
            text: "Messages",
            url: "appointments/messages",
            badge: 2,
          },
          {
            icon: <MdSmartToy />,
            text: "AI Care",
            url: "appointments/ai-care",
          },
        ],
      },
    ],
  },
  {
    label: "Other Menu",
    items: [
      {
        icon: <MdMedicalInformation />,
        text: "Health Records",
        url: "health-records",
      },
      {
        icon: <MdLocalPharmacy />,
        text: "Prescriptions",
        url: "prescriptions",
      },
      {
        icon: <MdPayments />,
        text: "Billing & Insurance",
        url: "billing-insurance",
      },
      {
        icon: <MdMenuBook />,
        text: "Resources",
        url: "resources",
      },
    ],
  },
  {
    label: "Support",
    items: [
      {
        icon: <MdSettings />,
        text: "Settings",
        url: "settings",
      },
      {
        icon: <MdHelp />,
        text: "Help Center",
        url: "help-center",
      },
      {
        icon: <MdLogout />,
        text: "Logout",
        url: "/logout", // logout should remain absolute
        danger: true,
      },
    ],
  },
];


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