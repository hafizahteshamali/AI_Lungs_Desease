export default function HealthMetricsCard({ metric }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Normal":
        return "text-green-600 bg-green-50"
      case "Warning":
        return "text-yellow-600 bg-yellow-50"
      case "Critical":
        return "text-red-600 bg-red-50"
      default:
        return "text-blue-600 bg-blue-50"
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${metric.bgColor}`}>{metric.icon}</div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(metric.status)}`}>
          {metric.status}
        </span>
      </div>

      <h3 className="text-gray-600 text-sm font-medium mb-1">{metric.label}</h3>
      <p className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</p>
      <p className="text-xs text-gray-500">{metric.unit}</p>
    </div>
  )
}
