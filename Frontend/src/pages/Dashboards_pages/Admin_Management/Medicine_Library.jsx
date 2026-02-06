import React, { useState } from 'react';
import {
  FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaEye,
  FaPills, FaCapsules, FaTablets, FaSyringe, FaFlask,
  FaHospital, FaUserMd, FaCalendarAlt, FaSortAmountDown,
  FaSortAmountUp, FaExclamationTriangle, FaCheckCircle,
  FaTimes, FaSave, FaPrescriptionBottleAlt, FaBox,
  FaShoppingCart, FaIndustry, FaWeight, FaTemperatureHigh,
  FaShieldAlt, FaFileMedical,
  FaHeartbeat
} from 'react-icons/fa';
import { GiMedicinePills } from 'react-icons/gi';

const Medicine_Library = () => {
  // Initial medicines data
  const initialMedicines = [
    {
      id: 1,
      name: "Amoxicillin",
      genericName: "Amoxicillin Trihydrate",
      type: "Antibiotic",
      form: "Tablet",
      strength: "500mg",
      manufacturer: "Getz Pharma",
      price: 120,
      stock: 150,
      category: "Antibacterial",
      sideEffects: ["Nausea", "Diarrhea", "Rash"],
      dosage: "1 tablet every 8 hours",
      storage: "Room temperature",
      expiryDate: "2025-06-30",
      prescriptionRequired: true,
      icon: <FaPills className="text-blue-500 text-2xl" />,
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-700"
    },
    {
      id: 2,
      name: "Paracetamol",
      genericName: "Acetaminophen",
      type: "Analgesic",
      form: "Tablet",
      strength: "500mg",
      manufacturer: "GlaxoSmithKline",
      price: 25,
      stock: 450,
      category: "Pain Relief",
      sideEffects: ["Rare", "Liver damage (overdose)"],
      dosage: "1-2 tablets every 4-6 hours",
      storage: "Room temperature",
      expiryDate: "2025-12-15",
      prescriptionRequired: false,
      icon: <FaTablets className="text-red-500 text-2xl" />,
      color: "bg-red-50 border-red-200",
      textColor: "text-red-700"
    },
    {
      id: 3,
      name: "Losartan",
      genericName: "Losartan Potassium",
      type: "Antihypertensive",
      form: "Tablet",
      strength: "50mg",
      manufacturer: "Sanofi",
      price: 180,
      stock: 85,
      category: "Cardiovascular",
      sideEffects: ["Dizziness", "Fatigue", "Cough"],
      dosage: "1 tablet daily",
      storage: "Room temperature",
      expiryDate: "2024-11-20",
      prescriptionRequired: true,
      icon: <FaHeartbeat className="text-purple-500 text-2xl" />,
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-700"
    },
    {
      id: 4,
      name: "Insulin Glargine",
      genericName: "Insulin Glargine",
      type: "Antidiabetic",
      form: "Injection",
      strength: "100 units/mL",
      manufacturer: "Novo Nordisk",
      price: 1250,
      stock: 35,
      category: "Endocrine",
      sideEffects: ["Hypoglycemia", "Weight gain"],
      dosage: "As prescribed by doctor",
      storage: "Refrigerated (2-8°C)",
      expiryDate: "2024-09-10",
      prescriptionRequired: true,
      icon: <FaSyringe className="text-green-500 text-2xl" />,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700"
    },
    {
      id: 5,
      name: "Omeprazole",
      genericName: "Omeprazole",
      type: "Antacid",
      form: "Capsule",
      strength: "20mg",
      manufacturer: "AstraZeneca",
      price: 95,
      stock: 200,
      category: "Gastrointestinal",
      sideEffects: ["Headache", "Nausea", "Diarrhea"],
      dosage: "1 capsule daily before meal",
      storage: "Room temperature",
      expiryDate: "2025-03-25",
      prescriptionRequired: false,
      icon: <FaCapsules className="text-orange-500 text-2xl" />,
      color: "bg-orange-50 border-orange-200",
      textColor: "text-orange-700"
    },
    {
      id: 6,
      name: "Salbutamol",
      genericName: "Salbutamol Sulfate",
      type: "Bronchodilator",
      form: "Inhaler",
      strength: "100mcg/puff",
      manufacturer: "GSK",
      price: 350,
      stock: 65,
      category: "Respiratory",
      sideEffects: ["Tremor", "Headache", "Palpitations"],
      dosage: "1-2 puffs as needed",
      storage: "Room temperature",
      expiryDate: "2024-08-15",
      prescriptionRequired: true,
      icon: <FaFlask className="text-cyan-500 text-2xl" />,
      color: "bg-cyan-50 border-cyan-200",
      textColor: "text-cyan-700"
    },
    {
      id: 7,
      name: "Cetirizine",
      genericName: "Cetirizine Hydrochloride",
      type: "Antihistamine",
      form: "Tablet",
      strength: "10mg",
      manufacturer: "Pfizer",
      price: 45,
      stock: 300,
      category: "Allergy",
      sideEffects: ["Drowsiness", "Dry mouth", "Headache"],
      dosage: "1 tablet daily",
      storage: "Room temperature",
      expiryDate: "2025-05-30",
      prescriptionRequired: false,
      icon: <GiMedicinePills className="text-pink-500 text-2xl" />,
      color: "bg-pink-50 border-pink-200",
      textColor: "text-pink-700"
    },
    {
      id: 8,
      name: "Atorvastatin",
      genericName: "Atorvastatin Calcium",
      type: "Statin",
      form: "Tablet",
      strength: "20mg",
      manufacturer: "Pfizer",
      price: 220,
      stock: 120,
      category: "Cardiovascular",
      sideEffects: ["Muscle pain", "Liver problems"],
      dosage: "1 tablet daily at bedtime",
      storage: "Room temperature",
      expiryDate: "2025-02-28",
      prescriptionRequired: true,
      icon: <FaPrescriptionBottleAlt className="text-indigo-500 text-2xl" />,
      color: "bg-indigo-50 border-indigo-200",
      textColor: "text-indigo-700"
    }
  ];

  // State management
  const [medicines, setMedicines] = useState(initialMedicines);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedForm, setSelectedForm] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'add', 'edit', 'delete', 'view'
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    genericName: '',
    type: 'Analgesic',
    form: 'Tablet',
    strength: '',
    manufacturer: '',
    price: '',
    stock: '',
    category: 'Pain Relief',
    sideEffects: [],
    dosage: '',
    storage: 'Room temperature',
    expiryDate: '',
    prescriptionRequired: false,
    currentSideEffect: ''
  });

  // Get unique values for filters
  const categories = ['all', ...new Set(medicines.map(med => med.category))];
  const types = ['all', ...new Set(medicines.map(med => med.type))];
  const forms = ['all', ...new Set(medicines.map(med => med.form))];

  // Filter and sort medicines
  const filteredMedicines = medicines
    .filter(medicine => {
      const matchesSearch = 
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
      const matchesType = selectedType === 'all' || medicine.type === selectedType;
      const matchesForm = selectedForm === 'all' || medicine.form === selectedForm;
      
      return matchesSearch && matchesCategory && matchesType && matchesForm;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'price' || sortBy === 'stock') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Get stats
  const stats = {
    totalMedicines: medicines.length,
    totalStock: medicines.reduce((sum, med) => sum + med.stock, 0),
    totalValue: medicines.reduce((sum, med) => sum + (med.price * med.stock), 0),
    prescriptionRequired: medicines.filter(med => med.prescriptionRequired).length,
    lowStock: medicines.filter(med => med.stock < 50).length,
    expiredSoon: medicines.filter(med => {
      const expiryDate = new Date(med.expiryDate);
      const today = new Date();
      const diffTime = expiryDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays < 90 && diffDays > 0;
    }).length
  };

  // Handle medicine actions
  const handleAddMedicine = () => {
    const newMedicineWithId = {
      ...newMedicine,
      id: medicines.length + 1,
      price: parseFloat(newMedicine.price),
      stock: parseInt(newMedicine.stock),
      icon: getFormIcon(newMedicine.form),
      color: getCategoryColor(newMedicine.category),
      textColor: getCategoryTextColor(newMedicine.category),
      sideEffects: newMedicine.sideEffects.filter(se => se.trim() !== '')
    };
    
    setMedicines([...medicines, newMedicineWithId]);
    resetNewMedicine();
    setShowModal(false);
  };

  const handleEditMedicine = () => {
    setMedicines(medicines.map(medicine => 
      medicine.id === selectedMedicine.id ? selectedMedicine : medicine
    ));
    setShowModal(false);
    setSelectedMedicine(null);
  };

  const handleDeleteMedicine = (medicineId) => {
    setMedicines(medicines.filter(medicine => medicine.id !== medicineId));
    setShowModal(false);
  };

  // Helper functions
  const getFormIcon = (form) => {
    switch(form) {
      case 'Tablet':
        return <FaTablets className="text-blue-500 text-2xl" />;
      case 'Capsule':
        return <FaCapsules className="text-orange-500 text-2xl" />;
      case 'Injection':
        return <FaSyringe className="text-green-500 text-2xl" />;
      case 'Inhaler':
        return <FaFlask className="text-cyan-500 text-2xl" />;
      default:
        return <FaPills className="text-gray-500 text-2xl" />;
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Antibacterial':
        return 'bg-blue-50 border-blue-200';
      case 'Pain Relief':
        return 'bg-red-50 border-red-200';
      case 'Cardiovascular':
        return 'bg-purple-50 border-purple-200';
      case 'Endocrine':
        return 'bg-green-50 border-green-200';
      case 'Gastrointestinal':
        return 'bg-orange-50 border-orange-200';
      case 'Respiratory':
        return 'bg-cyan-50 border-cyan-200';
      case 'Allergy':
        return 'bg-pink-50 border-pink-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getCategoryTextColor = (category) => {
    switch(category) {
      case 'Antibacterial':
        return 'text-blue-700';
      case 'Pain Relief':
        return 'text-red-700';
      case 'Cardiovascular':
        return 'text-purple-700';
      case 'Endocrine':
        return 'text-green-700';
      case 'Gastrointestinal':
        return 'text-orange-700';
      case 'Respiratory':
        return 'text-cyan-700';
      case 'Allergy':
        return 'text-pink-700';
      default:
        return 'text-gray-700';
    }
  };

  const getStockColor = (stock) => {
    if (stock < 20) return 'bg-red-100 text-red-800';
    if (stock < 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const resetNewMedicine = () => {
    setNewMedicine({
      name: '',
      genericName: '',
      type: 'Analgesic',
      form: 'Tablet',
      strength: '',
      manufacturer: '',
      price: '',
      stock: '',
      category: 'Pain Relief',
      sideEffects: [],
      dosage: '',
      storage: 'Room temperature',
      expiryDate: '',
      prescriptionRequired: false,
      currentSideEffect: ''
    });
  };

  // Modal handlers
  const openModal = (type, medicine = null) => {
    setModalType(type);
    if (type === 'edit' && medicine) {
      setSelectedMedicine({ ...medicine });
    } else if (type === 'add') {
      resetNewMedicine();
    } else if (medicine) {
      setSelectedMedicine(medicine);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMedicine(null);
  };

  // Add side effect to new medicine
  const addSideEffect = () => {
    if (newMedicine.currentSideEffect.trim()) {
      setNewMedicine({
        ...newMedicine,
        sideEffects: [...newMedicine.sideEffects, newMedicine.currentSideEffect],
        currentSideEffect: ''
      });
    }
  };

  // Remove side effect from new medicine
  const removeSideEffect = (index) => {
    const updatedSideEffects = [...newMedicine.sideEffects];
    updatedSideEffects.splice(index, 1);
    setNewMedicine({ ...newMedicine, sideEffects: updatedSideEffects });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Medicine Library Management
          </h1>
          <p className="text-gray-600">
            Manage medicine inventory, add new medicines, and track stock levels
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Medicines</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalMedicines}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaPills className="text-2xl text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Stock</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStock.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FaBox className="text-2xl text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Inventory Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  PKR {stats.totalValue.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <FaShoppingCart className="text-2xl text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Low Stock Alert</p>
                <p className="text-2xl font-bold text-gray-900">{stats.lowStock}</p>
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
                  placeholder="Search medicines by name, generic name, or manufacturer..."
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
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>

              <select
                value={selectedForm}
                onChange={(e) => setSelectedForm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {forms.map(form => (
                  <option key={form} value={form}>
                    {form === 'all' ? 'All Forms' : form}
                  </option>
                ))}
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
                Add New Medicine
              </button>
            </div>
          </div>
        </div>

        {/* Medicines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedicines.map((medicine) => (
            <div
              key={medicine.id}
              className={`bg-white rounded-xl border-2 ${medicine.color} shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Medicine Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      {medicine.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{medicine.name}</h3>
                      <p className="text-sm text-gray-600">{medicine.genericName}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStockColor(medicine.stock)}`}>
                    {medicine.stock} in stock
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="font-medium text-gray-700">{medicine.strength} • {medicine.form}</span>
                  <span className="font-bold text-green-600">PKR {medicine.price}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <FaIndustry />
                    <span className="truncate max-w-[120px]">{medicine.manufacturer}</span>
                  </div>
                  <div className={`font-medium ${medicine.textColor}`}>
                    {medicine.category}
                  </div>
                </div>
              </div>

              {/* Medicine Body */}
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Dosage</h4>
                    <p className="text-sm text-gray-900">{medicine.dosage}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">Storage</h4>
                      <p className="text-xs text-gray-600">{medicine.storage}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-1">Expiry</h4>
                      <p className="text-xs text-gray-600">{medicine.expiryDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      {medicine.prescriptionRequired ? (
                        <>
                          <FaFileMedical className="text-red-500" />
                          <span className="text-red-600">Prescription Required</span>
                        </>
                      ) : (
                        <>
                          <FaCheckCircle className="text-green-500" />
                          <span className="text-green-600">OTC Available</span>
                        </>
                      )}
                    </div>
                    <span className={medicine.textColor}>{medicine.type}</span>
                  </div>
                </div>
              </div>

              {/* Medicine Actions */}
              <div className="p-6 pt-0">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => openModal('view', medicine)}
                    className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <FaEye size={18} />
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openModal('edit', medicine)}
                      className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg transition-colors"
                      title="Edit Medicine"
                    >
                      <FaEdit size={18} />
                    </button>
                    
                    <button
                      onClick={() => openModal('delete', medicine)}
                      className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Medicine"
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
        {filteredMedicines.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
            <FaPills className="mx-auto text-gray-400 text-4xl mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No medicines found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => openModal('add')}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 mx-auto"
            >
              <FaPlus />
              Add New Medicine
            </button>
          </div>
        )}

        {/* Medicine Count */}
        <div className="mt-6 text-sm text-gray-600">
          Showing {filteredMedicines.length} of {medicines.length} medicines
        </div>
      </div>

      {/* Modals */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            
            {/* Add Medicine Modal */}
            {modalType === 'add' && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Add New Medicine</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                    <FaTimes size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Brand Name *
                      </label>
                      <input
                        type="text"
                        value={newMedicine.name}
                        onChange={(e) => setNewMedicine({...newMedicine, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Paracetamol"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Generic Name *
                      </label>
                      <input
                        type="text"
                        value={newMedicine.genericName}
                        onChange={(e) => setNewMedicine({...newMedicine, genericName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Acetaminophen"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type *
                      </label>
                      <select
                        value={newMedicine.type}
                        onChange={(e) => setNewMedicine({...newMedicine, type: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Analgesic">Analgesic</option>
                        <option value="Antibiotic">Antibiotic</option>
                        <option value="Antihypertensive">Antihypertensive</option>
                        <option value="Antidiabetic">Antidiabetic</option>
                        <option value="Antacid">Antacid</option>
                        <option value="Bronchodilator">Bronchodilator</option>
                        <option value="Antihistamine">Antihistamine</option>
                        <option value="Statin">Statin</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Form *
                      </label>
                      <select
                        value={newMedicine.form}
                        onChange={(e) => setNewMedicine({...newMedicine, form: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Tablet">Tablet</option>
                        <option value="Capsule">Capsule</option>
                        <option value="Injection">Injection</option>
                        <option value="Inhaler">Inhaler</option>
                        <option value="Syrup">Syrup</option>
                        <option value="Ointment">Ointment</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Strength *
                      </label>
                      <input
                        type="text"
                        value={newMedicine.strength}
                        onChange={(e) => setNewMedicine({...newMedicine, strength: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 500mg, 100 units/mL"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Manufacturer *
                      </label>
                      <input
                        type="text"
                        value={newMedicine.manufacturer}
                        onChange={(e) => setNewMedicine({...newMedicine, manufacturer: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Getz Pharma"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category *
                      </label>
                      <select
                        value={newMedicine.category}
                        onChange={(e) => setNewMedicine({...newMedicine, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Pain Relief">Pain Relief</option>
                        <option value="Antibacterial">Antibacterial</option>
                        <option value="Cardiovascular">Cardiovascular</option>
                        <option value="Endocrine">Endocrine</option>
                        <option value="Gastrointestinal">Gastrointestinal</option>
                        <option value="Respiratory">Respiratory</option>
                        <option value="Allergy">Allergy</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price (PKR) *
                      </label>
                      <input
                        type="number"
                        value={newMedicine.price}
                        onChange={(e) => setNewMedicine({...newMedicine, price: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 120"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock Quantity *
                      </label>
                      <input
                        type="number"
                        value={newMedicine.stock}
                        onChange={(e) => setNewMedicine({...newMedicine, stock: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 150"
                        min="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Side Effects
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={newMedicine.currentSideEffect}
                        onChange={(e) => setNewMedicine({...newMedicine, currentSideEffect: e.target.value})}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSideEffect())}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add side effect and press Enter"
                      />
                      <button
                        onClick={addSideEffect}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newMedicine.sideEffects.map((effect, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full flex items-center gap-1"
                        >
                          {effect}
                          <button
                            onClick={() => removeSideEffect(index)}
                            className="text-red-600 hover:text-red-800"
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
                        Dosage Instructions
                      </label>
                      <input
                        type="text"
                        value={newMedicine.dosage}
                        onChange={(e) => setNewMedicine({...newMedicine, dosage: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 1 tablet every 8 hours"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date *
                      </label>
                      <input
                        type="date"
                        value={newMedicine.expiryDate}
                        onChange={(e) => setNewMedicine({...newMedicine, expiryDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="prescriptionRequired"
                      checked={newMedicine.prescriptionRequired}
                      onChange={(e) => setNewMedicine({...newMedicine, prescriptionRequired: e.target.checked})}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="prescriptionRequired" className="text-sm text-gray-700">
                      Prescription Required
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddMedicine}
                      disabled={!newMedicine.name || !newMedicine.genericName || !newMedicine.strength || !newMedicine.price || !newMedicine.stock}
                      className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add Medicine
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* View Medicine Modal */}
            {modalType === 'view' && selectedMedicine && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Medicine Details</h3>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                    <FaTimes size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      {selectedMedicine.icon}
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900">{selectedMedicine.name}</h4>
                      <p className="text-gray-600">{selectedMedicine.genericName}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm font-medium text-gray-700">
                          {selectedMedicine.strength} • {selectedMedicine.form}
                        </span>
                        <span className="text-sm font-bold text-green-600">
                          PKR {selectedMedicine.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Manufacturer</h5>
                      <p className="text-gray-900">{selectedMedicine.manufacturer}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Category</h5>
                      <p className="text-gray-900">{selectedMedicine.category}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Type</h5>
                      <p className="text-gray-900">{selectedMedicine.type}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Stock</h5>
                      <p className={`font-medium ${getStockColor(selectedMedicine.stock)}`}>
                        {selectedMedicine.stock} units
                      </p>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 mb-2">Dosage Instructions</h5>
                    <p className="text-gray-900">{selectedMedicine.dosage}</p>
                  </div>

                  {selectedMedicine.sideEffects.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Side Effects</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedMedicine.sideEffects.map((effect, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded"
                          >
                            {effect}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Storage</h5>
                      <p className="text-gray-900">{selectedMedicine.storage}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Expiry Date</h5>
                      <p className="text-gray-900">{selectedMedicine.expiryDate}</p>
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

            {/* Delete Medicine Modal */}
            {modalType === 'delete' && selectedMedicine && (
              <div className="p-6">
                <div className="text-center">
                  <FaTrash className="mx-auto text-red-500 text-4xl mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Medicine</h3>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete <span className="font-semibold">{selectedMedicine.name}</span>? 
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
                      onClick={() => handleDeleteMedicine(selectedMedicine.id)}
                      className="px-6 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
                    >
                      Delete Medicine
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

export default Medicine_Library;