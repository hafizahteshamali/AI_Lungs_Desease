"use client"

import { useState } from "react"
import { FiUploadCloud, FiFile, FiClock } from "react-icons/fi"
import StatsCard from "./elements/StatsCard"
import QuickUploadCard from "./elements/QuickUploadCard"
import RecentUploadsTable from "./elements/RecentUploadsTable"
import PendingReviewsSection from "./elements/PendingReviewsSection"

// Yeh component radiographer dashboard handle karta hai
const RadiographerDashboard = () => {
  // Yeh state recent uploads data ko store karta hai
  const [recentUploads, setRecentUploads] = useState([
    {
      id: 1,
      patientName: "John Doe",
      scanType: "CT Scan",
      date: "2024-01-15",
      time: "10:30 AM",
      status: "completed",
      doctor: "Dr. Smith",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      scanType: "MRI",
      date: "2024-01-14",
      time: "02:15 PM",
      status: "completed",
      doctor: "Dr. Johnson",
    },
    {
      id: 3,
      patientName: "Mike Wilson",
      scanType: "X-Ray",
      date: "2024-01-14",
      time: "09:45 AM",
      status: "completed",
      doctor: "Dr. Brown",
    },
    {
      id: 4,
      patientName: "Emily Davis",
      scanType: "Ultrasound",
      date: "2024-01-13",
      time: "04:20 PM",
      status: "completed",
      doctor: "Dr. Wilson",
    },
  ])

  // Yeh state pending reviews data ko store karta hai
  const [pendingReviews, setPendingReviews] = useState([
    {
      id: 1,
      patientName: "Sarah Johnson",
      scanType: "MRI",
      date: "2024-01-13",
      time: "11:20 AM",
      doctor: "Dr. Davis",
      urgency: "high",
    },
    {
      id: 2,
      patientName: "Robert Chen",
      scanType: "CT Scan",
      date: "2024-01-12",
      time: "03:45 PM",
      doctor: "Dr. Wilson",
      urgency: "medium",
    },
    {
      id: 3,
      patientName: "Emily Parker",
      scanType: "Ultrasound",
      date: "2024-01-12",
      time: "01:30 PM",
      doctor: "Dr. Taylor",
      urgency: "low",
    },
    {
      id: 4,
      patientName: "Michael Brown",
      scanType: "X-Ray",
      date: "2024-01-11",
      time: "10:15 AM",
      doctor: "Dr. Anderson",
      urgency: "high",
    },
    {
      id: 5,
      patientName: "Lisa Martinez",
      scanType: "MRI",
      date: "2024-01-11",
      time: "02:30 PM",
      doctor: "Dr. Thompson",
      urgency: "medium",
    },
    {
      id: 6,
      patientName: "David Lee",
      scanType: "CT Scan",
      date: "2024-01-10",
      time: "09:00 AM",
      doctor: "Dr. Garcia",
      urgency: "low",
    },
  ])

  // Yeh function quick scan upload handle karta hai
  const handleQuickUpload = () => {
    // File input element dynamically create karta hai
    const fileInput = document.createElement("input")
    fileInput.type = "file" // File input type
    fileInput.accept = ".dcm,.dicom,.png,.jpg,.jpeg" // Allowed file types
    fileInput.multiple = true // Multiple files allow karta hai
    fileInput.onchange = (e) => {
      const files = Array.from(e.target.files) // FileList ko array mein convert karta hai
      if (files.length > 0) {
        const fileNames = files.map((f) => f.name).join(", ") // File names join karta hai

        // Simulate adding new upload to the list - demo purpose ke liye
        const newUpload = {
          id: recentUploads.length + 1, // New ID generate karta hai
          patientName: "New Patient", // Demo patient name
          scanType: "New Scan", // Demo scan type
          date: new Date().toISOString().split("T")[0], // Current date
          time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }), // Current time
          status: "completed", // Default status
          doctor: "Dr. Assigned", // Default doctor
        }
        setRecentUploads([newUpload, ...recentUploads]) // New upload ko list ke start mein add karta hai
      }
    }
    fileInput.click() // File picker dialog open karta hai
  }

  // Today's uploads count calculate karta hai
  const todayUploads = recentUploads.filter((upload) => upload.date === "2024-01-15").length
  // Total scans this month (simulated - real app mein different logic hoga)
  const totalScansThisMonth = recentUploads.length * 39 // Simulated monthly total

  return (
    // Main container jo puri screen cover karta hai
    <div className="min-h-screen w-[100%] bg-[#f9f9f9]">
      <div className="flex flex-col px-4 md:px-6 py-4">
        {/* Header Section jo title aur welcome message dikhata hai */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#000000] mb-2">Radiographer Dashboard</h1>
          <p className="text-[#979999] text-sm sm:text-base">Welcome back! Here's your overview for today.</p>
        </div>

        {/* Stats Cards Section jo important statistics dikhata hai */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Today's Uploads card */}
          <div className="flex-1 lg:w-[31%] w-full">
            <StatsCard
              icon={<FiUploadCloud />} // Upload cloud icon
              title="Today's Uploads"
              value={todayUploads} // Dynamic today's uploads count
              bgColor="bg-white"
              iconColor="text-[#5056e6]" // Blue icon color
              borderColor="border-gray-300"
            />
          </div>
          {/* Total Scans This Month card */}
          <div className="flex-1 lg:w-[31%] w-full">
            <StatsCard
              icon={<FiFile />} // File icon
              title="Total Scans This Month"
              value={totalScansThisMonth} // Simulated monthly total
              bgColor="bg-white"
              iconColor="text-[#5056e6]"
              borderColor="border-gray-300"
            />
          </div>
          {/* Pending Reviews card */}
          <div className="flex-1 lg:w-[31%] w-full">
            <StatsCard
              icon={<FiClock />} // Clock icon
              title="Pending Reviews"
              value={pendingReviews.length} // Pending reviews count
              bgColor="bg-white"
              iconColor="text-[#5056e6]"
              borderColor="border-gray-300"
            />
          </div>
        </div>

        {/* Main Content Section jo quick upload aur recent uploads dikhata hai */}
        <div className="flex flex-col lg:flex-row gap-3 mb-6">
          {/* Quick Upload Section (left side) */}
          <div className="flex-1 min-w-0">
            <QuickUploadCard onUpload={handleQuickUpload} /> {/* Quick upload component */}
          </div>

          {/* Recent Uploads Section (right side - larger width) */}
          <div className="flex-1 min-w-0 lg:flex-[2]">
            <RecentUploadsTable uploads={recentUploads} /> {/* Recent uploads table */}
          </div>
        </div>

        {/* Pending Reviews Section jo bottom mein full width leta hai */}
        <div className="flex-1">
          <PendingReviewsSection reviews={pendingReviews} /> {/* Pending reviews component */}
        </div>
      </div>
    </div>
  )
}

export default RadiographerDashboard