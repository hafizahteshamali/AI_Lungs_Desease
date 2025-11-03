"use client"

import { MdWarning, MdCheckCircle, MdFileDownload, MdMoreVert } from "react-icons/md"
import { formatDate, formatTime, priorityClasses, statusIconColor } from "./utils"

const ScanCard = ({ scan, onDownload, onMore, onSelect }) => {
  const isNormal = scan.status === "normal"
  const Icon = isNormal ? MdCheckCircle : MdWarning

  return (
    <div className="bg-card text-card-foreground border border-border rounded-lg p-3 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm truncate">{scan.patientName}</h4>
          <p className="text-xs text-muted-foreground">
            {scan.scanType}
            {" • "}
            {scan.bodyPart}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${priorityClasses(scan.urgency)}`}>{scan.urgency}</span>
      </div>

      <div className="text-xs text-muted-foreground mb-2">
        {"Reviewed: "}
        {formatDate(scan.reviewDate)}
        {" at "}
        {formatTime(scan.reviewDate)}
      </div>

      <div className="flex justify-between items-center mb-2">
        <span className={`flex items-center gap-1 text-xs ${statusIconColor(scan.status)}`}>
          <Icon />
          {scan.status}
        </span>
      </div>

      <button
        onClick={() => onSelect?.(scan)}
        className="text-xs text-foreground/90 bg-muted hover:bg-muted/80 rounded px-2 py-1 mb-2"
      >
        View findings
      </button>

      <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded mb-2 line-clamp-2">
        <strong className="font-medium text-foreground">Findings:</strong> {scan.findings}
      </p>

      <div className="flex justify-between items-center">
        <button className="text-primary text-xs flex items-center gap-1" onClick={() => onDownload?.(scan)}>
          <MdFileDownload /> {"Download"}
        </button>
        <button className="text-muted-foreground text-xs flex items-center gap-1" onClick={() => onMore?.(scan)}>
          <MdMoreVert /> {"More"}
        </button>
      </div>
    </div>
  )
}

export default ScanCard;