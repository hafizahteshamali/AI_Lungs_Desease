"use client"

import { useMemo, useState } from "react"
import { MdFilterList } from "react-icons/md"
import { formatTime } from "./utils"
import { initialNotifications } from "../../../../../assets/Constant"

const NotificationsCenter = () => {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [type, setType] = useState("all")
  const [priority, setPriority] = useState("all")

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length
  }, [notifications])

  const filtered = useMemo(() => {
    return notifications.filter((n) => {
      const typeOk = type === "all" ? true : n.type === type
      const pOk = priority === "all" ? true : n.priority === priority
      return typeOk && pOk
    })
  }, [notifications, type, priority])

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map((n) => ({ ...n, read: true }))
    )
  }

  return (
    <section className="bg-card text-card-foreground rounded-lg shadow-sm p-4 border border-gray-300">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Notifications Center</h3>
          <span className="text-sm text-muted-foreground">
            ({unreadCount} unread)
          </span>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={markAllAsRead} className="text-primary text-sm hover:underline">
            Mark All Read
          </button>
          
          <div className="flex flex-wrap lg:flex-row justify-between items-center gap-2">
            <MdFilterList className="text-muted-foreground" />
            <select
              aria-label="Filter by type"
              className="py-1.5 w-[40%] text-xs border border-gray-300 bg-background text-foreground rounded-md"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="all">All types</option>
              <option value="appointment">Appointment</option>
              <option value="scan">Scan</option>
              <option value="patient">Patient</option>
              <option value="system">System</option>
            </select>
            <select
              aria-label="Filter by priority"
              className="py-1.5 w-[40%] text-xs border border-gray-300 bg-background text-foreground rounded-md"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
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

      {/* Notifications List */}
      <div className="flex flex-col gap-3">
        {filtered.map((n) => {
          const wrapperClasses = n.read 
            ? "border-muted bg-muted/40" 
            : "border-primary bg-primary/10"
          const titleClasses = n.read 
            ? "text-foreground" 
            : "text-primary"
          const pill = n.priority === "high"
            ? "bg-destructive/10 text-destructive"
            : n.priority === "medium"
              ? "bg-secondary/10 text-secondary-foreground"
              : "bg-muted text-muted-foreground"

          return (
            <button
              key={n.id}
              onClick={() => !n.read && markAsRead(n.id)}
              className={`w-full text-left border-l-4 rounded-r p-3 hover:shadow-sm transition-shadow ${wrapperClasses}`}
            >
              {/* Notification Header */}
              <div className="flex justify-between items-start gap-2 mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <h4 className={`font-semibold text-sm truncate ${titleClasses}`}>
                    {n.title}
                  </h4>
                  {!n.read && (
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full shrink-0">
                      New
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                  {formatTime(n.time)}
                </span>
              </div>

              {/* Notification Message */}
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {n.message}
              </p>

              {/* Notification Footer */}
              <div className="flex justify-between items-center gap-2 text-xs">
                <span className={`px-2 py-1 rounded-full shrink-0 ${pill}`}>
                  {n.priority} priority
                </span>
                <span className="text-muted-foreground capitalize">
                  {n.type}
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