import React from 'react';
import { FaCheck, FaStar, FaHospital, FaUserMd, FaShieldAlt, FaCloud } from 'react-icons/fa';
import { GiTakeMyMoney } from 'react-icons/gi';

const Subscription = () => {
  const plans = [
    {
      name: "Pay-Per-Use Bundle",
      description: "For Individual Patients & Small Usage",
      icon: <GiTakeMyMoney className="text-3xl" />,
      price: "400",
      period: "per bundle",
      color: "from-blue-50 to-blue-100 border-blue-200",
      features: [
        "50 X-ray/Mammogram Scans",
        "AI-Powered Diagnosis Reports",
        "Heatmap Visualization for All",
        "Basic Recommendations",
        "30-day Access to Results",
        "Email Report Delivery",
        "Batch Processing Available"
      ],
      recommended: false,
      target: "Individual Doctors & Small Practices",
      scans: "50 scans per bundle"
    },
    {
      name: "Clinic Subscription",
      description: "For Small Clinics & Diagnostic Centers",
      icon: <FaHospital className="text-3xl" />,
      price: "2,500",
      period: "per month",
      color: "from-green-50 to-green-100 border-green-300",
      features: [
        "Up to 200 Scans/Month",
        "Priority Processing (<90 seconds)",
        "Detailed Diagnostic Reports",
        "Clinical Decision Support",
        "Doctor Dashboard Access",
        "Bulk Patient Management",
        "Email & Phone Support",
        "Monthly Analytics Report"
      ],
      recommended: true,
      target: "Small Clinics & Diagnostic Centers",
      scans: "200 scans/month"
    },
    {
      name: "Enterprise License",
      description: "For Hospitals & Large Institutions",
      icon: <FaUserMd className="text-3xl" />,
      price: "Custom",
      period: "Annual Contract",
      color: "from-purple-50 to-purple-100 border-purple-300",
      features: [
        "Unlimited Scans",
        "API Integration",
        "Custom Model Training",
        "Dedicated Support Team",
        "On-premise Deployment Option",
        "Multi-user Access (Up to 50 users)",
        "Advanced Analytics Dashboard",
        "Training & Onboarding",
        "White-label Solution Available"
      ],
      recommended: false,
      target: "Hospitals & Government Institutions",
      scans: "Unlimited scans"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
          <span className="font-semibold">🇵🇰 Optimized for Pakistan Healthcare</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Flexible Pricing for <span className="text-blue-600">Precision Scan</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Choose the perfect plan for your healthcare needs. From individual doctors to large hospitals, 
          designed for low-resource settings.
        </p>
      </div>

      {/* Pricing Plans */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-2xl border-2 ${plan.color} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-500 text-white px-6 py-1 rounded-full flex items-center gap-2">
                    <FaStar className="text-yellow-300" />
                    <span className="font-semibold">Most Popular</span>
                  </div>
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-lg ${plan.recommended ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    {plan.price !== "Custom" && <span className="text-2xl">PKR</span>}
                    {plan.price !== "Custom" ? (
                      <>
                        <span className="text-5xl font-bold text-gray-900 ml-2">{plan.price}</span>
                        <span className="text-gray-500 ml-2">/{plan.period}</span>
                      </>
                    ) : (
                      <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    )}
                  </div>
                  
                  {/* Per Scan Price Calculation */}
                  {plan.price !== "Custom" && plan.name === "Pay-Per-Use Bundle" && (
                    <div className="mt-1">
                      <p className="text-sm text-green-600 font-medium">
                        Only <span className="font-bold">PKR 8 per scan</span> 
                        <span className="text-gray-500 ml-1">(400 ÷ 50 scans)</span>
                      </p>
                    </div>
                  )}
                  
                  {plan.price === "Custom" && (
                    <p className="text-gray-500 mt-2">{plan.period}</p>
                  )}
                  
                  {/* Scan Limit */}
                  <div className="mt-3 bg-blue-50 px-4 py-2 rounded-lg inline-block">
                    <span className="text-blue-700 font-medium">{plan.scans}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="bg-gray-100 px-4 py-2 rounded-lg inline-block">
                    <span className="text-gray-700 font-medium">{plan.target}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <FaCheck className={`text-green-500 mt-1 flex-shrink-0 ${plan.recommended ? 'text-green-600' : 'text-blue-600'}`} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    plan.recommended
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : plan.price === "Custom"
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Highlight */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
          <h3 className="text-2xl font-bold text-center mb-8">Why Choose Precision Scan?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <FaShieldAlt className="text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Data Security Compliant</h3>
              <p className="text-blue-100">Patient data protection according to healthcare regulations</p>
            </div>
            <div className="text-center">
              <FaCloud className="text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Low-Bandwidth Optimized</h3>
              <p className="text-blue-100">Works efficiently in rural areas with limited internet</p>
            </div>
            <div className="text-center">
              <FaUserMd className="text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Clinical Support</h3>
              <p className="text-blue-100">Doctor-verified recommendations and treatment plans</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "What's included in the Pay-Per-Use Bundle?",
              a: "The bundle includes 50 complete X-ray or mammogram scans with full AI diagnosis reports, heatmap visualizations, and 30-day access to results."
            },
            {
              q: "Can I share the 50-scan bundle among multiple doctors?",
              a: "Yes! The bundle can be used by multiple doctors in the same practice. Each scan generates a separate report for a different patient."
            },
            {
              q: "What happens if I use all 50 scans before month end?",
              a: "You can purchase additional bundles as needed. Each additional bundle gives you 50 more scans at the same rate of PKR 400."
            },
            {
              q: "How long are the scan bundles valid for?",
              a: "Pay-per-use bundles are valid for 6 months from purchase date. All scans must be used within this period."
            }
          ].map((faq, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 transition-colors duration-300">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            Start Free Trial (5 Free Scans)
          </button>
          <p className="text-gray-600 mt-4">No credit card required • Cancel anytime • Support available in Urdu & English</p>
        </div>
      </div>
    </div>
  );
};

export default Subscription;