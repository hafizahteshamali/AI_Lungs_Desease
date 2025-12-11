"use client"

import { useMemo, useState } from "react"
import { MdFilterList } from "react-icons/md"
import { formatTime } from "./utils"
import { initialNotifications } from "../../../../../assets/Constant"

// Yeh component notifications center handle karta hai
const NotificationsCenter = () => {
  // Yeh state notifications data ko store karta hai
  const [notifications, setNotifications] = useState(initialNotifications)
  // Yeh state filter type ko track karta hai (all, appointment, scan, etc.)
  const [type, setType] = useState("all")
  // Yeh state filter priority ko track karta hai (all, urgent, high, etc.)
  const [priority, setPriority] = useState("all")

  // Yeh useMemo unread notifications count calculate karta hai
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length // Unread notifications ki count return karta hai
  }, [notifications]) // Jab notifications change ho tab re-calculate karta hai

  // Yeh useMemo filtered notifications calculate karta hai based on filters
  const filtered = useMemo(() => {
    return notifications.filter((n) => {
      const typeOk = type === "all" ? true : n.type === type // Type filter check karta hai
      const pOk = priority === "all" ? true : n.priority === priority // Priority filter check karta hai
      return typeOk && pOk // Dono filters match hone par hi notification include hota hai
    })
  }, [notifications, type, priority]) // Jab notifications, type ya priority change ho tab re-calculate karta hai

  // Yeh function ek specific notification ko read mark karta hai
  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)) // Sirf matching ID wali notification ko update karta hai
    )
  }

  // Yeh function sabhi notifications ko read mark karta hai
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map((n) => ({ ...n, read: true })) // Sabhi notifications ki read property true set karta hai
    )
  }

  return (
    // Main container section jo card style provide karta hai
    <section className="bg-card text-card-foreground rounded-lg shadow-sm p-4 border border-gray-300">
      {/* Header Section jo title, filters aur actions dikhata hai */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        {/* Left side - title aur unread count */}
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Notifications Center</h3>
          <span className="text-sm text-muted-foreground">
            ({unreadCount} unread) {/* Dynamic unread count display karta hai */}
          </span>
        </div>
        
        {/* Right side - action buttons aur filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mark All Read button */}
          <button onClick={markAllAsRead} className="text-primary text-sm hover:underline">
            Mark All Read
          </button>
          
          {/* Filters section */}
          <div className="flex flex-wrap lg:flex-row justify-between items-center gap-2">
            <MdFilterList className="text-muted-foreground" /> {/* Filter icon */}
            {/* Type filter dropdown */}
            <select
              aria-label="Filter by type" // Accessibility label
              className="py-1.5 w-[40%] text-xs border border-gray-300 bg-background text-foreground rounded-md"
              value={type}
              onChange={(e) => setType(e.target.value)} // Type filter update karta hai
            >
              <option value="all">All types</option>
              <option value="appointment">Appointment</option>
              <option value="scan">Scan</option>
              <option value="patient">Patient</option>
              <option value="system">System</option>
            </select>
            {/* Priority filter dropdown */}
            <select
              aria-label="Filter by priority" // Accessibility label
              className="py-1.5 w-[40%] text-xs border border-gray-300 bg-background text-foreground rounded-md"
              value={priority}
              onChange={(e) => setPriority(e.target.value)} // Priority filter update karta hai
            >
              <option value="all">All priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications List jo filtered notifications display karta hai */}
      <div className="flex flex-col gap-3">
        {/* Har filtered notification ke liye loop chalta hai */}
        {filtered.map((n) => {
          // Conditional classes based on read status
          const wrapperClasses = n.read 
            ? "border-muted bg-muted/40" // Read notifications ke liye muted styling
            : "border-primary bg-primary/10" // Unread notifications ke liye highlighted styling
          const titleClasses = n.read 
            ? "text-foreground" // Read notifications ke liye normal text
            : "text-primary" // Unread notifications ke liye primary color text
          // Priority ke hisaab se pill styling
          const pill = n.priority === "high"
            ? "bg-destructive/10 text-destructive" // High priority ke liye red styling
            : n.priority === "medium"
              ? "bg-secondary/10 text-secondary-foreground" // Medium priority ke liye secondary styling
              : "bg-muted text-muted-foreground" // Low priority ke liye muted styling

          return (
            // Individual notification button jo clickable hai
            <button
              key={n.id}
              onClick={() => !n.read && markAsRead(n.id)} // Sirf unread notifications par click karne par mark as read karta hai
              className={`w-full text-left border-l-4 rounded-r p-3 hover:shadow-sm transition-shadow ${wrapperClasses}`}
            >
              {/* Notification Header jo title, new badge aur time dikhata hai */}
              <div className="flex justify-between items-start gap-2 mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <h4 className={`font-semibold text-sm truncate ${titleClasses}`}>
                    {n.title} {/* Notification title */}
                  </h4>
                  {/* New badge sirf unread notifications ke liye */}
                  {!n.read && (
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full shrink-0">
                      New
                    </span>
                  )}
                </div>
                {/* Notification time formatted */}
                <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                  {formatTime(n.time)} {/* Formatted time display karta hai */}
                </span>
              </div>

              {/* Notification Message jo description dikhata hai */}
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {n.message} {/* Notification message jo maximum 2 lines tak dikhata hai */}
              </p>

              {/* Notification Footer jo priority aur type dikhata hai */}
              <div className="flex justify-between items-center gap-2 text-xs">
                {/* Priority pill jo color-coded hai */}
                <span className={`px-2 py-1 rounded-full shrink-0 ${pill}`}>
                  {n.priority} priority
                </span>
                {/* Notification type */}
                <span className="text-muted-foreground capitalize">
                  {n.type} {/* Notification type jo capitalize hota hai */}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default NotificationsCenter