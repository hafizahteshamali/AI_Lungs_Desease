// src/pages/Auth/Register.jsx
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
} from "react-icons/fi";
import { postReq } from "../../api/axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Watch password for confirm password validation
  const password = watch("password");

  // handle submit
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await postReq("/api/Account/RegisterUser", data);
      console.log("Registration successful:", response);
      // toast.success("user created successfully");
      // navigate("/auth/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-700 to-teal-600 text-white p-8 flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <FiUserPlus className="text-3xl" />
              Join AI Lung Disease
            </h2>
            <p className="mt-3 text-blue-100">
              Register to access medical diagnostics and reports powered by AI.
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966481.png"
              alt="Hospital Registration"
              className="w-64 drop-shadow-lg"
            />
          </div>
          <p className="text-xs text-center mt-4">AI Healthcare • 2025</p>
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
            Create an Account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* User Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter username"
                  {...register("userName", { required: "Username is required" })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {errors.userName && (
                <p className="text-sm text-red-500 mt-1">{errors.userName.message}</p>
              )}
            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter first name"
                  {...register("firstName", { required: "First name is required" })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {errors.firstName && (
                <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter last name"
                  {...register("lastName", { required: "Last name is required" })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {errors.lastName && (
                <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                {...register("gender", { required: "Gender is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-sm text-red-500 mt-1">{errors.gender.message}</p>
              )}
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
                      message: "Invalid email format"
                    }
                  })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your password"
                  {...register("confirmPassword", { 
                    required: "Please confirm your password",
                    validate: value => value === password || "Passwords do not match"
                  })}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-700 text-white py-2.5 rounded font-medium hover:bg-blue-800 transition shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-6 pt-2 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-blue-700 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;