import { Card } from "../../../../../components/Cards"
import Button from "../../../../../components/Button"
import { FaChevronDown } from "react-icons/fa"

export default function PrescriptionsSection({ prescriptions }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">Your Prescriptions</h2>
        <Button variant="ghost" className="text-gray-500">
          Today <FaChevronDown className="ml-2 w-4 h-4" />
        </Button>
      </div>

      {/* Yahan grid ko flex mein change kiya hai */}
      <div className="flex flex-wrap gap-4">
        {prescriptions.map((prescription, index) => (
          <div key={index} className={`p-4 rounded-lg ${prescription.color} flex-1 min-w-[calc(100%-8px)] md:min-w-[calc(50%-8px)]`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">{prescription.name}</h3>
                <p className="text-sm text-gray-600">{prescription.dosage}</p>
              </div>
              <Button variant="ghost" size="sm">
                •••
              </Button>
            </div>
            <p className="text-sm font-medium text-gray-700">{prescription.remaining}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}