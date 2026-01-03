import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
  FiActivity,
  FiHeart,
} from "react-icons/fi";
import { postReq } from "../../api/axios";
import { toast } from "react-toastify";
import { isAuthenticated, getUserRole } from "../../utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await postReq("/api/Account/Authentication", data,{
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.status === 200 || response.status === 201) {
        const token = response.data?.data?.jwToken;
        if (!token) {
          toast.error("Token not received from server");
          return;
        }
        
        // Save token to session storage
        sessionStorage.setItem("token", token);
        
        // Get user role from token
        const userRole = getUserRole();
        
        toast.success(response.data?.message || `Welcome ${userRole || 'User'}!`);
        
        // Redirect based on role
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.Message ||
        "Login failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    if (isAuthenticated()) {
      const userRole = getUserRole();
      // Redirect to dashboard based on role
      navigate("/dashboard");
    } else {
      setIsAllowed(true);
    }
  }, [navigate]);

  if (!isAllowed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[550px]"> {/* ✅ Height fixed kar di */}
        {/* Left Section - Compact kiya */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#5056e6] via-[#3d43d4] to-[#007a9b] text-white p-6 flex-col justify-between relative overflow-hidden">
          {/* Animated Background Elements - Simplify */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 right-10 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <FiHeart className="text-xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Precision Scan</h2>
                <p className="text-blue-100 text-xs">AI Medical Diagnostics</p>
              </div>
            </div>
            <h3 className="text-2xl font-bold mt-6 leading-tight">
              Early Detection
              <br />
              <span className="text-blue-200">Saves Lives</span>
            </h3>
            <p className="mt-3 text-blue-100 text-sm leading-relaxed">
              Secure login for Patients, Doctors, and Healthcare Professionals.
            </p>
          </div>

          <div className="relative z-10 mt-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966487.png"
              alt="Medical AI"
              className="w-48 mx-auto"
            />
          </div>

          <p className="relative z-10 text-xs text-center text-white/70 mt-4">
            © 2025 Precision Scan
          </p>
        </div>

        {/* Right Section - Compact kiya */}
        <div className="w-full lg:w-1/2 p-6 md:p-8 flex flex-col justify-center"> {/* ✅ Center align */}
          <div className="mb-6 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-gray-900">
              Welcome Back 
            </h2>
            <p className="text-gray-600 mt-1 text-sm">
              Sign in to access AI-powered diagnostic tools
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}> {/* ✅ Space reduce */}
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center">
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
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5056e6] focus:border-transparent transition-all duration-300 hover:border-gray-400 text-sm"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  to="/auth/forgot-password"
                  className="text-xs text-[#5056e6] hover:underline font-medium"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center">
                  <FiLock className="text-gray-400 group-hover:text-[#5056e6] transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5056e6] focus:border-transparent transition-all duration-300 hover:border-gray-400 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 bottom-0 w-10 flex items-center justify-center text-gray-400 hover:text-[#5056e6] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
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
              <label htmlFor="remember" className="ml-2 text-xs text-gray-700">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-[#5056e6] to-[#3d43d4] text-white font-bold rounded-xl hover:from-[#3d43d4] hover:to-[#2e32b3] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <FiActivity className="text-base" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-xs text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="font-bold text-[#5056e6] hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>

          {/* Security Note - Compact */}
          <div className="mt-6 p-3 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                <FiLock className="text-blue-600 text-xs" />
              </div>
              <p className="text-xs text-gray-700">
                <span className="font-bold">Secure Login:</span> Your data is encrypted. HIPAA compliant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;