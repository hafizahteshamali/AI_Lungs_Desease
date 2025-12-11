"use client"

// Yeh components import karte hain dashboard ke different sections ke liye
import DashboardHeader from "./elements/DashboardHeader"
import HealthOverview from "./elements/HealthOverview"
import DiagnosesSection from "./elements/DiagnosesSection"
import PrescriptionsSection from "./elements/PrescriptionsSection"
import AppointmentsSidebar from "./elements/AppointmentsSidebar"
import AIInsights from "./elements/AIInsights"

// Constant data import karta hai appointments, diagnoses aur prescriptions ke liye
import { appointments, diagnoses, prescriptions } from "../../../../assets/Constant"

// Yeh component patient dashboard display karta hai
export default function PatientDashboard() {
  return (
    // Main container jo responsive flex layout provide karta hai
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
      {/* Main Content Area - Left side (75% width on desktop) */}
      <div className="flex flex-col p-4 md:p-6 w-full lg:w-[75%]">
        {/* Dashboard Header component jo patient info aur navigation dikhata hai */}
        <DashboardHeader />

        {/* History of Diagnosis Section jo patient ke past diagnoses dikhata hai */}
        <DiagnosesSection diagnoses={diagnoses} />

        {/* Health Overview Section jo current health status aur vitals dikhata hai */}
        <HealthOverview />

        {/* Prescriptions Section jo current medications aur prescriptions dikhata hai */}
        <PrescriptionsSection prescriptions={prescriptions} />
      </div>

      {/* Right Sidebar - Right side (fixed width on desktop) */}
      <div className="w-full lg:w-80 p-4 md:p-6 bg-white border-t lg:border-t-0 lg:border-l border-gray-200">
        {/* Upcoming Appointments Section jo future appointments dikhata hai */}
        <AppointmentsSidebar appointments={appointments} />

        {/* AI Care Insights Section jo AI-based health recommendations dikhata hai */}
        <AIInsights />
      </div>
    </div>
  )
}