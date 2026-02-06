import React, { useState, useEffect } from 'react';
import {
  FaPills,
  FaUserMd,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaEdit,
  FaSave,
  FaUndo,
  FaHistory,
  FaInfoCircle,
  FaSearch,
  FaFilter,
  FaCalendarAlt,
  FaHeart,
  FaBrain,
  FaShieldAlt,
  FaClock,
  FaStar,
  FaThumbsUp,
  FaThumbsDown,
  FaPrescriptionBottleAlt,
  FaAllergies,
  FaSyringe,
  FaTablets,
  FaCapsules,
  FaFlask,
  FaChartLine,
  FaExchangeAlt,
  FaPlus,
  FaTrash,
  FaDownload,
  FaPrint,
  FaSort,
  FaSortUp,
  FaSortDown
} from 'react-icons/fa';

const AI_Recommend_Medicine = () => {
  // State for medicines
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: "Metformin Hydrochloride",
      brand: "Glucophage",
      dosage: "500mg",
      frequency: "Twice Daily",
      duration: "30 days",
      aiConfidence: 92,
      status: "recommended",
      reason: "First-line treatment for type 2 diabetes, matches patient's glucose levels",
      interactions: ["Low risk"],
      sideEffects: ["Nausea", "Diarrhea"],
      cost: "$15",
      lastUpdated: "2024-01-15",
      doctorApproved: false,
      doctorNotes: "",
      aiScore: 8.9,
      patientAllergy: false,
      category: "Diabetes",
      alternativeMedicines: ["Glipizide", "Sitagliptin"],
      patientAgeGroup: "Adult",
      renalFunction: "Normal",
      liverFunction: "Normal"
    },
    {
      id: 2,
      name: "Atorvastatin Calcium",
      brand: "Lipitor",
      dosage: "20mg",
      frequency: "Once Daily",
      duration: "60 days",
      aiConfidence: 85,
      status: "recommended",
      reason: "High LDL cholesterol detected, meets treatment criteria",
      interactions: ["Moderate with Warfarin"],
      sideEffects: ["Muscle pain", "Liver enzyme changes"],
      cost: "$45",
      lastUpdated: "2024-01-14",
      doctorApproved: false,
      doctorNotes: "",
      aiScore: 7.8,
      patientAllergy: false,
      category: "Cardiology",
      alternativeMedicines: ["Rosuvastatin", "Simvastatin"],
      patientAgeGroup: "Adult",
      renalFunction: "Normal",
      liverFunction: "Mild Impairment"
    },
    {
      id: 3,
      name: "Lisinopril",
      brand: "Zestril",
      dosage: "10mg",
      frequency: "Once Daily",
      duration: "30 days",
      aiConfidence: 78,
      status: "pending",
      reason: "Mild hypertension, but consider patient's kidney function",
      interactions: ["Low risk"],
      sideEffects: ["Cough", "Dizziness"],
      cost: "$12",
      lastUpdated: "2024-01-14",
      doctorApproved: false,
      doctorNotes: "",
      aiScore: 6.5,
      patientAllergy: false,
      category: "Hypertension",
      alternativeMedicines: ["Losartan", "Amlodipine"],
      patientAgeGroup: "Adult",
      renalFunction: "Mild Impairment",
      liverFunction: "Normal"
    },
    {
      id: 4,
      name: "Sertraline Hydrochloride",
      brand: "Zoloft",
      dosage: "50mg",
      frequency: "Once Daily",
      duration: "90 days",
      aiConfidence: 65,
      status: "not_recommended",
      reason: "Patient history shows adverse reactions to SSRIs",
      interactions: ["High with MAOIs"],
      sideEffects: ["Insomnia", "Sexual dysfunction"],
      cost: "$35",
      lastUpdated: "2024-01-13",
      doctorApproved: false,
      doctorNotes: "",
      aiScore: 4.2,
      patientAllergy: true,
      category: "Psychiatry",
      alternativeMedicines: ["Bupropion", "Duloxetine"],
      patientAgeGroup: "Adult",
      renalFunction: "Normal",
      liverFunction: "Normal"
    }
  ]);

  // State for new medicine form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    brand: "",
    dosage: "",
    frequency: "Once Daily",
    duration: "",
    reason: "",
    category: "General",
    interactions: "",
    sideEffects: "",
    cost: "",
    doctorNotes: ""
  });

  // State for editing
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [prescriptionHistory, setPrescriptionHistory] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Initialize prescription history
  useEffect(() => {
    setPrescriptionHistory([
      {
        id: 101,
        name: "Metformin",
        date: "2023-12-01",
        doctor: "Dr. Smith",
        status: "completed",
        outcome: "Good glucose control"
      },
      {
        id: 102,
        name: "Simvastatin",
        date: "2023-11-15",
        doctor: "Dr. Johnson",
        status: "discontinued",
        outcome: "Muscle pain reported"
      },
      {
        id: 103,
        name: "Losartan",
        date: "2023-10-20",
        doctor: "Dr. Williams",
        status: "completed",
        outcome: "BP well controlled"
      }
    ]);
  }, []);

  // Filter medicines
  const filteredMedicines = medicines.filter(medicine => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'recommended' && medicine.status === 'recommended') ||
                         (filter === 'pending' && medicine.status === 'pending') ||
                         (filter === 'not_recommended' && medicine.status === 'not_recommended') ||
                         (filter === 'approved' && medicine.doctorApproved);
    
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Handle sort
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="text-gray-400" />;
    if (sortConfig.direction === 'asc') return <FaSortUp className="text-blue-500" />;
    return <FaSortDown className="text-blue-500" />;
  };

  // Sort medicines (now using filteredMedicines which is already declared)
  const sortedMedicines = [...filteredMedicines].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Start editing a medicine
  const startEdit = (medicine) => {
    setEditingId(medicine.id);
    setEditForm({
      dosage: medicine.dosage,
      frequency: medicine.frequency,
      duration: medicine.duration,
      doctorNotes: medicine.doctorNotes,
      status: medicine.status,
      category: medicine.category
    });
  };

  // Save edits
  const saveEdit = (id) => {
    setMedicines(prev => prev.map(medicine => 
      medicine.id === id 
        ? { 
            ...medicine, 
            ...editForm,
            lastUpdated: new Date().toISOString().split('T')[0],
            doctorApproved: true
          }
        : medicine
    ));
    setEditingId(null);
    setEditForm({});
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  // Approve medicine
  const approveMedicine = (id) => {
    setMedicines(prev => prev.map(medicine => 
      medicine.id === id 
        ? { 
            ...medicine, 
            doctorApproved: true,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : medicine
    ));
  };

  // Reject medicine
  const rejectMedicine = (id) => {
    setMedicines(prev => prev.map(medicine => 
      medicine.id === id 
        ? { 
            ...medicine, 
            status: 'not_recommended',
            doctorApproved: false,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : medicine
    ));
  };

  // Add new medicine form
  const handleAddMedicine = () => {
    const medicineToAdd = {
      id: medicines.length + 1,
      name: newMedicine.name,
      brand: newMedicine.brand,
      dosage: newMedicine.dosage,
      frequency: newMedicine.frequency,
      duration: newMedicine.duration,
      aiConfidence: 0,
      status: "pending",
      reason: newMedicine.reason,
      interactions: [newMedicine.interactions],
      sideEffects: [newMedicine.sideEffects],
      cost: newMedicine.cost,
      lastUpdated: new Date().toISOString().split('T')[0],
      doctorApproved: true,
      doctorNotes: newMedicine.doctorNotes,
      aiScore: 0,
      patientAllergy: false,
      category: newMedicine.category
    };
    
    setMedicines([medicineToAdd, ...medicines]);
    setNewMedicine({
      name: "",
      brand: "",
      dosage: "",
      frequency: "Once Daily",
      duration: "",
      reason: "",
      category: "General",
      interactions: "",
      sideEffects: "",
      cost: "",
      doctorNotes: ""
    });
    setShowAddForm(false);
  };

  // Delete medicine
  const deleteMedicine = (id) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      setMedicines(prev => prev.filter(medicine => medicine.id !== id));
    }
  };

  // Export to PDF (simulated)
  const exportToPDF = () => {
    alert("Exporting prescription to PDF...");
    // In real implementation, you would use a PDF generation library
  };

  // Print prescription
  const printPrescription = () => {
    window.print();
  };

  // Get status color
  const getStatusColor = (status, approved) => {
    if (approved) return 'bg-green-100 text-green-800 border-green-300';
    if (status === 'recommended') return 'bg-blue-100 text-blue-800 border-blue-300';
    if (status === 'pending') return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    if (status === 'not_recommended') return 'bg-red-100 text-red-800 border-red-300';
    return 'bg-gray-100 text-gray-800 border-gray-300';
  };

  // Get status icon
  const getStatusIcon = (status, approved) => {
    if (approved) return <FaCheckCircle className="text-green-500" />;
    if (status === 'recommended') return <FaThumbsUp className="text-blue-500" />;
    if (status === 'pending') return <FaExclamationTriangle className="text-yellow-500" />;
    if (status === 'not_recommended') return <FaTimesCircle className="text-red-500" />;
    return null;
  };

  // Get confidence color
  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      Diabetes: 'bg-blue-100 text-blue-800',
      Cardiology: 'bg-red-100 text-red-800',
      Hypertension: 'bg-purple-100 text-purple-800',
      Psychiatry: 'bg-yellow-100 text-yellow-800',
      General: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  // Medicine Detail Modal
  const MedicineDetailModal = ({ medicine, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{medicine.name}</h3>
              <p className="text-gray-600">{medicine.brand}</p>
              <span className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(medicine.category)}`}>
                {medicine.category}
              </span>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FaTimesCircle size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <FaBrain /> AI Analysis
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Confidence Score:</span>
                    <span className={`font-bold ${getConfidenceColor(medicine.aiConfidence)}`}>
                      {medicine.aiConfidence}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">AI Score:</span>
                    <span className="font-bold">{medicine.aiScore}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(medicine.status, medicine.doctorApproved)}`}>
                      {medicine.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                  <FaPills /> Prescription Details
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dosage:</span>
                    <span className="font-bold">{medicine.dosage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frequency:</span>
                    <span className="font-bold">{medicine.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-bold">{medicine.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost:</span>
                    <span className="font-bold">{medicine.cost}</span>
                  </div>
                </div>
              </div>

              {medicine.alternativeMedicines && medicine.alternativeMedicines.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <FaExchangeAlt /> Alternative Medicines
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {medicine.alternativeMedicines.map((alt, index) => (
                      <span key={index} className="px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm">
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                  <FaAllergies /> Warnings & Interactions
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Allergy Risk:</span>
                    {medicine.patientAllergy ? (
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold">HIGH RISK</span>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Low Risk</span>
                    )}
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-600">Interactions:</span>
                    <span className="text-sm">{medicine.interactions.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                  <FaExclamationTriangle /> Side Effects
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  {medicine.sideEffects.map((effect, index) => (
                    <li key={index} className="text-gray-700">{effect}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                  <FaInfoCircle /> AI Reasoning
                </h4>
                <p className="text-gray-700">{medicine.reason}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Doctor's Notes</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              {medicine.doctorNotes || "No doctor notes available"}
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => {
                startEdit(medicine);
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <FaEdit /> Edit Prescription
            </button>
            {!medicine.doctorApproved && (
              <button
                onClick={() => {
                  approveMedicine(medicine.id);
                  onClose();
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <FaCheckCircle /> Approve
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Edit Form Component
  const EditForm = ({ medicine }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-blue-200 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-blue-900 flex items-center gap-2">
          <FaEdit /> Edit Prescription: {medicine.name}
        </h4>
        <button
          onClick={cancelEdit}
          className="text-gray-400 hover:text-gray-600"
        >
          <FaTimesCircle size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dosage
          </label>
          <input
            type="text"
            value={editForm.dosage || ''}
            onChange={(e) => setEditForm({ ...editForm, dosage: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter dosage"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Frequency
          </label>
          <select
            value={editForm.frequency || ''}
            onChange={(e) => setEditForm({ ...editForm, frequency: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Once Daily">Once Daily</option>
            <option value="Twice Daily">Twice Daily</option>
            <option value="Three Times Daily">Three Times Daily</option>
            <option value="Four Times Daily">Four Times Daily</option>
            <option value="As Needed">As Needed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration
          </label>
          <input
            type="text"
            value={editForm.duration || ''}
            onChange={(e) => setEditForm({ ...editForm, duration: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 30 days"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={editForm.category || ''}
            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Diabetes">Diabetes</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Hypertension">Hypertension</option>
            <option value="Psychiatry">Psychiatry</option>
            <option value="General">General</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={editForm.status || ''}
            onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="recommended">Recommended</option>
            <option value="pending">Pending Review</option>
            <option value="not_recommended">Not Recommended</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Doctor's Notes
          </label>
          <textarea
            value={editForm.doctorNotes || ''}
            onChange={(e) => setEditForm({ ...editForm, doctorNotes: e.target.value })}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add your clinical notes or reasoning..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={cancelEdit}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2"
        >
          <FaUndo /> Cancel
        </button>
        <button
          onClick={() => saveEdit(medicine.id)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaSave /> Save Changes
        </button>
      </div>
    </div>
  );

  // Add Medicine Form Component
  const AddMedicineForm = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-green-200 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-green-900 flex items-center gap-2">
          <FaPlus /> Add New Medicine
        </h4>
        <button
          onClick={() => setShowAddForm(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <FaTimesCircle size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Medicine Name *
          </label>
          <input
            type="text"
            value={newMedicine.name}
            onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter medicine name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand Name
          </label>
          <input
            type="text"
            value={newMedicine.brand}
            onChange={(e) => setNewMedicine({ ...newMedicine, brand: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter brand name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dosage *
          </label>
          <input
            type="text"
            value={newMedicine.dosage}
            onChange={(e) => setNewMedicine({ ...newMedicine, dosage: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g., 500mg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Frequency
          </label>
          <select
            value={newMedicine.frequency}
            onChange={(e) => setNewMedicine({ ...newMedicine, frequency: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="Once Daily">Once Daily</option>
            <option value="Twice Daily">Twice Daily</option>
            <option value="Three Times Daily">Three Times Daily</option>
            <option value="Four Times Daily">Four Times Daily</option>
            <option value="As Needed">As Needed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration
          </label>
          <input
            type="text"
            value={newMedicine.duration}
            onChange={(e) => setNewMedicine({ ...newMedicine, duration: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g., 30 days"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={newMedicine.category}
            onChange={(e) => setNewMedicine({ ...newMedicine, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="General">General</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Hypertension">Hypertension</option>
            <option value="Psychiatry">Psychiatry</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reason for Prescription
          </label>
          <textarea
            value={newMedicine.reason}
            onChange={(e) => setNewMedicine({ ...newMedicine, reason: e.target.value })}
            rows="2"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter reason for prescribing this medicine..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Side Effects
          </label>
          <input
            type="text"
            value={newMedicine.sideEffects}
            onChange={(e) => setNewMedicine({ ...newMedicine, sideEffects: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g., Nausea, Headache"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cost
          </label>
          <input
            type="text"
            value={newMedicine.cost}
            onChange={(e) => setNewMedicine({ ...newMedicine, cost: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g., $25"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Doctor's Notes
          </label>
          <textarea
            value={newMedicine.doctorNotes}
            onChange={(e) => setNewMedicine({ ...newMedicine, doctorNotes: e.target.value })}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Add any additional notes..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={() => setShowAddForm(false)}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2"
        >
          <FaTimesCircle /> Cancel
        </button>
        <button
          onClick={handleAddMedicine}
          disabled={!newMedicine.name || !newMedicine.dosage}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            !newMedicine.name || !newMedicine.dosage
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          <FaSave /> Add Medicine
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
                  <FaBrain size={28} />
                </div>
                Medicine Recommendations
              </h1>
              <p className="text-gray-600 mt-2">
                Review and manage AI-generated medicine recommendations with clinical oversight
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
              >
                <FaHistory /> {showHistory ? 'Hide History' : 'View History'}
              </button>
              <button
                onClick={exportToPDF}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <FaDownload /> Export PDF
              </button>
              <button
                onClick={printPrescription}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
              >
                <FaPrint /> Print
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <FaPlus /> Add Medicine
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Medicines</p>
                  <p className="text-2xl font-bold text-gray-900">{medicines.length}</p>
                </div>
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                  <FaPills size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {medicines.filter(m => m.doctorApproved).length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                  <FaCheckCircle size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {medicines.filter(m => m.status === 'pending').length}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
                  <FaExclamationTriangle size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">AI Accuracy</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(medicines.reduce((acc, m) => acc + m.aiConfidence, 0) / medicines.length)}%
                  </p>
                </div>
                <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                  <FaChartLine size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Medicine Form */}
        {showAddForm && <AddMedicineForm />}

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search medicines by name, brand, category, or reason..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {['all', 'recommended', 'pending', 'not_recommended', 'approved'].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    filter === filterType 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FaFilter size={14} />
                  {filterType === 'all' && 'All'}
                  {filterType === 'recommended' && 'Recommended'}
                  {filterType === 'pending' && 'Pending'}
                  {filterType === 'not_recommended' && 'Not Recommended'}
                  {filterType === 'approved' && 'Approved'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Prescription History */}
        {showHistory && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <FaHistory /> Prescription History
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Medicine</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Doctor</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {prescriptionHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.doctor}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'completed' ? 'bg-green-100 text-green-800' :
                          item.status === 'discontinued' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.outcome}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Medicines List Header with Sort */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-4 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Recommended Medicines ({sortedMedicines.length})</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Sort by:</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Name {getSortIcon('name')}
                  </button>
                  <button 
                    onClick={() => handleSort('aiConfidence')}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    AI Confidence {getSortIcon('aiConfidence')}
                  </button>
                  <button 
                    onClick={() => handleSort('lastUpdated')}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Last Updated {getSortIcon('lastUpdated')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Medicines List */}
        <div className="space-y-4">
          {sortedMedicines.map((medicine) => (
            <div key={medicine.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Medicine Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                      {medicine.patientAllergy ? <FaAllergies /> : <FaPills />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900">{medicine.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(medicine.category)}`}>
                          {medicine.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{medicine.brand}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(medicine.status, medicine.doctorApproved)}`}>
                      {getStatusIcon(medicine.status, medicine.doctorApproved)}
                      {medicine.doctorApproved ? 'Approved' : medicine.status}
                    </span>
                    <div className={`px-3 py-1 rounded-full text-sm font-bold ${getConfidenceColor(medicine.aiConfidence)}`}>
                      AI: {medicine.aiConfidence}%
                    </div>
                    <button
                      onClick={() => deleteMedicine(medicine.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete medicine"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>

              {/* Medicine Details */}
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <FaTablets className="text-gray-400" />
                      <span className="text-gray-600">Dosage:</span>
                      <span className="font-medium">{medicine.dosage}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaClock className="text-gray-400" />
                      <span className="text-gray-600">Frequency:</span>
                      <span className="font-medium">{medicine.frequency}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaCalendarAlt className="text-gray-400" />
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{medicine.duration}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <FaInfoCircle className="text-gray-400" />
                      <span className="text-gray-600">Reason:</span>
                      <span className="font-medium">{medicine.reason}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaExchangeAlt className="text-gray-400" />
                      <span className="text-gray-600">Interactions:</span>
                      <span className="font-medium">{medicine.interactions.join(', ')}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <FaExclamationTriangle className="text-gray-400" />
                      <span className="text-gray-600">Side Effects:</span>
                      <span className="font-medium">{medicine.sideEffects.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaShieldAlt className="text-gray-400" />
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-medium">{medicine.lastUpdated}</span>
                    </div>
                  </div>
                </div>

                {/* Doctor Notes */}
                {medicine.doctorNotes && (
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2 text-sm text-blue-800 mb-1">
                      <FaUserMd /> Doctor's Notes:
                    </div>
                    <p className="text-sm text-blue-900">{medicine.doctorNotes}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setSelectedMedicine(medicine)}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2 text-sm"
                  >
                    <FaInfoCircle /> View Details
                  </button>
                  <button
                    onClick={() => startEdit(medicine)}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
                  >
                    <FaEdit /> Edit
                  </button>
                  {!medicine.doctorApproved && (
                    <>
                      <button
                        onClick={() => approveMedicine(medicine.id)}
                        className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm"
                      >
                        <FaCheckCircle /> Approve
                      </button>
                      <button
                        onClick={() => rejectMedicine(medicine.id)}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 text-sm"
                      >
                        <FaTimesCircle /> Reject
                      </button>
                    </>
                  )}
                  {medicine.doctorApproved && (
                    <span className="px-3 py-2 bg-green-100 text-green-800 rounded-lg flex items-center gap-2 text-sm">
                      <FaCheckCircle /> Approved by Doctor
                    </span>
                  )}
                </div>
              </div>

              {/* Edit Form */}
              {editingId === medicine.id && <EditForm medicine={medicine} />}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedMedicines.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No medicines found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              Try adjusting your search or filter criteria. No AI recommendations match your current selection.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 mx-auto"
            >
              <FaPlus /> Add New Medicine
            </button>
          </div>
        )}

        {/* Summary */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FaChartLine /> Prescription Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">AI Recommendations</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {medicines.filter(m => m.status === 'recommended').length}
                  </p>
                </div>
                <FaBrain className="text-blue-600 text-2xl" />
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Doctor Modifications</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {medicines.filter(m => m.doctorNotes).length}
                  </p>
                </div>
                <FaUserMd className="text-green-600 text-2xl" />
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Average AI Confidence</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(medicines.reduce((acc, m) => acc + m.aiConfidence, 0) / medicines.length)}%
                  </p>
                </div>
                <FaStar className="text-purple-600 text-2xl" />
              </div>
            </div>
          </div>
          
          {/* Category Distribution */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4">Medicine Categories</h4>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(medicines.map(m => m.category))).map(category => {
                const count = medicines.filter(m => m.category === category).length;
                return (
                  <div key={category} className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                    <span className={`w-3 h-3 rounded-full ${getCategoryColor(category).split(' ')[0]}`}></span>
                    <span className="font-medium">{category}</span>
                    <span className="text-gray-600">({count})</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Medicine Detail Modal */}
      {selectedMedicine && (
        <MedicineDetailModal
          medicine={selectedMedicine}
          onClose={() => setSelectedMedicine(null)}
        />
      )}
    </div>
  );
};

export default AI_Recommend_Medicine;