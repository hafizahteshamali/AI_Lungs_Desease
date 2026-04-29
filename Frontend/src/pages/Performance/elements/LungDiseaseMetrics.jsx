import React, { useState, useMemo, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ScatterChart, Scatter, ZAxis, Cell
} from 'recharts';
import {
  FaLungs, FaChartLine,
  FaDownload,
  FaChevronUp, FaChevronDown,
  FaArrowTrendUp, FaArrowTrendDown, FaEquals,
  FaBars
} from 'react-icons/fa6';
import { GiHealthNormal } from 'react-icons/gi';
import { MdOutlinePrecisionManufacturing, MdOutlineSick } from 'react-icons/md';
import { FiEye, FiCheckCircle } from 'react-icons/fi';
import { FaInfoCircle, FaTachometerAlt, FaTimes } from 'react-icons/fa';

// --- Data extracted from the provided notebook ---
const PERFORMANCE_DATA = {
  classes: [
    'Atelectasis', 'Cardiomegaly', 'Effusion', 'Infiltration', 'Mass', 'Nodule',
    'Pneumonia', 'Pneumothorax', 'Consolidation', 'Edema', 'Emphysema',
    'Fibrosis', 'Pleural_Thickening', 'Hernia'
  ],
  metrics: {
    precision: [0.3116, 0.3767, 0.4798, 0.3456, 0.3205, 0.2352, 0.0511, 0.3184, 0.1289, 0.1589, 0.2743, 0.0618, 0.1466, 0.0216],
    recall: [0.4507, 0.3690, 0.6097, 0.5214, 0.4695, 0.1987, 0.3408, 0.5212, 0.5892, 0.4348, 0.3626, 0.4000, 0.2164, 0.1613],
    f1: [0.3684, 0.3728, 0.5370, 0.4157, 0.3810, 0.2154, 0.0888, 0.3953, 0.2115, 0.2327, 0.3123, 0.1070, 0.1748, 0.0382],
    roc_auc: [0.7940, 0.9107, 0.8830, 0.7062, 0.8343, 0.7162, 0.7580, 0.8733, 0.8041, 0.8870, 0.8858, 0.7721, 0.7734, 0.8273],
    pr_auc: [0.3058, 0.3027, 0.5316, 0.3513, 0.3280, 0.1573, 0.0396, 0.3298, 0.1353, 0.1834, 0.2659, 0.0485, 0.1043, 0.0122],
    support: [1715, 439, 1988, 3040, 903, 921, 223, 777, 684, 368, 342, 230, 513, 31],
    tp: [773, 162, 1212, 1585, 424, 183, 76, 405, 403, 160, 124, 92, 111, 5],
    fp: [1708, 268, 1314, 3001, 899, 595, 1412, 867, 2723, 847, 328, 1397, 646, 226],
    fn: [942, 277, 776, 1455, 479, 738, 147, 372, 281, 208, 218, 138, 402, 26],
    tn: [13395, 16111, 13516, 10777, 15016, 15302, 15183, 15174, 13411, 15603, 16148, 15191, 15659, 16561]
  },
  overall: {
    macro_f1: 0.2751,
    macro_auc: 0.8161,
    macro_precision: 0.2308,
    macro_recall: 0.4032,
    micro_f1: 0.3350,
    micro_precision: 0.2604,
    micro_recall: 0.4694,
    accuracy: 0.4090,
    loss: 0.0429
  },
  optimal_thresholds: [0.550, 0.550, 0.600, 0.550, 0.500, 0.500, 0.400, 0.500, 0.450, 0.500, 0.500, 0.400, 0.500, 0.350]
};

const COLORS = {
  primary: ['#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95', '#3b0764'],
  performance: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'],
  classColors: [
    '#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57', '#83a6ed', '#8dd1e1',
    '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658', '#ff8042', '#8884d8'
  ]
};

const MetricCard = ({ title, value, icon: Icon, color, subtitle, trend }) => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  
  const getColorClasses = (color) => {
    const colors = {
      purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      green: { bg: 'bg-green-100', text: 'text-green-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' }
    };
    return colors[color] || colors.purple;
  };
  
  const colorClasses = getColorClasses(color);

  return (
    <div className="relative bg-gradient-to-br from-white to-purple-50 rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-5 border border-purple-100 hover:shadow-xl transition-all duration-300 group">
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1 flex-wrap">
            {title}
            <button
              onClick={() => setShowSubtitle(!showSubtitle)}
              className="text-gray-400 hover:text-purple-500 transition flex-shrink-0"
            >
              <FaInfoCircle size={12} />
            </button>
          </p>
          <div className="flex flex-wrap items-baseline gap-1 sm:gap-2 mt-1">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 break-words">{value}</span>
            {trend && (
              <span className={`text-xs sm:text-sm font-medium flex items-center gap-0.5 ${trend.direction === 'up' ? 'text-green-600' : trend.direction === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
                {trend.direction === 'up' && <FaArrowTrendUp size={10} />}
                {trend.direction === 'down' && <FaArrowTrendDown size={10} />}
                {trend.direction === 'same' && <FaEquals size={10} />}
                {trend.value}
              </span>
            )}
          </div>
          {showSubtitle && subtitle && (
            <div className="absolute top-full left-0 mt-1 z-10 bg-gray-800 text-white text-xs rounded-lg p-2 w-48 shadow-lg">
              {subtitle}
            </div>
          )}
        </div>
        <div className={`p-2 sm:p-3 rounded-xl ${colorClasses.bg} flex-shrink-0 ml-2`}>
          <Icon className={`text-xl sm:text-2xl ${colorClasses.text}`} />
        </div>
      </div>
    </div>
  );
};

const ClassPerformanceTable = ({ data, onRowClick, selectedClass }) => {
  const [sortField, setSortField] = useState('f1');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const sortedData = useMemo(() => {
    const sorted = [...data];
    sorted.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (sortDirection === 'asc') return aVal - bVal;
      return bVal - aVal;
    });
    return sorted;
  }, [data, sortField, sortDirection]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <FaChevronUp className="text-gray-300 text-xs" />;
    return sortDirection === 'asc' ? <FaChevronUp className="text-purple-600 text-xs" /> : <FaChevronDown className="text-purple-600 text-xs" />;
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('class')}>
              Class <SortIcon field="class" />
            </th>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('f1')}>
              F1 <SortIcon field="f1" />
            </th>
            <th className="hidden sm:table-cell px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('precision')}>
              Precision <SortIcon field="precision" />
            </th>
            <th className="hidden md:table-cell px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('recall')}>
              Recall <SortIcon field="recall" />
            </th>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('roc_auc')}>
              AUC <SortIcon field="roc_auc" />
            </th>
            <th className="hidden lg:table-cell px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('pr_auc')}>
              PR-AUC <SortIcon field="pr_auc" />
            </th>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('support')}>
              N <SortIcon field="support" />
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {paginatedData.map((row, idx) => (
            <tr
              key={row.class}
              onClick={() => onRowClick(row.class)}
              className={`hover:bg-purple-50 cursor-pointer transition-colors ${selectedClass === row.class ? 'bg-purple-100' : ''}`}
            >
              <td className="px-2 sm:px-4 py-2 sm:py-2 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{row.class}</td>
              <td className="px-2 sm:px-4 py-2 sm:py-2 whitespace-nowrap">
                <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-semibold ${row.f1 >= 0.4 ? 'bg-green-100 text-green-800' : row.f1 >= 0.2 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                  {row.f1.toFixed(3)}
                </span>
              </td>
              <td className="hidden sm:table-cell px-2 sm:px-4 py-2 sm:py-2 whitespace-nowrap text-xs sm:text-sm text-gray-600">{row.precision.toFixed(3)}</td>
              <td className="hidden md:table-cell px-2 sm:px-4 py-2 sm:py-2 whitespace-nowrap text-xs sm:text-sm text-gray-600">{row.recall.toFixed(3)}</td>
              <td className="px-2 sm:px-4 py-2 sm:py-2 whitespace-nowrap text-xs sm:text-sm text-gray-600">{row.roc_auc.toFixed(3)}</td>
              <td className="hidden lg:table-cell px-2 sm:px-4 py-2 sm:py-2 whitespace-nowrap text-xs sm:text-sm text-gray-600">{row.pr_auc.toFixed(3)}</td>
              <td className="px-2 sm:px-4 py-2 sm:py-2 whitespace-nowrap text-xs sm:text-sm text-gray-600">{row.support}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1 sm:gap-2 py-3 sm:py-4 border-t border-gray-200">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-gray-100 rounded-md disabled:opacity-50 hover:bg-gray-200 transition"
          >
            Prev
          </button>
          <span className="text-xs sm:text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-gray-100 rounded-md disabled:opacity-50 hover:bg-gray-200 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

const PerformanceRadarChart = ({ data }) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isMobile = windowWidth < 640;
  const radarData = data.map(item => ({
    subject: isMobile && item.class.length > 10 ? item.class.substring(0, 8) + '...' : item.class,
    value: item.f1,
    fullMark: 1
  }));

  return (
    <ResponsiveContainer width="100%" height={isMobile ? 300 : 400}>
      <RadarChart cx="50%" cy="50%" outerRadius={isMobile ? "70%" : "80%"} data={radarData}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: isMobile ? 8 : 10 }} />
        <PolarRadiusAxis angle={30} domain={[0, 1]} tick={{ fill: '#6b7280', fontSize: isMobile ? 8 : 10 }} />
        <Radar name="F1 Score" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
        <Tooltip formatter={(value) => value.toFixed(3)} />
        <Legend wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

const ConfusionMatrixHeatmap = ({ data }) => {
  const matrixData = data.slice(0, 8).map((item, i) => ({
    name: item.class,
    tp: PERFORMANCE_DATA.metrics.tp?.[i] || 0,
    fp: PERFORMANCE_DATA.metrics.fp?.[i] || 0,
    fn: PERFORMANCE_DATA.metrics.fn?.[i] || 0,
    tn: PERFORMANCE_DATA.metrics.tn?.[i] || 0
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      {matrixData.map((item, idx) => (
        <div key={idx} className="bg-white rounded-lg border border-gray-200 p-2 sm:p-3">
          <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 truncate">{item.name}</h4>
          <div className="grid grid-cols-2 gap-1 sm:gap-2 text-center text-[10px] sm:text-xs">
            <div className="bg-green-100 rounded p-1.5 sm:p-2">
              <div className="font-semibold text-green-800">TP</div>
              <div className="text-sm sm:text-lg font-bold text-green-700">{item.tp}</div>
            </div>
            <div className="bg-red-100 rounded p-1.5 sm:p-2">
              <div className="font-semibold text-red-800">FP</div>
              <div className="text-sm sm:text-lg font-bold text-red-700">{item.fp}</div>
            </div>
            <div className="bg-yellow-100 rounded p-1.5 sm:p-2">
              <div className="font-semibold text-yellow-800">FN</div>
              <div className="text-sm sm:text-lg font-bold text-yellow-700">{item.fn}</div>
            </div>
            <div className="bg-blue-100 rounded p-1.5 sm:p-2">
              <div className="font-semibold text-blue-800">TN</div>
              <div className="text-sm sm:text-lg font-bold text-blue-700">{item.tn}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const MetricGauge = ({ value, title, color, max = 1 }) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="text-center">
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${percentage}%`, backgroundColor: color }}></div>
        </div>
        <p className="text-lg sm:text-xl font-bold text-gray-800">{value.toFixed(3)}</p>
        <p className="text-[10px] sm:text-xs text-gray-500 mt-1">{title}</p>
      </div>
    </div>
  );
};

const ScatterPlot = ({ data }) => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const isMobile = windowWidth < 640;
  
  const scatterData = data.map(item => ({
    x: item.roc_auc,
    y: item.pr_auc,
    name: isMobile && item.class.length > 12 ? item.class.substring(0, 10) + '...' : item.class,
    z: item.support
  }));

  return (
    <ResponsiveContainer width="100%" height={isMobile ? 350 : 400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis type="number" dataKey="x" name="ROC-AUC" domain={[0.5, 1]} tick={{ fill: '#6b7280', fontSize: isMobile ? 10 : 12 }} />
        <YAxis type="number" dataKey="y" name="PR-AUC" domain={[0, 0.6]} tick={{ fill: '#6b7280', fontSize: isMobile ? 10 : 12 }} />
        <ZAxis type="number" dataKey="z" range={[isMobile ? 40 : 60, isMobile ? 200 : 400]} name="Support" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value, name, props) => {
          if (name === 'z') return [props.payload.z, 'Support'];
          return [value.toFixed(3), name];
        }} />
        <Legend wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} />
        <Scatter name="Classes" data={scatterData} fill="#8884d8" shape="circle">
          {scatterData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS.classColors[index % COLORS.classColors.length]} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
};

const ClassDetailModal = ({ classData, onClose }) => {
  if (!classData) return null;

  const metrics = [
    { label: 'F1 Score', value: classData.f1, color: '#10b981', icon: FaChartLine },
    { label: 'Precision', value: classData.precision, color: '#3b82f6', icon: MdOutlinePrecisionManufacturing },
    { label: 'Recall', value: classData.recall, color: '#f59e0b', icon: FiEye },
    { label: 'ROC-AUC', value: classData.roc_auc, color: '#8b5cf6', icon: FaChartLine },
    { label: 'PR-AUC', value: classData.pr_auc, color: '#06b6d4', icon: FaChartLine },
    { label: 'Support', value: classData.support, color: '#ef4444', icon: MdOutlineSick, max: Math.max(...PERFORMANCE_DATA.metrics.support) }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4" onClick={onClose}>
      <div className="bg-white rounded-xl sm:rounded-2xl max-w-md w-full p-4 sm:p-6 shadow-2xl mx-3" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 truncate">{classData.class}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {metrics.map((metric, idx) => (
            <div key={idx}>
              <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-1">
                <span className="flex items-center gap-1"><metric.icon size={12} /> {metric.label}</span>
                <span className="font-mono font-semibold">{metric.value.toFixed(3)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                <div className="h-1.5 sm:h-2 rounded-full transition-all duration-300" style={{ width: `${(metric.value / (metric.max || 1)) * 100}%`, backgroundColor: metric.color }}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100">
          <p className="text-[10px] sm:text-xs text-gray-500">
            Optimal threshold: {PERFORMANCE_DATA.optimal_thresholds[PERFORMANCE_DATA.classes.indexOf(classData.class)]?.toFixed(3)}
          </p>
        </div>
      </div>
    </div>
  );
};

const LungDiseaseMetrics = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const tableData = PERFORMANCE_DATA.classes.map((cls, idx) => ({
    class: cls,
    precision: PERFORMANCE_DATA.metrics.precision[idx],
    recall: PERFORMANCE_DATA.metrics.recall[idx],
    f1: PERFORMANCE_DATA.metrics.f1[idx],
    roc_auc: PERFORMANCE_DATA.metrics.roc_auc[idx],
    pr_auc: PERFORMANCE_DATA.metrics.pr_auc[idx],
    support: PERFORMANCE_DATA.metrics.support[idx]
  }));

  const barData = PERFORMANCE_DATA.classes.map((cls, idx) => ({
    name: isMobile && cls.length > 10 ? cls.substring(0, 8) + '...' : cls,
    f1: PERFORMANCE_DATA.metrics.f1[idx],
    precision: PERFORMANCE_DATA.metrics.precision[idx],
    recall: PERFORMANCE_DATA.metrics.recall[idx]
  }));

  const top5ByF1 = [...tableData].sort((a, b) => b.f1 - a.f1).slice(0, 5);
  const bottom5ByF1 = [...tableData].sort((a, b) => a.f1 - b.f1).slice(0, 5);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'detailed', label: 'Detailed' },
    { id: 'radar', label: 'Radar' },
    { id: 'scatter', label: 'Scatter' },
    { id: 'confusion', label: 'Confusion' }
  ];

  const handleExport = () => {
    const csvContent = [
      ['Class', 'Precision', 'Recall', 'F1 Score', 'ROC-AUC', 'PR-AUC', 'Support', 'Optimal Threshold'],
      ...PERFORMANCE_DATA.classes.map((cls, idx) => [
        cls,
        PERFORMANCE_DATA.metrics.precision[idx],
        PERFORMANCE_DATA.metrics.recall[idx],
        PERFORMANCE_DATA.metrics.f1[idx],
        PERFORMANCE_DATA.metrics.roc_auc[idx],
        PERFORMANCE_DATA.metrics.pr_auc[idx],
        PERFORMANCE_DATA.metrics.support[idx],
        PERFORMANCE_DATA.optimal_thresholds[idx]
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lung_disease_performance.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl sm:rounded-2xl shadow-lg">
              <FaLungs className="text-xl sm:text-3xl text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Lung Disease Detection</h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">Multi-label classification (14 pathologies)</p>
            </div>
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-purple-200 rounded-lg sm:rounded-xl text-purple-600 hover:bg-purple-50 transition-all duration-300 shadow-sm text-sm sm:text-base w-full sm:w-auto justify-center"
          >
            <FaDownload size={isMobile ? 12 : 14} /> Export CSV
          </button>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          <MetricCard
            title="Macro F1"
            value={PERFORMANCE_DATA.overall.macro_f1.toFixed(4)}
            icon={GiHealthNormal}
            color="purple"
            subtitle="Average F1 across all 14 classes, unweighted"
          />
          <MetricCard
            title="Macro AUC"
            value={PERFORMANCE_DATA.overall.macro_auc.toFixed(4)}
            icon={FaLungs}
            color="blue"
            subtitle="Average AUC across all classes"
          />
          <MetricCard
            title="Micro F1"
            value={PERFORMANCE_DATA.overall.micro_f1.toFixed(4)}
            icon={FaTachometerAlt}
            color="green"
            subtitle="F1 weighted by class support"
          />
          <MetricCard
            title="Accuracy"
            value={PERFORMANCE_DATA.overall.accuracy.toFixed(4)}
            icon={FiCheckCircle}
            color="orange"
            subtitle="Exact match ratio"
          />
        </div>

        {/* Navigation Tabs - Responsive */}
        <div className="border-b border-gray-200 pb-2">
          {/* Desktop Tabs */}
          <div className="hidden sm:flex flex-wrap gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-t-lg font-medium transition-all ${activeTab === tab.id ? 'bg-purple-600 text-white shadow-md' : 'text-gray-600 hover:bg-purple-100'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Mobile Dropdown */}
          <div className="sm:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {tabs.map(tab => (
                <option key={tab.id} value={tab.id}>{tab.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-5 border border-green-100">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2"><FaArrowTrendUp className="text-green-500" /> Top Performers</h3>
                <div className="space-y-2 sm:space-y-3">
                  {top5ByF1.map((item, idx) => (
                    <div key={idx} className="flex flex-wrap justify-between items-center p-2 bg-green-50 rounded-lg gap-2">
                      <span className="font-medium text-gray-700 text-sm sm:text-base">{item.class}</span>
                      <div className="flex flex-wrap gap-2 sm:gap-4">
                        <span className="text-xs sm:text-sm text-gray-500">F1: <span className="font-semibold text-green-600">{item.f1.toFixed(3)}</span></span>
                        <span className="text-xs sm:text-sm text-gray-500">AUC: <span className="font-semibold text-blue-600">{item.roc_auc.toFixed(3)}</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-5 border border-red-100">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2"><FaArrowTrendDown className="text-red-500" /> Needs Improvement</h3>
                <div className="space-y-2 sm:space-y-3">
                  {bottom5ByF1.map((item, idx) => (
                    <div key={idx} className="flex flex-wrap justify-between items-center p-2 bg-red-50 rounded-lg gap-2">
                      <span className="font-medium text-gray-700 text-sm sm:text-base">{item.class}</span>
                      <div className="flex flex-wrap gap-2 sm:gap-4">
                        <span className="text-xs sm:text-sm text-gray-500">F1: <span className="font-semibold text-red-600">{item.f1.toFixed(3)}</span></span>
                        <span className="text-xs sm:text-sm text-gray-500">N: <span className="font-semibold text-gray-600">{item.support}</span></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-5 overflow-x-auto">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">F1 Score by Disease Class</h3>
              <div style={{ minWidth: isMobile ? '600px' : 'auto' }}>
                <ResponsiveContainer width="100%" height={isMobile ? 400 : 450}>
                  <BarChart data={barData} layout="vertical" margin={{ left: isMobile ? 60 : 80, right: 20, top: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" domain={[0, 0.6]} tick={{ fill: '#6b7280', fontSize: isMobile ? 10 : 12 }} />
                    <YAxis type="category" dataKey="name" tick={{ fill: '#4b5563', fontSize: isMobile ? 9 : 11 }} width={isMobile ? 70 : 100} />
                    <Tooltip formatter={(value) => value.toFixed(3)} />
                    <Legend wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} />
                    <Bar dataKey="f1" fill="#8b5cf6" name="F1 Score" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="precision" fill="#3b82f6" name="Precision" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="recall" fill="#f59e0b" name="Recall" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Detailed Tab */}
        {activeTab === 'detailed' && (
          <div className="space-y-4 sm:space-y-6">
            <ClassPerformanceTable data={tableData} onRowClick={(className) => setSelectedClass(tableData.find(d => d.class === className))} selectedClass={selectedClass?.class} />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4">
              {['macro_precision', 'macro_recall', 'macro_f1', 'micro_precision', 'micro_recall', 'micro_f1'].map(metric => (
                <MetricGauge
                  key={metric}
                  value={PERFORMANCE_DATA.overall[metric]}
                  title={metric.replace('_', ' ').toUpperCase()}
                  color={metric.includes('precision') ? '#3b82f6' : metric.includes('recall') ? '#f59e0b' : '#10b981'}
                />
              ))}
            </div>
          </div>
        )}

        {/* Radar Tab */}
        {activeTab === 'radar' && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-5">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">F1 Score Radar Chart</h3>
            <PerformanceRadarChart data={tableData} />
          </div>
        )}

        {/* Scatter Tab */}
        {activeTab === 'scatter' && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-5 overflow-x-auto">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">ROC-AUC vs PR-AUC (Circle size = Support)</h3>
            <div style={{ minWidth: isMobile ? '300px' : 'auto' }}>
              <ScatterPlot data={tableData} />
            </div>
          </div>
        )}

        {/* Confusion Tab */}
        {activeTab === 'confusion' && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-5">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Confusion Matrices (Top 8 Classes)</h3>
            <ConfusionMatrixHeatmap data={tableData} />
          </div>
        )}

        {/* Class Detail Modal */}
        {selectedClass && <ClassDetailModal classData={selectedClass} onClose={() => setSelectedClass(null)} />}

        {/* Footer */}
        <div className="text-center text-[10px] sm:text-xs text-gray-500 pt-4 sm:pt-6 border-t border-gray-200">
          <p>Model: Improved Custom CNN with SE Blocks | Progressive Resizing (192→288) | Asymmetric Loss</p>
          <p className="mt-1 hidden sm:block">Optimal thresholds optimized per class via F1 maximization</p>
        </div>
      </div>
    </div>
  );
};

export default LungDiseaseMetrics;