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
  FaEye
} from 'react-icons/fa';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const BreastCancerChartsRecharts = () => {
  const [chartType, setChartType] = useState('roc');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  // ROC Curve Data
  const rocData = [
    { fpr: 0.0000, tpr: 0.0000 },
    { fpr: 0.0213, tpr: 0.5159 },
    { fpr: 0.0456, tpr: 0.6032 },
    { fpr: 0.0789, tpr: 0.6746 },
    { fpr: 0.1123, tpr: 0.7302 },
    { fpr: 0.1567, tpr: 0.7778 },
    { fpr: 0.2012, tpr: 0.8095 },
    { fpr: 0.2678, tpr: 0.8413 },
    { fpr: 0.3345, tpr: 0.8651 },
    { fpr: 0.4012, tpr: 0.8810 },
    { fpr: 0.4678, tpr: 0.8968 },
    { fpr: 0.5345, tpr: 0.9048 },
    { fpr: 0.5678, tpr: 0.8675 },
    { fpr: 0.6012, tpr: 0.9206 },
    { fpr: 0.6678, tpr: 0.9286 },
    { fpr: 0.7345, tpr: 0.9365 },
    { fpr: 0.8012, tpr: 0.9444 },
    { fpr: 0.8678, tpr: 0.9524 },
    { fpr: 0.9345, tpr: 0.9683 },
    { fpr: 1.0000, tpr: 1.0000 }
  ];

  // Precision-Recall Curve Data
  const prData = [
    { recall: 0.0000, precision: 1.0000 },
    { recall: 0.5159, precision: 0.9246 },
    { recall: 0.6032, precision: 0.8952 },
    { recall: 0.6746, precision: 0.8658 },
    { recall: 0.7302, precision: 0.8412 },
    { recall: 0.7778, precision: 0.8215 },
    { recall: 0.8095, precision: 0.8023 },
    { recall: 0.8413, precision: 0.7834 },
    { recall: 0.8651, precision: 0.7650 },
    { recall: 0.8675, precision: 0.5915 },
    { recall: 0.8810, precision: 0.7489 },
    { recall: 0.8968, precision: 0.7342 },
    { recall: 0.9048, precision: 0.7208 },
    { recall: 0.9206, precision: 0.7087 },
    { recall: 0.9286, precision: 0.6980 },
    { recall: 0.9365, precision: 0.6885 },
    { recall: 0.9444, precision: 0.6802 },
    { recall: 0.9524, precision: 0.6730 },
    { recall: 0.9683, precision: 0.6670 },
    { recall: 1.0000, precision: 0.6619 }
  ];

  // Confusion Matrix Data
  const confusionData = [
    { name: 'True Negatives', value: 978, color: '#10b981', actual: 'Benign', predicted: 'Benign' },
    { name: 'False Positives', value: 755, color: '#ef4444', actual: 'Benign', predicted: 'Malignant' },
    { name: 'False Negatives', value: 167, color: '#f59e0b', actual: 'Malignant', predicted: 'Benign' },
    { name: 'True Positives', value: 1093, color: '#3b82f6', actual: 'Malignant', predicted: 'Malignant' }
  ];

  // Threshold Analysis Data
  const thresholdData = [
    { threshold: 0.25, sensitivity: 94.8, specificity: 35.1, accuracy: 60.3 },
    { threshold: 0.30, sensitivity: 91.0, specificity: 44.5, accuracy: 64.1 },
    { threshold: 0.35, sensitivity: 86.7, specificity: 56.4, accuracy: 69.2 },
    { threshold: 0.40, sensitivity: 80.9, specificity: 69.1, accuracy: 74.0 },
    { threshold: 0.45, sensitivity: 75.2, specificity: 76.8, accuracy: 76.1 },
    { threshold: 0.50, sensitivity: 72.4, specificity: 80.7, accuracy: 77.2 },
    { threshold: 0.5277, sensitivity: 71.2, specificity: 82.1, accuracy: 77.5 },
    { threshold: 0.55, sensitivity: 68.9, specificity: 83.5, accuracy: 77.1 },
    { threshold: 0.60, sensitivity: 64.3, specificity: 86.2, accuracy: 76.0 }
  ];

  // Metrics Comparison Data
  const metricsComparisonData = [
    { metric: 'Sensitivity', before: 67.6, after: 86.7, target: 80.0, improved: true },
    { metric: 'Specificity', before: 85.5, after: 56.4, target: 80.0, improved: false },
    { metric: 'Accuracy', before: 77.9, after: 69.2, target: 85.0, improved: false },
    { metric: 'Precision', before: 74.3, after: 59.2, target: 80.0, improved: false },
    { metric: 'F1-Score', before: 71.6, after: 70.3, target: 80.0, improved: false }
  ];

  // Probability Distribution Data - Truncated for mobile
  const probabilityDataFull = [
    { range: '0-10%', benign: 245, malignant: 5 },
    { range: '10-20%', benign: 189, malignant: 12 },
    { range: '20-30%', benign: 156, malignant: 18 },
    { range: '30-40%', benign: 147, malignant: 28 },
    { range: '40-50%', benign: 112, malignant: 34 },
    { range: '50-60%', benign: 98, malignant: 45 },
    { range: '60-70%', benign: 76, malignant: 67 },
    { range: '70-80%', benign: 52, malignant: 89 },
    { range: '80-90%', benign: 31, malignant: 124 },
    { range: '90-100%', benign: 18, malignant: 189 }
  ];

  // Use truncated data for mobile to prevent overcrowding
  const probabilityData = isMobile ? probabilityDataFull.slice(0, 6) : probabilityDataFull;

  const chartTypes = [
    { id: 'roc', label: 'ROC Curve', icon: <FaChartLine className="text-sm" />, color: 'from-blue-600 to-purple-600' },
    { id: 'pr', label: 'PR Curve', icon: <FaChartArea className="text-sm" />, color: 'from-green-600 to-teal-600' },
    { id: 'threshold', label: 'Threshold', icon: <FaChartBarIcon className="text-sm" />, color: 'from-orange-600 to-red-600' },
    { id: 'distribution', label: 'Distribution', icon: <FaChartBarIcon className="text-sm" />, color: 'from-purple-600 to-pink-600' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 sm:p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800 text-xs sm:text-sm">{label}</p>
          {payload.map((p, idx) => (
            <p key={idx} className="text-xs" style={{ color: p.color }}>
              {p.name}: {typeof p.value === 'number' ? p.value.toFixed(3) : p.value}%
            </p>
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

  // Common margin settings based on screen size
  const getChartMargin = () => {
    if (isMobile) {
      return { top: 10, right: 5, left: 0, bottom: 10 };
    }
    return { top: 20, right: 20, left: 0, bottom: 20 };
  };

  return (
    <div className="mb-6 sm:mb-8">
      {/* Chart Type Selector */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Interactive Performance Charts</h3>
            <p className="text-xs sm:text-sm text-gray-500">Explore model performance metrics interactively</p>
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

        {/* Charts Container - Fixed height for mobile */}
        <div className="w-full" style={{ height: isMobile ? '280px' : isTablet ? '350px' : '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'roc' ? (
              <ComposedChart data={rocData} margin={getChartMargin()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="fpr" 
                  label={!isMobile ? { value: 'False Positive Rate', position: 'bottom', offset: 5, fontSize: 10 } : undefined}
                  tick={{ fontSize: isMobile ? 8 : 10 }}
                  domain={[0, 1]}
                  ticks={isMobile ? [0, 0.5, 1] : [0, 0.2, 0.4, 0.6, 0.8, 1]}
                  height={isMobile ? 25 : 40}
                  angle={isMobile ? -45 : 0}
                  textAnchor={isMobile ? "end" : "middle"}
                />
                <YAxis 
                  label={!isMobile ? { value: 'True Positive Rate', angle: -90, position: 'insideLeft', offset: -5, fontSize: 10 } : undefined}
                  tick={{ fontSize: isMobile ? 8 : 10 }}
                  domain={[0, 1]}
                  ticks={isMobile ? [0, 0.5, 1] : [0, 0.2, 0.4, 0.6, 0.8, 1]}
                  width={isMobile ? 25 : 40}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={isMobile ? 30 : 36} wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} />
                <Line 
                  type="monotone" 
                  dataKey="tpr" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name={`ROC Curve (AUC = 0.834)`}
                  dot={false}
                  activeDot={{ r: 4 }}
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
                  name="Threshold (0.35)"
                >
                  <Cell fill="#ef4444" />
                </Scatter>
              </ComposedChart>
            ) : chartType === 'pr' ? (
              <ComposedChart data={prData} margin={getChartMargin()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="recall" 
                  label={!isMobile ? { value: 'Recall', position: 'bottom', offset: 5, fontSize: 10 } : undefined}
                  tick={{ fontSize: isMobile ? 8 : 10 }}
                  domain={[0, 1]}
                  ticks={isMobile ? [0, 0.5, 1] : [0, 0.2, 0.4, 0.6, 0.8, 1]}
                  height={isMobile ? 25 : 40}
                  angle={isMobile ? -45 : 0}
                  textAnchor={isMobile ? "end" : "middle"}
                />
                <YAxis 
                  label={!isMobile ? { value: 'Precision', angle: -90, position: 'insideLeft', offset: -5, fontSize: 10 } : undefined}
                  tick={{ fontSize: isMobile ? 8 : 10 }}
                  domain={[0, 1]}
                  ticks={isMobile ? [0, 0.5, 1] : [0, 0.2, 0.4, 0.6, 0.8, 1]}
                  width={isMobile ? 25 : 40}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={isMobile ? 30 : 36} wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} />
                <Area 
                  type="monotone" 
                  dataKey="precision" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.3}
                  name="PR Curve (AP = 0.703)"
                  strokeWidth={2}
                />
                <Scatter 
                  data={[{ recall: 0.8675, precision: 0.5915 }]} 
                  fill="#ef4444" 
                  name="Threshold (0.35)"
                >
                  <Cell fill="#ef4444" />
                </Scatter>
              </ComposedChart>
            ) : chartType === 'threshold' ? (
              <LineChart data={thresholdData} margin={getChartMargin()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="threshold" 
                  label={!isMobile ? { value: 'Threshold', position: 'bottom', offset: 5, fontSize: 10 } : undefined}
                  tick={{ fontSize: isMobile ? 8 : 10 }}
                  domain={[0.2, 0.6]}
                  ticks={isMobile ? [0.25, 0.35, 0.45, 0.55] : [0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6]}
                  tickFormatter={(value) => value.toFixed(2)}
                  height={isMobile ? 25 : 40}
                  angle={isMobile ? -45 : 0}
                  textAnchor={isMobile ? "end" : "middle"}
                />
                <YAxis 
                  label={!isMobile ? { value: 'Percentage (%)', angle: -90, position: 'insideLeft', offset: -5, fontSize: 10 } : undefined}
                  tick={{ fontSize: isMobile ? 8 : 10 }}
                  domain={[30, 100]}
                  width={isMobile ? 30 : 40}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={isMobile ? 30 : 36} wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} />
                <Line 
                  type="monotone" 
                  dataKey="sensitivity" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Sensitivity"
                  dot={{ r: 2 }}
                  activeDot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="specificity" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Specificity"
                  dot={{ r: 2 }}
                  activeDot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Accuracy"
                  dot={{ r: 2 }}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            ) : (
              <BarChart data={probabilityData} margin={{ ...getChartMargin(), bottom: isMobile ? 50 : 60 }} barGap={0}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="range" 
                  label={!isMobile ? { value: 'Probability Range', position: 'bottom', offset: 15, fontSize: 10 } : undefined}
                  tick={{ fontSize: isMobile ? 8 : 10, angle: isMobile ? -45 : 0, textAnchor: isMobile ? "end" : "middle" }}
                  height={isMobile ? 50 : 60}
                  interval={0}
                />
                <YAxis 
                  label={!isMobile ? { value: 'Patients', angle: -90, position: 'insideLeft', offset: -5, fontSize: 10 } : undefined}
                  tick={{ fontSize: isMobile ? 8 : 10 }}
                  width={isMobile ? 30 : 40}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" height={isMobile ? 30 : 36} wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} />
                <Bar dataKey="benign" fill="#10b981" name="Benign" radius={[4, 4, 0, 0]} />
                <Bar dataKey="malignant" fill="#ef4444" name="Malignant" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Info Box */}
        <div className="mt-3 sm:mt-4 p-2 sm:p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-start gap-2 text-gray-700">
            <FaInfoCircle className="text-xs sm:text-sm flex-shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-[10px] sm:text-xs md:text-sm">
              {chartType === 'roc' && "AUC-ROC: 0.834 - Good discrimination ability"}
              {chartType === 'pr' && "Average Precision: 0.703 - Moderate precision-recall trade-off"}
              {chartType === 'threshold' && "Clinical threshold: 0.35 - Safety threshold for early detection"}
              {chartType === 'distribution' && "Malignant: 1,260 | Benign: 1,733 | Total: 2,993 patients"}
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
              <div key={metric.metric} className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-800 text-sm">{metric.metric}</span>
                  <div className="flex items-center gap-1">
                    {status.icon}
                    <span className={`text-xs ${status.color}`}>{status.text}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Before: {metric.before}%</span>
                      <span>After: {metric.after}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gray-400 rounded-full" style={{ width: `${metric.before}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Target: {metric.target}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${metric.after}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Bar Chart */}
        <div className="hidden sm:block w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={metricsComparisonData} 
              layout="vertical" 
              margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
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
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="before" fill="#9ca3af" name="Before Fine-tuning" radius={[0, 4, 4, 0]} />
              <Bar dataKey="after" fill="#3b82f6" name="After Fine-tuning" radius={[0, 4, 4, 0]} />
              <Bar dataKey="target" fill="#10b981" name="Target (80%+)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Confusion Matrix */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3">
          <div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Confusion Matrix</h3>
            <p className="text-xs sm:text-sm text-gray-500">Test Set Results (N=2,993 patients)</p>
          </div>
          <FaEye className="text-xl sm:text-2xl text-blue-500" />
        </div>
        
        <div className="w-full" style={{ height: isMobile ? '280px' : isTablet ? '350px' : '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <Pie
                data={confusionData}
                cx="50%"
                cy="45%"
                innerRadius={isMobile ? 40 : isTablet ? 60 : 80}
                outerRadius={isMobile ? 70 : isTablet ? 100 : 130}
                paddingAngle={3}
                dataKey="value"
                label={({ name, percent }) => {
                  if (isMobile) {
                    return `${(percent * 100).toFixed(0)}%`;
                  }
                  return `${name}\n${(percent * 100).toFixed(1)}%`;
                }}
                labelLine={!isMobile}
              >
                {confusionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={isMobile ? 40 : 50} wrapperStyle={{ fontSize: isMobile ? '9px' : '11px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-4 sm:mt-6">
          <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-700">978</p>
            <p className="text-[10px] sm:text-xs md:text-sm text-green-600 font-medium">True Negatives</p>
            <p className="hidden sm:block text-[10px] text-gray-500">Correctly identified benign</p>
          </div>
          <div className="text-center p-2 sm:p-3 bg-red-50 rounded-lg">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-red-700">755</p>
            <p className="text-[10px] sm:text-xs md:text-sm text-red-600 font-medium">False Positives</p>
            <p className="hidden sm:block text-[10px] text-gray-500">Benign flagged for review</p>
          </div>
          <div className="text-center p-2 sm:p-3 bg-yellow-50 rounded-lg">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-700">167</p>
            <p className="text-[10px] sm:text-xs md:text-sm text-yellow-600 font-medium">False Negatives</p>
            <p className="hidden sm:block text-[10px] text-gray-500">Cancers missed</p>
          </div>
          <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-700">1,093</p>
            <p className="text-[10px] sm:text-xs md:text-sm text-blue-600 font-medium">True Positives</p>
            <p className="hidden sm:block text-[10px] text-gray-500">Cancers correctly identified</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreastCancerChartsRecharts;