import React, { useState, useEffect } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from 'recharts';
import { FaTrophy, FaChartLine, FaInfoCircle } from 'react-icons/fa';

const ModelComparisonRecharts = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [activeComparisonMetric, setActiveComparisonMetric] = useState('sensitivity');

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  // Radar Chart Data - from notebook test results
  const radarData = [
    { metric: 'Sensitivity', tuned: 86.7, baseline: 67.6 },
    { metric: 'Specificity', tuned: 56.4, baseline: 85.5 },
    { metric: 'Accuracy', tuned: 69.2, baseline: 77.9 },
    { metric: 'Precision', tuned: 59.2, baseline: 74.3 },
    { metric: 'F1-Score', tuned: 70.3, baseline: 71.6 },
    { metric: 'AUC-ROC', tuned: 83.4, baseline: 83.1 }
  ];

  // Detailed Comparison Data - using actual notebook results
  const comparisonData = [
    { model: 'Fine-tuned Model (Ours)', sensitivity: 86.7, specificity: 56.4, accuracy: 69.2, auc: 83.4, f1: 70.3, color: '#3b82f6' },
    { model: 'Baseline Model', sensitivity: 67.6, specificity: 85.5, accuracy: 77.9, auc: 83.1, f1: 71.6, color: '#9ca3af' }
  ];

  const metricOptions = [
    { key: 'sensitivity', label: 'Sensitivity', color: '#ef4444' },
    { key: 'specificity', label: 'Specificity', color: '#3b82f6' },
    { key: 'accuracy', label: 'Accuracy', color: '#10b981' },
    { key: 'auc', label: 'AUC-ROC', color: '#8b5cf6' },
    { key: 'f1', label: 'F1-Score', color: '#f59e0b' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800 text-xs sm:text-sm">{label}</p>
          {payload.map((p, idx) => (
            <p key={idx} className="text-[10px] sm:text-xs" style={{ color: p.color }}>
              {p.name}: {p.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getRadarOuterRadius = () => {
    if (isMobile) return '70%';
    if (isTablet) return '75%';
    return '80%';
  };

  const getBarChartMargin = () => {
    if (isMobile) {
      return { top: 20, right: 20, left: 80, bottom: 20 };
    }
    return { top: 20, right: 30, left: 120, bottom: 20 };
  };

  // Mobile comparison chart
  const renderMobileComparison = () => {
    const currentMetric = metricOptions.find(m => m.key === activeComparisonMetric);
    const metricData = comparisonData.map(item => ({
      model: item.model === 'Fine-tuned Model (Ours)' ? 'Ours' : 'Baseline',
      value: item[currentMetric.key],
      color: item.color,
      fullModel: item.model
    }));

    return (
      <div className="mt-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {metricOptions.map((metric) => (
            <button
              key={metric.key}
              onClick={() => setActiveComparisonMetric(metric.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                activeComparisonMetric === metric.key
                  ? 'text-white shadow-md'
                  : 'bg-gray-100 text-gray-600'
              }`}
              style={{
                backgroundColor: activeComparisonMetric === metric.key ? metric.color : undefined
              }}
            >
              {metric.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {metricData.map((item, idx) => (
            <div key={idx} className="bg-gray-50 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-800 text-sm">{item.model}</span>
                <span className="text-sm font-bold" style={{ color: item.color }}>
                  {item.value}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${item.value}%`, backgroundColor: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDesktopBarChart = () => {
    return (
      <div className="w-full h-[350px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={comparisonData} 
            layout="vertical" 
            margin={getBarChartMargin()}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              type="number" 
              domain={[0, 100]} 
              tick={{ fill: '#6b7280', fontSize: isMobile ? 10 : 11 }}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis 
              type="category" 
              dataKey="model" 
              tick={{ fill: '#6b7280', fontSize: isMobile ? 10 : 11 }}
              width={isMobile ? 100 : 120}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={isMobile ? 30 : 36} 
              wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }}
            />
            <Bar dataKey="sensitivity" name="Sensitivity" fill="#ef4444" radius={[0, 4, 4, 0]} />
            <Bar dataKey="specificity" name="Specificity" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            <Bar dataKey="accuracy" name="Accuracy" fill="#10b981" radius={[0, 4, 4, 0]} />
            <Bar dataKey="auc" name="AUC-ROC" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            <Bar dataKey="f1" name="F1-Score" fill="#f59e0b" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div>
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Model Performance Comparison</h3>
          <p className="text-xs sm:text-sm text-gray-500">Baseline vs Fine-tuned Model (Threshold = 0.35)</p>
        </div>
        <FaChartLine className="text-xl sm:text-2xl text-blue-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Radar Chart Section */}
        <div>
          <div className="w-full" style={{ height: isMobile ? '280px' : isTablet ? '320px' : '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius={getRadarOuterRadius()} data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis 
                  dataKey="metric" 
                  tick={{ fill: '#6b7280', fontSize: isMobile ? 9 : 11 }}
                />
                <PolarRadiusAxis 
                  angle={30} 
                  domain={[0, 100]} 
                  tick={{ fill: '#6b7280', fontSize: isMobile ? 8 : 10 }}
                  tickFormatter={(value) => isMobile ? `${value}` : `${value}%`}
                />
                <Radar
                  name="Fine-tuned Model"
                  dataKey="tuned"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name="Baseline Model"
                  dataKey="baseline"
                  stroke="#9ca3af"
                  fill="#9ca3af"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={isMobile ? 40 : 50} 
                  wrapperStyle={{ fontSize: isMobile ? '9px' : '11px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-3 sm:mt-4 p-2 sm:p-3 rounded-lg bg-blue-50">
            <div className="flex items-start gap-1.5 sm:gap-2 text-blue-700">
              <FaInfoCircle className="text-xs sm:text-sm flex-shrink-0 mt-0.5" />
              <span className="text-[10px] sm:text-xs md:text-sm">
                Fine-tuned model improves sensitivity from 67.6% to 86.7% (+19.1%) at threshold 0.35
              </span>
            </div>
          </div>
        </div>

        {/* Bar Chart Comparison */}
        <div>
          {isMobile && renderMobileComparison()}
          {!isMobile && renderDesktopBarChart()}
        </div>
      </div>

      {/* Key Achievements - from notebook */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-3 sm:p-4 border border-blue-200">
          <FaTrophy className="text-lg sm:text-2xl text-yellow-500 mb-1 sm:mb-2" />
          <p className="text-base sm:text-lg font-bold text-gray-800">+19.1%</p>
          <p className="text-xs sm:text-sm text-gray-600">Sensitivity Improvement</p>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">67.6% → 86.7% after fine-tuning</p>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 sm:p-4 border border-green-200">
          <FaTrophy className="text-lg sm:text-2xl text-yellow-500 mb-1 sm:mb-2" />
          <p className="text-base sm:text-lg font-bold text-gray-800">1,093 / 1,260</p>
          <p className="text-xs sm:text-sm text-gray-600">Cancers Detected</p>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">86.7% of malignant cases identified</p>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 sm:p-4 border border-purple-200 sm:col-span-2 lg:col-span-1">
          <FaTrophy className="text-lg sm:text-2xl text-yellow-500 mb-1 sm:mb-2" />
          <p className="text-base sm:text-lg font-bold text-gray-800">AUC: 0.834</p>
          <p className="text-xs sm:text-sm text-gray-600">Model Discrimination</p>
          <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1">Good discrimination ability</p>
        </div>
      </div>

      {isMobile && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">Tap metric buttons above to compare different performance measures</p>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {metricOptions.map((metric) => (
              <div key={metric.key} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: metric.color }} />
                <span className="text-[9px] text-gray-500">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelComparisonRecharts;