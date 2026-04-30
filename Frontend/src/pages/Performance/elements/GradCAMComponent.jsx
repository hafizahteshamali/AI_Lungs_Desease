// GradCAMComponent.jsx - Professional Interactive Version with All Images Visible
import React, { useState, useRef, useEffect } from 'react';
import { 
  FaBrain, 
  FaMicroscope, 
  FaExclamationTriangle, 
  FaHeartbeat, 
  FaChartLine, 
  FaExpand, 
  FaCompress,
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
  FaShieldAlt,
  FaThumbsUp,
  FaThumbsDown,
  FaChartBar,
  FaTachometerAlt
} from 'react-icons/fa';
import { GiHealthNormal, GiLungs } from 'react-icons/gi';
import { MdOutlinePrecisionManufacturing, MdRadar } from 'react-icons/md';

const GradCAMComponent = () => {
  const [expandedImage, setExpandedImage] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('attention');

  const images = [
    {
      id: 'original',
      title: "Original Mammogram",
      shortTitle: "Original",
      src: '/assets/images/original-memogram-image.png',
      alt: 'Original Mammogram',
      icon: <FaRegImage className="text-blue-500" />,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      badgeColor: "bg-blue-100 text-blue-700",
      borderColor: "border-blue-200",
      buttonGradient: "from-blue-600 to-blue-700",
      description: "Standard mammogram image showing breast tissue structure and density patterns.",
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
      src: '/assets/images/ai-attention-map-focus-area-image.png',
      alt: 'AI Attention Map - Focus Areas',
      icon: <FaBrain className="text-purple-500" />,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      badgeColor: "bg-purple-100 text-purple-700",
      borderColor: "border-purple-200",
      buttonGradient: "from-purple-600 to-purple-700",
      description: "AI attention heatmap showing regions that influenced the decision. Warmer colors indicate higher attention areas.",
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
      src: '/assets/images/precision-scan-analyzing-image.png',
      alt: 'Precision Scan Analysis',
      icon: <FaStethoscope className="text-green-500" />,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      badgeColor: "bg-green-100 text-green-700",
      borderColor: "border-green-200",
      buttonGradient: "from-green-600 to-green-700",
      description: "Overlay visualization combining original mammogram and AI attention map for clinical review.",
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

  // Get metric gradient based on value
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
      {/* Section Header */}
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

      {/* Three Column Layout - All Images Visible */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {images.map((image, idx) => (
          <div
            key={image.id}
            className={`bg-white rounded-2xl shadow-xl overflow-hidden border ${image.borderColor} transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
            onMouseEnter={() => setHoveredCard(image.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Card Header */}
            <div className={`bg-gradient-to-r ${image.bgGradient} px-5 py-4 border-b ${image.borderColor}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl bg-white shadow-sm`}>
                    {image.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{image.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {image.id === 'original' && 'Raw mammogram image'}
                      {image.id === 'attention' && 'AI focus heatmap'}
                      {image.id === 'precision' && 'Clinical overlay'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setExpandedImage(image.id)}
                  className="p-2 rounded-lg bg-white/80 hover:bg-white transition-all duration-300 hover:scale-110 shadow-sm"
                  title="Expand view"
                >
                  <FaExpand size={14} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Image Container */}
            <div className="relative bg-gray-900 overflow-hidden" style={{ minHeight: '280px' }}>
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-72 object-cover transition-transform duration-500 hover:scale-105"
                style={{ objectPosition: image.id === 'attention' ? 'center' : 'center 30%' }}
              />
              
              {/* Hover Overlay with Quick Actions */}
              {hoveredCard === image.id && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3 transition-all duration-300">
                  <button 
                    onClick={() => setExpandedImage(image.id)}
                    className="bg-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
                  >
                    <FaExpand size={16} className="text-gray-800" />
                  </button>
                </div>
              )}
              
              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                <div className={`px-2.5 py-1 rounded-lg ${image.badgeColor} backdrop-blur-sm bg-opacity-90 text-xs font-semibold shadow-sm`}>
                  {image.id === 'original' && '📷 RAW'}
                  {image.id === 'attention' && '🧠 AI ANALYSIS'}
                  {image.id === 'precision' && '⚕️ CLINICAL'}
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="grid grid-cols-2 gap-3">
                {image.id === 'original' && (
                  <>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{image.metrics.quality}</p>
                      <p className="text-xs text-gray-500">Quality</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-cyan-600">{image.metrics.positioning}</p>
                      <p className="text-xs text-gray-500">Positioning</p>
                    </div>
                  </>
                )}
                {image.id === 'attention' && (
                  <>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{image.metrics.attentionScore}</p>
                      <p className="text-xs text-gray-500">Attention Score</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-pink-600">{image.metrics.confidence}</p>
                      <p className="text-xs text-gray-500">Confidence</p>
                    </div>
                  </>
                )}
                {image.id === 'precision' && (
                  <>
                    <div className="text-center">
                      <p className="text-xl font-bold text-red-600">{image.metrics.riskLevel}</p>
                      <p className="text-xs text-gray-500">Risk Level</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">{image.metrics.probability}</p>
                      <p className="text-xs text-gray-500">Probability</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Key Findings */}
            <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
              <div className="flex items-center gap-2 mb-3">
                <FaEye size={12} className="text-purple-500" />
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Key Findings</h4>
              </div>
              <ul className="space-y-1.5">
                {image.keyFindings.map((finding, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                    <span className="text-purple-500 text-xs mt-0.5">◆</span>
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Detailed Analysis (Collapsible / Toggle) */}
            <div className="px-5 py-4">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                  <div className="flex items-center gap-2">
                    <FaInfoCircle size={12} className="text-purple-500" />
                    <span>Detailed Analysis</span>
                  </div>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <ul className="mt-3 space-y-2 pl-4">
                  {image.detailedAnalysis.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="text-purple-400 text-xs">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </details>
            </div>

            {/* Action Button */}
            <div className="px-5 pb-5">
              <button 
                className={`w-full py-2.5 bg-gradient-to-r ${image.buttonGradient} text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2`}
                onClick={() => setExpandedImage(image.id)}
              >
                <FaEye size={14} />
                View Full Analysis
                <FaArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats Section */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-5 border border-pink-200 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
              <FaHeartbeat className="text-pink-500 text-lg" />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">+19.1%</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">86.7%</p>
          <p className="text-xs text-gray-500 mt-1">Sensitivity at threshold 0.35</p>
          <p className="text-xs text-gray-500 mt-2">↑ 19.1% improvement from baseline</p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <FaCheckCircle className="text-green-500 text-lg" />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">TP</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">1,093</p>
          <p className="text-xs text-gray-500 mt-1">Cancers detected / 1,260 total</p>
          <p className="text-xs text-gray-500 mt-2">86.7% true positive rate</p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-200 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <FaChartLine className="text-purple-500 text-lg" />
            </div>
            <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">Good</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">0.834</p>
          <p className="text-xs text-gray-500 mt-1">AUC-ROC Score</p>
          <p className="text-xs text-gray-500 mt-2">Excellent discrimination ability</p>
        </div>
      </div>

      {/* Clinical Recommendation Banner */}
      <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
        <div className="flex items-start gap-4 flex-wrap md:flex-nowrap">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <FaExclamationTriangle className="text-red-500 text-xl" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-800 mb-1">Clinical Recommendation</h4>
            <p className="text-sm text-gray-600">
              Based on AI analysis showing <strong className="text-red-600">86.7% malignancy probability</strong> and high attention in the upper outer quadrant, 
              immediate clinical correlation and biopsy are strongly recommended. The model's confidence score of <strong className="text-purple-600">94.7%</strong> supports this recommendation.
            </p>
          </div>
          <button className="px-5 py-2.5 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 flex-shrink-0">
            <FaShieldAlt size={14} />
            Review Case
          </button>
        </div>
      </div>

      {/* Expanded Image Modal */}
      {expandedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6"
          onClick={() => setExpandedImage(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setExpandedImage(null)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2.5 shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110"
            >
              <FaTimesCircle size={20} className="text-gray-600" />
            </button>
            <img 
              src={images.find(img => img.id === expandedImage)?.src}
              alt={images.find(img => img.id === expandedImage)?.title}
              className="w-full h-auto max-h-[70vh] object-contain bg-gray-900"
            />
            <div className="p-6 bg-white">
              <div className="flex items-center gap-3 mb-2">
                {images.find(img => img.id === expandedImage)?.icon}
                <h3 className="text-xl font-bold text-gray-900">
                  {images.find(img => img.id === expandedImage)?.title}
                </h3>
              </div>
              <p className="text-gray-600">
                {images.find(img => img.id === expandedImage)?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradCAMComponent;