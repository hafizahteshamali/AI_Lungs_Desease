import React, { useState } from 'react';
import { 
  FaSearch, 
  FaPills, 
  FaUserMd, 
  FaCheck, 
  FaTimes, 
  FaEdit,
  FaExclamationTriangle,
  FaInfoCircle,
  FaFilter,
  FaPlus,
  FaTrash,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

const AI_Recommend_Medicine = () => {
  // Sample data for AI recommendations
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      patientId: 'P001234',
      condition: 'Pneumonia',
      aiConfidence: 92,
      aiSuggestedMedicines: [
        { name: 'Amoxicillin', dosage: '500mg', frequency: 'TDS', duration: '7 days', reason: 'First-line antibiotic for pneumonia' },
        { name: 'Azithromycin', dosage: '500mg', frequency: 'OD', duration: '5 days', reason: 'Covers atypical pathogens' },
        { name: 'Ibuprofen', dosage: '400mg', frequency: 'SOS', duration: '3 days', reason: 'For fever and pain management' }
      ],
      doctorOverride: null,
      status: 'pending',
      date: '2024-10-20',
      xrayId: 'XRAY-001',
      expanded: false
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      patientId: 'P001235',
      condition: 'Tibia Fracture',
      aiConfidence: 88,
      aiSuggestedMedicines: [
        { name: 'Paracetamol', dosage: '650mg', frequency: 'QID', duration: '5 days', reason: 'Pain management' },
        { name: 'Naproxen', dosage: '500mg', frequency: 'BD', duration: '7 days', reason: 'Anti-inflammatory' },
        { name: 'Calcium + Vit D', dosage: '500mg', frequency: 'OD', duration: '30 days', reason: 'Bone healing support' }
      ],
      doctorOverride: [
        { name: 'Tramadol', dosage: '50mg', frequency: 'SOS', duration: '3 days', reason: 'Severe pain management' }
      ],
      status: 'approved',
      date: '2024-10-19',
      xrayId: 'XRAY-002',
      expanded: false
    },
    {
      id: 3,
      patientName: 'Mike Johnson',
      patientId: 'P001236',
      condition: 'Spinal Degeneration',
      aiConfidence: 76,
      aiSuggestedMedicines: [
        { name: 'Gabapentin', dosage: '300mg', frequency: 'TDS', duration: '14 days', reason: 'Neuropathic pain relief' },
        { name: 'Diclofenac', dosage: '50mg', frequency: 'BD', duration: '10 days', reason: 'Anti-inflammatory' }
      ],
      doctorOverride: null,
      status: 'pending',
      date: '2024-10-18',
      xrayId: 'XRAY-003',
      expanded: false
    },
    {
      id: 4,
      patientName: 'Sarah Williams',
      patientId: 'P001237',
      condition: 'Carpal Fracture',
      aiConfidence: 95,
      aiSuggestedMedicines: [
        { name: 'Acetaminophen', dosage: '500mg', frequency: 'QID', duration: '7 days', reason: 'Pain relief' },
        { name: 'Ibuprofen', dosage: '400mg', frequency: 'TDS', duration: '5 days', reason: 'Reduce swelling' }
      ],
      doctorOverride: [
        { name: 'Acetaminophen', dosage: '500mg', frequency: 'QID', duration: '5 days', reason: 'Reduced duration as per assessment' }
      ],
      status: 'modified',
      date: '2024-10-17',
      xrayId: 'XRAY-004',
      expanded: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editedMedicines, setEditedMedicines] = useState([]);

  // Handle search
  const filteredRecommendations = recommendations.filter(rec => {
    const matchesSearch = 
      rec.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.xrayId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      filterStatus === 'all' || 
      rec.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Handle approve
  const handleApprove = (id) => {
    setRecommendations(recommendations.map(rec => 
      rec.id === id ? { ...rec, status: 'approved' } : rec
    ));
  };

  // Handle reject
  const handleReject = (id) => {
    setRecommendations(recommendations.map(rec => 
      rec.id === id ? { ...rec, status: 'rejected' } : rec
    ));
  };

  // Toggle expand
  const toggleExpand = (id) => {
    setRecommendations(recommendations.map(rec => 
      rec.id === id ? { ...rec, expanded: !rec.expanded } : rec
    ));
  };

  // Start editing
  const startEditing = (id, medicines) => {
    setEditingId(id);
    setEditedMedicines([...medicines]);
  };

  // Save edit
  const saveEdit = (id) => {
    setRecommendations(recommendations.map(rec => 
      rec.id === id ? { 
        ...rec, 
        doctorOverride: editedMedicines,
        status: 'modified',
        expanded: true
      } : rec
    ));
    setEditingId(null);
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditedMedicines([]);
  };

  // Add new medicine in edit mode
  const addNewMedicine = () => {
    setEditedMedicines([...editedMedicines, {
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      reason: ''
    }]);
  };

  // Update edited medicine
  const updateEditedMedicine = (index, field, value) => {
    const updated = [...editedMedicines];
    updated[index][field] = value;
    setEditedMedicines(updated);
  };

  // Remove medicine in edit mode
  const removeMedicine = (index) => {
    setEditedMedicines(editedMedicines.filter((_, i) => i !== index));
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'modified': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status text
  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'Pending Review';
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      case 'modified': return 'Modified';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Flexbox layout */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1 mb-4 md:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <FaPills className="text-blue-600 text-2xl" />
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  AI-Recommended Medicines
                </h1>
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                View auto-generated medicine suggestions based on X-ray analysis. Doctors can approve, modify, or reject recommendations.
              </p>
            </div>
            <div className="flex items-center">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center gap-1">
                <FaUserMd />
                Superadmin
              </span>
            </div>
          </div>
        </div>

        {/* Search and Filter - Flexbox layout */}
        <div className="mb-6 bg-white rounded-xl shadow p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative flex items-center">
                <FaSearch className="absolute left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by patient name, condition, or X-ray ID..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex">
              <div className="relative flex items-center w-full md:w-auto">
                <FaFilter className="absolute left-3 text-gray-400" />
                <select
                  className="w-full md:w-48 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="modified">Modified</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Stats - Flexbox layout */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-white rounded-xl shadow p-4">
              <div className="text-sm text-gray-600">Total Recommendations</div>
              <div className="text-2xl font-bold text-gray-900">{recommendations.length}</div>
            </div>
            <div className="flex-1 bg-white rounded-xl shadow p-4">
              <div className="text-sm text-gray-600">Pending Review</div>
              <div className="text-2xl font-bold text-yellow-600">
                {recommendations.filter(r => r.status === 'pending').length}
              </div>
            </div>
            <div className="flex-1 bg-white rounded-xl shadow p-4">
              <div className="text-sm text-gray-600">Approved</div>
              <div className="text-2xl font-bold text-green-600">
                {recommendations.filter(r => r.status === 'approved').length}
              </div>
            </div>
            <div className="flex-1 bg-white rounded-xl shadow p-4">
              <div className="text-sm text-gray-600">Modified by Doctors</div>
              <div className="text-2xl font-bold text-blue-600">
                {recommendations.filter(r => r.status === 'modified').length}
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations List */}
        <div className="space-y-4">
          {filteredRecommendations.map((recommendation) => (
            <div key={recommendation.id} className="bg-white rounded-xl shadow overflow-hidden">
              {/* Header - Flexbox layout */}
              <div className="border-b border-gray-200 p-4 bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1 mb-3 md:mb-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {recommendation.patientName}
                      </h3>
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                        ID: {recommendation.patientId}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(recommendation.status)}`}>
                        {getStatusText(recommendation.status)}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <FaInfoCircle className="text-sm" />
                        Condition: {recommendation.condition}
                      </span>
                      <span>X-ray: {recommendation.xrayId}</span>
                      <span>Date: {recommendation.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-3">
                    <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                      <FaExclamationTriangle className="text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">
                        AI: {recommendation.aiConfidence}%
                      </span>
                    </div>
                    <button
                      onClick={() => toggleExpand(recommendation.id)}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      {recommendation.expanded || editingId === recommendation.id ? 
                        <FaChevronUp className="text-gray-600" /> : 
                        <FaChevronDown className="text-gray-600" />
                      }
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {(recommendation.expanded || editingId === recommendation.id) && (
                <div className="p-4 md:p-6">
                  {/* AI-Suggested Medicines - Flexbox layout */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <FaPills className="text-green-600" />
                      <h4 className="text-md font-semibold text-gray-900">
                        AI-Suggested Medicines
                      </h4>
                    </div>
                    <div className="flex flex-col md:flex-row flex-wrap gap-4">
                      {recommendation.aiSuggestedMedicines.map((medicine, index) => (
                        <div key={index} className="flex-1 min-w-[250px] border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-gray-900">{medicine.name}</span>
                            <span className="text-sm font-semibold text-green-700 bg-green-100 px-2 py-1 rounded">
                              {medicine.dosage}
                            </span>
                          </div>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex justify-between">
                              <span>Frequency:</span>
                              <span className="font-medium">{medicine.frequency}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Duration:</span>
                              <span className="font-medium">{medicine.duration}</span>
                            </div>
                            <div className="text-gray-500 italic mt-2 text-xs md:text-sm">
                              "{medicine.reason}"
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Doctor Override Section */}
                  {editingId === recommendation.id ? (
                    // Edit Mode - Flexbox layout
                    <div className="border-t pt-6">
                      <div className="flex items-center gap-2 mb-4">
                        <FaEdit className="text-blue-600" />
                        <h4 className="text-md font-semibold text-gray-900">
                          Edit Medicine Prescription
                        </h4>
                      </div>
                      <div className="space-y-4">
                        {editedMedicines.map((medicine, index) => (
                          <div key={index} className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                            <div className="flex flex-col md:flex-row md:flex-wrap gap-3 mb-4">
                              <div className="flex-1 min-w-[200px]">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Medicine Name
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter medicine name"
                                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  value={medicine.name}
                                  onChange={(e) => updateEditedMedicine(index, 'name', e.target.value)}
                                />
                              </div>
                              <div className="flex-1 min-w-[150px]">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Dosage
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g., 500mg"
                                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  value={medicine.dosage}
                                  onChange={(e) => updateEditedMedicine(index, 'dosage', e.target.value)}
                                />
                              </div>
                              <div className="flex-1 min-w-[150px]">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Frequency
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g., TDS, BD"
                                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  value={medicine.frequency}
                                  onChange={(e) => updateEditedMedicine(index, 'frequency', e.target.value)}
                                />
                              </div>
                              <div className="flex-1 min-w-[150px]">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Duration
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g., 7 days"
                                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  value={medicine.duration}
                                  onChange={(e) => updateEditedMedicine(index, 'duration', e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Reason for prescription
                              </label>
                              <textarea
                                placeholder="Enter reason for prescribing this medicine"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                rows="2"
                                value={medicine.reason}
                                onChange={(e) => updateEditedMedicine(index, 'reason', e.target.value)}
                              />
                            </div>
                            <button
                              onClick={() => removeMedicine(index)}
                              className="mt-2 text-red-600 text-sm hover:text-red-800 flex items-center gap-1"
                            >
                              <FaTrash className="text-xs" /> Remove Medicine
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={addNewMedicine}
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <FaPlus /> Add Another Medicine
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-6">
                        <button
                          onClick={() => saveEdit(recommendation.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                        >
                          <FaCheck /> Save Changes
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
                        >
                          <FaTimes /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : recommendation.doctorOverride ? (
                    // Display Doctor Override - Flexbox layout
                    <div className="border-t pt-6">
                      <div className="flex items-center gap-2 mb-4">
                        <FaUserMd className="text-blue-600" />
                        <h4 className="text-md font-semibold text-gray-900">
                          Doctor's Modified Prescription
                        </h4>
                      </div>
                      <div className="flex flex-col md:flex-row flex-wrap gap-4">
                        {recommendation.doctorOverride.map((medicine, index) => (
                          <div key={index} className="flex-1 min-w-[250px] border border-blue-200 rounded-lg p-4 bg-blue-50">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-medium text-gray-900">{medicine.name}</span>
                              <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded">
                                {medicine.dosage}
                              </span>
                            </div>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex justify-between">
                                <span>Frequency:</span>
                                <span className="font-medium">{medicine.frequency}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Duration:</span>
                                <span className="font-medium">{medicine.duration}</span>
                              </div>
                              <div className="text-gray-500 italic mt-2 text-xs md:text-sm">
                                "{medicine.reason}"
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {/* Action Buttons - Flexbox layout */}
                  {editingId !== recommendation.id && (
                    <div className="border-t pt-6 mt-6">
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => handleApprove(recommendation.id)}
                          disabled={recommendation.status === 'approved'}
                          className={`px-4 py-2 rounded-lg flex items-center gap-2 flex-1 md:flex-none ${
                            recommendation.status === 'approved'
                              ? 'bg-green-100 text-green-700 cursor-not-allowed'
                              : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                        >
                          <FaCheck /> Approve AI Suggestion
                        </button>
                        <button
                          onClick={() => startEditing(recommendation.id, recommendation.aiSuggestedMedicines)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 flex-1 md:flex-none"
                        >
                          <FaEdit /> Edit/Modify
                        </button>
                        <button
                          onClick={() => handleReject(recommendation.id)}
                          disabled={recommendation.status === 'rejected'}
                          className={`px-4 py-2 rounded-lg flex items-center gap-2 flex-1 md:flex-none ${
                            recommendation.status === 'rejected'
                              ? 'bg-red-100 text-red-700 cursor-not-allowed'
                              : 'bg-red-600 text-white hover:bg-red-700'
                          }`}
                        >
                          <FaTimes /> Reject AI Suggestion
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Collapsed View Actions */}
              {!(recommendation.expanded || editingId === recommendation.id) && (
                <div className="p-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleApprove(recommendation.id)}
                      disabled={recommendation.status === 'approved'}
                      className={`px-3 py-1 text-sm rounded-lg flex items-center gap-1 ${
                        recommendation.status === 'approved'
                          ? 'bg-green-100 text-green-700 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      <FaCheck /> Approve
                    </button>
                    <button
                      onClick={() => startEditing(recommendation.id, recommendation.aiSuggestedMedicines)}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleReject(recommendation.id)}
                      disabled={recommendation.status === 'rejected'}
                      className={`px-3 py-1 text-sm rounded-lg flex items-center gap-1 ${
                        recommendation.status === 'rejected'
                          ? 'bg-red-100 text-red-700 cursor-not-allowed'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      <FaTimes /> Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Info - Flexbox layout */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex flex-col md:flex-row items-start gap-3">
            <FaInfoCircle className="text-blue-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-medium text-blue-900 mb-1">How it works:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li className="flex items-start gap-1">
                  <span>•</span>
                  <span>AI analyzes X-ray images and suggests appropriate medications based on detected conditions</span>
                </li>
                <li className="flex items-start gap-1">
                  <span>•</span>
                  <span>Doctors can approve, modify, or reject AI recommendations</span>
                </li>
                <li className="flex items-start gap-1">
                  <span>•</span>
                  <span>All modifications are logged for audit purposes</span>
                </li>
                <li className="flex items-start gap-1">
                  <span>•</span>
                  <span>Once approved, prescriptions are added to patient records</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI_Recommend_Medicine;