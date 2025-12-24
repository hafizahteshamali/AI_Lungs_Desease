import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
  FiUser,
  FiUserPlus,
  FiCalendar,
  FiCheckCircle,
} from "react-icons/fi";
import { FaVenusMars, FaShieldAlt } from "react-icons/fa";
import { postReq } from "../../api/axios";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registrationStep, setRegistrationStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm();

  const password = watch("password");

  // Move to next step
  const nextStep = async () => {
    // Validate current step fields
    let isValid = false;
    if (registrationStep === 1) {
      isValid = await trigger(["userName", "firstName", "lastName", "gender"]);
    } else if (registrationStep === 2) {
      isValid = await trigger(["email", "password", "confirmPassword"]);
    }
    
    if (isValid) {
      setRegistrationStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setRegistrationStep(prev => prev - 1);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log("Registration Data:", data);
      const response = await postReq("/api/Account/RegisterUser", data);
      console.log("Registration successful:", response);
      alert("Registration successful! Please check your email for verification.");
      navigate("/auth/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error?.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Progress steps
  const steps = [
    { number: 1, label: "Personal Info" },
    { number: 2, label: "Account Details" },
    { number: 3, label: "Complete" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Section - Illustration */}
        <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-[#008059] via-[#006d4a] to-[#007a9b] text-white p-8 md:p-12 flex-col justify-between relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <FiUserPlus className="text-2xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Precious Scan</h2>
                <p className="text-green-100 text-sm">AI Medical Diagnostics</p>
              </div>
            </div>

            <h3 className="text-4xl font-bold mt-8 leading-tight">
              Join Our
              <br />
              <span className="text-green-200">Healthcare Network</span>
            </h3>

            <ul className="mt-8 space-y-4">
              {[
                "Access AI-powered diagnostics",
                "Secure patient data management",
                "Real-time medical reports",
                "HIPAA compliant platform"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <FiCheckCircle className="text-green-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Trust Indicators */}
            <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <p className="text-sm text-green-100">
                <span className="font-bold">98% Accuracy</span> • 
                <span className="ml-2">50K+ Patients</span> • 
                <span className="ml-2">200+ Partners</span>
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-8">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966481.png"
              alt="Hospital Registration"
              className="w-56 mx-auto drop-shadow-2xl"
            />
          </div>

          <p className="relative z-10 text-sm text-center text-white/70 mt-4">
            © 2025 Precious Scan • Secure Healthcare Registration
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="w-full lg:w-3/5 p-6 md:p-8 lg:p-12">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Create Account
              </h2>
              <span className="text-sm text-gray-500">
                Step {registrationStep} of 3
              </span>
            </div>

            <div className="flex justify-between mb-8">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    step.number === registrationStep
                      ? "bg-[#5056e6] text-white border-2 border-[#5056e6]"
                      : step.number < registrationStep
                      ? "bg-green-100 text-green-600 border-2 border-green-500"
                      : "bg-gray-100 text-gray-400 border-2 border-gray-300"
                  }`}>
                    {step.number < registrationStep ? (
                      <FiCheckCircle className="text-lg" />
                    ) : (
                      <span className="font-bold">{step.number}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-600">{step.label}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Personal Information */}
            {registrationStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h3>
                
                {/* User Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative group">
                    <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center">
                      <FiUser className="text-gray-400 group-hover:text-[#5056e6] transition-colors" />
                    </div>
                    <input
                      type="text"
                      placeholder="johndoe"
                      {...register("userName", { 
                        required: "Username is required",
                        minLength: {
                          value: 3,
                          message: "Username must be at least 3 characters"
                        }
                      })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5056e6] focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  {errors.userName && (
                    <p className="text-sm text-red-500 mt-2">{errors.userName.message}</p>
                  )}
                </div>

                {/* First & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      {...register("firstName", { 
                        required: "First name is required"
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5056e6] focus:border-transparent transition-all duration-300"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-red-500 mt-2">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      {...register("lastName", { 
                        required: "Last name is required"
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5056e6] focus:border-transparent transition-all duration-300"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-500 mt-2">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Male", "Female", "Other"].map((gender) => (
                      <label
                        key={gender}
                        className="flex items-center justify-center p-4 border border-gray-300 rounded-xl hover:border-[#5056e6] hover:bg-blue-50 cursor-pointer transition-all duration-300 has-checked:border-[#5056e6] has-checked:bg-blue-50"
                      >
                        <input
                          type="radio"
                          value={gender.toLowerCase()}
                          {...register("gender", { required: "Please select gender" })}
                          className="hidden peer"
                        />
                        <div className="flex items-center gap-2">
                          <FaVenusMars className="text-gray-400 peer-checked:text-[#5056e6]" />
                          <span className="peer-checked:text-[#5056e6] peer-checked:font-medium">
                            {gender}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.gender && (
                    <p className="text-sm text-red-500 mt-2">{errors.gender.message}</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 bg-[#5056e6] text-white font-bold rounded-xl hover:bg-[#3d43d4] transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Next: Account Details
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Account Details */}
            {registrationStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Account Details</h3>
                
                {/* Email */}
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
                      placeholder="john.doe@example.com"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Please enter a valid email address"
                        }
                      })}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5056e6] focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-2">{errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center">
                      <FiLock className="text-gray-400 group-hover:text-[#5056e6] transition-colors" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      {...register("password", { 
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters"
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                          message: "Must include uppercase, lowercase, and number"
                        }
                      })}
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5056e6] focus:border-transparent transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center text-gray-400 hover:text-[#5056e6] transition-colors"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500 mt-2">{errors.password.message}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Must be at least 8 characters with uppercase, lowercase, and number
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center">
                      <FiLock className="text-gray-400 group-hover:text-[#5056e6] transition-colors" />
                    </div>
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm your password"
                      {...register("confirmPassword", { 
                        required: "Please confirm your password",
                        validate: value => value === password || "Passwords do not match"
                      })}
                      className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5056e6] focus:border-transparent transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center text-gray-400 hover:text-[#5056e6] transition-colors"
                    >
                      {showConfirm ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500 mt-2">{errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    {...register("terms", { required: "You must accept the terms and conditions" })}
                    className="w-4 h-4 mt-1 mr-2 text-[#5056e6] bg-gray-100 border-gray-300 rounded focus:ring-[#5056e6] focus:ring-2"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I agree to the{" "}
                    <Link to="/terms" className="text-[#5056e6] hover:underline font-medium">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-[#5056e6] hover:underline font-medium">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-sm text-red-500 mt-1">{errors.terms.message}</p>
                )}

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:border-[#5056e6] hover:text-[#5056e6] transition-all duration-300"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 bg-[#5056e6] text-white font-bold rounded-xl hover:bg-[#3d43d4] transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Next: Review
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review and Submit */}
            {registrationStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Review Information</h3>
                
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <FiCheckCircle className="text-green-600 text-2xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Almost Done!</h4>
                      <p className="text-sm text-gray-600">Review your information before submitting</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">
                        {watch("firstName")} {watch("lastName")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Username</p>
                      <p className="font-medium">{watch("userName")}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium">{watch("gender")}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{watch("email")}</p>
                    </div>
                  </div>
                </div>

                {/* Security Note */}
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FaShieldAlt className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-700 font-bold mb-1">Secure Registration</p>
                      <p className="text-sm text-gray-600">
                        Your information is encrypted and protected. We follow HIPAA compliance for healthcare data.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:border-[#5056e6] hover:text-[#5056e6] transition-all duration-300"
                  >
                    ← Edit Information
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-[#008059] to-[#006d4a] text-white font-bold rounded-xl hover:from-[#006d4a] hover:to-[#005a3b] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <FiUserPlus />
                        Complete Registration
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Login Link */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-bold text-[#5056e6] hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;