import { FaRobot } from "react-icons/fa"
import { Card } from "../../../../../components/Cards"

export default function AIInsights() {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <FaRobot className="w-5 h-5 text-blue-500" />
        <h3 className="font-semibold text-gray-800">AI Care</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <FaRobot className="w-4 h-4 text-blue-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-700 mb-2">
              Brain problems can manifest in various ways. Symptoms may include headaches, memory issues, or behavioral
              changes.
            </p>
            <img
              src="/assets/images/dashboard/istock-587mribrain.jpg"
              alt="Brain scan"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
