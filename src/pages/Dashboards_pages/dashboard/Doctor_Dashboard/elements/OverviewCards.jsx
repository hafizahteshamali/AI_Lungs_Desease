"use client"

import { MdCalendarToday, MdMedicalServices, MdNotifications, MdCheckCircle } from "react-icons/md"

const OverviewCards = ({ unreadCount = 0 }) => {
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
      value: `${unreadCount}`,
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
    <div className="flex flex-wrap gap-4 mb-6">
      {cards.map((c) => (
        <div 
          key={c.id} 
          className={`bg-card text-card-foreground p-4 rounded-lg shadow-sm border ${c.accent} flex-1 min-w-[200px]`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">{c.value}</h3>
              <p className="text-sm text-muted-foreground">{c.title}</p>
            </div>
            {c.icon}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">{c.delta}</div>
        </div>
      ))}
    </div>
  )
}

export default OverviewCards