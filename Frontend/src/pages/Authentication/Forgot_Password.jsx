// src/pages/Auth/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiSend } from "react-icons/fi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // validate email
  const validate = () => {
    let newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format";
    return newErrors;
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess("");
    } else {
      setErrors({});
      setSuccess("Password reset link has been sent to your email ✅");
      console.log("Reset link sent to:", email);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 px-4">
      <div className="w-full lg:w-[55%] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-700 to-teal-600 text-white p-8 flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <FiSend className="text-3xl" />
              Forgot Password?
            </h2>
            <p className="mt-3 text-blue-100">
              Don’t worry! We’ll send you a reset link on your registered email.
            </p>
          </div>
          <div className="mt-10 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
              alt="Forgot Password"
              className="w-56 drop-shadow-lg"
            />
          </div>
          <p className="text-xs text-center mt-6">AI Healthcare • 2025</p>
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Reset Your Password 🔑
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter Your Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Success Message */}
            {success && (
              <p className="text-sm text-green-600 font-medium">{success}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-2 rounded font-medium hover:bg-blue-800 transition shadow-md"
            >
              Send Reset Link
            </button>
          </form>

          {/* Back to Login */}
          <p className="text-sm text-gray-600 text-center mt-6">
            Remember your password?{" "}
            <Link
              to="/auth/login"
              className="text-blue-700 font-medium hover:underline"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
