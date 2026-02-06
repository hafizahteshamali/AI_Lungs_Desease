import React, { useState } from 'react';
import {
  FaChartBar, FaChartLine, FaChartPie, FaTable,
  FaFilter, FaDownload, FaCalendarAlt, FaEye,
  FaChevronRight, FaChevronLeft, FaCog,
  FaDatabase, FaBrain, FaUserMd, FaHospital,
  FaArrowUp, FaArrowDown, FaSync, FaFileExport,
  FaInfoCircle, FaPercentage, FaBullseye
} from 'react-icons/fa';
import { GiMedicalDrip, GiLungs } from 'react-icons/gi';

const Analytical_Reports = () => {
  // State for active report type
  const [activeReport, setActiveReport] = useState('confusion');
  const [dateRange, setDateRange] = useState('month');
  const [modelVersion, setModelVersion] = useState('v2.0');
  const [showDetails, setShowDetails] = useState(false);

  // Confusion Matrix Data
  const confusionMatrix = {
    labels: ['COVID-19', 'Pneumonia', 'Normal', 'Other'],
    data: [
      [95, 3, 1, 1],   // COVID-19 predictions
      [2, 92, 4, 2],   // Pneumonia predictions
      [1, 2, 96, 1],   // Normal predictions
      [0, 3, 2, 95]    // Other predictions
    ],
    metrics: {
      accuracy: 0.944,
      precision: 0.942,
      recall: 0.943,
      f1Score: 0.942
    }
  };

  // F1 Score Trends Data
  const f1Trends = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    covid: [0.92, 0.93, 0.94, 0.94, 0.95, 0.95, 0.96, 0.96, 0.95, 0.96, 0.96, 0.95],
    pneumonia: [0.88, 0.89, 0.90, 0.91, 0.91, 0.92, 0.92, 0.93, 0.92, 0.93, 0.93, 0.92],
    normal: [0.94, 0.94, 0.95, 0.95, 0.96, 0.96, 0.96, 0.97, 0.96, 0.97, 0.97, 0.96],
    other: [0.85, 0.86, 0.87, 0.88, 0.89, 0.90, 0.91, 0.92, 0.91, 0.92, 0.92, 0.91]
  };

  // AUC Trends Data
  const aucTrends = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    covid: [0.97, 0.97, 0.98, 0.98],
    pneumonia: [0.94, 0.94, 0.95, 0.95],
    normal: [0.99, 0.99, 0.99, 0.99],
    other: [0.92, 0.92, 0.93, 0.93]
  };

  // Disease Frequency Data
  const diseaseFrequency = {
    labels: ['COVID-19', 'Pneumonia', 'Breast Cancer', 'Tuberculosis', 'Bronchitis', 'Other'],
    values: [1250, 890, 780, 320, 540, 210],
    percentages: [31.2, 22.3, 19.5, 8.0, 13.5, 5.5],
    colors: [
      'bg-red-500', 'bg-orange-500', 'bg-pink-500',
      'bg-green-500', 'bg-blue-500', 'bg-purple-500'
    ]
  };

  // Model Performance Metrics
  const modelMetrics = [
    { name: 'Overall Accuracy', value: '94.4%', change: '+0.8%', icon: <FaPercentage />, color: 'bg-green-100 text-green-800' },
    { name: 'Average F1 Score', value: '94.2%', change: '+1.2%', icon: <FaBullseye />, color: 'bg-blue-100 text-blue-800' },
    { name: 'Average AUC', value: '96.5%', change: '+0.5%', icon: <FaChartLine />, color: 'bg-purple-100 text-purple-800' },
    { name: 'Total Predictions', value: '15,842', change: '+12.3%', icon: <FaBrain />, color: 'bg-orange-100 text-orange-800' }
  ];

  // Recent Predictions
  const recentPredictions = [
    { id: 1, patient: 'Ali Ahmed', disease: 'COVID-19', confidence: 0.95, date: '2024-02-06', status: 'Confirmed' },
    { id: 2, patient: 'Sara Khan', disease: 'Pneumonia', confidence: 0.92, date: '2024-02-06', status: 'Confirmed' },
    { id: 3, patient: 'Mohammad Hassan', disease: 'Normal', confidence: 0.96, date: '2024-02-05', status: 'Confirmed' },
    { id: 4, patient: 'Ayesha Malik', disease: 'Breast Cancer', confidence: 0.89, date: '2024-02-05', status: 'Pending' },
    { id: 5, patient: 'Bilal Abbas', disease: 'Bronchitis', confidence: 0.91, date: '2024-02-04', status: 'Confirmed' }
  ];

  // Helper function to get cell color based on value
  const getCellColor = (value) => {
    if (value >= 95) return 'bg-green-100';
    if (value >= 90) return 'bg-green-50';
    if (value >= 80) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  // Export function
  const exportReport = () => {
    alert(`Exporting ${activeReport} report for ${dateRange}...`);
  };

  // Get trend icon
  const getTrendIcon = (value) => {
    if (value.includes('+')) return <FaArrowUp className="text-green-500" />;
    if (value.includes('-')) return <FaArrowDown className="text-red-500" />;
    return null;
  };

  // Render Confusion Matrix
  const renderConfusionMatrix = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Confusion Matrix</h3>
            <p className="text-sm text-gray-600">Model v{modelVersion} - All time data</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={modelVersion}
              onChange={(e) => setModelVersion(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="v1.5">Model v1.5</option>
              <option value="v2.0">Model v2.0</option>
              <option value="v2.1">Model v2.1</option>
            </select>
            <button
              onClick={exportReport}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-sm hover:bg-blue-700 transition-colors"
            >
              <FaDownload />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900"></th>
                {confusionMatrix.labels.map((label, index) => (
                  <th key={index} className="px-4 py-3 text-center text-sm font-medium text-gray-900">
                    Predicted {label}
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Recall</th>
              </tr>
            </thead>
            <tbody>
              {confusionMatrix.data.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-gray-200">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    Actual {confusionMatrix.labels[rowIndex]}
                  </td>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`px-4 py-3 text-center text-sm ${getCellColor(cell)} ${cellIndex === rowIndex ? 'border-2 border-green-400' : ''}`}
                    >
                      <div className="font-medium">{cell}%</div>
                      <div className="text-xs text-gray-500">({Math.round(cell * 400 / 100)})</div>
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">
                      {rowIndex === 0 ? '95.0%' : rowIndex === 1 ? '92.0%' : rowIndex === 2 ? '96.0%' : '95.0%'}
                    </div>
                  </td>
                </tr>
              ))}
              <tr className="border-t border-gray-300 bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">Precision</td>
                <td className="px-4 py-3 text-center text-sm font-medium text-green-700">95.0%</td>
                <td className="px-4 py-3 text-center text-sm font-medium text-green-700">92.0%</td>
                <td className="px-4 py-3 text-center text-sm font-medium text-green-700">96.0%</td>
                <td className="px-4 py-3 text-center text-sm font-medium text-green-700">95.0%</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Accuracy</div>
            <div className="text-2xl font-bold text-gray-900">{(confusionMatrix.metrics.accuracy * 100).toFixed(1)}%</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Precision</div>
            <div className="text-2xl font-bold text-gray-900">{(confusionMatrix.metrics.precision * 100).toFixed(1)}%</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Recall</div>
            <div className="text-2xl font-bold text-gray-900">{(confusionMatrix.metrics.recall * 100).toFixed(1)}%</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">F1 Score</div>
            <div className="text-2xl font-bold text-gray-900">{(confusionMatrix.metrics.f1Score * 100).toFixed(1)}%</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render F1 Trends
  const renderF1Trends = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">F1 Score Trends (2024)</h3>
            <p className="text-sm text-gray-600">Monthly performance across disease categories</p>
          </div>
          <button
            onClick={exportReport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-sm hover:bg-blue-700 transition-colors"
          >
            <FaDownload />
            Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700">COVID-19</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Pneumonia</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Normal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Other</span>
              </div>
            </div>

            {/* Chart Grid */}
            <div className="relative h-64 mb-4">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[100, 75, 50, 25, 0].map((percent) => (
                  <div key={percent} className="flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                    <div className="ml-2 text-xs text-gray-500 w-8">{percent}%</div>
                  </div>
                ))}
              </div>

              {/* Data lines */}
              <div className="absolute inset-0 flex items-end">
                {f1Trends.labels.map((month, index) => (
                  <div key={month} className="flex-1 flex justify-around items-end h-48 px-1">
                    {/* COVID-19 */}
                    <div
                      className="w-2 bg-red-500 rounded-t"
                      style={{ height: `${f1Trends.covid[index] * 100}%` }}
                      title={`COVID-19: ${(f1Trends.covid[index] * 100).toFixed(1)}%`}
                    ></div>
                    {/* Pneumonia */}
                    <div
                      className="w-2 bg-orange-500 rounded-t"
                      style={{ height: `${f1Trends.pneumonia[index] * 100}%` }}
                      title={`Pneumonia: ${(f1Trends.pneumonia[index] * 100).toFixed(1)}%`}
                    ></div>
                    {/* Normal */}
                    <div
                      className="w-2 bg-blue-500 rounded-t"
                      style={{ height: `${f1Trends.normal[index] * 100}%` }}
                      title={`Normal: ${(f1Trends.normal[index] * 100).toFixed(1)}%`}
                    ></div>
                    {/* Other */}
                    <div
                      className="w-2 bg-purple-500 rounded-t"
                      style={{ height: `${f1Trends.other[index] * 100}%` }}
                      title={`Other: ${(f1Trends.other[index] * 100).toFixed(1)}%`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Month labels */}
            <div className="flex justify-between">
              {f1Trends.labels.map((month) => (
                <div key={month} className="text-xs text-gray-500 w-8 text-center">
                  {month}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="text-sm text-gray-600">COVID-19 Avg</div>
            <div className="text-2xl font-bold text-gray-900">94.8%</div>
            <div className="text-sm text-green-600 flex items-center gap-1">
              <FaArrowUp />
              +2.1% from last year
            </div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
            <div className="text-sm text-gray-600">Pneumonia Avg</div>
            <div className="text-2xl font-bold text-gray-900">91.0%</div>
            <div className="text-sm text-green-600 flex items-center gap-1">
              <FaArrowUp />
              +3.5% from last year
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="text-sm text-gray-600">Normal Avg</div>
            <div className="text-2xl font-bold text-gray-900">95.8%</div>
            <div className="text-sm text-green-600 flex items-center gap-1">
              <FaArrowUp />
              +1.2% from last year
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="text-sm text-gray-600">Other Avg</div>
            <div className="text-2xl font-bold text-gray-900">89.5%</div>
            <div className="text-sm text-green-600 flex items-center gap-1">
              <FaArrowUp />
              +4.8% from last year
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render AUC Trends
  const renderAUCTrends = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AUC Trends (Last 4 Weeks)</h3>
            <p className="text-sm text-gray-600">Area Under Curve - Model discrimination ability</p>
          </div>
          <button
            onClick={exportReport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-sm hover:bg-blue-700 transition-colors"
          >
            <FaDownload />
            Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="flex items-end h-48 mb-4">
              {aucTrends.labels.map((week, index) => (
                <div key={week} className="flex-1 flex flex-col items-center px-2">
                  <div className="text-xs text-gray-500 mb-2">{week}</div>
                  <div className="flex items-end justify-center w-full gap-1">
                    {/* COVID-19 */}
                    <div
                      className="w-6 bg-red-500 rounded-t"
                      style={{ height: `${aucTrends.covid[index] * 100}%` }}
                      title={`COVID-19: ${aucTrends.covid[index]}`}
                    >
                      <div className="text-xs text-white text-center pt-1">
                        {(aucTrends.covid[index] * 100).toFixed(0)}%
                      </div>
                    </div>
                    {/* Pneumonia */}
                    <div
                      className="w-6 bg-orange-500 rounded-t"
                      style={{ height: `${aucTrends.pneumonia[index] * 100}%` }}
                      title={`Pneumonia: ${aucTrends.pneumonia[index]}`}
                    >
                      <div className="text-xs text-white text-center pt-1">
                        {(aucTrends.pneumonia[index] * 100).toFixed(0)}%
                      </div>
                    </div>
                    {/* Normal */}
                    <div
                      className="w-6 bg-blue-500 rounded-t"
                      style={{ height: `${aucTrends.normal[index] * 100}%` }}
                      title={`Normal: ${aucTrends.normal[index]}`}
                    >
                      <div className="text-xs text-white text-center pt-1">
                        {(aucTrends.normal[index] * 100).toFixed(0)}%
                      </div>
                    </div>
                    {/* Other */}
                    <div
                      className="w-6 bg-purple-500 rounded-t"
                      style={{ height: `${aucTrends.other[index] * 100}%` }}
                      title={`Other: ${aucTrends.other[index]}`}
                    >
                      <div className="text-xs text-white text-center pt-1">
                        {(aucTrends.other[index] * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Weekly AUC Scores</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Week</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">COVID-19</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Pneumonia</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Normal</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Other</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Average</th>
                </tr>
              </thead>
              <tbody>
                {aucTrends.labels.map((week, index) => (
                  <tr key={week} className="border-t border-gray-200">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{week}</td>
                    <td className="px-4 py-3 text-sm">{aucTrends.covid[index].toFixed(3)}</td>
                    <td className="px-4 py-3 text-sm">{aucTrends.pneumonia[index].toFixed(3)}</td>
                    <td className="px-4 py-3 text-sm">{aucTrends.normal[index].toFixed(3)}</td>
                    <td className="px-4 py-3 text-sm">{aucTrends.other[index].toFixed(3)}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {(
                        (aucTrends.covid[index] +
                         aucTrends.pneumonia[index] +
                         aucTrends.normal[index] +
                         aucTrends.other[index]) / 4
                      ).toFixed(3)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Disease Frequency
  const renderDiseaseFrequency = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Disease Frequency Distribution</h3>
            <p className="text-sm text-gray-600">Based on 4,000+ patient scans in 2024</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            <button
              onClick={exportReport}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-sm hover:bg-blue-700 transition-colors"
            >
              <FaDownload />
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart Visualization */}
          <div>
            <div className="h-64 relative">
              {/* Pie chart simulation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48">
                  {diseaseFrequency.labels.map((label, index) => {
                    const percentage = diseaseFrequency.percentages[index];
                    const rotation = diseaseFrequency.percentages
                      .slice(0, index)
                      .reduce((a, b) => a + b, 0) * 3.6;
                    
                    return (
                      <div
                        key={label}
                        className={`absolute inset-0 rounded-full border-8 ${diseaseFrequency.colors[index]}`}
                        style={{
                          clipPath: `conic-gradient(from ${rotation}deg, transparent 0% ${percentage}%, rgba(0,0,0,0.1) ${percentage}% 100%)`,
                          transform: `rotate(${rotation}deg)`
                        }}
                      ></div>
                    );
                  })}
                  <div className="absolute inset-8 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Legend */}
            <div className="mt-6 space-y-2">
              {diseaseFrequency.labels.map((label, index) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${diseaseFrequency.colors[index]}`}></div>
                    <span className="text-sm text-gray-700">{label}</span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {diseaseFrequency.values[index].toLocaleString()} ({diseaseFrequency.percentages[index]}%)
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div>
            <div className="h-64 flex items-end space-x-2">
              {diseaseFrequency.labels.map((label, index) => {
                const maxValue = Math.max(...diseaseFrequency.values);
                const height = (diseaseFrequency.values[index] / maxValue) * 100;
                
                return (
                  <div key={label} className="flex-1 flex flex-col items-center">
                    <div
                      className={`w-full ${diseaseFrequency.colors[index]} rounded-t`}
                      style={{ height: `${height}%` }}
                      title={`${label}: ${diseaseFrequency.values[index]} cases (${diseaseFrequency.percentages[index]}%)`}
                    >
                      <div className="text-xs text-white text-center pt-1 font-medium">
                        {diseaseFrequency.percentages[index]}%
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 text-center h-8">
                      {label.split(' ')[0]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Total Cases</div>
            <div className="text-2xl font-bold text-gray-900">4,000+</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Most Common</div>
            <div className="text-2xl font-bold text-gray-900">COVID-19</div>
            <div className="text-sm text-gray-600">31.2% of total</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600">Growth Rate</div>
            <div className="text-2xl font-bold text-gray-900">+18.5%</div>
            <div className="text-sm text-green-600 flex items-center gap-1">
              <FaArrowUp />
              vs last period
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-2">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            AI Model Analytics & Reports
          </h1>
          <p className="text-gray-600">
            Comprehensive analysis of model performance, accuracy metrics, and disease trends
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {modelMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{metric.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${metric.color}`}>
                  {metric.icon}
                </div>
              </div>
              <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
                {getTrendIcon(metric.change)}
                {metric.change}
              </div>
            </div>
          ))}
        </div>

        {/* Report Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-wrap border-b border-gray-200">
            <button
              onClick={() => setActiveReport('confusion')}
              className={`flex-1 px-6 py-4 text-sm font-medium flex items-center justify-center gap-2 ${activeReport === 'confusion' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <FaTable />
              Confusion Matrix
            </button>
            <button
              onClick={() => setActiveReport('f1')}
              className={`flex-1 px-6 py-4 text-sm font-medium flex items-center justify-center gap-2 ${activeReport === 'f1' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <FaChartLine />
              F1 Score Trends
            </button>
            <button
              onClick={() => setActiveReport('auc')}
              className={`flex-1 px-6 py-4 text-sm font-medium flex items-center justify-center gap-2 ${activeReport === 'auc' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <FaChartBar />
              AUC Trends
            </button>
            <button
              onClick={() => setActiveReport('frequency')}
              className={`flex-1 px-6 py-4 text-sm font-medium flex items-center justify-center gap-2 ${activeReport === 'frequency' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <FaChartPie />
              Disease Frequency
            </button>
          </div>

          {/* Report Content */}
          <div className="py-3">
            {activeReport === 'confusion' && renderConfusionMatrix()}
            {activeReport === 'f1' && renderF1Trends()}
            {activeReport === 'auc' && renderAUCTrends()}
            {activeReport === 'frequency' && renderDiseaseFrequency()}
          </div>
        </div>

        {/* Recent Predictions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Recent AI Predictions</h3>
              <p className="text-sm text-gray-600">Latest model predictions with confidence scores</p>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
              View All
              <FaChevronRight size={12} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Patient</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Disease</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Confidence</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-900"></th>
                </tr>
              </thead>
              <tbody>
                {recentPredictions.map((prediction) => (
                  <tr key={prediction.id} className="border-t border-gray-200">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <FaUserMd className="text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{prediction.patient}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <GiLungs className="text-gray-400" />
                        <span className="text-sm text-gray-900">{prediction.disease}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${prediction.confidence * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {(prediction.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{prediction.date}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        prediction.status === 'Confirmed' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {prediction.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FaEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Panel */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <FaInfoCircle className="text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-semibold text-blue-900">About AI Metrics</h4>
              <p className="text-sm text-blue-700 mt-1">
                <strong>F1 Score:</strong> Harmonic mean of precision and recall. Higher values indicate better model balance.
                <br />
                <strong>AUC:</strong> Area Under Curve measures model's ability to distinguish between classes.
                <br />
                <strong>Confusion Matrix:</strong> Shows true vs predicted classifications for all classes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytical_Reports;