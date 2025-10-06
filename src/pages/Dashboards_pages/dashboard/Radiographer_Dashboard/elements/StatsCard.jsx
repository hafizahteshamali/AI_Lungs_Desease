const StatsCard = ({ icon, title, value, bgColor, iconColor }) => {
    return (
      <div
        className={`rounded-lg shadow-lg p-6 border border-gray-300`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
          <div className={`${iconColor} text-4xl opacity-80`}>{icon}</div>
        </div>
      </div>
    )
  }
  
  export default StatsCard
  