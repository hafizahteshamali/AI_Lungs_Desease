"use client"

import { useState } from "react"
import { FiUploadCloud, FiFile, FiClock } from "react-icons/fi"
import StatsCard from "./elements/StatsCard"
import QuickUploadCard from "./elements/QuickUploadCard"
import RecentUploadsTable from "./elements/RecentUploadsTable"
import PendingReviewsSection from "./elements/PendingReviewsSection"

const RadiographerDashboard = () => {
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

  const handleQuickUpload = () => {
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.accept = ".dcm,.dicom,.png,.jpg,.jpeg"
    fileInput.multiple = true
    fileInput.onchange = (e) => {
      const files = Array.from(e.target.files)
      if (files.length > 0) {
        const fileNames = files.map((f) => f.name).join(", ")
        alert(`Successfully uploaded ${files.length} file(s): ${fileNames}`)

        // Simulate adding new upload to the list
        const newUpload = {
          id: recentUploads.length + 1,
          patientName: "New Patient",
          scanType: "New Scan",
          date: new Date().toISOString().split("T")[0],
          time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          status: "completed",
          doctor: "Dr. Assigned",
        }
        setRecentUploads([newUpload, ...recentUploads])
      }
    }
    fileInput.click()
  }

  const todayUploads = recentUploads.filter((upload) => upload.date === "2024-01-15").length
  const totalScansThisMonth = recentUploads.length * 39 // Simulated monthly total

  return (
    <div className="min-h-screen w-[100%] bg-[#f9f9f9]">
      <div className="flex flex-col px-4 md:px-6 py-4">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#000000] mb-2">Radiographer Dashboard</h1>
          <p className="text-[#979999] text-sm sm:text-base">Welcome back! Here's your overview for today.</p>
        </div>

        {/* Stats Cards Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 lg:w-[31%] w-full">
            <StatsCard
              icon={<FiUploadCloud />}
              title="Today's Uploads"
              value={todayUploads}
              bgColor="bg-white"
              iconColor="text-[#5056e6]"
              borderColor="border-gray-300"
            />
          </div>
          <div className="flex-1 lg:w-[31%] w-full">
            <StatsCard
              icon={<FiFile />}
              title="Total Scans This Month"
              value={totalScansThisMonth}
              bgColor="bg-white"
              iconColor="text-[#5056e6]"
              borderColor="border-gray-300"
            />
          </div>
          <div className="flex-1 lg:w-[31%] w-full">
            <StatsCard
              icon={<FiClock />}
              title="Pending Reviews"
              value={pendingReviews.length}
              bgColor="bg-white"
              iconColor="text-[#5056e6]"
              borderColor="border-gray-300"
            />
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row gap-3 mb-6">
          {/* Quick Upload Section */}
          <div className="flex-1 min-w-0">
            <QuickUploadCard onUpload={handleQuickUpload} />
          </div>

          {/* Recent Uploads Section */}
          <div className="flex-1 min-w-0 lg:flex-[2]">
            <RecentUploadsTable uploads={recentUploads} />
          </div>
        </div>

        {/* Pending Reviews Section */}
        <div className="flex-1">
          <PendingReviewsSection reviews={pendingReviews} />
        </div>
      </div>
    </div>
  )
}

export default RadiographerDashboard