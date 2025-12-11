"use client"
import { MdRefresh } from "react-icons/md"

// Yeh component system activity logs display karta hai
const SystemLogs = ({ logs, onRefresh }) => {
  return (
    // Main container div jo card style provide karta hai
    <div className="bg-card rounded-lg shadow-sm p-6 border border-gray-300">
      {/* Header section jo title aur refresh button dikhata hai */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-xl font-bold">System Logs</h3>
        {/* Refresh button jo logs refresh karta hai */}
        <button
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md justify-center text-sm w-full sm:w-auto"
          onClick={onRefresh} // Refresh function call karta hai
        >
          <MdRefresh /> Refresh
        </button>
      </div>

      {/* Logs list container jo responsive design support karta hai */}
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        {/* Inner container jo minimum width aur padding provide karta hai */}
        <div className="space-y-4 min-w-[360px] px-2 sm:px-0">
          {/* Har log entry ke liye loop chalta hai */}
          {logs.map((log) => {
            // Timestamp ko date aur time mein separate karta hai
            const [date, time] = log.timestamp.split(" ")
            return (
              // Individual log entry container
              <div key={log.id} className="border-l-4 border-blue-500 pl-4 py-3 hover:bg-accent rounded">
                {/* Log content jo flexible layout mein hai */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  {/* Left side - log details */}
                  <div className="flex-1 min-w-0 break-words">
                    {/* Log action title */}
                    <h4 className="font-semibold">{log.action}</h4>
                    {/* User who performed the action */}
                    <p className="text-muted-foreground text-sm">By: {log.user}</p>
                    {/* IP address */}
                    <p className="text-muted-foreground text-xs mt-1">IP: {log.ip}</p>
                  </div>
                  {/* Right side - timestamp */}
                  <div className="text-right shrink-0">
                    {/* Date part of timestamp */}
                    <span className="text-sm text-muted-foreground block whitespace-nowrap">{date}</span>
                    {/* Time part of timestamp */}
                    <span className="text-sm text-muted-foreground whitespace-nowrap">{time}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SystemLogs