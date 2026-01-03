import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import {
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
  FiUser,
  FiUserPlus,
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
  const [selectedGender, setSelectedGender] = useState(""); // Add state for gender
  const [isAllowed, setIsAllowed] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    setValue,
    reset // ✅ must
  } = useForm();
  

  const password = watch("password");

  // Move to next step
  const nextStep = async () => {
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

  // Handle gender selection
  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setValue("gender", gender); // Set value in react-hook-form
  };

  const onSubmit = async (data) => {
    setLoading(true);
  
    try {
      const response = await postReq("/api/Account/RegisterUser", data,{
        headers: {
          "Content-Type": "application/json",
        },
      });
      // ✅ ONLY success (200 / 201)
      if (response.status === 200 || response.status === 201) {
        toast.success(response.data?.message || "Registration successful");
  
        reset(); // ✅ form clear
        navigate("/auth/login"); // ✅ navigate
      }
    } catch (error) {
      // ❌ backend error message
      const errorMessage =
        error.response?.data.Message;
  
      toast.error(errorMessage); // ❌ show backend error
      // ❌ no reset
      // ❌ no navigate
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    const token = sessionStorage.getItem("token");
    if(!token){
      setIsAllowed(true)
    }else{
      navigate("/dashboard");
    }
  }, [navigate]);
  

  // Progress steps
  const steps = [
    { number: 1, label: "Personal" },
    { number: 2, label: "Account" },
    { number: 3, label: "Review" },
  ];

  if (!isAllowed) {
    return null; 
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex h-auto lg:h-[580px]"> {/* ✅ Height fixed */}
        {/* Left Section - Compact */}
        <div className="hidden lg:flex w-2/5 bg-gradient-to-br from-[#008059] via-[#006d4a] to-[#007a9b] text-white p-6 flex-col justify-between relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-8 left-8 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-8 right-8 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <FiUserPlus className="text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Precision Scan</h2>
                <p className="text-green-100 text-xs">AI Medical Diagnostics</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold mt-6 leading-tight">
              Join Our
              <br />
              <span className="text-green-200">Healthcare Network</span>
            </h3>

            <ul className="mt-6 space-y-2">
              {[
                "AI-powered diagnostics",
                "Secure data management",
                "Real-time medical reports",
                "HIPAA compliant"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <FiCheckCircle className="text-green-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 mt-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966481.png"
              alt="Hospital Registration"
              className="w-48 mx-auto"
            />
          </div>
        </div>

        {/* Right Section - Compact */}
        <div className="w-full lg:w-3/5 p-4 md:p-6 flex flex-col"> {/* ✅ Compact padding */}
          {/* Progress Steps - Compact */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Create Account
              </h2>
              <span className="text-xs text-gray-500">
                Step {registrationStep} of 3
              </span>
            </div>

            <div className="flex justify-between mb-3">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 text-sm ${
                    step.number === registrationStep
                      ? "bg-[#5056e6] text-white border-2 border-[#5056e6]"
                      : step.number < registrationStep
                      ? "bg-green-100 text-green-600 border-2 border-green-500"
                      : "bg-gray-100 text-gray-400 border-2 border-gray-300"
                  }`}>
                    {step.number < registrationStep ? (
                      <FiCheckCircle className="text-sm" />
                    ) : (
                      <span className="font-bold">{step.number}</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-600">{step.label}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto pr-1"> {/* ✅ Scroll inside form if needed */}
            {/* Step 1: Personal Information */}
            {registrationStep === 1 && (
              <div className="space-y-4 animate-fade-in"> {/* ✅ Space reduced */}
                <h3 className="text-lg font-bold text-gray-800 mb-2">Personal Information</h3>
                
                {/* User Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <div className="relative group">
                    <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center">
                      <FiUser className="text-gray-400 group-hover:text-[#5056e6] transition-colors text-sm" />
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
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5056e6] focus:border-transparent transition-all duration-300 text-sm"
                    />
                  </div>
                  {errors.userName && (
                    <p className="text-xs text-red-500 mt-1">{errors.userName.message}</p>
                  )}
                </div>

                {/* First & Last Name */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      placeholder="John"
                      {...register("firstName", { 
                        required: "First name is required"
                      })}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5056e6] focus:border-transparent transition-all duration-300 text-sm"
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      {...register("lastName", { 
                        required: "Last name is required"
                      })}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5056e6] focus:border-transparent transition-all duration-300 text-sm"
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Gender - FIXED */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <div className="flex gap-2">
                    {["Male", "Female", "Other"].map((gender) => {
                      const genderValue = gender.toLowerCase();
                      const isSelected = selectedGender === genderValue;
                      
                      return (
                        <label
                          key={gender}
                          className={`flex-1 flex items-center justify-center p-3 border rounded-xl cursor-pointer transition-all duration-300 text-sm ${
                            isSelected
                              ? "border-[#5056e6] bg-blue-50"
                              : "border-gray-300 hover:border-[#5056e6] hover:bg-blue-50"
                          }`}
                          onClick={() => handleGenderSelect(genderValue)}
                        >
                          <input
                            type="radio"
                            value={genderValue}
                            {...register("gender", { required: "Please select gender" })}
                            className="hidden"
                            checked={isSelected}
                            onChange={() => {}}
                          />
                          <div className="flex items-center gap-2">
                            <FaVenusMars className={
                              isSelected ? "text-[#5056e6] text-sm" : "text-gray-400 text-sm"
                            } />
                            <span className={
                              isSelected ? "text-[#5056e6] font-medium" : ""
                            }>
                              {gender}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                  {errors.gender && (
                    <p className="text-xs text-red-500 mt-1">{errors.gender.message}</p>
                  )}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2.5 bg-[#5056e6] text-white font-bold rounded-xl hover:bg-[#3d43d4] transition-all duration-300 text-sm"
                  >
                    Next: Account
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Account Details */}
            {registrationStep === 2 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Account Details</h3>
                
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center">
                      <FiMail className="text-gray-400 group-hover:text-[#5056e6] transition-colors text-sm" />
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
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5056e6] focus:border-transparent transition-all duration-300 text-sm"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center">
                      <FiLock className="text-gray-400 group-hover:text-[#5056e6] transition-colors text-sm" />
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
                      className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5056e6] focus:border-transparent transition-all duration-300 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-0 bottom-0 w-10 flex items-center justify-center text-gray-400 hover:text-[#5056e6] transition-colors"
                    >
                      {showPassword ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    8+ chars with uppercase, lowercase, and number
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center">
                      <FiLock className="text-gray-400 group-hover:text-[#5056e6] transition-colors text-sm" />
                    </div>
                    <input
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm your password"
                      {...register("confirmPassword", { 
                        required: "Please confirm your password",
                        validate: value => value === password || "Passwords do not match"
                      })}
                      className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5056e6] focus:border-transparent transition-all duration-300 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-0 top-0 bottom-0 w-10 flex items-center justify-center text-gray-400 hover:text-[#5056e6] transition-colors"
                    >
                      {showConfirm ? <FiEyeOff className="text-sm" /> : <FiEye className="text-sm" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    {...register("terms", { required: "You must accept the terms" })}
                    className="w-4 h-4 mt-0.5 mr-2 text-[#5056e6] bg-gray-100 border-gray-300 rounded focus:ring-[#5056e6] focus:ring-2"
                  />
                  <label htmlFor="terms" className="text-xs text-gray-700">
                    I agree to the{" "}
                    <Link to="/terms" className="text-[#5056e6] hover:underline font-medium">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-[#5056e6] hover:underline font-medium">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-xs text-red-500 mt-1">{errors.terms.message}</p>
                )}

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-5 py-2 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:border-[#5056e6] hover:text-[#5056e6] transition-all duration-300 text-sm"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2.5 bg-[#5056e6] text-white font-bold rounded-xl hover:bg-[#3d43d4] transition-all duration-300 text-sm"
                  >
                    Next: Review
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review and Submit */}
            {registrationStep === 3 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Review Information</h3>
                
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <FiCheckCircle className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">Almost Done!</h4>
                      <p className="text-xs text-gray-600">Review your information</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="font-medium text-sm">
                        {watch("firstName")} {watch("lastName")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Username</p>
                      <p className="font-medium text-sm">{watch("userName")}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Gender</p>
                      <p className="font-medium text-sm">{watch("gender")}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium text-sm">{watch("email")}</p>
                    </div>
                  </div>
                </div>

                {/* Security Note - Compact */}
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                      <FaShieldAlt className="text-blue-600 text-xs" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-700 font-bold mb-0.5">Secure Registration</p>
                      <p className="text-xs text-gray-600">
                        Your information is encrypted and protected.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-5 py-2 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:border-[#5056e6] hover:text-[#5056e6] transition-all duration-300 text-sm"
                  >
                    ← Edit
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#008059] to-[#006d4a] text-white font-bold rounded-xl hover:from-[#006d4a] hover:to-[#005a3b] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <FiUserPlus />
                        Complete
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Login Link - Compact */}
          <div className="mt-4 pt-4 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-bold text-[#5056e6] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;