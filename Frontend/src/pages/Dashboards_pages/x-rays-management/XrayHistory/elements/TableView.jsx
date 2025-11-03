import { FiDownload, FiEye, FiTrash2 } from "react-icons/fi"

const TableView = ({ xrays }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Patient Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Body Part</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Date & Time</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Doctor</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Notes</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {xrays.map((xray, index) => (
              <tr
                key={xray.id}
                className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-50"
                }`}
              >
                <td className="px-4 py-3 text-sm text-slate-900 font-medium">{xray.patientName}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{xray.bodyPart}</td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  <div>{xray.date}</div>
                  <div className="text-xs text-slate-500">{xray.time}</div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{xray.doctor}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      xray.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {xray.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600 max-w-xs">{xray.notes}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                      <FiEye size={18} />
                    </button>
                    <button
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Download"
                    >
                      <FiDownload size={18} />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile & Tablet Card View - Yahan grid ko flex mein change kiya hai */}
      <div className="lg:hidden">
        <div className="flex flex-wrap gap-4 p-4">
          {xrays.map((xray, index) => (
            <div
              key={xray.id}
              className="bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex-1 min-w-[calc(100%-16px)] md:min-w-[calc(50%-16px)]"
            >
              {/* Card Header */}
              <div className="p-4 border-b border-slate-100">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900 truncate">{xray.patientName}</h3>
                    <p className="text-sm text-slate-600 mt-1">{xray.doctor}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ml-2 flex-shrink-0 ${
                      xray.status === "Completed" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {xray.status}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Body Part:</span>
                  <span className="text-sm font-medium text-slate-900">{xray.bodyPart}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Date:</span>
                  <span className="text-sm font-medium text-slate-900">{xray.date}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Time:</span>
                  <span className="text-sm text-slate-600">{xray.time}</span>
                </div>

                {xray.notes && (
                  <div>
                    <span className="text-sm text-slate-500 block mb-1">Notes:</span>
                    <p className="text-sm text-slate-900 line-clamp-2">{xray.notes}</p>
                  </div>
                )}
              </div>

              {/* Card Footer - Actions */}
              <div className="p-4 border-t border-slate-100 bg-slate-50">
                <div className="flex justify-center gap-4">
                  <button 
                    className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors text-sm font-medium"
                    title="View"
                  >
                    <FiEye size={16} />
                    <span>View</span>
                  </button>
                  <button
                    className="flex items-center gap-2 px-3 py-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors text-sm font-medium"
                    title="Download"
                  >
                    <FiDownload size={16} />
                    <span>Download</span>
                  </button>
                  <button 
                    className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors text-sm font-medium"
                    title="Delete"
                  >
                    <FiTrash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TableView