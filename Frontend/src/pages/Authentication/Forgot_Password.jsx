import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiSend, FiCheckCircle, FiArrowLeft, FiShield } from "react-icons/fi";
import { FaKey } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validate email
  const validate = () => {
    let newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    return newErrors;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false);
      return;
    }

    setIsLoading(true);
    setErrors({});
    
    // Simulate API call
    setTimeout(() => {
      console.log("Password reset link sent to:", email);
      setIsLoading(false);
      setIsSubmitted(true);
      setSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setEmail("");
    setErrors({});
    setSuccess(false);
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Section - Illustration */}
        <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-[#007a9b] via-[#006680] to-[#008059] text-white p-8 md:p-12 flex-col justify-between relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <FaKey className="text-2xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Precious Scan</h2>
                <p className="text-cyan-100 text-sm">AI Medical Diagnostics</p>
              </div>
            </div>

            <h3 className="text-4xl font-bold mt-8 leading-tight">
              Secure Password
              <br />
              <span className="text-cyan-200">Recovery</span>
            </h3>

            <div className="mt-8 space-y-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-sm font-medium mb-2">How it works:</p>
                <ol className="space-y-2 text-sm text-cyan-100">
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">1</span>
                    Enter your registered email
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">2</span>
                    Check your email for reset link
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs">3</span>
                    Create a new secure password
                  </li>
                </ol>
              </div>

              {/* Security Info */}
              <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="flex items-center gap-3">
                  <FiShield className="text-cyan-300 text-xl" />
                  <div>
                    <p className="text-sm font-medium">HIPAA Compliant</p>
                    <p className="text-xs text-cyan-100">Secure password reset process</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
              alt="Forgot Password"
              className="w-56 mx-auto drop-shadow-2xl"
            />
          </div>

          <p className="relative z-10 text-sm text-center text-white/70 mt-4">
            © 2025 Precious Scan • Secure Healthcare Access
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="w-full lg:w-3/5 p-6 md:p-8 lg:p-12">
          <div className="mb-8">
            <Link
              to="/auth/login"
              className="inline-flex items-center gap-2 text-[#5056e6] hover:text-[#3d43d4] transition-colors mb-6"
            >
              <FiArrowLeft />
              <span className="font-medium">Back to Login</span>
            </Link>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Forgot Your Password?
            </h2>
            <p className="text-gray-600">
              Enter your email address below and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Success State */}
          {isSubmitted && success ? (
            <div className="animate-fade-in">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiCheckCircle className="text-green-600 text-4xl" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Reset Link Sent! ✅
                </h3>
                
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  We've sent a password reset link to <span className="font-bold">{email}</span>.
                  Please check your email and follow the instructions.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-2">📧 Check your inbox</p>
                    <p className="text-xs text-gray-500">
                      The email might take a few minutes to arrive. Also check your spam folder.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 border-2 border-[#5056e6] text-[#5056e6] font-bold rounded-xl hover:bg-[#5056e6] hover:text-white transition-all duration-300"
                    >
                      Reset Another Email
                    </button>
                    <Link
                      to="/auth/login"
                      className="px-6 py-3 bg-[#5056e6] text-white font-bold rounded-xl hover:bg-[#3d43d4] transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                    >
                      Return to Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Form State */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center">
                    <FiMail className="text-gray-400 group-hover:text-[#5056e6] transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 border ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    } rounded-xl focus:outline-none focus:ring-2 ${
                      errors.email ? "focus:ring-red-300" : "focus:ring-[#5056e6]"
                    } focus:border-transparent transition-all duration-300`}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                    <FiSend className="text-xs" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Security Note */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiShield className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 font-bold mb-1">Secure Process</p>
                    <p className="text-sm text-gray-600">
                      We never share your email. The reset link expires in 24 hours and can only be used once.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-[#5056e6] to-[#3d43d4] text-white font-bold rounded-xl hover:from-[#3d43d4] hover:to-[#2e32b3] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending Reset Link...
                  </>
                ) : (
                  <>
                    <FiSend />
                    Send Reset Link
                  </>
                )}
              </button>

              {/* Additional Help */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  Can't access your email?{" "}
                  <Link
                    to="/support"
                    className="text-[#5056e6] font-medium hover:underline"
                  >
                    Contact Support
                  </Link>
                </p>
              </div>
            </form>
          )}

          {/* Bottom Links */}
          <div className="mt-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500">🕒 24/7 Support</p>
                <p className="text-sm font-medium">Quick Response</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500">🔐 HIPAA Compliant</p>
                <p className="text-sm font-medium">Secure Process</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500">⚡ Instant Link</p>
                <p className="text-sm font-medium">Fast Delivery</p>
              </div>
            </div>

            <div className="text-center mt-6">
              <p className="text-xs text-gray-500">
                Need help? Contact our support team at{" "}
                <a href="mailto:support@preciousscan.com" className="text-[#5056e6] hover:underline">
                  support@preciousscan.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;