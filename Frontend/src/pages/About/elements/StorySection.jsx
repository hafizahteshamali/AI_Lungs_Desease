import { useState, useEffect, useRef } from "react"
import { FaProjectDiagram, FaDatabase, FaMobileAlt, FaCogs, FaCheckCircle, FaRocket } from "react-icons/fa"

export default function StorySection() {
  const [visibleItems, setVisibleItems] = useState([])
  const sectionRef = useRef(null)

  // GANTT CHART DATA - Updated based on provided Gantt chart
  const timeline = [
    {
      phase: "Project Planning",
      title: "Requirement Gathering",
      duration: "27 days",
      period: "Aug 1 - Sep 8, 2025",
      description: "Collecting functional and non-functional requirements from stakeholders and medical professionals.",
      icon: <FaProjectDiagram />,
      color: "#5056e6",
      tasks: ["Stakeholder Interviews", "Requirement Analysis", "Documentation"]
    },
    {
      phase: "Project Planning",
      title: "Feasibility Study & System Design",
      duration: "40 days",
      period: "Aug 1 - Oct 30, 2025",
      description: "Technical and economic feasibility analysis followed by comprehensive system design.",
      icon: <FaCogs />,
      color: "#008059",
      tasks: ["Feasibility Report", "System Architecture", "DB Schema", "UI/UX Wireframes"]
    },
    {
      phase: "Frontend Development",
      title: "UI Development & Mobile Responsiveness",
      duration: "60 days",
      period: "Oct 31 - Nov 22, 2026",
      description: "Developing responsive web interface with dashboard, forms, and mobile compatibility.",
      icon: <FaMobileAlt />,
      color: "#007a9b",
      tasks: ["Layout Design", "Dashboard Development", "Forms Implementation", "Mobile Optimization"]
    },
    {
      phase: "Backend Development",
      title: "API & AI Model Integration",
      duration: "70 days",
      period: "Jan 23 - Apr 29, 2026",
      description: "Backend API development and integration of custom CNN models for medical imaging.",
      icon: <FaDatabase />,
      color: "#9b507a",
      tasks: ["REST API Development", "Model Training", "Database Integration", "Security Implementation"]
    },
    {
      phase: "Integration & Testing",
      title: "System Integration & UAT",
      duration: "43 days",
      period: "Apr 30 - Jun 27, 2026",
      description: "Module integration, comprehensive testing, and user acceptance testing.",
      icon: <FaCheckCircle />,
      color: "#e67e22",
      tasks: ["Module Integration", "Unit Testing", "Functional Testing", "UAT with Stakeholders"]
    },
    {
      phase: "Deployment & Training",
      title: "Deployment & Documentation",
      duration: "36 days",
      period: "Jun 27 - Jul 24, 2026",
      description: "Production deployment, user training, and comprehensive documentation.",
      icon: <FaRocket />,
      color: "#5056e6",
      tasks: ["Production Deployment", "User Training", "Technical Documentation", "Maintenance Plan"]
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index)
            setTimeout(() => {
              setVisibleItems((prev) => [...prev, index])
            }, index * 150)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      const items = sectionRef.current.querySelectorAll('[data-index]')
      items.forEach((item) => observer.observe(item))
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 xs:px-5 sm:px-6 lg:px-8 bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header - Updated for Gantt Chart */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 px-4">
          <div className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-[#5056e6]/10 rounded-full mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm font-semibold text-[#5056e6]">PROJECT GANTT CHART</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-4 leading-tight">
            Precision Scan Project Timeline
          </h2>
          <p className="text-sm xs:text-base sm:text-lg text-[#979999] max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            Comprehensive project schedule from planning to deployment (August 2025 - July 2026)
          </p>
        </div>

        {/* Timeline Container - Responsive */}
        <div ref={sectionRef} className="relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-[#5056e6] via-[#008059] to-[#9b507a] opacity-20"></div>

          {/* Mobile: Vertical Timeline Line */}
          <div className="lg:hidden absolute left-4 xs:left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#5056e6] via-[#008059] to-[#5056e6] opacity-20"></div>

          {/* Main Timeline Items - Using grid for better control */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {timeline.map((item, index) => {
              const isVisible = visibleItems.includes(index)
              return (
                <div
                  key={index}
                  data-index={index}
                  className={`relative ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 sm:translate-y-8'
                  } transition-all duration-700 ease-out`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Mobile Timeline Dot */}
                  <div className="lg:hidden absolute left-0 top-0 transform -translate-x-1/2 -translate-y-2">
                    <div
                      className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white shadow-md flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    ></div>
                  </div>

                  {/* Timeline Item Card - Responsive */}
                  <div className="group relative bg-white border border-gray-200 sm:border-gray-300 rounded-lg sm:rounded-xl p-5 sm:p-6 hover:shadow-lg sm:hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 ease-out hover:-translate-y-1 sm:hover:-translate-y-2 min-h-[350px] ml-12 xs:ml-14 sm:ml-16 lg:ml-0 flex flex-col">
                    {/* Phase Badge */}
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">
                        {item.phase}
                      </span>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute -top-3 right-4">
                      <div
                        className="px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-md"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.duration}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="mb-4 flex justify-center">
                      <div
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-2xl text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      >
                        {item.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-black mb-2 text-center group-hover:text-[#5056e6] transition-colors duration-200">
                        {item.title}
                      </h3>
                      
                      {/* Period */}
                      <p className="text-sm text-gray-600 mb-3 text-center font-medium">
                        {item.period}
                      </p>

                      {/* Description */}
                      <p className="text-sm text-[#979999] mb-4 leading-relaxed text-center flex-1">
                        {item.description}
                      </p>

                      {/* Tasks List */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-500 font-semibold mb-2">Key Tasks:</p>
                        <ul className="space-y-1">
                          {item.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="flex items-center text-xs text-gray-600">
                              <div className="w-1.5 h-1.5 rounded-full mr-2 flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div
                      className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                      style={{ backgroundColor: item.color }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Gantt Chart Summary - Updated */}
        <div className="mt-12 sm:mt-16 md:mt-20 p-5 sm:p-6 bg-white border border-gray-300 rounded-lg sm:rounded-xl">
          <h3 className="text-lg sm:text-xl font-bold text-black mb-4 text-center">Project Phases Overview</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Phase</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Duration</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Timeline</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Key Deliverables</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-[#5056e6]">Project Planning</td>
                  <td className="px-4 py-3 text-sm text-gray-700">67 days</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Aug 1 - Oct 30, 2025</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Requirements, System Design, Architecture</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-[#008059]">Development</td>
                  <td className="px-4 py-3 text-sm text-gray-700">130 days</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Oct 31, 2025 - Apr 29, 2026</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Frontend, Backend, AI Integration</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-[#9b507a]">Testing</td>
                  <td className="px-4 py-3 text-sm text-gray-700">43 days</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Apr 30 - Jun 27, 2026</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Integration, UAT, Bug Fixes</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-sm font-medium text-[#e67e22]">Deployment</td>
                  <td className="px-4 py-3 text-sm text-gray-700">36 days</td>
                  <td className="px-4 py-3 text-sm text-gray-700">Jun 27 - Jul 24, 2026</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Live System, Training, Documentation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Project Duration */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#5056e6] to-[#008059] text-white rounded-xl shadow-lg">
            <FaProjectDiagram className="text-xl" />
            <div>
              <p className="text-sm font-semibold">Total Project Duration</p>
              <p className="text-lg font-bold">276 Days (August 2025 - July 2026)</p>
            </div>
          </div>
          
          <p className="text-xs sm:text-sm text-[#979999] italic mt-4">
            FEST BSSE Final Year Project 2025-26 - AI Medical Diagnostics System
          </p>
        </div>
      </div>
    </section>
  )
}