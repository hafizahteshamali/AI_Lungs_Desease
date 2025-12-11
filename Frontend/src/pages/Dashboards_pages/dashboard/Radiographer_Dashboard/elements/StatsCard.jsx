// Yeh component ek statistical card display karta hai
const StatsCard = ({ icon, title, value, bgColor, iconColor }) => {
  return (
    // Main card container jo styling aur structure provide karta hai
    <div
      className={`rounded-lg shadow-lg p-6 border border-gray-300`} // Card styling with fixed classes
    >
      {/* Card content jo horizontal layout mein hai */}
      <div className="flex items-center justify-between">
        {/* Left side - title aur value */}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p> {/* Card title */}
          <p className="text-3xl font-bold text-gray-900">{value}</p> {/* Main value */}
        </div>
        {/* Right side - icon */}
        <div className={`${iconColor} text-4xl opacity-80`}>{icon}</div> {/* Dynamic icon with color */}
      </div>
    </div>
  )
}

export default StatsCard