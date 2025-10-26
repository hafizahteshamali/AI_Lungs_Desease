import { FaSearch, FaBell, FaUser } from "react-icons/fa"

export default function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Good Morning! 👋</h1>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search here"
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
        />
      </div>
    </div>
  )
}
