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
