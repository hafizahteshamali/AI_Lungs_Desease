"use client"

import { MdNotifications } from "react-icons/md"

const DashboardHeader = ({ unreadCount = 0, doctorName = "Dr. Smith" }) => {
  return (
    <header className="mb-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground text-balance">
            {"Good Morning, "}
            {doctorName}
            {"!"}
          </h1>
          <p className="text-sm text-muted-foreground">Welcome to your dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative" aria-label="Notifications">
            <MdNotifications className="text-2xl text-gray-500" />
            {unreadCount > 0 && (
              <span
                aria-label={`${unreadCount} unread notifications`}
                className="absolute -top-1 -right-1 rounded-full w-4 h-4 text-xs text-white bg-red-500 text-destructive-foreground flex items-center justify-center"
              >
                {unreadCount}
              </span>
            )}
          </div>
          <div
            aria-label="Doctor Avatar"
            className="w-10 h-10 rounded-full bg-[#2b7fff] text-white flex items-center justify-center font-medium"
          >
            {"DS"}
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader