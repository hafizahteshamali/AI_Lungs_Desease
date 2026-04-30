// Performance.jsx (UPDATED - with GradCAM component)
import React, { useState } from 'react';
import {
  FaChartLine,
  FaChartBar,
  FaHeartbeat,
  FaLungs,
  FaDownload,
  FaCalendarAlt,
  FaEye,
  FaInfoCircle,
  FaBrain,
  FaMicroscope
} from 'react-icons/fa';
import BreastCancerMetrics from './elements/BreastCancerMetrics';
import BreastCancerChartsRecharts from './elements/BreastCancerChartsRecharts';
import ModelComparisonRecharts from './elements/ModelComparisonRecharts';
import PerformanceHeader from './elements/PerformanceHeader';
import LungDiseaseMetrics from './elements/LungDiseaseMetrics';
import GradCAMComponent from './elements/GradCAMComponent';  // NEW IMPORT

const Performance = () => {
  const [activeDisease, setActiveDisease] = useState('breast-cancer');
  const [timeRange, setTimeRange] = useState('all');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      
      {/* Header Section */}
      <PerformanceHeader 
        activeDisease={activeDisease}
        setActiveDisease={setActiveDisease}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        {activeDisease === 'breast-cancer' ? (
          <>
            {/* Grad-CAM Visualization - NEW SECTION */}
            <GradCAMComponent />
            
            {/* Key Metrics Cards */}
            <BreastCancerMetrics />
            
            {/* Interactive Charts Section */}
            <BreastCancerChartsRecharts />
            
            {/* Model Comparison */}
            <ModelComparisonRecharts />
          </>
        ) : (
          <LungDiseaseMetrics />
        )}
      </div>
    </div>
  );
};

export default Performance;