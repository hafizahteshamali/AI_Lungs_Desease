import React, { useState } from 'react';
import { 
  FiBarChart2, 
  FiDownload, 
  FiCalendar, 
  FiHeart, 
  FiTrendingUp,
  FiChevronDown,
  FiCheck,
  FiClock,
  FiAward,
  FiPieChart
} from 'react-icons/fi';
import { 
  MdOutlineAnalytics, 
  MdOutlineHealthAndSafety,
  MdOutlineDateRange,
  MdOutlineFileDownload,
  MdOutlineCalendarToday
} from 'react-icons/md';
import { 
  FaRibbon, 
  FaLungs, 
  FaInfinity,
  FaChartLine,
  FaChartBar,
  FaCalendarWeek,
  FaCalendarAlt
} from 'react-icons/fa';
import { TbCalendarTime, TbReport } from 'react-icons/tb';
import { GiLungs, GiHealthNormal } from 'react-icons/gi';

const PerformanceHeader = ({ activeDisease, setActiveDisease, timeRange, setTimeRange }) => {
  const [showTimeRangeDropdown, setShowTimeRangeDropdown] = useState(false);
  const [showDiseaseDropdown, setShowDiseaseDropdown] = useState(false);
  const [hoveredTimeRange, setHoveredTimeRange] = useState(null);
  const [hoveredAction, setHoveredAction] = useState(null);

  const timeRangeOptions = [
    { 
      value: 'week', 
      label: 'Last 7 Days', 
      icon: <FaCalendarWeek className="text-emerald-500" />,
      activeIcon: <FaCalendarWeek className="text-white" />,
      description: 'Recent performance data',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50',
      stats: '+12% vs last week'
    },
    { 
      value: 'month', 
      label: 'Last 30 Days', 
      icon: <FaCalendarAlt className="text-blue-500" />,
      activeIcon: <FaCalendarAlt className="text-white" />,
      description: 'Monthly trend analysis',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      stats: '+8% vs last month'
    },
    { 
      value: 'all', 
      label: 'All Time', 
      icon: <FaInfinity className="text-purple-500" />,
      activeIcon: <FaInfinity className="text-white" />,
      description: 'Complete historical data',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      stats: 'Since launch'
    }
  ];

  const diseaseOptions = [
    { 
      value: 'breast-cancer', 
      label: 'Breast Cancer Detection', 
      shortLabel: 'Breast Cancer',
      icon: <FaRibbon className="text-pink-500 text-lg" />,
      iconSelected: <FaRibbon className="text-white text-lg" />,
      color: 'from-rose-500 to-pink-600',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-600',
      gradient: 'bg-gradient-to-r from-rose-500 to-pink-500',
      stats: '86.7% sensitivity'
    },
    { 
      value: 'lung-disease', 
      label: 'Lung Disease Detection', 
      shortLabel: 'Lung Disease',
      icon: <GiLungs className="text-teal-500 text-lg" />,
      iconSelected: <GiLungs className="text-white text-lg" />,
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600',
      gradient: 'bg-gradient-to-r from-teal-500 to-cyan-500',
      stats: 'Coming soon'
    }
  ];

  const getTimeRangeLabel = () => {
    const option = timeRangeOptions.find(opt => opt.value === timeRange);
    return option ? option.label : 'All Time';
  };

  const getCurrentDisease = () => {
    return diseaseOptions.find(opt => opt.value === activeDisease) || diseaseOptions[0];
  };

  const currentDisease = getCurrentDisease();

  return (
    <div className="max-w-7xl mx-auto mb-6 md:mb-8 px-4 sm:px-6">
      {/* Title Section */}
      <div className="text-center mb-8 md:mb-10">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 px-4 md:px-5 py-2 rounded-full mb-4 md:mb-5 shadow-sm border border-blue-100">
          <MdOutlineAnalytics className="text-blue-600 text-sm md:text-base" />
          <span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
            Model Performance Analytics
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-3 md:mb-4 px-2">
          Precision Scan AI Performance
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-3xl mx-auto px-4">
          Real-time metrics and analytics for our AI-powered diagnostic models
        </p>
      </div>

      {/* Disease Toggle - Responsive */}
      <div className="flex justify-center mb-8 md:mb-10">
        {/* Desktop View - Horizontal Buttons */}
        <div className="hidden sm:flex bg-gray-100/60 backdrop-blur-sm rounded-full p-1 shadow-md gap-1">
          {diseaseOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setActiveDisease(option.value)}
              className={`group relative flex items-center gap-2 px-6 md:px-8 py-2.5 rounded-full font-semibold transition-all duration-300 text-sm md:text-base overflow-hidden ${
                activeDisease === option.value
                  ? `bg-gradient-to-r ${option.color} text-white shadow-lg`
                  : 'text-gray-600 hover:bg-white/80 hover:text-gray-800'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {activeDisease === option.value ? option.iconSelected : option.icon}
                <span>{option.shortLabel}</span>
                {activeDisease === option.value && (
                  <FiCheck className="text-xs ml-1 text-white/80" />
                )}
              </span>
              {activeDisease === option.value && (
                <div className={`absolute inset-0 bg-gradient-to-r ${option.color} opacity-90`} />
              )}
            </button>
          ))}
        </div>

        {/* Mobile View - Custom Dropdown */}
        <div className="sm:hidden w-full max-w-xs relative">
          <button
            onClick={() => setShowDiseaseDropdown(!showDiseaseDropdown)}
            className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl bg-white border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-full ${currentDisease.bgColor}`}>
                {currentDisease.icon}
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800">{currentDisease.shortLabel}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <MdOutlineHealthAndSafety className="text-[10px]" />
                  <span>Select model</span>
                </p>
              </div>
            </div>
            <FiChevronDown className={`text-gray-400 transition-transform duration-300 ${showDiseaseDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showDiseaseDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden animate-fadeIn">
              {diseaseOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setActiveDisease(option.value);
                    setShowDiseaseDropdown(false);
                  }}
                  className={`w-full flex items-center gap-3 px-5 py-4 transition-all duration-200 ${
                    activeDisease === option.value
                      ? `bg-gradient-to-r ${option.color} text-white`
                      : 'hover:bg-gray-50'
                  } ${option.value === diseaseOptions[0].value ? '' : 'border-t border-gray-100'}`}
                >
                  <div className={`p-2 rounded-full ${activeDisease === option.value ? 'bg-white/20' : option.bgColor}`}>
                    {activeDisease === option.value ? option.iconSelected : option.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`font-semibold ${activeDisease === option.value ? 'text-white' : 'text-gray-800'}`}>
                      {option.label}
                    </p>
                    <p className={`text-xs ${activeDisease === option.value ? 'text-white/70' : 'text-gray-400'}`}>
                      {option.stats}
                    </p>
                  </div>
                  {activeDisease === option.value && (
                    <FiCheck className="text-white/80" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Time Range Filter - Responsive */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Desktop Time Range Buttons */}
        <div className="hidden sm:flex gap-2">
          {timeRangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeRange(option.value)}
              onMouseEnter={() => setHoveredTimeRange(option.value)}
              onMouseLeave={() => setHoveredTimeRange(null)}
              className={`group relative px-4 md:px-5 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm md:text-base overflow-hidden ${
                timeRange === option.value
                  ? `bg-gradient-to-r ${option.color} text-white shadow-md`
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                {timeRange === option.value ? option.activeIcon : option.icon}
                <span>{option.label}</span>
                {hoveredTimeRange === option.value && timeRange !== option.value && (
                  <span className="text-xs animate-slideIn">
                    {option.stats}
                  </span>
                )}
              </span>
              {timeRange === option.value && (
                <div className={`absolute inset-0 bg-gradient-to-r ${option.color} opacity-90`} />
              )}
            </button>
          ))}
        </div>

        {/* Mobile Time Range Dropdown */}
        <div className="sm:hidden w-full relative">
          <button
            onClick={() => setShowTimeRangeDropdown(!showTimeRangeDropdown)}
            className="w-full flex items-center justify-between px-5 py-3.5 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-50">
                <TbCalendarTime className="text-blue-500 text-lg" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-800">{getTimeRangeLabel()}</p>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <FiClock className="text-[10px]" />
                  <span>Select time period</span>
                </p>
              </div>
            </div>
            <FiChevronDown className={`text-gray-400 transition-transform duration-300 ${showTimeRangeDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showTimeRangeDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden animate-fadeIn">
              {timeRangeOptions.map((option, idx) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setTimeRange(option.value);
                    setShowTimeRangeDropdown(false);
                  }}
                  className={`w-full flex items-center gap-3 px-5 py-4 transition-all duration-200 hover:bg-gray-50 ${
                    timeRange === option.value ? 'bg-gray-50' : ''
                  } ${idx !== 0 ? 'border-t border-gray-100' : ''}`}
                >
                  <div className={`p-2 rounded-full ${timeRange === option.value ? option.color.replace('from', 'bg').split(' ')[0] + '-100' : 'bg-gray-100'}`}>
                    {option.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`font-semibold ${timeRange === option.value ? 'text-blue-600' : 'text-gray-800'}`}>
                      {option.label}
                    </p>
                    <p className="text-xs text-gray-400">{option.description}</p>
                    <p className="text-xs text-green-600 mt-0.5">{option.stats}</p>
                  </div>
                  {timeRange === option.value && (
                    <FiCheck className="text-blue-500" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons - Responsive with Hover Animations */}
        <div className="flex gap-3 w-full sm:w-auto">
          <button 
            onMouseEnter={() => setHoveredAction('export')}
            onMouseLeave={() => setHoveredAction(null)}
            className="group flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-gray-800 hover:border-gray-300 hover:shadow-md transition-all duration-300 text-sm md:text-base"
          >
            <FiDownload className={`text-base md:text-lg transition-all duration-300 ${hoveredAction === 'export' ? 'scale-110 -translate-y-0.5' : ''}`} />
            <span className="font-medium">Export</span>
          </button>
          <button 
            onMouseEnter={() => setHoveredAction('range')}
            onMouseLeave={() => setHoveredAction(null)}
            className="group flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-gray-800 hover:border-gray-300 hover:shadow-md transition-all duration-300 text-sm md:text-base"
          >
            <FiCalendar className={`text-base md:text-lg transition-all duration-300 ${hoveredAction === 'range' ? 'scale-110 -translate-y-0.5' : ''}`} />
            <span className="font-medium hidden xs:inline">Custom Range</span>
            <span className="font-medium xs:hidden">Range</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-5px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideIn {
          animation: slideIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PerformanceHeader;