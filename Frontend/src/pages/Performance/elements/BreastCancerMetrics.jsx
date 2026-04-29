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

  // Metrics data from notebook test results (threshold = 0.35)
  const metrics = [
    {
      title: "Sensitivity (Recall)",
      value: "86.7%",
      change: "+19.1%",
      improvement: "positive",
      description: "Malignant detection rate - Cancer cases correctly identified",
      shortDescription: "Cancer detection rate",
      icon: <FaHeartbeat className="text-2xl sm:text-3xl" />,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      insight: "Detected 1,093 out of 1,260 malignant cases",
      actualValue: 1093,
      totalValue: 1260
    },
    {
      title: "Specificity",
      value: "56.4%",
      change: "-29.1%",
      improvement: "negative",
      description: "Benign detection rate - Benign cases correctly identified",
      shortDescription: "Benign detection rate",
      icon: <FaCheckCircle className="text-2xl sm:text-3xl" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      insight: "Correctly identified 978 out of 1,733 benign cases",
      actualValue: 978,
      totalValue: 1733
    },
    {
      title: "Accuracy",
      value: "69.2%",
      change: "-8.7%",
      improvement: "negative",
      description: "Overall correctness - Total correct predictions",
      shortDescription: "Overall correctness",
      icon: <FaTachometerAlt className="text-2xl sm:text-3xl" />,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      insight: "Correctly predicted 2,071 out of 2,993 cases",
      actualValue: 2071,
      totalValue: 2993
    },
    {
      title: "AUC-ROC",
      value: "0.834",
      change: "+0.3%",
      improvement: "positive",
      description: "Model discrimination ability - Area under ROC curve",
      shortDescription: "Model discrimination",
      icon: <FaChartLine className="text-2xl sm:text-3xl" />,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      insight: "Good discrimination ability (0.834 AUC)",
      actualValue: 83.4,
      totalValue: 100
    },
    {
      title: "Precision",
      value: "59.2%",
      change: "-15.1%",
      improvement: "negative",
      description: "Positive predictive value - When cancer predicted, how often correct",
      shortDescription: "Positive predictive value",
      icon: <FaStethoscope className="text-2xl sm:text-3xl" />,
      color: "from-orange-500 to-yellow-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      insight: "1,093 true positives vs 755 false positives",
      actualValue: 1093,
      totalValue: 1848
    },
    {
      title: "F1-Score",
      value: "70.3%",
      change: "-1.3%",
      improvement: "negative",
      description: "Harmonic mean of precision & recall - Balanced measure",
      shortDescription: "Harmonic mean of P & R",
      icon: <FaExclamationTriangle className="text-2xl sm:text-3xl" />,
      color: "from-teal-500 to-green-500",
      bgColor: "bg-teal-50",
      textColor: "text-teal-600",
      insight: "Balance between precision (59.2%) and recall (86.7%)",
      actualValue: 70.3,
      totalValue: 100
    }
  ];

  const getImprovementIcon = (improvement) => {
    if (improvement === 'positive') return <FaArrowUp className="text-green-600 text-xs sm:text-sm" />;
    if (improvement === 'negative') return <FaArrowDown className="text-red-600 text-xs sm:text-sm" />;
    return <FaMinus className="text-gray-600 text-xs sm:text-sm" />;
  };

  const getRankColor = (metricValue) => {
    const value = parseFloat(metricValue);
    if (value >= 80) return 'text-green-600 bg-green-100';
    if (value >= 70) return 'text-blue-600 bg-blue-100';
    if (value >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRank = (metricValue) => {
    const value = parseFloat(metricValue);
    if (value >= 80) return 'Excellent';
    if (value >= 70) return 'Good';
    if (value >= 60) return 'Moderate';
    return 'Needs Improvement';
  };

  // Responsive grid classes
  const getGridClasses = () => {
    if (isMobile) return 'grid-cols-1 gap-4';
    if (isTablet) return 'grid-cols-2 gap-5';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
  };

  const getProgressWidth = (metric) => {
    if (metric.title === "AUC-ROC") {
      return `${(parseFloat(metric.value) / 1) * 100}%`;
    }
    const numValue = parseFloat(metric.value);
    return `${Math.min(numValue, 100)}%`;
  };

  const getDisplayValue = (metric) => {
    if (metric.title === "AUC-ROC") return "0.834";
    return metric.value;
  };

  return (
    <div className="mb-6 sm:mb-8">
      {/* Section Header - Responsive */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4">
          <FaHeartbeat className="text-pink-500 text-xs sm:text-sm" />
          <span className="text-xs sm:text-sm font-semibold text-gray-700">Test Set Results (N=2,993)</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">Model Performance Metrics</h2>
        <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto px-4">
          Evaluation results at clinical threshold (0.35) - Prioritizing early cancer detection
        </p>
      </div>

      <div className={`grid ${getGridClasses()} p-4 sm:p-6`}>
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer transform hover:-translate-y-1"
            onMouseEnter={() => setHoveredMetric(index)}
            onMouseLeave={() => setHoveredMetric(null)}
          >
            <div className={`h-1.5 sm:h-2 bg-gradient-to-r ${metric.color}`} />
            <div className="p-4 sm:p-5 md:p-6">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-xl ${metric.bgColor} group-hover:scale-110 transition-transform duration-300`}>
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
                <h3 className="text-2xl sm:text-3xl font-bold">{getDisplayValue(metric)}</h3>
                <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${getRankColor(metric.value)}`}>
                  {getRank(metric.value)}
                </span>
              </div>
              <p className="text-sm sm:text-base font-medium mb-1 sm:mb-2">{metric.title}</p>
              <p className="text-xs sm:text-sm text-gray-500">
                {isMobile ? metric.shortDescription : metric.description}
              </p>
              
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] sm:text-xs text-gray-500">Performance Level</span>
                  <span className="text-[10px] sm:text-xs font-semibold text-gray-700">
                    {metric.value === "0.834" ? '83.4%' : metric.value}
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
              
              {/* Hover Info */}
              {hoveredMetric === index && (
                <div className="mt-2 sm:mt-3 p-1.5 sm:p-2 bg-gray-50 rounded-lg animate-fadeIn">
                  <div className="flex items-start gap-1.5 sm:gap-2">
                    <FaInfoCircle className="text-gray-400 text-[10px] sm:text-xs mt-0.5 flex-shrink-0" />
                    <p className="text-[10px] sm:text-xs text-gray-600">{metric.insight}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section - from notebook */}
      <div className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-md">
              <FaHeartbeat className="text-pink-500 text-sm sm:text-base" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-gray-800">Clinical Summary</h4>
              <p className="text-xs sm:text-sm text-gray-600">Threshold (0.35) achieves 86.7% sensitivity (1,093/1,260 cancers detected)</p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-3 text-[10px] sm:text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">TP: 1,093</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">FP: 755</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">FN: 167</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">TN: 978</span>
            </div>
          </div>
        </div>
      </div>

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