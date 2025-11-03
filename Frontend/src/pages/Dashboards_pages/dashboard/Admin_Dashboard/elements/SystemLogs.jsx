"use client"
import { MdRefresh } from "react-icons/md"

const SystemLogs = ({ logs, onRefresh }) => {
  return (
    <div className="bg-card rounded-lg shadow-sm p-6 border border-gray-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-xl font-bold">System Logs</h3>
        <button
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md justify-center text-sm w-full sm:w-auto"
          onClick={onRefresh}
        >
          <MdRefresh /> Refresh
        </button>
      </div>

      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <div className="space-y-4 min-w-[360px] px-2 sm:px-0">
          {logs.map((log) => {
            const [date, time] = log.timestamp.split(" ")
            return (
              <div key={log.id} className="border-l-4 border-blue-500 pl-4 py-3 hover:bg-accent rounded">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div className="flex-1 min-w-0 break-words">
                    <h4 className="font-semibold">{log.action}</h4>
                    <p className="text-muted-foreground text-sm">By: {log.user}</p>
                    <p className="text-muted-foreground text-xs mt-1">IP: {log.ip}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm text-muted-foreground block whitespace-nowrap">{date}</span>
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
