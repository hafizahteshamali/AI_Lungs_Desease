"use client"

import { useMemo, useState } from "react"

import DashboardHeader from "./elements/DashboardHeader"
import Tabs from "../../../../components/Tabs"
import OverviewCards from "./elements/OverviewCards"
import UpcomingAppointments from "./elements/UpcomingAppointments"
import RecentlyReviewedScans from "./elements/RecentlyReviewedScans"
import NotificationsCenter from "./elements/NotificationsCenter"
import DetailModal from "./elements/DetailModal"

import { initialAppointments, initialScans, initialNotifications } from "../../../../assets/Constant.jsx"

const Doctor_Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [detail, setDetail] = useState({ open: false, title: "", data: null })
  
  // State for data - baad mein axios se replace kar dena
  const [appointments] = useState(initialAppointments)
  const [scans] = useState(initialScans)
  const [notifications] = useState(initialNotifications)

  // Compute unread count
  const unreadCount = useMemo(() => {
    return notifications.filter((x) => !x.read).length
  }, [notifications])

  const openDetail = (item) => {
    const isAppt = item.appointmentTime
    const isScan = item.scanType
    const title = isAppt ? `Appointment • ${item.patientName}` : isScan ? `Scan • ${item.patientName}` : "Details"
    setDetail({ open: true, title, data: item })
  }

  const closeDetail = () => setDetail({ open: false, title: "", data: null })

  return (
    <main className="min-h-screen bg-[#f9f9f9] w-[100%] py-6">
      <div className="flex flex-col w-full justify-start">
        {/* Header Section */}
        <div className="border-b border-gray-300 px-4">
          <DashboardHeader unreadCount={unreadCount} />
        </div>

        {/* Tabs Section */}
        <div className="px-4 md:px-6 py-2">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 px-4">
          <div className="flex flex-col gap-3 w-[100%] mx-auto">
            {activeTab === "overview" && (
              <>
                {/* Overview Cards */}
                <div className="w-full">
                  <OverviewCards unreadCount={unreadCount} />
                </div>

                {/* Appointments and Scans Side by Side */}
                <div className="flex flex-col xl:flex-row gap-6 w-full">
                  <div className="flex-1 min-w-0">
                    <UpcomingAppointments onOpenDetail={openDetail} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <RecentlyReviewedScans onOpenDetail={openDetail} />
                  </div>
                </div>

                {/* Notifications Full Width */}
                <div className="w-full">
                  <NotificationsCenter />
                </div>
              </>
            )}

            {activeTab === "appointments" && (
              <div className="w-full">
                <UpcomingAppointments onOpenDetail={openDetail} />
              </div>
            )}

            {activeTab === "scans" && (
              <div className="w-full">
                <RecentlyReviewedScans onOpenDetail={openDetail} />
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="w-full">
                <NotificationsCenter />
              </div>
            )}
          </div>
        </div>

        <DetailModal open={detail.open} onClose={closeDetail} title={detail.title}>
          {detail.data ? (
            <div className="flex flex-col gap-4 text-sm">
              {detail.data.appointmentTime && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-[#000000]">Appointment Details</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      detail.data.priority === "urgent" ? "bg-red-100 text-red-800" :
                      detail.data.priority === "high" ? "bg-[#5056e6] text-white" :
                      detail.data.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {detail.data.priority}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <p><strong className="text-[#000000]">Patient:</strong> {detail.data.patientName}</p>
                      <p><strong className="text-[#000000]">Age:</strong> {detail.data.patientAge}</p>
                      <p><strong className="text-[#000000]">Type:</strong> {detail.data.type}</p>
                    </div>
                    <div className="space-y-2">
                      <p><strong className="text-[#000000]">Status:</strong> 
                        <span className={`ml-2 ${
                          detail.data.status === "confirmed" ? "text-green-600" : "text-yellow-600"
                        }`}>
                          {detail.data.status}
                        </span>
                      </p>
                      <p><strong className="text-[#000000]">Date:</strong> {new Date(detail.data.appointmentTime).toLocaleDateString()}</p>
                      <p><strong className="text-[#000000]">Time:</strong> {new Date(detail.data.appointmentTime).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <strong className="text-[#000000] block mb-1">Reason:</strong>
                    <p className="text-[#979999]">{detail.data.reason}</p>
                  </div>
                </div>
              )}
              
              {detail.data.scanType && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-[#000000]">Scan Details</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      detail.data.urgency === "high" ? "bg-red-100 text-red-800" :
                      detail.data.urgency === "medium" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {detail.data.urgency}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <p><strong className="text-[#000000]">Patient:</strong> {detail.data.patientName}</p>
                      <p><strong className="text-[#000000]">Scan Type:</strong> {detail.data.scanType}</p>
                      <p><strong className="text-[#000000]">Body Part:</strong> {detail.data.bodyPart}</p>
                    </div>
                    <div className="space-y-2">
                      <p><strong className="text-[#000000]">Status:</strong> 
                        <span className={`ml-2 ${
                          detail.data.status === "normal" ? "text-green-600" : "text-red-600"
                        }`}>
                          {detail.data.status}
                        </span>
                      </p>
                      <p><strong className="text-[#000000]">Reviewed:</strong> {new Date(detail.data.reviewDate).toLocaleDateString()}</p>
                      <p><strong className="text-[#000000]">Time:</strong> {new Date(detail.data.reviewDate).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <strong className="text-[#000000] block mb-1">Findings:</strong>
                    <p className="text-[#979999]">{detail.data.findings}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-[#979999] text-center py-4">No details available.</p>
          )}
        </DetailModal>
      </div>
    </main>
  )
}

export default Doctor_Dashboard