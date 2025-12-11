// <CHANGE> Updated to match original UI with human body image and diagnosis layout
import { Card } from "../../../../../components/Cards"
import Button from "../../../../../components/Button"
import { FaChevronDown } from "react-icons/fa"

export default function DiagnosesSection({ diagnoses }) {
  return (
    <Card className="mb-6 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">History of Diagnosis</h2>
        <Button variant="ghost" className="text-gray-500">
          Today <FaChevronDown className="ml-2 w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Human Body Diagram */}
        <div className="flex-shrink-0 flex justify-center">
          <img
            src="/assets/images/dashboard/history.jpeg"
            alt="Human anatomy diagram"
            className="w-40 md:w-56 lg:w-64 h-auto object-contain"
          />
        </div>

        {/* Diagnosis List */}
        <div className="flex-1 space-y-4">
          {diagnoses.map((diagnosis, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-100"
            >
              <img
                src={diagnosis.image || "/placeholder.svg"}
                alt={diagnosis.title}
                className="w-14 h-14 md:w-16 md:h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">{diagnosis.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{diagnosis.description}</p>
                <p className="text-sm text-gray-500">{diagnosis.doctor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
