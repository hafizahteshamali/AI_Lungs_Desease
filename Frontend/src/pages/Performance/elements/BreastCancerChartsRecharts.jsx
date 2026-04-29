import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Scatter
} from 'recharts';
import { 
  FaChartLine, 
  FaChartArea, 
  FaChartBar as FaChartBarIcon, 
  FaInfoCircle, 
  FaEye,
  FaMousePointer,
  FaExpand,
  FaCompress
} from 'react-icons/fa';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const BreastCancerChartsRecharts = () => {
  const [chartType, setChartType] = useState('roc');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [hoveredDataPoint, setHoveredDataPoint] = useState(null);
  const [expandedChart, setExpandedChart] = useState(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  // ROC Curve Data
  const rocData = [
    { fpr: 0.0000, tpr: 0.0000, label: 'Start' },
    { fpr: 0.0213, tpr: 0.5159, label: 'Point 1' },
    { fpr: 0.0456, tpr: 0.6032, label: 'Point 2' },
    { fpr: 0.0789, tpr: 0.6746, label: 'Point 3' },
    { fpr: 0.1123, tpr: 0.7302, label: 'Point 4' },
    { fpr: 0.1567, tpr: 0.7778, label: 'Point 5' },
    { fpr: 0.2012, tpr: 0.8095, label: 'Point 6' },
    { fpr: 0.2678, tpr: 0.8413, label: 'Point 7' },
    { fpr: 0.3345, tpr: 0.8651, label: 'Point 8' },
    { fpr: 0.4012, tpr: 0.8810, label: 'Point 9' },
    { fpr: 0.4678, tpr: 0.8968, label: 'Point 10' },
    { fpr: 0.5345, tpr: 0.9048, label: 'Point 11' },
    { fpr: 0.5678, tpr: 0.8675, label: 'Clinical Threshold', isThreshold: true },
    { fpr: 0.6012, tpr: 0.9206, label: 'Point 12' },
    { fpr: 0.6678, tpr: 0.9286, label: 'Point 13' },
    { fpr: 0.7345, tpr: 0.9365, label: 'Point 14' },
    { fpr: 0.8012, tpr: 0.9444, label: 'Point 15' },
    { fpr: 0.8678, tpr: 0.9524, label: 'Point 16' },
    { fpr: 0.9345, tpr: 0.9683, label: 'Point 17' },
    { fpr: 1.0000, tpr: 1.0000, label: 'End' }
  ];

  // Precision-Recall Curve Data
  const prData = [
    { recall: 0.0000, precision: 1.0000, label: 'Start' },
    { recall: 0.5159, precision: 0.9246, label: 'Point 1' },
    { recall: 0.6032, precision: 0.8952, label: 'Point 2' },
    { recall: 0.6746, precision: 0.8658, label: 'Point 3' },
    { recall: 0.7302, precision: 0.8412, label: 'Point 4' },
    { recall: 0.7778, precision: 0.8215, label: 'Point 5' },
    { recall: 0.8095, precision: 0.8023, label: 'Point 6' },
    { recall: 0.8413, precision: 0.7834, label: 'Point 7' },
    { recall: 0.8651, precision: 0.7650, label: 'Point 8' },
    { recall: 0.8675, precision: 0.5915, label: 'Clinical Threshold', isThreshold: true },
    { recall: 0.8810, precision: 0.7489, label: 'Point 9' },
    { recall: 0.8968, precision: 0.7342, label: 'Point 10' },
    { recall: 0.9048, precision: 0.7208, label: 'Point 11' },
    { recall: 0.9206, precision: 0.7087, label: 'Point 12' },
    { recall: 0.9286, precision: 0.6980, label: 'Point 13' },
    { recall: 0.9365, precision: 0.6885, label: 'Point 14' },
    { recall: 0.9444, precision: 0.6802, label: 'Point 15' },
    { recall: 0.9524, precision: 0.6730, label: 'Point 16' },
    { recall: 0.9683, precision: 0.6670, label: 'Point 17' },
    { recall: 1.0000, precision: 0.6619, label: 'End' }
  ];

  // Confusion Matrix Data
  const confusionData = [
    { name: 'True Negatives', value: 978, color: '#10b981', actual: 'Benign', predicted: 'Benign', description: 'Correctly identified as benign' },
    { name: 'False Positives', value: 755, color: '#ef4444', actual: 'Benign', predicted: 'Malignant', description: 'Benign incorrectly flagged as cancer' },
    { name: 'False Negatives', value: 167, color: '#f59e0b', actual: 'Malignant', predicted: 'Benign', description: 'Cancer cases missed' },
    { name: 'True Positives', value: 1093, color: '#3b82f6', actual: 'Malignant', predicted: 'Malignant', description: 'Cancer correctly identified' }
  ];

  // Threshold Analysis Data
  const thresholdData = [
    { threshold: 0.25, sensitivity: 94.8, specificity: 35.1, accuracy: 60.3 },
    { threshold: 0.30, sensitivity: 91.0, specificity: 44.5, accuracy: 64.1 },
    { threshold: 0.35, sensitivity: 86.7, specificity: 56.4, accuracy: 69.2, isClinical: true },
    { threshold: 0.40, sensitivity: 80.9, specificity: 69.1, accuracy: 74.0 },
    { threshold: 0.45, sensitivity: 75.2, specificity: 76.8, accuracy: 76.1 },
    { threshold: 0.50, sensitivity: 72.4, specificity: 80.7, accuracy: 77.2 },
    { threshold: 0.5277, sensitivity: 71.2, specificity: 82.1, accuracy: 77.5, isOptimal: true },
    { threshold: 0.55, sensitivity: 68.9, specificity: 83.5, accuracy: 77.1 },
    { threshold: 0.60, sensitivity: 64.3, specificity: 86.2, accuracy: 76.0 }
  ];

  // Metrics Comparison Data
  const metricsComparisonData = [
    { metric: 'Sensitivity', before: 67.6, after: 86.7, target: 80.0, improved: true, change: '+19.1%' },
    { metric: 'Specificity', before: 85.5, after: 56.4, target: 80.0, improved: false, change: '-29.1%' },
    { metric: 'Accuracy', before: 77.9, after: 69.2, target: 85.0, improved: false, change: '-8.7%' },
    { metric: 'Precision', before: 74.3, after: 59.2, target: 80.0, improved: false, change: '-15.1%' },
    { metric: 'F1-Score', before: 71.6, after: 70.3, target: 80.0, improved: false, change: '-1.3%' }
  ];

  // Probability Distribution Data
  const probabilityDataFull = [
    { range: '0-10%', benign: 245, malignant: 5, total: 250 },
    { range: '10-20%', benign: 189, malignant: 12, total: 201 },
    { range: '20-30%', benign: 156, malignant: 18, total: 174 },
    { range: '30-40%', benign: 147, malignant: 28, total: 175 },
    { range: '40-50%', benign: 112, malignant: 34, total: 146 },
    { range: '50-60%', benign: 98, malignant: 45, total: 143 },
    { range: '60-70%', benign: 76, malignant: 67, total: 143 },
    { range: '70-80%', benign: 52, malignant: 89, total: 141 },
    { range: '80-90%', benign: 31, malignant: 124, total: 155 },
    { range: '90-100%', benign: 18, malignant: 189, total: 207 }
  ];

  const probabilityData = isMobile ? probabilityDataFull.slice(0, 6) : probabilityDataFull;

  const chartTypes = [
    { id: 'roc', label: 'ROC Curve', icon: <FaChartLine className="text-sm" />, color: 'from-blue-600 to-purple-600', description: 'Model discrimination ability' },
    { id: 'pr', label: 'PR Curve', icon: <FaChartArea className="text-sm" />, color: 'from-green-600 to-teal-600', description: 'Precision-recall trade-off' },
    { id: 'threshold', label: 'Threshold', icon: <FaChartBarIcon className="text-sm" />, color: 'from-orange-600 to-red-600', description: 'Decision threshold analysis' },
    { id: 'distribution', label: 'Distribution', icon: <FaChartBarIcon className="text-sm" />, color: 'from-purple-600 to-pink-600', description: 'Probability distribution' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 sm:p-4 rounded-xl shadow-2xl border border-gray-100 animate-fadeIn z-50">
          <p className="font-semibold text-gray-800 text-xs sm:text-sm mb-2">{label}</p>
          {payload.map((p, idx) => (
            <div key={idx} className="flex items-center justify-between gap-3 sm:gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-gray-600">{p.name}:</span>
              </div>
              <span className="font-mono font-semibold" style={{ color: p.color }}>
                {typeof p.value === 'number' ? p.value.toFixed(3) : p.value}%
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const getImprovementStatus = (improved) => {
    if (improved) {
      return { icon: <FiTrendingUp className="text-green-500" />, text: 'Improved', color: 'text-green-600' };
    }
    return { icon: <FiTrendingDown className="text-red-500" />, text: 'Decreased', color: 'text-red-600' };
  };

  const getChartMargin = () => {
    if (isMobile) {
      return { top: 20, right: 10, left: 10, bottom: 30 };
    }
    return { top: 30, right: 30, left: 30, bottom: 40 };
  };

  const CustomDot = ({ cx, cy, payload }) => {
    if (payload.isThreshold) {
      return (
        <g>
          <circle cx={cx} cy={cy} r={6} fill="#ef4444" stroke="#fff" strokeWidth={2} />
          <circle cx={cx} cy={cy} r={10} fill="#ef4444" fillOpacity={0.3} />
        </g>
      );
    }
    if (payload.isOptimal) {
      return (
        <g>
          <circle cx={cx} cy={cy} r={5} fill="#10b981" stroke="#fff" strokeWidth={2} />
          <circle cx={cx} cy={cy} r={8} fill="#10b981" fillOpacity={0.3} />
        </g>
      );
    }
    return <circle cx={cx} cy={cy} r={3} fill="#888" stroke="#fff" strokeWidth={1} />;
  };

  return (
    <div className="mb-6 sm:mb-8">
      {/* Chart Type Selector */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Interactive Performance Charts</h3>
            <p className="text-xs sm:text-sm text-gray-500">Click on any chart element for detailed insights</p>
          </div>
          
          {/* Desktop Chart Type Selector */}
          <div className="hidden sm:flex flex-wrap gap-2">
            {chartTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setChartType(type.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  chartType === type.id
                    ? `bg-gradient-to-r ${type.color} text-white shadow-md`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type.icon}
                <span>{type.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Dropdown Selector */}
          <div className="sm:hidden w-full">
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {chartTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Charts Container */}
        <div className="relative">
          <div 
            className="w-full transition-all duration-300 cursor-pointer"
            style={{ height: isMobile ? '320px' : isTablet ? '400px' : '450px' }}
            onClick={() => setExpandedChart(expandedChart === chartType ? null : chartType)}
          >
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'roc' ? (
                <ComposedChart data={rocData} margin={getChartMargin()}>
                  <defs>
                    <linearGradient id="rocGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.1} />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="fpr" 
                    label={!isMobile ? { value: 'False Positive Rate', position: 'bottom', offset: 10, fontSize: 12 } : undefined}
                    tick={{ fontSize: isMobile ? 9 : 11 }}
                    domain={[0, 1]}
                    ticks={isMobile ? [0, 0.5, 1] : [0, 0.2, 0.4, 0.6, 0.8, 1]}
                    height={isMobile ? 35 : 45}
                    angle={isMobile ? -45 : 0}
                    textAnchor={isMobile ? "end" : "middle"}
                    interval={0}
                  />
                  <YAxis 
                    label={!isMobile ? { value: 'True Positive Rate', angle: -90, position: 'insideLeft', offset: 5, fontSize: 12 } : undefined}
                    tick={{ fontSize: isMobile ? 9 : 11 }}
                    domain={[0, 1]}
                    ticks={isMobile ? [0, 0.5, 1] : [0, 0.2, 0.4, 0.6, 0.8, 1]}
                    width={isMobile ? 35 : 45}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }} />
                  <Legend verticalAlign="top" height={isMobile ? 36 : 40} wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} />
                  <Area 
                    type="monotone" 
                    dataKey="tpr" 
                    stroke="none" 
                    fill="url(#rocGradient)" 
                    fillOpacity={0.5}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="tpr" 
                    stroke="#3b82f6" 
                    strokeWidth={2.5}
                    name="ROC Curve (AUC = 0.834)"
                    dot={<CustomDot />}
                    activeDot={{ r: 6, onClick: (data) => setHoveredDataPoint(data.payload) }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="fpr" 
                    stroke="#9ca3af" 
                    strokeWidth={1.5}
                    strokeDasharray="5 5"
                    name="Random Classifier"
                    dot={false}
                  />
                  <Scatter 
                    data={[{ fpr: 0.4357, tpr: 0.8675 }]} 
                    fill="#ef4444" 
                    name="Clinical Threshold (0.35)"
                  >
                    <Cell fill="#ef4444" />
                  </Scatter>
                </ComposedChart>
              ) : chartType === 'pr' ? (
                <ComposedChart data={prData} margin={getChartMargin()}>
                  <defs>
                    <linearGradient id="prGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.1} />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="recall" 
                    label={!isMobile ? { value: 'Recall', position: 'bottom', offset: 10, fontSize: 12 } : undefined}
                    tick={{ fontSize: isMobile ? 9 : 11 }}
                    domain={[0, 1]}
                    ticks={isMobile ? [0, 0.5, 1] : [0, 0.2, 0.4, 0.6, 0.8, 1]}
                    height={isMobile ? 35 : 45}
                    angle={isMobile ? -45 : 0}
                    textAnchor={isMobile ? "end" : "middle"}
                    interval={0}
                  />
                  <YAxis 
                    label={!isMobile ? { value: 'Precision', angle: -90, position: 'insideLeft', offset: 5, fontSize: 12 } : undefined}
                    tick={{ fontSize: isMobile ? 9 : 11 }}
                    domain={[0, 1]}
                    ticks={isMobile ? [0, 0.5, 1] : [0, 0.2, 0.4, 0.6, 0.8, 1]}
                    width={isMobile ? 35 : 45}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }} />
                  <Legend verticalAlign="top" height={isMobile ? 36 : 40} wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} />
                  <Area 
                    type="monotone" 
                    dataKey="precision" 
                    stroke="none" 
                    fill="url(#prGradient)" 
                    fillOpacity={0.5}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="precision" 
                    stroke="#10b981" 
                    strokeWidth={2.5}
                    name="PR Curve (AP = 0.703)"
                    dot={<CustomDot />}
                    activeDot={{ r: 6, onClick: (data) => setHoveredDataPoint(data.payload) }}
                  />
                  <Scatter 
                    data={[{ recall: 0.8675, precision: 0.5915 }]} 
                    fill="#ef4444" 
                    name="Clinical Threshold (0.35)"
                  >
                    <Cell fill="#ef4444" />
                  </Scatter>
                </ComposedChart>
              ) : chartType === 'threshold' ? (
                <LineChart data={thresholdData} margin={getChartMargin()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="threshold" 
                    label={!isMobile ? { value: 'Decision Threshold', position: 'bottom', offset: 10, fontSize: 12 } : undefined}
                    tick={{ fontSize: isMobile ? 9 : 11 }}
                    domain={[0.2, 0.6]}
                    ticks={isMobile ? [0.25, 0.35, 0.45, 0.55] : [0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6]}
                    tickFormatter={(value) => value.toFixed(2)}
                    height={isMobile ? 35 : 45}
                    angle={isMobile ? -45 : 0}
                    textAnchor={isMobile ? "end" : "middle"}
                    interval={0}
                  />
                  <YAxis 
                    label={!isMobile ? { value: 'Percentage (%)', angle: -90, position: 'insideLeft', offset: 5, fontSize: 12 } : undefined}
                    tick={{ fontSize: isMobile ? 9 : 11 }}
                    domain={[30, 100]}
                    width={isMobile ? 40 : 50}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }} />
                  <Legend verticalAlign="top" height={isMobile ? 36 : 40} wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="sensitivity" 
                    stroke="#ef4444" 
                    strokeWidth={2.5}
                    name="Sensitivity"
                    dot={<CustomDot />}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="specificity" 
                    stroke="#3b82f6" 
                    strokeWidth={2.5}
                    name="Specificity"
                    dot={<CustomDot />}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="accuracy" 
                    stroke="#10b981" 
                    strokeWidth={2.5}
                    name="Accuracy"
                    dot={<CustomDot />}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              ) : (
                <BarChart data={probabilityData} margin={{ ...getChartMargin(), bottom: isMobile ? 60 : 70 }} barGap={0}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="range" 
                    label={!isMobile ? { value: 'Probability Range', position: 'bottom', offset: 15, fontSize: 12 } : undefined}
                    tick={{ fontSize: isMobile ? 9 : 11, angle: isMobile ? -45 : 0, textAnchor: isMobile ? "end" : "middle" }}
                    height={isMobile ? 60 : 70}
                    interval={0}
                  />
                  <YAxis 
                    label={!isMobile ? { value: 'Number of Patients', angle: -90, position: 'insideLeft', offset: 5, fontSize: 12 } : undefined}
                    tick={{ fontSize: isMobile ? 9 : 11 }}
                    width={isMobile ? 40 : 50}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9' }} />
                  <Legend verticalAlign="top" height={isMobile ? 36 : 40} wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} />
                  <Bar dataKey="benign" fill="#10b981" name="Benign Cases" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="malignant" fill="#ef4444" name="Malignant Cases" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
          
          {/* Expand/Collapse Hint */}
          <div className="absolute bottom-2 right-2 opacity-50 hover:opacity-100 transition-opacity">
            <button 
              onClick={() => setExpandedChart(expandedChart === chartType ? null : chartType)}
              className="text-gray-400 hover:text-purple-500 transition-colors"
            >
              {expandedChart === chartType ? <FaCompress size={14} /> : <FaExpand size={14} />}
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-4 p-2 sm:p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-start gap-2 text-gray-700">
            <FaInfoCircle className="text-xs sm:text-sm flex-shrink-0 mt-0.5" />
            <p className="text-[10px] sm:text-xs md:text-sm">
              {chartType === 'roc' && "AUC-ROC: 0.834 - Good discrimination ability. The clinical threshold (0.35) prioritizes sensitivity."}
              {chartType === 'pr' && "Average Precision: 0.703 - Moderate precision-recall trade-off at clinical threshold."}
              {chartType === 'threshold' && "Clinical threshold: 0.35 - Prioritizes early cancer detection (86.7% sensitivity)."}
              {chartType === 'distribution' && "Malignant cases (1,260) show higher probability scores than benign cases (1,733)."}
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Comparison Section */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Metrics Improvement Analysis</h3>
            <p className="text-xs sm:text-sm text-gray-500">Before vs After Fine-tuning Comparison</p>
          </div>
          <div className="flex gap-2 sm:gap-3 text-[10px] sm:text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-400 rounded"></div>
              <span>Before</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded"></div>
              <span>After</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded"></div>
              <span>Target</span>
            </div>
          </div>
        </div>
        
        {/* Metrics Cards for Mobile */}
        <div className="sm:hidden space-y-3">
          {metricsComparisonData.map((metric) => {
            const status = getImprovementStatus(metric.improved);
            return (
              <div key={metric.metric} className="bg-gray-50 rounded-lg p-3 hover:shadow-md transition-all cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-800 text-sm">{metric.metric}</span>
                  <div className="flex items-center gap-1">
                    {status.icon}
                    <span className={`text-xs ${status.color}`}>{metric.change}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Before: {metric.before}%</span>
                      <span>After: {metric.after}%</span>
                    </div>
                    <div className="relative w-full h-2 bg-gray-200 rounded-full">
                      <div className="absolute h-full bg-gray-400 rounded-full" style={{ width: `${metric.before}%` }} />
                      <div 
                        className="absolute h-full bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${metric.after}%`, boxShadow: '0 0 4px rgba(59,130,246,0.5)' }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Target: {metric.target}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-green-500 rounded-full transition-all duration-500"
                        style={{ width: `${metric.target}%`, opacity: 0.7 }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Bar Chart */}
        <div className="hidden sm:block w-full h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={metricsComparisonData} 
              layout="vertical" 
              margin={{ top: 20, right: 30, left: 100, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                type="number" 
                label={{ value: 'Percentage (%)', position: 'bottom', offset: 10 }}
                domain={[0, 100]}
                tick={{ fontSize: 11 }}
              />
              <YAxis 
                type="category" 
                dataKey="metric" 
                tick={{ fontSize: 11 }}
                width={90}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f1f5f9' }} />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="before" fill="#9ca3af" name="Before Fine-tuning" radius={[0, 4, 4, 0]} />
              <Bar dataKey="after" fill="#3b82f6" name="After Fine-tuning" radius={[0, 4, 4, 0]} />
              <Bar dataKey="target" fill="#10b981" name="Target (80%+)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Confusion Matrix - Enhanced Interactive */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Confusion Matrix Analysis</h3>
            <p className="text-xs sm:text-sm text-gray-500">Test Set Results (N=2,993 patients)</p>
          </div>
          <FaEye className="text-xl sm:text-2xl text-blue-500" />
        </div>
        
        <div className="w-full" style={{ height: isMobile ? '300px' : isTablet ? '380px' : '420px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <Pie
                data={confusionData}
                cx="50%"
                cy="45%"
                innerRadius={isMobile ? 45 : isTablet ? 65 : 85}
                outerRadius={isMobile ? 75 : isTablet ? 105 : 135}
                paddingAngle={3}
                dataKey="value"
                label={({ name, percent }) => {
                  if (isMobile) {
                    return `${(percent * 100).toFixed(0)}%`;
                  }
                  return `${name}\n${(percent * 100).toFixed(1)}%`;
                }}
                labelLine={!isMobile}
                onClick={(data) => setHoveredDataPoint(data)}
              >
                {confusionData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    stroke="#fff" 
                    strokeWidth={2}
                    className="cursor-pointer transition-all duration-300 hover:opacity-80"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={isMobile ? 45 : 55} 
                wrapperStyle={{ fontSize: isMobile ? '9px' : '11px', cursor: 'pointer' }}
                onClick={(data) => setHoveredDataPoint(confusionData.find(d => d.name === data.value))}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Metrics Grid - Interactive */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-4 sm:mt-6">
          {confusionData.map((item, idx) => (
            <div 
              key={idx}
              className={`text-center p-2 sm:p-3 rounded-lg transition-all duration-300 cursor-pointer hover:shadow-md ${
                item.name === 'True Negatives' ? 'bg-green-50 hover:bg-green-100' :
                item.name === 'False Positives' ? 'bg-red-50 hover:bg-red-100' :
                item.name === 'False Negatives' ? 'bg-yellow-50 hover:bg-yellow-100' :
                'bg-blue-50 hover:bg-blue-100'
              }`}
              onMouseEnter={() => setHoveredDataPoint(item)}
              onMouseLeave={() => setHoveredDataPoint(null)}
            >
              <p className={`text-lg sm:text-xl md:text-2xl font-bold ${
                item.name === 'True Negatives' ? 'text-green-700' :
                item.name === 'False Positives' ? 'text-red-700' :
                item.name === 'False Negatives' ? 'text-yellow-700' :
                'text-blue-700'
              }`}>{item.value}</p>
              <p className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-600">{item.name}</p>
              <p className="hidden sm:block text-[9px] text-gray-400 mt-0.5">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .recharts-wrapper {
          cursor: pointer;
        }
        .recharts-default-legend {
          cursor: pointer !important;
        }
      `}</style>
    </div>
  );
};

export default BreastCancerChartsRecharts;