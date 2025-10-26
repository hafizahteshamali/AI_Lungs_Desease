"use client"
import DashboardHeader from "./elements/DashboardHeader"
import HealthOverview from "./elements/HealthOverview"
import DiagnosesSection from "./elements/DiagnosesSection"
import PrescriptionsSection from "./elements/PrescriptionsSection"
import AppointmentsSidebar from "./elements/AppointmentsSidebar"
import AIInsights from "./elements/AIInsights"
import { appointments, diagnoses, prescriptions } from "../../../../assets/Constant"

export default function PatientDashboard() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
      {/* Main Content */}
      <div className="flex flex-col p-4 md:p-6 w-full lg:w-[75%]">
        <DashboardHeader />

        {/* History of Diagnosis */}
        <DiagnosesSection diagnoses={diagnoses} />

        {/* Health Overview */}
        <HealthOverview />

        {/* Prescriptions */}
        <PrescriptionsSection prescriptions={prescriptions} />
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-80 p-4 md:p-6 bg-white border-t lg:border-t-0 lg:border-l border-gray-200">
        {/* Upcoming Appointments */}
        <AppointmentsSidebar appointments={appointments} />

        {/* AI Care */}
        <AIInsights />
      </div>
    </div>
  )
}
