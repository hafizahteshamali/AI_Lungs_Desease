"use client"

const TabButton = ({ active, icon: Icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all shadow-sm ${
        active ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  )
}

export default TabButton
