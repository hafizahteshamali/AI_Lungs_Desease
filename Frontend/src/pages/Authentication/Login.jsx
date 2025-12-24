import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
  FiUser,
  FiActivity,
  FiHeart,
} from "react-icons/fi";
import { FaStethoscope, FaUserMd, FaUserInjured } from "react-icons/fa";
import { postReq } from "../../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Patient");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "Patient",
      remember: false,
    },
  });

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setValue("role", role);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log("Login Data:", data);
      const response = await postReq("/api/Account/Authentication", data);
      sessionStorage.setItem("token", response.data.data.jwToken);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const roleIcons = {
    Admin: <FiUser className="text-xl" />,
    Doctor: <FaUserMd className="text-xl" />,
    Radiographer: <FaStethoscope className="text-xl" />,
    Patient: <FaUserInjured className="text-xl" />,
  };

  const roleColors = {
    Admin: "bg-[#5056e6] text-white",
    Doctor: "bg-[#008059] text-white",
    Radiographer: "bg-[#007a9b] text-white",
    Patient: "bg-[#5056e6] text-white",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Section - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#5056e6] via-[#3d43d4] to-[#007a9b] text-white p-8 md:p-12 flex-col justify-between relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 right-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <FiHeart className="text-2xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Precious Scan</h2>
                <p className="text-blue-100 text-sm">AI Medical Diagnostics</p>
              </div>
            </div>
            <h3 className="text-4xl font-bold mt-8 leading-tight">
              Early Detection
              <br />
              <span className="text-blue-200">Saves Lives</span>
            </h3>
            <p className="mt-4 text-blue-100 text-lg leading-relaxed">
              Secure login portal for Patients, Doctors, and Healthcare Professionals.
              Access advanced AI diagnostics for better healthcare outcomes.
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-2xl font-bold">98%</p>
                <p className="text-sm text-blue-100">Accuracy Rate</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-2xl font-bold">50K+</p>
                <p className="text-sm text-blue-100">Patients Helped</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966487.png"
              alt="Medical AI"
              className="w-64 mx-auto drop-shadow-2xl"
            />
          </div>

          <p className="relative z-10 text-sm text-center text-white/70 mt-4">
            © 2025 Precious Scan • AI-Powered Healthcare Diagnostics
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-12">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Welcome Back 👋
            </h2>
            <p className="text-gray-600 mt-2">
              Sign in to access AI-powered diagnostic tools
            </p>
          </div>

          {/* Role Selection - Enhanced */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Your Role
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {["Admin", "Doctor", "Radiographer", "Patient"].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleChange(role)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${
                    selectedRole === role
                      ? `${roleColors[role]} border-transparent shadow-lg scale-105`
                      : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300"
                  }`}
                >
                  <div className="mb-2">{roleIcons[role]}</div>
                  <span className="text-sm font-medium">{role}</span>
                </button>
              ))}
            </div>
            <input type="hidden" {...register("role")} />
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5056e6] focus:border-transparent transition-all duration-300 hover:border-gray-400"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-2">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-[#5056e6] hover:underline font-medium"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center">
                  <FiLock className="text-gray-400 group-hover:text-[#5056e6] transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5056e6] focus:border-transparent transition-all duration-300 hover:border-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center text-gray-400 hover:text-[#5056e6] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-2">{errors.password.message}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                {...register("remember")}
                className="w-4 h-4 text-[#5056e6] bg-gray-100 border-gray-300 rounded focus:ring-[#5056e6] focus:ring-2"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-[#5056e6] to-[#3d43d4] text-white font-bold rounded-xl hover:from-[#3d43d4] hover:to-[#2e32b3] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <FiActivity className="text-lg" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="font-bold text-[#5056e6] hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>

          {/* Security Note */}
          <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiLock className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-bold">Secure Login:</span> Your data is encrypted and protected. Precious Scan follows HIPAA compliance standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;