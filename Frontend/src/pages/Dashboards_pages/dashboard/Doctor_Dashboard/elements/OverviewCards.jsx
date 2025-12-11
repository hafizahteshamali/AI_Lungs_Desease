"use client"

import { MdCalendarToday, MdMedicalServices, MdNotifications, MdCheckCircle } from "react-icons/md"

// Yeh component overview cards display karta hai jo dashboard ke important statistics dikhate hain
const OverviewCards = ({ unreadCount = 0 }) => {
  // Cards ka array jo har card ki information store karta hai
  const cards = [
    {
      id: "today",
      title: "Today's Appointments",
      value: "12",
      delta: "↑ 2 from yesterday",
      icon: <MdCalendarToday className="text-xl text-primary" />,
      accent: "border-l-4 border-primary",
    },
    {
      id: "scans",
      title: "Scans to Review",
      value: "8",
      delta: "↓ 3 from yesterday",
      icon: <MdMedicalServices className="text-xl text-primary" />,
      accent: "border-l-4 border-secondary",
    },
    {
      id: "unread",
      title: "Unread Notifications",
      value: `${unreadCount}`, // Dynamic value based on prop
      delta: "↑ 1 new today",
      icon: <MdNotifications className="text-xl text-primary" />,
      accent: "border-l-4 border-muted",
    },
    {
      id: "satisfaction",
      title: "Patient Satisfaction",
      value: "94%",
      delta: "↑ 2% from last month",
      icon: <MdCheckCircle className="text-xl text-primary" />,
      accent: "border-l-4 border-border",
    },
  ]

  return (
    // Main container jo cards ko horizontal flex layout mein arrange karta hai
    <div className="flex flex-wrap gap-4 mb-6">
      {/* Har card ke liye loop chalta hai */}
      {cards.map((c) => (
        // Individual card container
        <div 
          key={c.id} 
          className={`bg-card text-card-foreground p-4 rounded-lg shadow-sm border ${c.accent} flex-1 min-w-[200px]`}
        >
          {/* Card content jo value, title aur icon dikhata hai */}
          <div className="flex items-center justify-between">
            {/* Left side - value aur title */}
            <div>
              <h3 className="text-xl font-semibold">{c.value}</h3> {/* Main value jo large text mein hai */}
              <p className="text-sm text-muted-foreground">{c.title}</p> {/* Title jo small gray text mein hai */}
            </div>
            {/* Right side - icon */}
            {c.icon} {/* Card specific icon */}
          </div>
          {/* Delta value jo change/trend dikhata hai */}
          <div className="mt-1 text-xs text-muted-foreground">{c.delta}</div> {/* Small text jo trend dikhata hai */}
        </div>
      ))}
    </div>
  )
}

export default OverviewCards