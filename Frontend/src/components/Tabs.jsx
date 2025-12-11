"use client"

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "scans", label: "Medical Scans" },
    { key: "notifications", label: "Notifications" },
  ]

  return (
    <div className="">
      <div
        role="tablist"
        aria-label="Dashboard sections"
        className="flex flex-col lg:flex-row flex-wrap gap-1 bg-white rounded-lg p-1 border border-gray-300 shadow-sm w-full"
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={activeTab === t.key}
            onClick={() => setActiveTab(t.key)}
            className={`
              flex-1 
              min-w-full xs:min-w-[120px] sm:min-w-[140px] 
              py-2 sm:py-3 
              px-2 sm:px-4 
              rounded-md 
              text-xs sm:text-sm 
              font-medium 
              transition-colors 
              duration-200
              whitespace-nowrap
              ${activeTab === t.key 
                ? "bg-[#5056e6] text-white shadow-sm" 
                : "text-black hover:text-[#000000] hover:bg-gray-50"
              }
            `}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Tabs