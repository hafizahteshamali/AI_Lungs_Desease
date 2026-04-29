import React, { useState, useEffect } from 'react';
import { 
  FaTachometerAlt, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaChartLine, 
  FaHeartbeat, 
  FaStethoscope, 
  FaArrowUp, 
  FaArrowDown, 
  FaMinus,
  FaInfoCircle
} from 'react-icons/fa';

const BreastCancerMetrics = () => {
  const [hoveredMetric, setHoveredMetric] = useState(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const metrics = [
    {
      title: "Sensitivity (Recall)",
      value: "86.7%",
      change: "+19.1%",
      improvement: "positive",
      description: "Malignant detection rate",
      shortDescription: "Cancer detection rate",
      icon: <FaHeartbeat className="text-2xl sm:text-3xl" />,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      target: "≥80%",
      rank: "Excellent",
      insight: "Detects 86.7% of cancer cases"
    },
    {
      title: "Specificity",
      value: "56.4%",
      change: "-29.1%",
      improvement: "negative",
      description: "Benign detection rate",
      shortDescription: "Benign detection rate",
      icon: <FaCheckCircle className="text-2xl sm:text-3xl" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      target: "≥80%",
      rank: "Needs Improvement",
      insight: "56.4% of benign cases correctly identified"
    },
    {
      title: "Accuracy",
      value: "69.2%",
      change: "-7.7%",
      improvement: "negative",
      description: "Overall correctness",
      shortDescription: "Overall correctness",
      icon: <FaTachometerAlt className="text-2xl sm:text-3xl" />,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      target: "≥85%",
      rank: "Moderate",
      insight: "69.2% overall prediction accuracy"
    },
    {
      title: "AUC-ROC",
      value: "0.834",
      change: "+0.0%",
      improvement: "neutral",
      description: "Model discrimination ability",
      shortDescription: "Model discrimination",
      icon: <FaChartLine className="text-2xl sm:text-3xl" />,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      target: "≥0.90",
      rank: "Good",
      insight: "Good discrimination ability"
    },
    {
      title: "Precision",
      value: "59.2%",
      change: "-5.1%",
      improvement: "negative",
      description: "Positive predictive value",
      shortDescription: "Positive predictive value",
      icon: <FaStethoscope className="text-2xl sm:text-3xl" />,
      color: "from-orange-500 to-yellow-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      target: "≥80%",
      rank: "Needs Improvement",
      insight: "59.2% precision when predicting cancer"
    },
    {
      title: "F1-Score",
      value: "70.3%",
      change: "-1.3%",
      improvement: "negative",
      description: "Harmonic mean of precision & recall",
      shortDescription: "Harmonic mean of P & R",
      icon: <FaExclamationTriangle className="text-2xl sm:text-3xl" />,
      color: "from-teal-500 to-green-500",
      bgColor: "bg-teal-50",
      textColor: "text-teal-600",
      target: "≥80%",
      rank: "Moderate",
      insight: "Balanced measure of 70.3%"
    }
  ];

  const getImprovementIcon = (improvement) => {
    if (improvement === 'positive') return <FaArrowUp className="text-green-600 text-xs sm:text-sm" />;
    if (improvement === 'negative') return <FaArrowDown className="text-red-600 text-xs sm:text-sm" />;
    return <FaMinus className="text-gray-600 text-xs sm:text-sm" />;
  };

  const getRankColor = (rank) => {
    if (rank === 'Excellent') return 'text-green-600 bg-green-100';
    if (rank === 'Good') return 'text-blue-600 bg-blue-100';
    if (rank === 'Moderate') return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getProgressWidth = (metric) => {
    if (metric.value === "0.834") {
      return `${(83.4 / 90) * 100}%`;
    }
    const numValue = parseFloat(metric.value);
    const targetValue = parseFloat(metric.target);
    const percentage = (numValue / targetValue) * 100;
    return `${percentage > 100 ? 100 : percentage}%`;
  };

  const getDisplayValue = (metric) => {
    if (metric.value === "0.834") return "0.834";
    return metric.value;
  };

  // Responsive grid classes
  const getGridClasses = () => {
    if (isMobile) return 'grid-cols-1 gap-4';
    if (isTablet) return 'grid-cols-2 gap-5';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
  };

  // Responsive padding classes
  const getPaddingClasses = () => {
    return 'p-4 sm:p-5 md:p-6';
  };

  // Responsive icon container classes
  const getIconContainerClasses = () => {
    return 'p-2 sm:p-3 rounded-xl';
  };

  // Responsive heading classes
  const getHeadingClasses = () => {
    return 'text-2xl sm:text-3xl font-bold';
  };

  // Responsive title classes
  const getTitleClasses = () => {
    return 'text-sm sm:text-base font-medium mb-1 sm:mb-2';
  };

  // Responsive description classes
  const getDescriptionClasses = () => {
    return 'text-xs sm:text-sm text-gray-500';
  };

  return (
    <div className="mb-6 sm:mb-8">
      {/* Section Header - Responsive */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4">
          <FaHeartbeat className="text-pink-500 text-xs sm:text-sm" />
          <span className="text-xs sm:text-sm font-semibold text-gray-700">Key Performance Indicators</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">Model Performance Metrics</h2>
        <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto px-4">
          Comprehensive evaluation of our breast cancer detection model's performance across key metrics
        </p>
      </div>

      <div className={`grid ${getGridClasses()} ${getPaddingClasses()}`}>
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer transform hover:-translate-y-1"
            onMouseEnter={() => setHoveredMetric(index)}
            onMouseLeave={() => setHoveredMetric(null)}
          >
            <div className={`h-1.5 sm:h-2 bg-gradient-to-r ${metric.color}`} />
            <div className={getPaddingClasses()}>
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className={`${getIconContainerClasses()} ${metric.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <div className={metric.textColor}>{metric.icon}</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-0.5 sm:gap-1">
                    {getImprovementIcon(metric.improvement)}
                    <span className={`text-xs sm:text-sm font-semibold ${
                      metric.improvement === 'positive' ? 'text-green-600' : 
                      metric.improvement === 'negative' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap items-baseline gap-1 sm:gap-2 mb-1 sm:mb-2">
                <h3 className={getHeadingClasses()}>{getDisplayValue(metric)}</h3>
                <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${getRankColor(metric.rank)}`}>
                  {metric.rank}
                </span>
              </div>
              <p className={getTitleClasses()}>{metric.title}</p>
              <p className={getDescriptionClasses()}>
                {isMobile ? metric.shortDescription : metric.description}
              </p>
              
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] sm:text-xs text-gray-500">Progress to Target ({metric.target})</span>
                  <span className="text-[10px] sm:text-xs font-semibold text-gray-700">
                    {metric.value === "0.834" ? '83%' : metric.value.replace('%', '')}%
                  </span>
                </div>
                <div className="w-full h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${metric.color} transition-all duration-500 ${
                      hoveredMetric === index ? 'opacity-100' : 'opacity-80'
                    }`}
                    style={{ width: getProgressWidth(metric) }}
                  />
                </div>
              </div>
              
              {/* Tooltip/Hover Info - Responsive */}
              {hoveredMetric === index && (
                <div className="mt-2 sm:mt-3 p-1.5 sm:p-2 bg-gray-50 rounded-lg animate-fadeIn">
                  <div className="flex items-start gap-1.5 sm:gap-2">
                    <FaInfoCircle className="text-gray-400 text-[10px] sm:text-xs mt-0.5 flex-shrink-0" />
                    <p className="text-[10px] sm:text-xs text-gray-600">
                      {metric.improvement === 'positive' 
                        ? `✓ ${metric.change} increase from baseline. ${metric.insight}`
                        : metric.improvement === 'negative'
                        ? `⚠️ ${metric.change} decrease from baseline. ${metric.insight}`
                        : `ℹ️ Stable performance. ${metric.insight}`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section - Responsive */}
      <div className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <FaHeartbeat className="text-pink-500 text-sm sm:text-base" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-gray-800">Clinical Summary</h4>
              <p className="text-xs sm:text-sm text-gray-600">Model prioritizes sensitivity (86.7%) for early cancer detection</p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-3 text-[10px] sm:text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Excellent</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Good</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">Moderate</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Needs Improvement</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BreastCancerMetrics;