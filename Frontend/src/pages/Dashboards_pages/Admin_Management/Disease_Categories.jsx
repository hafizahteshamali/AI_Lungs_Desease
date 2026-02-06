import React, { useState } from 'react';
import {
  FaLungs, FaUserInjured, FaVirus, FaBacteria,
  FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaEye,
  FaStethoscope, FaHeartbeat, FaBrain, FaTimes,
  FaChartLine, FaUsers, FaCalendarAlt, FaSortAmountDown,
  FaSortAmountUp, FaExclamationTriangle, FaCheckCircle,
  FaHospital, FaProcedures, FaHeart,
  FaSkull, FaTemperatureHigh, FaFileMedical,
  FaUserMd, FaShieldAlt, FaCapsules, FaBriefcaseMedical
} from 'react-icons/fa';
import { GiLungs } from 'react-icons/gi';
import { MdCoronavirus, MdSick, MdLocalHospital } from 'react-icons/md';

const Disease_Categories = () => {
  // Initial diseases data with valid icons
  const initialDiseases = [
    {
      id: 1,
      name: "COVID-19",
      category: "Lung Diseases",
      description: "Coronavirus disease caused by SARS-CoV-2 virus affecting respiratory system",
      severity: "High",
      affectedOrgan: "Lungs",
      symptoms: ["Fever", "Cough", "Shortness of breath", "Loss of taste/smell"],
      prevalence: "Common",
      treatment: "Supportive care, antivirals, oxygen therapy",
      prevention: "Vaccination, masks, social distancing",
      riskFactors: ["Age > 60", "Diabetes", "Heart disease", "Obesity"],
      icon: <MdCoronavirus className="text-red-500 text-2xl" />,
      color: "bg-red-50 border-red-200",
      textColor: "text-red-700",
      cases: 1250,
      mortalityRate: "2.3%",
      lastUpdated: "2024-02-05"
    },
    {
      id: 2,
      name: "Pneumonia",
      category: "Lung Diseases",
      description: "Infection that inflames air sacs in one or both lungs",
      severity: "Medium",
      affectedOrgan: "Lungs",
      symptoms: ["Chest pain", "Fever", "Cough with phlegm", "Fatigue"],
      prevalence: "Common",
      treatment: "Antibiotics, fever reducers, cough medicine",
      prevention: "Vaccination, good hygiene, healthy lifestyle",
      riskFactors: ["Age < 2 or > 65", "Chronic diseases", "Smoking", "Weak immune system"],
      icon: <FaLungs className="text-orange-500 text-2xl" />,
      color: "bg-orange-50 border-orange-200",
      textColor: "text-orange-700",
      cases: 890,
      mortalityRate: "5-10%",
      lastUpdated: "2024-02-04"
    },
    {
      id: 3,
      name: "Lung Opacity",
      category: "Lung Diseases",
      description: "Abnormal areas on lung imaging indicating various conditions",
      severity: "Low",
      affectedOrgan: "Lungs",
      symptoms: ["Cough", "Shortness of breath", "Chest discomfort"],
      prevalence: "Moderate",
      treatment: "Depends on underlying cause, may include steroids",
      prevention: "Avoid smoking, regular check-ups",
      riskFactors: ["Smoking", "Environmental exposure", "Previous infections"],
      icon: <GiLungs className="text-yellow-500 text-2xl" />,
      color: "bg-yellow-50 border-yellow-200",
      textColor: "text-yellow-700",
      cases: 540,
      mortalityRate: "Varies",
      lastUpdated: "2024-02-03"
    },
    {
      id: 4,
      name: "Breast Cancer",
      category: "Cancer",
      description: "Cancer that forms in the cells of the breasts",
      severity: "High",
      affectedOrgan: "Breast",
      symptoms: ["Lump in breast", "Breast pain", "Nipple discharge", "Skin changes"],
      prevalence: "Common",
      treatment: "Surgery, radiation, chemotherapy, hormone therapy",
      prevention: "Regular screening, healthy diet, exercise",
      riskFactors: ["Family history", "Age", "Obesity", "Alcohol consumption"],
      icon: <MdLocalHospital className="text-pink-500 text-2xl" />,
      color: "bg-pink-50 border-pink-200",
      textColor: "text-pink-700",
      cases: 780,
      mortalityRate: "15%",
      lastUpdated: "2024-02-06"
    },
    {
      id: 5,
      name: "Tuberculosis",
      category: "Infectious Diseases",
      description: "Bacterial infection that mainly affects lungs",
      severity: "High",
      affectedOrgan: "Lungs",
      symptoms: ["Cough lasting weeks", "Chest pain", "Coughing up blood", "Fatigue"],
      prevalence: "Endemic",
      treatment: "Antibiotics for 6-9 months",
      prevention: "Vaccination, good ventilation, early detection",
      riskFactors: ["HIV infection", "Diabetes", "Malnutrition", "Close contact"],
      icon: <FaBacteria className="text-green-500 text-2xl" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
      cases: 320,
      mortalityRate: "10-20%",
      lastUpdated: "2024-02-02"
    },
    {
      id: 6,
      name: "Bronchitis",
      category: "Lung Diseases",
      description: "Inflammation of bronchial tubes carrying air to lungs",
      severity: "Low",
      affectedOrgan: "Bronchial tubes",
      symptoms: ["Cough with mucus", "Fatigue", "Shortness of breath", "Chest discomfort"],
      prevalence: "Very Common",
      treatment: "Rest, fluids, cough medicine, inhalers",
      prevention: "Avoid smoking, wash hands, avoid irritants",
      riskFactors: ["Smoking", "Weak immune system", "GERD", "Environmental factors"],
      icon: <FaFileMedical className="text-blue-500 text-2xl" />,
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-700",
      cases: 1250,
      mortalityRate: "Low",
      lastUpdated: "2024-02-01"
    },
    {
      id: 7,
      name: "Asthma",
      category: "Respiratory Diseases",
      description: "Chronic condition causing inflammation and narrowing of airways",
      severity: "Medium",
      affectedOrgan: "Airways",
      symptoms: ["Wheezing", "Shortness of breath", "Chest tightness", "Coughing"],
      prevalence: "Common",
      treatment: "Inhalers, corticosteroids, long-term control medications",
      prevention: "Avoid triggers, regular medication, monitoring",
      riskFactors: ["Allergies", "Family history", "Smoking", "Obesity"],
      icon: <FaLungs className="text-purple-500 text-2xl" />,
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-700",
      cases: 950,
      mortalityRate: "Low",
      lastUpdated: "2024-02-04"
    },
    {
      id: 8,
      name: "Heart Disease",
      category: "Cardiovascular",
      description: "Various conditions affecting heart structure and function",
      severity: "High",
      affectedOrgan: "Heart",
      symptoms: ["Chest pain", "Shortness of breath", "Fatigue", "Swelling"],
      prevalence: "Very Common",
      treatment: "Medications, surgery, lifestyle changes",
      prevention: "Healthy diet, exercise, no smoking",
      riskFactors: ["High blood pressure", "High cholesterol", "Diabetes", "Smoking"],
      icon: <FaHeart className="text-red-600 text-2xl" />,
      color: "bg-red-50 border-red-300",
      textColor: "text-red-800",
      cases: 2100,
      mortalityRate: "25%",
      lastUpdated: "2024-02-05"
    }
  ];

  // State management
  const [diseases, setDiseases] = useState(initialDiseases);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add', 'edit', 'delete', 'view'
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [newDisease, setNewDisease] = useState({
    name: '',
    category: 'Lung Diseases',
    description: '',
    severity: 'Medium',
    affectedOrgan: '',
    symptoms: [],
    prevalence: 'Common',
    treatment: '',
    prevention: '',
    riskFactors: [],
    currentSymptom: '',
    currentRiskFactor: ''
  });

  // Get unique categories
  const categories = ['all', ...new Set(diseases.map(disease => disease.category))];
  const severities = ['all', 'Low', 'Medium', 'High'];

  // Filter and sort diseases
  const filteredDiseases = diseases
    .filter(disease => {
      const matchesSearch = 
        disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        disease.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        disease.affectedOrgan.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || disease.category === selectedCategory;
      const matchesSeverity = selectedSeverity === 'all' || disease.severity === selectedSeverity;
      
      return matchesSearch && matchesCategory && matchesSeverity;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'cases') {
        aValue = parseInt(aValue);
        bValue = parseInt(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Get category stats
  const stats = {
    totalDiseases: diseases.length,
    lungDiseases: diseases.filter(d => d.category === 'Lung Diseases').length,
    cancer: diseases.filter(d => d.category === 'Cancer').length,
    infectious: diseases.filter(d => d.category === 'Infectious Diseases').length,
    highSeverity: diseases.filter(d => d.severity === 'High').length,
    totalCases: diseases.reduce((sum, d) => sum + d.cases, 0),
    averageMortality: (diseases.reduce((sum, d) => {
      const rate = parseFloat(d.mortalityRate);
      return sum + (isNaN(rate) ? 0 : rate);
    }, 0) / diseases.length).toFixed(1) + '%'
  };

  // Handle disease actions
  const handleAddDisease = () => {
    const newDiseaseWithId = {
      ...newDisease,
      id: diseases.length + 1,
      icon: getCategoryIcon(newDisease.category),
      color: getCategoryColor(newDisease.category),
      textColor: getCategoryTextColor(newDisease.category),
      cases: 0,
      mortalityRate: '0%',
      lastUpdated: new Date().toISOString().split('T')[0],
      symptoms: newDisease.symptoms.filter(s => s.trim() !== ''),
      riskFactors: newDisease.riskFactors.filter(r => r.trim() !== '')
    };
    
    setDiseases([...diseases, newDiseaseWithId]);
    resetNewDisease();
    setShowModal(false);
  };

  const handleEditDisease = () => {
    setDiseases(diseases.map(disease => 
      disease.id === selectedDisease.id ? selectedDisease : disease
    ));
    setShowModal(false);
    setSelectedDisease(null);
  };

  const handleDeleteDisease = (diseaseId) => {
    setDiseases(diseases.filter(disease => disease.id !== diseaseId));
    setShowModal(false);
  };

  // Helper functions
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Lung Diseases':
        return <FaLungs className="text-blue-500 text-2xl" />;
      case 'Cancer':
        return <MdLocalHospital className="text-pink-500 text-2xl" />;
      case 'Infectious Diseases':
        return <FaVirus className="text-green-500 text-2xl" />;
      case 'Cardiovascular':
        return <FaHeart className="text-red-500 text-2xl" />;
      case 'Respiratory Diseases':
        return <FaLungs className="text-purple-500 text-2xl" />;
      default:
        return <FaStethoscope className="text-gray-500 text-2xl" />;
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Lung Diseases':
        return 'bg-blue-50 border-blue-200';
      case 'Cancer':
        return 'bg-pink-50 border-pink-200';
      case 'Infectious Diseases':
        return 'bg-green-50 border-green-200';
      case 'Cardiovascular':
        return 'bg-red-50 border-red-200';
      case 'Respiratory Diseases':
        return 'bg-purple-50 border-purple-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getCategoryTextColor = (category) => {
    switch(category) {
      case 'Lung Diseases':
        return 'text-blue-700';
      case 'Cancer':
        return 'text-pink-700';
      case 'Infectious Diseases':
        return 'text-green-700';
      case 'Cardiovascular':
        return 'text-red-700';
      case 'Respiratory Diseases':
        return 'text-purple-700';
      default:
        return 'text-gray-700';
    }
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const resetNewDisease = () => {
    setNewDisease({
      name: '',
      category: 'Lung Diseases',
      description: '',
      severity: 'Medium',
      affectedOrgan: '',
      symptoms: [],
      prevalence: 'Common',
      treatment: '',
      prevention: '',
      riskFactors: [],
      currentSymptom: '',
      currentRiskFactor: ''
    });
  };

  // Modal handlers
  const openModal = (type, disease = null) => {
    setModalType(type);
    if (type === 'edit' && disease) {
      setSelectedDisease({ ...disease });
    } else if (type === 'add') {
      resetNewDisease();
    } else if (disease) {
      setSelectedDisease(disease);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDisease(null);
  };

  // Add symptom to new disease
  const addSymptom = () => {
    if (newDisease.currentSymptom.trim()) {
      setNewDisease({
        ...newDisease,
        symptoms: [...newDisease.symptoms, newDisease.currentSymptom],
        currentSymptom: ''
      });
    }
  };

  // Add risk factor to new disease
  const addRiskFactor = () => {
    if (newDisease.currentRiskFactor.trim()) {
      setNewDisease({
        ...newDisease,
        riskFactors: [...newDisease.riskFactors, newDisease.currentRiskFactor],
        currentRiskFactor: ''
      });
    }
  };

  // Remove symptom from new disease
  const removeSymptom = (index) => {
    const updatedSymptoms = [...newDisease.symptoms];
    updatedSymptoms.splice(index, 1);
    setNewDisease({ ...newDisease, symptoms: updatedSymptoms });
  };

  // Remove risk factor from new disease
  const removeRiskFactor = (index) => {
    const updatedRiskFactors = [...newDisease.riskFactors];
    updatedRiskFactors.splice(index, 1);
    setNewDisease({ ...newDisease, riskFactors: updatedRiskFactors });
  };

  // Handle Enter key for symptom input
  const handleKeyPress = (e, type) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (type === 'symptom' && newDisease.currentSymptom.trim()) {
        addSymptom();
      } else if (type === 'risk' && newDisease.currentRiskFactor.trim()) {
        addRiskFactor();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Disease Categories Management
          </h1>
          <p className="text-gray-600">
            Manage disease categories, add new diseases, and monitor disease statistics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Diseases</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDiseases}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaStethoscope className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Lung Diseases</p>
                <p className="text-2xl font-bold text-gray-900">{stats.lungDiseases}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FaLungs className="text-2xl text-green-600" />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {stats.highSeverity} high severity diseases
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Cases</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCases.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <FaUsers className="text-2xl text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Mortality Rate</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageMortality}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <FaExclamationTriangle className="text-2xl text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 w-full">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search diseases by name, description, or affected organ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters and Add Button */}
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>

              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {severities.map(severity => (
                  <option key={severity} value={severity}>
                    {severity === 'all' ? 'All Severities' : severity}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="cases">Sort by Cases</option>
                <option value="severity">Sort by Severity</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2"
              >
                {sortOrder === 'asc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
                Sort
              </button>

              <button
                onClick={() => openModal('add')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaPlus />
                Add New Disease
              </button>
            </div>
          </div>
        </div>

        {/* Diseases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiseases.map((disease) => (
            <div
              key={disease.id}
              className={`bg-white rounded-xl border-2 ${disease.color} shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Disease Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      {disease.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{disease.name}</h3>
                      <p className="text-sm text-gray-600">{disease.category}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(disease.severity)}`}>
                    {disease.severity}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {disease.description}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <FaUserInjured />
                    <span>{disease.cases.toLocaleString()} cases</span>
                  </div>
                  <div className={`font-semibold ${disease.textColor}`}>
                    {disease.mortalityRate} mortality
                  </div>
                </div>
              </div>

              {/* Disease Body */}
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Affected Organ</h4>
                    <div className="flex items-center gap-2">
                      {disease.affectedOrgan === 'Lungs' && <FaLungs className="text-red-400" />}
                      {disease.affectedOrgan === 'Heart' && <FaHeart className="text-red-400" />}
                      {disease.affectedOrgan === 'Airways' && <FaLungs className="text-blue-400" />}
                      <span className="text-gray-900">{disease.affectedOrgan}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Symptoms</h4>
                    <div className="flex flex-wrap gap-1">
                      {disease.symptoms.slice(0, 3).map((symptom, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {symptom}
                        </span>
                      ))}
                      {disease.symptoms.length > 3 && (
                        <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">
                          +{disease.symptoms.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt />
                      <span>Updated: {disease.lastUpdated}</span>
                    </div>
                    <span className={disease.textColor}>{disease.prevalence}</span>
                  </div>
                </div>
              </div>

              {/* Disease Actions */}
              <div className="p-6 pt-0">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => openModal('view', disease)}
                    className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <FaEye size={18} />
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openModal('edit', disease)}
                      className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg transition-colors"
                      title="Edit Disease"
                    >
                      <FaEdit size={18} />
                    </button>
                    
                    <button
                      onClick={() => openModal('delete', disease)}
                      className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Disease"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDiseases.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
            <FaStethoscope className="mx-auto text-gray-400 text-4xl mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No diseases found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => openModal('add')}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 mx-auto"
            >
              <FaPlus />
              Add New Disease
            </button>
          </div>
        )}

        {/* Disease Count */}
        <div className="mt-6 text-sm text-gray-600">
          Showing {filteredDiseases.length} of {diseases.length} diseases
        </div>
      </div>

      {/* Modals */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            
            {/* Add Disease Modal */}
            {modalType === 'add' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Add New Disease</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                    <FaTimes size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Disease Name *
                      </label>
                      <input
                        type="text"
                        value={newDisease.name}
                        onChange={(e) => setNewDisease({...newDisease, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Asthma"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category *
                      </label>
                      <select
                        value={newDisease.category}
                        onChange={(e) => setNewDisease({...newDisease, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Lung Diseases">Lung Diseases</option>
                        <option value="Cancer">Cancer</option>
                        <option value="Infectious Diseases">Infectious Diseases</option>
                        <option value="Cardiovascular">Cardiovascular</option>
                        <option value="Respiratory Diseases">Respiratory Diseases</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      value={newDisease.description}
                      onChange={(e) => setNewDisease({...newDisease, description: e.target.value})}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Brief description of the disease..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Affected Organ *
                      </label>
                      <input
                        type="text"
                        value={newDisease.affectedOrgan}
                        onChange={(e) => setNewDisease({...newDisease, affectedOrgan: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Lungs, Heart, Liver"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Severity *
                      </label>
                      <select
                        value={newDisease.severity}
                        onChange={(e) => setNewDisease({...newDisease, severity: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Symptoms *
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={newDisease.currentSymptom}
                        onChange={(e) => setNewDisease({...newDisease, currentSymptom: e.target.value})}
                        onKeyPress={(e) => handleKeyPress(e, 'symptom')}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add a symptom and press Enter"
                      />
                      <button
                        onClick={addSymptom}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newDisease.symptoms.map((symptom, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center gap-1"
                        >
                          {symptom}
                          <button
                            onClick={() => removeSymptom(index)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <FaTimes size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Treatment
                      </label>
                      <textarea
                        value={newDisease.treatment}
                        onChange={(e) => setNewDisease({...newDisease, treatment: e.target.value})}
                        rows="2"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Common treatments..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prevention
                      </label>
                      <textarea
                        value={newDisease.prevention}
                        onChange={(e) => setNewDisease({...newDisease, prevention: e.target.value})}
                        rows="2"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Preventive measures..."
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddDisease}
                      disabled={!newDisease.name || !newDisease.description || !newDisease.affectedOrgan}
                      className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add Disease
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* View Disease Modal */}
            {modalType === 'view' && selectedDisease && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Disease Details</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                    <FaTimes size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      {selectedDisease.icon}
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900">{selectedDisease.name}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(selectedDisease.severity)}`}>
                          {selectedDisease.severity} Severity
                        </span>
                        <span className="text-gray-600">{selectedDisease.category}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 mb-2">Description</h5>
                    <p className="text-gray-600">{selectedDisease.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Affected Organ</h5>
                      <p className="text-gray-900">{selectedDisease.affectedOrgan}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Prevalence</h5>
                      <p className="text-gray-900">{selectedDisease.prevalence}</p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 mb-2">Symptoms</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedDisease.symptoms.map((symptom, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Treatment</h5>
                      <p className="text-gray-600 text-sm">{selectedDisease.treatment}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Prevention</h5>
                      <p className="text-gray-600 text-sm">{selectedDisease.prevention}</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Delete Disease Modal */}
            {modalType === 'delete' && selectedDisease && (
              <div className="p-6">
                <div className="text-center">
                  <FaTrash className="mx-auto text-red-500 text-4xl mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Disease</h3>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete <span className="font-semibold">{selectedDisease.name}</span>? 
                    This action cannot be undone.
                  </p>
                  
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={closeModal}
                      className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeleteDisease(selectedDisease.id)}
                      className="px-6 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
                    >
                      Delete Disease
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Disease_Categories;