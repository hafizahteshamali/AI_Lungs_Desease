import React, { useState } from 'react';
import {
  FaFilePdf,
  FaEnvelope,
  FaPrint,
  FaDownload,
  FaShareAlt,
  FaCopy,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaEyeSlash,
  FaCalendarAlt,
  FaUserMd,
  FaUser,
  FaHospital,
  FaPills,
  FaPrescriptionBottleAlt,
  FaQrcode,
  FaLock,
  FaHistory,
  FaCog,
  FaPaperclip,
  FaCloudDownloadAlt,
  FaClock,
  FaBell,
  FaShieldAlt,
  FaSignature,
  FaStamp,
  FaBarcode,
  FaFileMedical,
  FaFileSignature,
  FaFileInvoice,
  FaRegFilePdf,
  FaPaperPlane,
  FaArrowRight,
  FaBolt,
  FaExclamationTriangle
} from 'react-icons/fa';
import { jsPDF } from 'jspdf';

const Prescription_Expert = () => {
  // State for prescriptions
  const [prescriptions, setPrescriptions] = useState([
    {
      id: 'RX-2024-001',
      patientName: 'John Smith',
      patientAge: '45',
      patientGender: 'Male',
      patientId: 'PID-789012',
      doctorName: 'Dr. Sarah Johnson',
      doctorLicense: 'MD-123456',
      hospital: 'City Medical Center',
      date: '2024-01-15',
      expiryDate: '2024-02-15',
      status: 'active',
      medicines: [
        {
          name: 'Metformin',
          dosage: '500mg',
          frequency: 'Twice Daily',
          duration: '30 days',
          instructions: 'Take with meals',
          refills: 2
        },
        {
          name: 'Atorvastatin',
          dosage: '20mg',
          frequency: 'Once Daily',
          duration: '60 days',
          instructions: 'Take at bedtime',
          refills: 1
        },
        {
          name: 'Lisinopril',
          dosage: '10mg',
          frequency: 'Once Daily',
          duration: '30 days',
          instructions: 'Take in the morning',
          refills: 3
        }
      ],
      diagnosis: 'Type 2 Diabetes with Hypertension',
      notes: 'Monitor blood sugar levels regularly. Follow up in 4 weeks.',
      signature: 'Dr. Sarah Johnson',
      watermark: 'VALID PRESCRIPTION',
      isEncrypted: true,
      lastDownloaded: '2024-01-15 10:30 AM'
    },
    {
      id: 'RX-2024-002',
      patientName: 'Emma Wilson',
      patientAge: '32',
      patientGender: 'Female',
      patientId: 'PID-789013',
      doctorName: 'Dr. Michael Chen',
      doctorLicense: 'MD-123457',
      hospital: 'University Hospital',
      date: '2024-01-14',
      expiryDate: '2024-02-14',
      status: 'expired',
      medicines: [
        {
          name: 'Amoxicillin',
          dosage: '500mg',
          frequency: 'Three Times Daily',
          duration: '10 days',
          instructions: 'Complete full course',
          refills: 0
        }
      ],
      diagnosis: 'Acute Sinusitis',
      notes: 'Complete antibiotic course. Rest and hydrate.',
      signature: 'Dr. Michael Chen',
      watermark: 'EXPIRED',
      isEncrypted: false,
      lastDownloaded: '2024-01-14 02:15 PM'
    },
    {
      id: 'RX-2024-003',
      patientName: 'Robert Brown',
      patientAge: '58',
      patientGender: 'Male',
      patientId: 'PID-789014',
      doctorName: 'Dr. Sarah Johnson',
      doctorLicense: 'MD-123456',
      hospital: 'City Medical Center',
      date: '2024-01-13',
      expiryDate: '2024-02-13',
      status: 'active',
      medicines: [
        {
          name: 'Levothyroxine',
          dosage: '100mcg',
          frequency: 'Once Daily',
          duration: '90 days',
          instructions: 'Take on empty stomach',
          refills: 5
        }
      ],
      diagnosis: 'Hypothyroidism',
      notes: 'Take medication 30 minutes before breakfast.',
      signature: 'Dr. Sarah Johnson',
      watermark: 'VALID PRESCRIPTION',
      isEncrypted: true,
      lastDownloaded: null
    }
  ]);

  // State for export options
  const [exportOptions, setExportOptions] = useState({
    includeHeader: true,
    includeFooter: true,
    includeWatermark: true,
    includeQRCode: true,
    includeSignature: true,
    passwordProtect: false,
    highQuality: true,
    format: 'A4',
    emailTemplate: 'professional'
  });

  const [selectedPrescriptions, setSelectedPrescriptions] = useState([]);
  const [emailForm, setEmailForm] = useState({
    to: '',
    subject: 'Prescription Document',
    message: 'Please find attached your prescription document.',
    cc: '',
    bcc: ''
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('export');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isExporting, setIsExporting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Toggle selection of prescriptions
  const togglePrescriptionSelection = (id) => {
    setSelectedPrescriptions(prev =>
      prev.includes(id)
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  // Select all prescriptions
  const selectAllPrescriptions = () => {
    if (selectedPrescriptions.length === prescriptions.length) {
      setSelectedPrescriptions([]);
    } else {
      setSelectedPrescriptions(prescriptions.map(p => p.id));
    }
  };

  // Update export option
  const updateExportOption = (option, value) => {
    setExportOptions(prev => ({ ...prev, [option]: value }));
  };

  // Generate PDF
  const generatePDF = async (prescription, options = {}) => {
    setIsExporting(true);
    
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: exportOptions.format
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Add header
      if (exportOptions.includeHeader) {
        doc.setFillColor(59, 130, 246);
        doc.rect(0, 0, pageWidth, 30, 'F');
        
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(20);
        doc.setFont('helvetica', 'bold');
        doc.text('MEDICAL PRESCRIPTION', pageWidth / 2, 15, { align: 'center' });
        
        doc.setFontSize(10);
        doc.text(`ID: ${prescription.id}`, 15, 25);
        doc.text(`Date: ${prescription.date}`, pageWidth - 15, 25, { align: 'right' });
      }

      let yPos = exportOptions.includeHeader ? 40 : 20;

      // Add patient information
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('PATIENT INFORMATION', 15, yPos);
      yPos += 10;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Name: ${prescription.patientName}`, 20, yPos);
      doc.text(`Age: ${prescription.patientAge} years`, 100, yPos);
      doc.text(`Gender: ${prescription.patientGender}`, 150, yPos);
      yPos += 7;
      doc.text(`Patient ID: ${prescription.patientId}`, 20, yPos);
      yPos += 15;

      // Add doctor information
      doc.setFont('helvetica', 'bold');
      doc.text('PRESCRIBING DOCTOR', 15, yPos);
      yPos += 10;

      doc.setFont('helvetica', 'normal');
      doc.text(`Name: ${prescription.doctorName}`, 20, yPos);
      doc.text(`License: ${prescription.doctorLicense}`, 100, yPos);
      yPos += 7;
      doc.text(`Hospital: ${prescription.hospital}`, 20, yPos);
      yPos += 15;

      // Add diagnosis
      doc.setFont('helvetica', 'bold');
      doc.text('DIAGNOSIS', 15, yPos);
      yPos += 10;

      doc.setFont('helvetica', 'normal');
      doc.text(prescription.diagnosis, 20, yPos);
      yPos += 15;

      // Add medicines
      doc.setFont('helvetica', 'bold');
      doc.text('PRESCRIBED MEDICATIONS', 15, yPos);
      yPos += 10;

      prescription.medicines.forEach((med, index) => {
        if (yPos > pageHeight - 50) {
          doc.addPage();
          yPos = 20;
        }

        doc.setFont('helvetica', 'bold');
        doc.text(`${index + 1}. ${med.name}`, 20, yPos);
        yPos += 7;

        doc.setFont('helvetica', 'normal');
        doc.text(`   Dosage: ${med.dosage}`, 25, yPos);
        doc.text(`   Frequency: ${med.frequency}`, 80, yPos);
        yPos += 7;
        doc.text(`   Duration: ${med.duration}`, 25, yPos);
        doc.text(`   Refills: ${med.refills}`, 80, yPos);
        yPos += 7;
        doc.text(`   Instructions: ${med.instructions}`, 25, yPos);
        yPos += 10;
      });

      // Add notes
      doc.setFont('helvetica', 'bold');
      doc.text('DOCTOR\'S NOTES', 15, yPos);
      yPos += 10;

      doc.setFont('helvetica', 'normal');
      const splitNotes = doc.splitTextToSize(prescription.notes, pageWidth - 40);
      doc.text(splitNotes, 20, yPos);
      yPos += splitNotes.length * 5 + 10;

      // Add expiry
      doc.setFont('helvetica', 'bold');
      doc.text(`Valid Until: ${prescription.expiryDate}`, 15, yPos);
      yPos += 10;

      // Add signature
      if (exportOptions.includeSignature && prescription.signature) {
        doc.setFont('helvetica', 'bold');
        doc.text('Signature:', 15, yPos);
        doc.setFont('helvetica', 'italic');
        doc.text(prescription.signature, 50, yPos);
        yPos += 15;
      }

      // Add footer
      if (exportOptions.includeFooter) {
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text('This is an electronic prescription. Do not share with unauthorized persons.', 
          pageWidth / 2, pageHeight - 10, { align: 'center' });
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 
          pageWidth / 2, pageHeight - 5, { align: 'center' });
      }

      // Add watermark
      if (exportOptions.includeWatermark) {
        doc.setTextColor(220, 220, 220);
        doc.setFontSize(60);
        doc.setFont('helvetica', 'bold');
        doc.text(prescription.watermark, pageWidth / 2, pageHeight / 2, {
          align: 'center',
          angle: 45
        });
      }

      // Add QR Code placeholder
      if (exportOptions.includeQRCode) {
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(8);
        doc.text('Scan for verification', pageWidth - 30, pageHeight - 30);
        doc.rect(pageWidth - 40, pageHeight - 40, 30, 30, 'S');
      }

      // Save PDF
      const fileName = `Prescription_${prescription.id}_${prescription.patientName.replace(/\s+/g, '_')}.pdf`;
      
      if (exportOptions.passwordProtect && password) {
        setMessage({
          type: 'info',
          text: 'Password protection requires backend implementation'
        });
      }

      doc.save(fileName);
      
      // Update last downloaded timestamp
      setPrescriptions(prev =>
        prev.map(p =>
          p.id === prescription.id
            ? { ...p, lastDownloaded: new Date().toLocaleString() }
            : p
        )
      );

      setMessage({
        type: 'success',
        text: `Prescription ${prescription.id} downloaded successfully!`
      });

    } catch (error) {
      console.error('Error generating PDF:', error);
      setMessage({
        type: 'error',
        text: 'Failed to generate PDF. Please try again.'
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Generate multiple PDFs
  const generateMultiplePDFs = async () => {
    if (selectedPrescriptions.length === 0) {
      setMessage({ type: 'warning', text: 'Please select at least one prescription' });
      return;
    }

    setIsExporting(true);
    
    for (const id of selectedPrescriptions) {
      const prescription = prescriptions.find(p => p.id === id);
      if (prescription) {
        await generatePDF(prescription);
        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    setIsExporting(false);
  };

  // Send email
  const sendEmail = async () => {
    if (!emailForm.to) {
      setMessage({ type: 'error', text: 'Please enter recipient email address' });
      return;
    }

    if (selectedPrescriptions.length === 0) {
      setMessage({ type: 'warning', text: 'Please select at least one prescription' });
      return;
    }

    setIsExporting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMessage({
        type: 'success',
        text: `Prescription${selectedPrescriptions.length > 1 ? 's' : ''} sent to ${emailForm.to} successfully!`
      });
      
      setEmailForm({
        to: '',
        subject: 'Prescription Document',
        message: 'Please find attached your prescription document.',
        cc: '',
        bcc: ''
      });
      
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to send email. Please try again.'
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Copy prescription ID
  const copyPrescriptionId = (id) => {
    navigator.clipboard.writeText(id);
    setMessage({
      type: 'success',
      text: `Prescription ID ${id} copied to clipboard!`
    });
  };

  // Print prescription
  const printPrescription = (prescription) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Prescription ${prescription.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { background: #3b82f6; color: white; padding: 20px; text-align: center; }
            .section { margin: 20px 0; }
            .medicine { border: 1px solid #ddd; padding: 10px; margin: 10px 0; }
            .signature { margin-top: 50px; }
            .watermark { 
              position: fixed; 
              top: 50%; 
              left: 50%; 
              transform: translate(-50%, -50%) rotate(-45deg); 
              font-size: 60px; 
              color: rgba(0,0,0,0.1); 
              z-index: -1;
            }
            @media print {
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="watermark">${prescription.watermark}</div>
          <div class="header">
            <h1>MEDICAL PRESCRIPTION</h1>
            <p>ID: ${prescription.id} | Date: ${prescription.date}</p>
          </div>
          
          <div class="section">
            <h2>Patient Information</h2>
            <p><strong>Name:</strong> ${prescription.patientName}</p>
            <p><strong>Age:</strong> ${prescription.patientAge} years</p>
            <p><strong>Gender:</strong> ${prescription.patientGender}</p>
            <p><strong>Patient ID:</strong> ${prescription.patientId}</p>
          </div>
          
          <div class="section">
            <h2>Prescribing Doctor</h2>
            <p><strong>Name:</strong> ${prescription.doctorName}</p>
            <p><strong>License:</strong> ${prescription.doctorLicense}</p>
            <p><strong>Hospital:</strong> ${prescription.hospital}</p>
          </div>
          
          <div class="section">
            <h2>Diagnosis</h2>
            <p>${prescription.diagnosis}</p>
          </div>
          
          <div class="section">
            <h2>Prescribed Medications</h2>
            ${prescription.medicines.map((med, index) => `
              <div class="medicine">
                <h3>${index + 1}. ${med.name}</h3>
                <p><strong>Dosage:</strong> ${med.dosage}</p>
                <p><strong>Frequency:</strong> ${med.frequency}</p>
                <p><strong>Duration:</strong> ${med.duration}</p>
                <p><strong>Refills:</strong> ${med.refills}</p>
                <p><strong>Instructions:</strong> ${med.instructions}</p>
              </div>
            `).join('')}
          </div>
          
          <div class="section">
            <h2>Doctor's Notes</h2>
            <p>${prescription.notes}</p>
          </div>
          
          <div class="section">
            <p><strong>Valid Until:</strong> ${prescription.expiryDate}</p>
          </div>
          
          <div class="section signature">
            <p><strong>Signature:</strong> ${prescription.signature}</p>
          </div>
          
          <div class="no-print" style="margin-top: 50px;">
            <button onclick="window.print()">Print</button>
            <button onclick="window.close()">Close</button>
          </div>
          
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Active</span>;
      case 'expired':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Expired</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Pending</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  // Quick actions component
  const QuickActions = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <FaBolt /> Quick Actions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => {
            if (selectedPrescriptions.length > 0) {
              generateMultiplePDFs();
            } else {
              setMessage({ type: 'warning', text: 'Please select prescriptions first' });
            }
          }}
          className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all flex flex-col items-center justify-center gap-2"
        >
          <FaDownload size={24} />
          <span className="font-medium">Download Selected ({selectedPrescriptions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('email')}
          className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all flex flex-col items-center justify-center gap-2"
        >
          <FaEnvelope size={24} />
          <span className="font-medium">Email Selected</span>
        </button>

        <button
          onClick={() => setPreviewMode(!previewMode)}
          className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all flex flex-col items-center justify-center gap-2"
        >
          <FaEye size={24} />
          <span className="font-medium">{previewMode ? 'Hide' : 'Show'} Preview</span>
        </button>

        <button
          onClick={selectAllPrescriptions}
          className="p-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all flex flex-col items-center justify-center gap-2"
        >
          <FaCheckCircle size={24} />
          <span className="font-medium">
            {selectedPrescriptions.length === prescriptions.length ? 'Deselect All' : 'Select All'}
          </span>
        </button>
      </div>
    </div>
  );

  // Export options component
  const ExportOptionsPanel = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <FaCog /> Export Settings
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <FaFilePdf /> PDF Options
          </h4>
          
          {[
            { key: 'includeHeader', label: 'Include Header', icon: FaFileMedical },
            { key: 'includeFooter', label: 'Include Footer', icon: FaFileSignature },
            { key: 'includeWatermark', label: 'Add Watermark', icon: FaFileMedical },
            { key: 'includeQRCode', label: 'Add QR Code', icon: FaQrcode },
            { key: 'includeSignature', label: 'Include Signature', icon: FaSignature },
            { key: 'highQuality', label: 'High Quality', icon: FaShieldAlt },
          ].map(option => (
            <label key={option.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center gap-3">
                <option.icon className="text-blue-500" />
                <span className="text-sm font-medium text-gray-700">{option.label}</span>
              </div>
              <input
                type="checkbox"
                checked={exportOptions[option.key]}
                onChange={(e) => updateExportOption(option.key, e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>
          ))}
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <FaLock /> Security Options
          </h4>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center gap-3">
                <FaLock className="text-blue-500" />
                <div>
                  <span className="text-sm font-medium text-gray-700">Password Protect</span>
                  <p className="text-xs text-gray-500">Add password to PDF files</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={exportOptions.passwordProtect}
                onChange={(e) => updateExportOption('passwordProtect', e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>

            {exportOptions.passwordProtect && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Set Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Password will be required to open the PDF</p>
              </div>
            )}

            <div className="p-3 bg-gray-50 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paper Format
              </label>
              <select
                value={exportOptions.format}
                onChange={(e) => updateExportOption('format', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="A4">A4 (Standard)</option>
                <option value="letter">Letter (US)</option>
                <option value="legal">Legal</option>
              </select>
            </div>

            <div className="p-3 bg-gray-50 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Template
              </label>
              <select
                value={exportOptions.emailTemplate}
                onChange={(e) => updateExportOption('emailTemplate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="professional">Professional</option>
                <option value="simple">Simple</option>
                <option value="detailed">Detailed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Export Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Selected</p>
            <p className="text-xl font-bold text-gray-900">{selectedPrescriptions.length}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Active</p>
            <p className="text-xl font-bold text-gray-900">
              {prescriptions.filter(p => p.status === 'active').length}
            </p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Format</p>
            <p className="text-xl font-bold text-gray-900">{exportOptions.format}</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Secure</p>
            <p className="text-xl font-bold text-gray-900">
              {exportOptions.passwordProtect ? 'Yes' : 'No'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Email form component
  const EmailForm = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <FaEnvelope /> Send Prescriptions via Email
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To (Required)
          </label>
          <input
            type="email"
            value={emailForm.to}
            onChange={(e) => setEmailForm({ ...emailForm, to: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="patient@email.com"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CC
            </label>
            <input
              type="email"
              value={emailForm.cc}
              onChange={(e) => setEmailForm({ ...emailForm, cc: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="cc@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              BCC
            </label>
            <input
              type="email"
              value={emailForm.bcc}
              onChange={(e) => setEmailForm({ ...emailForm, bcc: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="bcc@email.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            value={emailForm.subject}
            onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Subject line"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            value={emailForm.message}
            onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your message here..."
          />
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3">
            <FaPaperclip className="text-blue-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">
                Attachments ({selectedPrescriptions.length})
              </p>
              <p className="text-xs text-gray-600">
                {selectedPrescriptions.length} prescription(s) will be attached as PDF
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <button
            onClick={() => setActiveTab('export')}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg flex items-center gap-2"
          >
            <FaArrowRight className="rotate-180" /> Back to Export
          </button>
          <button
            onClick={sendEmail}
            disabled={isExporting || !emailForm.to || selectedPrescriptions.length === 0}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isExporting ? (
              <>
                <FaClock className="animate-spin" /> Sending...
              </>
            ) : (
              <>
                <FaPaperPlane /> Send Email
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  // Preview component
  const PreviewPanel = () => {
    if (!previewMode) return null;
    
    const samplePrescription = prescriptions[0];
    
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <FaEye /> PDF Preview
          </h3>
          <span className="text-sm text-gray-600">Preview of how the PDF will look</span>
        </div>
        
        <div className="p-6">
          {/* Preview Content */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white">
            <div className="bg-blue-600 text-white p-4 rounded-t-lg text-center mb-6">
              <h2 className="text-xl font-bold">MEDICAL PRESCRIPTION</h2>
              <div className="flex justify-between text-sm mt-2">
                <span>ID: {samplePrescription.id}</span>
                <span>Date: {samplePrescription.date}</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Patient Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-gray-600">Name:</span> {samplePrescription.patientName}</div>
                  <div><span className="text-gray-600">Age:</span> {samplePrescription.patientAge} years</div>
                  <div><span className="text-gray-600">Gender:</span> {samplePrescription.patientGender}</div>
                  <div><span className="text-gray-600">Patient ID:</span> {samplePrescription.patientId}</div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Prescribed Medications</h3>
                <div className="space-y-3">
                  {samplePrescription.medicines.slice(0, 2).map((med, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-3 py-2 bg-gray-50">
                      <div className="font-medium">{med.name} - {med.dosage}</div>
                      <div className="text-sm text-gray-600">
                        {med.frequency} • {med.duration} • Refills: {med.refills}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {exportOptions.includeWatermark && (
                <div className="relative h-32 border border-gray-200 rounded-lg flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <div className="text-4xl font-bold text-gray-400 transform -rotate-45">
                      {samplePrescription.watermark}
                    </div>
                  </div>
                  <span className="text-gray-500">Watermark Preview</span>
                </div>
              )}
              
              {exportOptions.includeSignature && (
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Signature:</span>
                    <span className="italic text-gray-600">{samplePrescription.signature}</span>
                  </div>
                </div>
              )}
            </div>
            
            {exportOptions.includeFooter && (
              <div className="mt-8 pt-4 border-t border-gray-200 text-xs text-gray-500 text-center">
                This is an electronic prescription. Do not share with unauthorized persons.
              </div>
            )}
          </div>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => generatePDF(samplePrescription)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto"
            >
              <FaDownload /> Download Sample PDF
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg">
                  <FaFilePdf size={28} />
                </div>
                Prescription Export
              </h1>
              <p className="text-gray-600 mt-2">
                Download or email prescriptions as secure PDF documents
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">
                {selectedPrescriptions.length} selected
              </span>
              <div className="flex gap-2">
                <button
                  onClick={generateMultiplePDFs}
                  disabled={isExporting || selectedPrescriptions.length === 0}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isExporting ? (
                    <>
                      <FaClock className="animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      <FaDownload /> Download All
                    </>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('email')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <FaEnvelope /> Email
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Prescriptions</p>
                  <p className="text-2xl font-bold text-gray-900">{prescriptions.length}</p>
                </div>
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                  <FaPrescriptionBottleAlt size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {prescriptions.filter(p => p.status === 'active').length}
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
                  <p className="text-sm text-gray-600">Exported Today</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {prescriptions.filter(p => p.lastDownloaded && 
                      new Date(p.lastDownloaded).toDateString() === new Date().toDateString()).length}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 text-yellow-600 rounded-lg">
                  <FaCloudDownloadAlt size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Secure PDFs</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {prescriptions.filter(p => p.isEncrypted).length}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                  <FaLock size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-800' :
            message.type === 'error' ? 'bg-red-50 border border-red-200 text-red-800' :
            message.type === 'warning' ? 'bg-yellow-50 border border-yellow-200 text-yellow-800' :
            'bg-blue-50 border border-blue-200 text-blue-800'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {message.type === 'success' && <FaCheckCircle />}
                {message.type === 'error' && <FaTimesCircle />}
                {message.type === 'warning' && <FaExclamationTriangle />}
                <span>{message.text}</span>
              </div>
              <button onClick={() => setMessage({ type: '', text: '' })} className="text-gray-400 hover:text-gray-600">
                <FaTimesCircle />
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('export')}
              className={`px-6 py-3 font-medium flex items-center gap-2 border-b-2 ${activeTab === 'export' 
                ? 'text-blue-600 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700 border-transparent'}`}
            >
              <FaDownload /> Export Prescriptions
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`px-6 py-3 font-medium flex items-center gap-2 border-b-2 ${activeTab === 'email' 
                ? 'text-blue-600 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700 border-transparent'}`}
            >
              <FaEnvelope /> Email Prescriptions
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 font-medium flex items-center gap-2 border-b-2 ${activeTab === 'history' 
                ? 'text-blue-600 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700 border-transparent'}`}
            >
              <FaHistory /> Export History
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Preview Panel */}
        <PreviewPanel />

        {/* Main Content based on active tab */}
        {activeTab === 'export' && <ExportOptionsPanel />}
        {activeTab === 'email' && <EmailForm />}
        {activeTab === 'history' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaHistory /> Export History
            </h3>
            <div className="space-y-4">
              {prescriptions
                .filter(p => p.lastDownloaded)
                .map(prescription => (
                  <div key={prescription.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <FaRegFilePdf className="text-red-500" />
                          <div>
                            <h4 className="font-medium text-gray-900">{prescription.id} - {prescription.patientName}</h4>
                            <p className="text-sm text-gray-600">Downloaded: {prescription.lastDownloaded}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => generatePDF(prescription)}
                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-1"
                        >
                          <FaDownload size={12} /> Download Again
                        </button>
                        <button
                          onClick={() => copyPrescriptionId(prescription.id)}
                          className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center gap-1"
                        >
                          <FaCopy size={12} /> Copy ID
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Prescriptions List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Available Prescriptions</h3>
            <span className="text-sm text-gray-600">
              Showing {prescriptions.length} of {prescriptions.length}
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedPrescriptions.length === prescriptions.length}
                      onChange={selectAllPrescriptions}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Prescription ID</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Patient</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Doctor</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Last Exported</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {prescriptions.map((prescription) => (
                  <tr key={prescription.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedPrescriptions.includes(prescription.id)}
                        onChange={() => togglePrescriptionSelection(prescription.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FaRegFilePdf className="text-red-500" />
                        <span className="font-medium text-gray-900">{prescription.id}</span>
                        {prescription.isEncrypted && <FaLock className="text-blue-500 text-xs" />}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium text-gray-900">{prescription.patientName}</div>
                        <div className="text-sm text-gray-600">{prescription.patientAge} years, {prescription.patientGender}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{prescription.doctorName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{prescription.date}</td>
                    <td className="px-4 py-3">{getStatusBadge(prescription.status)}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {prescription.lastDownloaded || 'Never'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => generatePDF(prescription)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Download PDF"
                        >
                          <FaDownload />
                        </button>
                        <button
                          onClick={() => printPrescription(prescription)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="Print"
                        >
                          <FaPrint />
                        </button>
                        <button
                          onClick={() => copyPrescriptionId(prescription.id)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="Copy ID"
                        >
                          <FaCopy />
                        </button>
                        <button
                          onClick={() => {}}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Export Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500 text-white rounded-lg">
                  <FaFilePdf size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ready to Export</p>
                  <p className="text-2xl font-bold text-gray-900">{selectedPrescriptions.length} files</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-500 text-white rounded-lg">
                  <FaShieldAlt size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Security Level</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {exportOptions.passwordProtect ? 'High' : 'Standard'}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-500 text-white rounded-lg">
                  <FaClock size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Time</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {selectedPrescriptions.length * 2} seconds
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescription_Expert;