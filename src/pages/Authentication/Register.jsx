// src/pages/Auth/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
  FiUser,
  FiUserPlus,
} from "react-icons/fi";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Patient",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // validate form
  const validate = () => {
    let newErrors = {};
    if (!form.fullName) newErrors.fullName = "Full name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!form.password) newErrors.password = "Password is required";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // dummy registration
      console.log("Registration Success ✅", form);
      alert(
        form.role === "Doctor"
          ? "Doctor account created! Pending admin approval."
          : "Patient registered successfully!"
      );
      navigate("/auth/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 px-4">
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
          <div className="mt-10 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966481.png"
              alt="Hospital Registration"
              className="w-72 drop-shadow-lg"
            />
          </div>
          <p className="text-xs text-center mt-6">AI Healthcare • 2025</p>
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create an Account 🏥
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {errors.fullName && (
                <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option>Patient</option>
                <option>Doctor</option>
              </select>
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
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
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
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password}</p>
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
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showConfirm ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded font-medium hover:bg-blue-800 transition shadow-md"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="text-sm text-gray-600 text-center mt-6">
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
  );
};

export default Register;
