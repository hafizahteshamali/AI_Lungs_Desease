import { FiDownload, FiEye, FiTrash2 } from "react-icons/fi"

const ListView = ({ xrays }) => {
  return (
    <div className="flex flex-wrap gap-6">
      {xrays.map((xray) => (
        <div 
          key={xray.id} 
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex-1 min-w-[calc(100%-24px)] md:min-w-[calc(50%-24px)] lg:min-w-[calc(33.333%-24px)]"
        >
          {/* Thumbnail */}
          <div className="relative h-48 bg-slate-200 overflow-hidden">
            <img
              src={xray.thumbnail || "/placeholder.svg"}
              alt={`${xray.bodyPart} X-ray`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  xray.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {xray.status}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-1">{xray.patientName}</h3>
            <p className="text-sm text-slate-600 mb-3">{xray.bodyPart} X-ray</p>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Date:</span>
                <span className="font-medium text-slate-900">{xray.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Time:</span>
                <span className="font-medium text-slate-900">{xray.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Doctor:</span>
                <span className="font-medium text-slate-900">{xray.doctor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Notes:</span>
                <span className="font-medium text-slate-900 text-right max-w-xs">{xray.notes}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-slate-200">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors text-sm font-medium">
                <FiEye size={16} />
                View
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors text-sm font-medium">
                <FiDownload size={16} />
                Download
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors text-sm font-medium">
                <FiTrash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ListView