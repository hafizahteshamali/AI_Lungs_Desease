"use client"

import { useState } from "react"
import { MdRefresh, MdArrowForward } from "react-icons/md"
import ScanCard from "./ScanCard"
import { initialScans } from "../../../../../assets/Constant"

// Yeh component recently reviewed scans display karta hai
const RecentlyReviewedScans = ({ onOpenDetail }) => {
  // Yeh state scans data ko store karta hai
  const [scans, setScans] = useState(initialScans)

  // Yeh function scans list ko refresh karta hai (demo purpose)
  const refresh = () => {
    // Demo refresh: just re-set the same data to trigger UI update
    setScans([...scans]) // Same data ka naya array create karta hai UI update trigger karne ke liye
  }

  // Yeh function scan download handle karta hai (demo purpose)
  const handleDownload = (scan) => {
    // Demo download: in a real app, call your API
    console.log("[v0] Download scan:", scan.id) // Console log for demo, real app mein API call hoga
  }

  return (
    // Main container section jo card style provide karta hai
    <section className="bg-card text-card-foreground rounded-lg shadow-sm p-4 border border-gray-300">
      {/* Header Section jo title aur action buttons dikhata hai */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold w-[45%]">Recently Reviewed Scans</h3> {/* Section title */}
        
        {/* Action Buttons jo refresh aur view all options provide karte hain */}
        <div className="flex items-center gap-2 w-[45%] justify-between">
          {/* Refresh button */}
          <button
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded hover:bg-muted"
            onClick={refresh} // Refresh function call karta hai
          >
            <MdRefresh className="text-muted-foreground text-sm" /> {/* Refresh icon */}
            <span className="text-sm">Refresh</span> {/* Button text */}
          </button>
          
          {/* View All button */}
          <button className="flex items-center gap-1 text-primary text-sm hover:underline">
            View All <MdArrowForward /> {/* View All text with arrow icon */}
          </button>
        </div>
      </div>

      {/* Scans Grid jo individual scan cards display karta hai */}
      <div className="flex flex-col gap-3">
        {/* Har scan ke liye loop chalta hai */}
        {scans.map((scan) => (
          <div key={scan.id} className="flex-1 w-[100%]">
            {/* ScanCard component jo ek individual scan dikhata hai */}
            <ScanCard 
              scan={scan} // Scan data pass karta hai
              onDownload={handleDownload} // Download function pass karta hai
              onSelect={onOpenDetail} // Detail open function pass karta hai
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default RecentlyReviewedScans