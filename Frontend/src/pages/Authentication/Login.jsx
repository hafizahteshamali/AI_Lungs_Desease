// src/pages/Auth/Login.jsx
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
} from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      role: "Patient",
      remember: false,
    },
  });

  // handle submit
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log("Login Data:", data);
      // API call yahan karenge
      // const response = await postReq("/api/auth/login", data);
      
      // Dummy success
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Section - Illustration */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-400 text-white p-8 flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <FiActivity className="text-3xl" />
              AI Lung Disease System
            </h2>
            <p className="mt-3 text-blue-100">
              Secure login portal for Patients, Doctors, and Admins.
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966487.png"
              alt="Medical AI"
              className="w-64 drop-shadow-lg"
            />
          </div>
          <p className="text-xs text-center mt-4">
            Powered by AI Healthcare • 2025
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Welcome Back 👋
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Role
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <select
                  {...register("role")}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="Admin">Admin</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Radiographer">Radiographer</option>
                  <option value="Patient">Patient</option>
                </select>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Invalid email format",
                    },
                  })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("remember")}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Remember Me
              </label>
              <Link
                to="/auth/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2.5 rounded font-medium hover:bg-blue-700 transition shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="text-blue-600 font-medium hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;