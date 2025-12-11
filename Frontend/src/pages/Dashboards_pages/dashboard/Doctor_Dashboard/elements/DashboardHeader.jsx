"use client"

import { MdNotifications } from "react-icons/md"

// Yeh component dashboard ka header display karta hai
const DashboardHeader = ({ unreadCount = 0, doctorName = "Dr. Smith" }) => {
  return (
    // Main header container
    <header className="mb-4">
      {/* Flex container jo responsive design support karta hai */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left side - Welcome message aur doctor name */}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground text-balance">
            {"Good Morning, "}
            {doctorName} {/* Doctor ka naam dynamic hai */}
            {"!"}
          </h1>
          <p className="text-sm text-muted-foreground">Welcome to your dashboard</p> {/* Subtitle text */}
        </div>
        
        {/* Right side - Notifications icon aur doctor avatar */}
        <div className="flex items-center gap-3">
          {/* Notifications container with badge */}
          <div className="relative" aria-label="Notifications">
            <MdNotifications className="text-2xl text-gray-500" /> {/* Notifications icon */}
            {/* Unread notifications count badge */}
            {unreadCount > 0 && ( // Conditional rendering - agar unread notifications hain toh badge dikhaye
              <span
                aria-label={`${unreadCount} unread notifications`} // Accessibility label
                className="absolute -top-1 -right-1 rounded-full w-4 h-4 text-xs text-white bg-red-500 text-destructive-foreground flex items-center justify-center"
              >
                {unreadCount} {/* Unread count number display karta hai */}
              </span>
            )}
          </div>
          
          {/* Doctor avatar circle */}
          <div
            aria-label="Doctor Avatar" // Accessibility label
            className="w-10 h-10 rounded-full bg-[#2b7fff] text-white flex items-center justify-center font-medium"
          >
            {"DS"} {/* Doctor initials display karta hai */}
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader