// GradCAMComponent.jsx (Professional Interactive Version with Fixed Imports)
import React, { useState, useRef, useEffect } from 'react';
import { 
  FaBrain, 
  FaMicroscope, 
  FaExclamationTriangle, 
  FaHeartbeat, 
  FaChartLine, 
  FaExpand, 
  FaCompress,
  FaChevronLeft,
  FaChevronRight,
  FaInfoCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaThermometerHalf,
  FaCrosshairs,
  FaEye,
  FaChartPie,
  FaRegImage,
  FaMagic,
  FaStethoscope,
  FaXRay,
  FaRadiation,
  FaFileAlt,
  FaRegClock,
  FaUserMd,
  FaClipboardList,
  FaFlask,
  FaHospitalUser,
  FaCalendarCheck,
  FaShieldAlt
} from 'react-icons/fa';

const GradCAMComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedImage, setExpandedImage] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredMetric, setHoveredMetric] = useState(null);
  const [hoveredTab, setHoveredTab] = useState(null);
  const carouselRef = useRef(null);

  const steps = [
    {
      id: 'original',
      title: "Original Mammogram",
      shortTitle: "Original",
      tabIcon: <FaRegImage className="text-lg" />,
      src: '/assets/images/original-memogram-image.png',
      alt: 'Original Mammogram',
      icon: <FaMicroscope className="text-blue-500 text-xl" />,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      badgeColor: "bg-blue-100 text-blue-700",
      borderColor: "border-blue-200",
      buttonGradient: "from-blue-600 to-blue-700",
      description: "Standard mammogram image showing breast tissue. The radiologist examines this for any suspicious masses, calcifications, or asymmetries that could indicate breast cancer.",
      detailedAnalysis: [
        "Breast tissue density: Heterogeneously dense (BI-RADS C)",
        "No obvious masses detected in craniocaudal view",
        "Normal anatomical structures clearly visible",
        "Patient age: 52 years, Routine screening"
      ],
      keyFindings: [
        "Dense breast tissue pattern",
        "No visible masses in standard view",
        "Normal anatomical structures visible"
      ],
      metrics: {
        quality: "Excellent",
        artifacts: "None detected",
        positioning: "Optimal"
      }
    },
    {
      id: 'attention',
      title: "AI Attention Map",
      shortTitle: "AI Focus",
      tabIcon: <FaBrain className="text-lg" />,
      src: '/assets/images/ai-attention-map-focus-area-image.png',
      alt: 'AI Attention Map - Focus Areas',
      icon: <FaBrain className="text-purple-500 text-xl" />,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      badgeColor: "bg-purple-100 text-purple-700",
      borderColor: "border-purple-200",
      buttonGradient: "from-purple-600 to-purple-700",
      description: "The AI model's attention heatmap showing regions that influenced the decision. Warmer colors (red/yellow) indicate higher attention areas where the model detected suspicious patterns.",
      detailedAnalysis: [
        "Peak attention: Upper outer quadrant (R-score: 0.94)",
        "Micro-calcification cluster detected (size: 2.3mm)",
        "Architectural distortion identified",
        "Confidence score: 94.7%"
      ],
      keyFindings: [
        "High attention in upper outer quadrant",
        "Subtle micro-calcification patterns detected",
        "Asymmetry identified in left breast tissue"
      ],
      metrics: {
        attentionScore: "94.7%",
        suspiciousRegions: "3 detected",
        confidence: "Very High"
      }
    },
    {
      id: 'precision',
      title: "Precision Scan",
      shortTitle: "Analysis",
      tabIcon: <FaStethoscope className="text-lg" />,
      src: '/assets/images/precision-scan-analyzing-image.png',
      alt: 'Precision Scan Analysis',
      icon: <FaChartLine className="text-green-500 text-xl" />,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      badgeColor: "bg-green-100 text-green-700",
      borderColor: "border-green-200",
      buttonGradient: "from-green-600 to-green-700",
      description: "Overlay visualization combining original mammogram and AI attention map. This helps clinicians understand which features the AI used for its prediction.",
      detailedAnalysis: [
        "Malignancy probability: 86.7% (High risk)",
        "Safety threshold: 35% - Significantly exceeded",
        "Recommended action: Urgent biopsy",
        "Similar cases in database: 1,247"
      ],
      keyFindings: [
        "86.7% malignancy probability detected",
        "High confidence in suspicious region",
        "Clinical correlation recommended"
      ],
      metrics: {
        riskLevel: "HIGH RISK",
        probability: "86.7%",
        urgency: "Immediate"
      }
    }
  ];

  const handleNext = () => {
    if (!isAnimating && activeStep < steps.length - 1) {
      setIsAnimating(true);
      setActiveStep(activeStep + 1);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handlePrev = () => {
    if (!isAnimating && activeStep > 0) {
      setIsAnimating(true);
      setActiveStep(activeStep - 1);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const currentStep = steps[activeStep];

  // Metrics gradient based on value
  const getMetricGradient = (value, type) => {
    if (type === 'risk') {
      if (value.includes('HIGH')) return 'from-red-500 to-red-600';
      if (value.includes('Very High')) return 'from-orange-500 to-red-500';
      return 'from-green-500 to-emerald-500';
    }
    if (type === 'probability') {
      const num = parseFloat(value);
      if (num >= 80) return 'from-red-500 to-red-600';
      if (num >= 60) return 'from-orange-500 to-red-500';
      return 'from-green-500 to-emerald-500';
    }
    return 'from-gray-500 to-gray-600';
  };

  return (
    <div className="mb-12">
      {/* Section Header with Animation */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 px-5 py-2.5 rounded-full mb-4 shadow-sm border border-purple-200">
          <FaBrain className="text-purple-600 text-sm" />
          <span className="text-sm font-semibold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent">
            Grad-CAM Visualization
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent mb-3">
          AI Decision Intelligence
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-base">
          Visualizing how our AI model analyzes mammograms and identifies potential breast cancer regions
        </p>
      </div>

      {/* Main Carousel View - Professional Layout */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Attractive Tabs - Button Style */}
        <div className="bg-gray-50 px-4 md:px-8 py-4 border-b border-gray-200">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setHoveredTab(idx)}
                onMouseLeave={() => setHoveredTab(null)}
                className={`
                  relative flex items-center gap-3 px-5 md:px-7 py-3 rounded-xl font-semibold text-sm md:text-base
                  transition-all duration-300 transform hover:scale-105
                  ${activeStep === idx 
                    ? `bg-gradient-to-r ${step.gradient} text-white shadow-lg` 
                    : `bg-white text-gray-700 border-2 border-gray-200 hover:border-${step.id === 'original' ? 'blue' : step.id === 'attention' ? 'purple' : 'green'}-300 hover:shadow-md`
                  }
                `}
              >
                {/* Icon with animation */}
                <div className={`
                  transition-all duration-300
                  ${activeStep === idx 
                    ? 'text-white' 
                    : hoveredTab === idx 
                      ? `text-${step.id === 'original' ? 'blue' : step.id === 'attention' ? 'purple' : 'green'}-500 scale-110` 
                      : 'text-gray-500'
                  }
                `}>
                  {step.tabIcon}
                </div>
                <span className="hidden sm:inline">{step.shortTitle}</span>
                
                {/* Active Indicator Dot */}
                {activeStep === idx && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse"></span>
                )}
                
                {/* Step Number for mobile */}
                <span className="sm:hidden">{idx + 1}</span>
              </button>
            ))}
          </div>
          
          {/* Step Description Line */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              {activeStep === 0 && "📷 Step 1: View the original mammogram image"}
              {activeStep === 1 && "🧠 Step 2: See where the AI focuses its attention"}
              {activeStep === 2 && "⚕️ Step 3: Review the final precision scan analysis"}
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image */}
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl group">
                <div className="relative aspect-square md:aspect-auto md:h-[420px]">
                  <img 
                    src={currentStep.src}
                    alt={currentStep.alt}
                    className={`w-full h-full object-cover transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                    style={{ objectPosition: currentStep.id === 'attention' ? 'center' : 'center 30%' }}
                  />
                  
                  {/* Image Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <div className={`px-3 py-1.5 rounded-full ${currentStep.badgeColor} backdrop-blur-sm bg-opacity-90 shadow-sm border ${currentStep.borderColor}`}>
                      <div className="flex items-center gap-2">
                        {currentStep.icon}
                        <span className="text-xs font-semibold">{currentStep.title}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expand Button */}
                  <button 
                    onClick={() => setExpandedImage(currentStep.id)}
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg hover:bg-white transition-all duration-300 hover:scale-110"
                  >
                    <FaExpand size={16} className="text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handlePrev}
                  disabled={activeStep === 0}
                  className={`
                    flex items-center gap-2 px-3 py-2.5 rounded-xl font-medium transition-all duration-300
                    ${activeStep === 0 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : `bg-gradient-to-r ${currentStep.gradient} text-white shadow-md hover:shadow-lg hover:scale-105`
                    }
                  `}
                >
                  <FaChevronLeft size={14} />
                  <span>Previous</span>
                </button>
                
                <div className="flex gap-1">
                  {steps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`transition-all duration-300 rounded-full ${
                        activeStep === idx 
                          ? `w-8 h-2 bg-gradient-to-r ${steps[idx].gradient}` 
                          : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={handleNext}
                  disabled={activeStep === steps.length - 1}
                  className={`
                    flex items-center gap-2 px-3 py-2.5 rounded-xl font-medium transition-all duration-300
                    ${activeStep === steps.length - 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : `bg-gradient-to-r ${currentStep.gradient} text-white shadow-md hover:shadow-lg hover:scale-105`
                    }
                  `}
                >
                  <span>Next</span>
                  <FaChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Right Column - Analysis */}
            <div className="space-y-6">
              {/* Title & Description */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-r ${currentStep.bgGradient}`}>
                    {currentStep.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{currentStep.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {currentStep.description}
                </p>
              </div>

              {/* Metrics Cards - Dynamic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentStep.id === 'original' && (
                  <>
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100 hover:shadow-md transition-all">
                      <div className="flex items-center gap-2 mb-2">
                        <FaCheckCircle className="text-green-500 text-sm" />
                        <span className="text-xs font-semibold text-gray-600">Image Quality</span>
                      </div>
                      <p className="text-xl font-bold text-gray-800">{currentStep.metrics.quality}</p>
                      <p className="text-xs text-gray-500 mt-1">No significant artifacts</p>
                    </div>
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-100 hover:shadow-md transition-all">
                      <div className="flex items-center gap-2 mb-2">
                        <FaCrosshairs className="text-blue-500 text-sm" />
                        <span className="text-xs font-semibold text-gray-600">Positioning</span>
                      </div>
                      <p className="text-xl font-bold text-gray-800">{currentStep.metrics.positioning}</p>
                      <p className="text-xs text-gray-500 mt-1">Standard CC/MLO views</p>
                    </div>
                  </>
                )}

                {currentStep.id === 'attention' && (
                  <>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100 hover:shadow-md transition-all">
                      <div className="flex items-center gap-2 mb-2">
                        <FaChartPie className="text-purple-500 text-sm" />
                        <span className="text-xs font-semibold text-gray-600">Attention Score</span>
                      </div>
                      <p className="text-xl font-bold text-gray-800">{currentStep.metrics.attentionScore}</p>
                      <p className="text-xs text-gray-500 mt-1">Upper outer quadrant focus</p>
                    </div>
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-100 hover:shadow-md transition-all">
                      <div className="flex items-center gap-2 mb-2">
                        <FaThermometerHalf className="text-orange-500 text-sm" />
                        <span className="text-xs font-semibold text-gray-600">Confidence</span>
                      </div>
                      <p className="text-xl font-bold text-gray-800">{currentStep.metrics.confidence}</p>
                      <p className="text-xs text-gray-500 mt-1">Model certainty: 94.7%</p>
                    </div>
                  </>
                )}

                {currentStep.id === 'precision' && (
                  <>
                    <div className={`bg-gradient-to-r ${getMetricGradient(currentStep.metrics.riskLevel, 'risk')} rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition-all`}>
                      <div className="flex items-center gap-2 mb-2">
                        <FaExclamationTriangle className="text-white/80 text-sm" />
                        <span className="text-xs font-semibold text-white/80">Risk Assessment</span>
                      </div>
                      <p className="text-xl font-bold">{currentStep.metrics.riskLevel}</p>
                      <p className="text-xs text-white/70 mt-1">Exceeds safety threshold</p>
                    </div>
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 border border-red-100 hover:shadow-md transition-all">
                      <div className="flex items-center gap-2 mb-2">
                        <FaChartLine className="text-red-500 text-sm" />
                        <span className="text-xs font-semibold text-gray-600">Probability</span>
                      </div>
                      <p className="text-xl font-bold text-gray-800">{currentStep.metrics.probability}</p>
                      <p className="text-xs text-gray-500 mt-1">Threshold: 35%</p>
                    </div>
                  </>
                )}
              </div>

              {/* Detailed Analysis */}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FaInfoCircle className="text-purple-500 text-sm" />
                  Detailed Analysis
                </h4>
                <ul className="space-y-2">
                  {currentStep.detailedAnalysis.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-purple-500 mt-0.5">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clinical Action Button for Precision Scan */}
              {currentStep.id === 'precision' && (
                <button className="w-full py-3.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group">
                  <FaExclamationTriangle size={16} />
                  Urgent Clinical Review Required
                  <FaArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats Section */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Sensitivity", value: "86.7%", change: "+19.1%", icon: <FaHeartbeat className="text-pink-500" />, gradient: "from-pink-50 to-rose-50", borderColor: "border-pink-200", bgIcon: "bg-pink-100" },
          { label: "Cancers Detected", value: "1,093", total: "/1,260", icon: <FaCheckCircle className="text-green-500" />, gradient: "from-green-50 to-emerald-50", borderColor: "border-green-200", bgIcon: "bg-green-100" },
          { label: "AUC-ROC", value: "0.834", rating: "Good", icon: <FaChartLine className="text-purple-500" />, gradient: "from-purple-50 to-indigo-50", borderColor: "border-purple-200", bgIcon: "bg-purple-100" }
        ].map((stat, idx) => (
          <div 
            key={idx}
            className={`bg-gradient-to-r ${stat.gradient} rounded-xl p-5 transition-all duration-300 cursor-pointer hover:shadow-md transform hover:-translate-y-0.5 border ${stat.borderColor}`}
            onMouseEnter={() => setHoveredMetric(idx)}
            onMouseLeave={() => setHoveredMetric(null)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-full bg-white ${stat.bgIcon} shadow-sm flex items-center justify-center`}>
                {stat.icon}
              </div>
              {stat.change && (
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              )}
              {stat.rating && (
                <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                  {stat.rating}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            {stat.total && <p className="text-xs text-gray-500 mt-1">{stat.total} total cases</p>}
            <p className="text-xs text-gray-500 mt-2">{stat.label}</p>
            
            {/* Animated tooltip on hover */}
            {hoveredMetric === idx && (
              <div className="absolute mt-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg shadow-lg animate-fadeIn z-10">
                {stat.label === "Sensitivity" && "Cancer detection rate at threshold 0.35"}
                {stat.label === "Cancers Detected" && "True positives out of 1,260 malignant cases"}
                {stat.label === "AUC-ROC" && "Area under ROC curve - Good discrimination"}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Expanded Image Modal */}
      {expandedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6"
          onClick={() => setExpandedImage(null)}
        >
          <div 
            className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setExpandedImage(null)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2.5 shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110"
            >
              <FaTimesCircle size={20} className="text-gray-600" />
            </button>
            <img 
              src={steps.find(s => s.id === expandedImage)?.src}
              alt={steps.find(s => s.id === expandedImage)?.title}
              className="w-full h-auto max-h-[70vh] object-contain bg-gray-900"
            />
            <div className="p-6 bg-white">
              <div className="flex items-center gap-3 mb-2">
                {steps.find(s => s.id === expandedImage)?.icon}
                <h3 className="text-xl font-bold text-gray-900">
                  {steps.find(s => s.id === expandedImage)?.title}
                </h3>
              </div>
              <p className="text-gray-600">
                {steps.find(s => s.id === expandedImage)?.description}
              </p>
            </div>
          </div>
        </div>
      )}

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
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default GradCAMComponent;