"use client"

import { useState } from "react"
import { MdRefresh, MdArrowForward } from "react-icons/md"
import ScanCard from "./ScanCard"
import { initialScans } from "../../../../../assets/Constant"

const RecentlyReviewedScans = ({ onOpenDetail }) => {
  const [scans, setScans] = useState(initialScans)

  const refresh = () => {
    // Demo refresh: just re-set the same data to trigger UI update
    setScans([...scans])
  }

  const handleDownload = (scan) => {
    // Demo download: in a real app, call your API
    console.log("[v0] Download scan:", scan.id)
  }

  return (
    <section className="bg-card text-card-foreground rounded-lg shadow-sm p-4 border border-gray-300">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold w-[45%]">Recently Reviewed Scans</h3>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-[45%] justify-between">
          <button
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded hover:bg-muted"
            onClick={refresh}
          >
            <MdRefresh className="text-muted-foreground text-sm" />
            <span className="text-sm">Refresh</span>
          </button>
          <button className="flex items-center gap-1 text-primary text-sm hover:underline">
            View All <MdArrowForward />
          </button>
        </div>
      </div>

      {/* Scans Grid */}
      <div className="flex flex-col gap-3">
        {scans.map((scan) => (
          <div key={scan.id} className="flex-1 w-[100%]">
            <ScanCard scan={scan} onDownload={handleDownload} onSelect={onOpenDetail} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default RecentlyReviewedScans