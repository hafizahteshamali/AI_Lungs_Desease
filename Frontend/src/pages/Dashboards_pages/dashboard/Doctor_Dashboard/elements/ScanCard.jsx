"use client"

import { MdWarning, MdCheckCircle, MdFileDownload, MdMoreVert } from "react-icons/md"
import { formatDate, formatTime, priorityClasses, statusIconColor } from "./utils"

// Yeh component ek individual scan card display karta hai
const ScanCard = ({ scan, onDownload, onMore, onSelect }) => {
  // Scan status ke hisaab se icon set karta hai
  const isNormal = scan.status === "normal" // Check karta hai ke scan normal hai ya nahi
  const Icon = isNormal ? MdCheckCircle : MdWarning // Normal status par check icon, abnormal par warning icon

  return (
    // Main card container jo hover effects aur styling provide karta hai
    <div className="bg-card text-card-foreground border border-border rounded-lg p-3 hover:shadow-md transition-shadow">
      {/* Header section jo patient info aur urgency dikhata hai */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
        {/* Patient information section */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm truncate">{scan.patientName}</h4> {/* Patient name jo truncate ho jata hai agar lamba hai */}
          <p className="text-xs text-muted-foreground">
            {scan.scanType}
            {" • "}
            {scan.bodyPart}
          </p> {/* Scan type aur body part information */}
        </div>
        {/* Urgency badge jo color-coded hai */}
        <span className={`px-2 py-1 rounded-full text-xs ${priorityClasses(scan.urgency)}`}>{scan.urgency}</span>
      </div>

      {/* Review date and time section */}
      <div className="text-xs text-muted-foreground mb-2">
        {"Reviewed: "}
        {formatDate(scan.reviewDate)} {/* Formatted review date */}
        {" at "}
        {formatTime(scan.reviewDate)} {/* Formatted review time */}
      </div>

      {/* Status section jo icon aur text dikhata hai */}
      <div className="flex justify-between items-center mb-2">
        <span className={`flex items-center gap-1 text-xs ${statusIconColor(scan.status)}`}>
          <Icon /> {/* Dynamic icon based on status */}
          {scan.status} {/* Scan status text */}
        </span>
      </div>

      {/* View findings button jo scan details open karta hai */}
      <button
        onClick={() => onSelect?.(scan)} // onSelect function call karta hai scan data ke saath
        className="text-xs text-foreground/90 bg-muted hover:bg-muted/80 rounded px-2 py-1 mb-2"
      >
        View findings
      </button>

      {/* Findings section jo scan findings summary dikhata hai */}
      <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded mb-2 line-clamp-2">
        <strong className="font-medium text-foreground">Findings:</strong> {scan.findings} {/* Scan findings jo maximum 2 lines tak dikhate hain */}
      </p>

      {/* Action buttons section jo download aur more options provide karta hai */}
      <div className="flex justify-between items-center">
        {/* Download button */}
        <button className="text-primary text-xs flex items-center gap-1" onClick={() => onDownload?.(scan)}>
          <MdFileDownload /> {"Download"}
        </button>
        {/* More options button */}
        <button className="text-muted-foreground text-xs flex items-center gap-1" onClick={() => onMore?.(scan)}>
          <MdMoreVert /> {"More"}
        </button>
      </div>
    </div>
  )
}

export default ScanCard;