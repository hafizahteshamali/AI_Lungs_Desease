// React icons aur custom Card component import karte hain
import { FaRobot } from "react-icons/fa"
import { Card } from "../../../../../components/Cards"

// Yeh component AI health insights display karta hai
export default function AIInsights() {
  return (
    // Card component jo styling aur structure provide karta hai
    <Card className="p-4">
      {/* Header section jo AI Care title aur robot icon dikhata hai */}
      <div className="flex items-center gap-2 mb-4">
        <FaRobot className="w-5 h-5 text-blue-500" /> {/* Robot icon with blue color */}
        <h3 className="font-semibold text-gray-800">AI Care</h3> {/* Section title */}
      </div>

      {/* Content section jo AI insights dikhata hai */}
      <div className="space-y-4">
        {/* Individual insight item */}
        <div className="flex items-start gap-3">
          {/* Left side - icon container */}
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <FaRobot className="w-4 h-4 text-blue-500" /> {/* Small robot icon */}
          </div>
          
          {/* Right side - text content aur image */}
          <div className="flex-1">
            {/* AI-generated health insight text */}
            <p className="text-sm text-gray-700 mb-2">
              Brain problems can manifest in various ways. Symptoms may include headaches, memory issues, or behavioral
              changes.
            </p>
            
            {/* Brain scan image jo AI analysis ko visually represent karta hai */}
            <img
              src="/assets/images/dashboard/istock-587mribrain.jpg" // Image file path
              alt="Brain scan" // Accessibility alt text
              className="w-full h-full object-cover rounded-lg" // Image styling
            />
          </div>
        </div>
      </div>
    </Card>
  )
}