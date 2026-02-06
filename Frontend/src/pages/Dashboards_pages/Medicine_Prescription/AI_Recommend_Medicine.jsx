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
  FaExchangeAlt
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
      patientAllergy: false
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
      patientAllergy: false
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
      patientAllergy: false
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
      patientAllergy: true
    }
  ]);

  // State for editing
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [prescriptionHistory, setPrescriptionHistory] = useState([]);

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
                         medicine.reason.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Start editing a medicine
  const startEdit = (medicine) => {
    setEditingId(medicine.id);
    setEditForm({
      dosage: medicine.dosage,
      frequency: medicine.frequency,
      duration: medicine.duration,
      doctorNotes: medicine.doctorNotes,
      status: medicine.status
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

  // Add custom medicine
  const addCustomMedicine = () => {
    const newMedicine = {
      id: medicines.length + 1,
      name: "Custom Medicine",
      brand: "Custom Brand",
      dosage: "Custom Dosage",
      frequency: "Custom Frequency",
      duration: "Custom Duration",
      aiConfidence: 0,
      status: "pending",
      reason: "Doctor's custom prescription",
      interactions: ["To be reviewed"],
      sideEffects: ["To be monitored"],
      cost: "Custom",
      lastUpdated: new Date().toISOString().split('T')[0],
      doctorApproved: true,
      doctorNotes: "Custom prescription added by doctor",
      aiScore: 0,
      patientAllergy: false
    };
    setMedicines([newMedicine, ...medicines]);
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

  // Medicine Detail Modal
  const MedicineDetailModal = ({ medicine, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{medicine.name}</h3>
              <p className="text-gray-600">{medicine.brand}</p>
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
            </div>

            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                  <FaAllergies /> Warnings
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
                  <div className="flex items-center gap-2">
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div className=''>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
                  <FaBrain size={28} />
                </div>
                AI-Recommended Medicines
              </h1>
              <p className="text-gray-600 mt-2">
                Review AI suggestions and customize prescriptions based on your clinical judgment
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
              >
                <FaHistory /> {showHistory ? 'Hide History' : 'View History'}
              </button>
              <button
                onClick={addCustomMedicine}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <FaPrescriptionBottleAlt /> Add Medicine
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Suggestions</p>
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

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search medicines by name, brand, or reason..."
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
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${filter === filterType 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
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
                    <th className="px4 py-3 text-left text-sm font-medium text-gray-700">Outcome</th>
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

        {/* Medicines List */}
        <div className="space-y-4">
          {filteredMedicines.map((medicine) => (
            <div key={medicine.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Medicine Header */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                      {medicine.patientAllergy ? <FaAllergies /> : <FaPills />}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{medicine.name}</h3>
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
        {filteredMedicines.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 bg-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No medicines found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Try adjusting your search or filter criteria. No AI recommendations match your current selection.
            </p>
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