"use client"

import { useMemo, useState } from "react"

import DashboardHeader from "./elements/DashboardHeader"
import Tabs from "../../../../components/Tabs"
import OverviewCards from "./elements/OverviewCards"
import RecentlyReviewedScans from "./elements/RecentlyReviewedScans"
import NotificationsCenter from "./elements/NotificationsCenter"
import DetailModal from "./elements/DetailModal"

import { initialScans, initialNotifications } from "../../../../assets/Constant.jsx"

// Yeh component doctor dashboard handle karta hai
const Doctor_Dashboard = () => {
  // Yeh state active tab ko track karta hai - overview, scans, notifications
  const [activeTab, setActiveTab] = useState("overview")
  // Yeh state detail modal ko control karta hai
  const [detail, setDetail] = useState({ open: false, title: "", data: null })
  
  // State for data - baad mein axios se replace kar dena (API integration ke liye)
  const [scans] = useState(initialScans) // Scans data ko store karta hai
  const [notifications] = useState(initialNotifications) // Notifications data ko store karta hai

  // Compute unread count - unread notifications count calculate karta hai
  const unreadCount = useMemo(() => {
    return notifications.filter((x) => !x.read).length // Unread notifications count return karta hai
  }, [notifications]) // Jab notifications change ho tab re-calculate karta hai

  // Yeh function detail modal open karta hai scan item ke liye
  const openDetail = (item) => {
    const isScan = item.scanType // Check karta hai ke item scan hai ya nahi
    const title = isScan ? `Scan • ${item.patientName}` : "Details" // Modal title set karta hai
    setDetail({ open: true, title, data: item }) // Modal ko open karta hai
  }

  // Yeh function detail modal close karta hai
  const closeDetail = () => setDetail({ open: false, title: "", data: null }) // Modal ko reset karta hai

  return (
    // Main container jo puri screen cover karta hai
    <main className="min-h-screen bg-[#f9f9f9] w-[100%] py-6">
      <div className="flex flex-col w-full justify-start">
        {/* Header Section jo dashboard ka top part hai */}
        <div className="border-b border-gray-300 px-4">
          <DashboardHeader unreadCount={unreadCount} /> {/* Header component ko unread count pass karta hai */}
        </div>

        {/* Tabs Section jo navigation tabs dikhata hai */}
        <div className="px-4 md:px-6 py-2">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} /> {/* Tabs component ko state pass karta hai */}
        </div>

        {/* Main Content Area jo tab ke hisaab se change hota hai */}
        <div className="flex-1 px-4">
          <div className="flex flex-col gap-3 w-[100%] mx-auto">
            {/* Overview Tab Content */}
            {activeTab === "overview" && (
              <>
                {/* Overview Cards jo summary statistics dikhate hain */}
                <div className="w-full">
                  <OverviewCards unreadCount={unreadCount} /> {/* Overview cards component ko unread count pass karta hai */}
                </div>

                {/* Scans and Notifications Side by Section jo horizontal layout mein hai */}
                <div className="flex flex-col xl:flex-row gap-6 w-full">
                  {/* Left side - Recently Reviewed Scans */}
                  <div className="flex-1 min-w-0">
                    <RecentlyReviewedScans onOpenDetail={openDetail} /> {/* Scans component ko openDetail function pass karta hai */}
                  </div>
                  
                  {/* Right side - Notifications */}
                  <div className="flex-1 min-w-0">
                    <NotificationsCenter /> {/* Notifications component */}
                  </div>
                </div>
              </>
            )}

            {/* Scans Tab Content - sirf scans dikhata hai */}
            {activeTab === "scans" && (
              <div className="w-full">
                <RecentlyReviewedScans onOpenDetail={openDetail} /> {/* Full width scans component */}
              </div>
            )}

            {/* Notifications Tab Content - sirf notifications dikhata hai */}
            {activeTab === "notifications" && (
              <div className="w-full">
                <NotificationsCenter /> {/* Full width notifications component */}
              </div>
            )}
          </div>
        </div>

        {/* Detail Modal jo scan details dikhata hai */}
        <DetailModal open={detail.open} onClose={closeDetail} title={detail.title}>
          {/* Conditional rendering based on data availability */}
          {detail.data ? (
            <div className="flex flex-col gap-4 text-sm">
              {/* Agar data scan hai toh scan details dikhata hai */}
              {detail.data.scanType && (
                <div className="space-y-3">
                  {/* Scan header section */}
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-[#000000]">Scan Details</h4>
                    {/* Urgency badge jo color-coded hai */}
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      detail.data.urgency === "high" ? "bg-red-100 text-red-800" :
                      detail.data.urgency === "medium" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {detail.data.urgency} {/* Urgency level display karta hai */}
                    </span>
                  </div>
                  
                  {/* Scan details flex layout mein */}
                  <div className="flex flex-wrap gap-3">
                    {/* Left column - patient details */}
                    <div className="space-y-2 flex-1 min-w-[200px]">
                      <p><strong className="text-[#000000]">Patient:</strong> {detail.data.patientName}</p>
                      <p><strong className="text-[#000000]">Scan Type:</strong> {detail.data.scanType}</p>
                      <p><strong className="text-[#000000]">Body Part:</strong> {detail.data.bodyPart}</p>
                    </div>
                    {/* Right column - scan status aur date */}
                    <div className="space-y-2 flex-1 min-w-[200px]">
                      <p><strong className="text-[#000000]">Status:</strong> 
                        <span className={`ml-2 ${
                          detail.data.status === "normal" ? "text-green-600" : "text-red-600" // Status color coding
                        }`}>
                          {detail.data.status} {/* Scan status display karta hai */}
                        </span>
                      </p>
                      <p><strong className="text-[#000000]">Reviewed:</strong> {new Date(detail.data.reviewDate).toLocaleDateString()}</p> {/* Date formatted */}
                      <p><strong className="text-[#000000]">Time:</strong> {new Date(detail.data.reviewDate).toLocaleTimeString()}</p> {/* Time formatted */}
                    </div>
                  </div>
                  
                  {/* Findings section jo light gray background mein hai */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <strong className="text-[#000000] block mb-1">Findings:</strong>
                    <p className="text-[#979999]">{detail.data.findings}</p> {/* Scan findings display karta hai */}
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Agar koi data nahi hai toh message dikhata hai
            <p className="text-[#979999] text-center py-4">No details available.</p>
          )}
        </DetailModal>
      </div>
    </main>
  )
}

export default Doctor_Dashboard