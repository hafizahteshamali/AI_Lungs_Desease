// src/pages/auth/ConfirmEmail.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { getReq } from "../../api/axios";
import { toast } from "react-toastify";
import { FiCheckCircle, FiXCircle, FiLoader, FiMail, FiLogIn } from "react-icons/fi";

const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const confirmEmail = async () => {
      const userId = searchParams.get("userId");
      const token = searchParams.get("token");

      // Check if both parameters exist
      if (!userId || !token) {
        setStatus("error");
        setMessage("Invalid confirmation link. Missing required parameters.");
        return;
      }

      try {
        // Decode the token (it might be URL encoded)
        const decodedToken = decodeURIComponent(token);
        
        // Make GET request to confirm email
        const response = await getReq(
          `/api/Account/confirm-email?userId=${userId}&token=${encodeURIComponent(decodedToken)}`
        );

        // Check response
        if (response.status === 200) {
          setStatus("success");
          setMessage(response.data?.message || "Email confirmed successfully!");
          toast.success("Email verified! You can now login.");
          
          // Auto redirect to login after 3 seconds
          setTimeout(() => {
            navigate("/auth/login");
          }, 3000);
        } else {
          setStatus("error");
          setMessage(response.data?.message || "Email confirmation failed.");
        }
      } catch (error) {
        console.error("Confirmation error:", error);
        setStatus("error");
        
        // Extract error message from response
        const errorMessage = 
          error.response?.data?.message || 
          error.response?.data || 
          "Email confirmation failed. Please try again.";
        
        setMessage(errorMessage);
        toast.error(errorMessage);
      }
    };

    confirmEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#008059] to-[#007a9b] p-6 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <FiMail className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-white">Email Confirmation</h2>
          <p className="text-green-100 text-sm mt-1">Precision Scan</p>
        </div>

        {/* Body */}
        <div className="p-8">
          {status === "loading" && (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FiLoader className="text-5xl text-[#5056e6] animate-spin" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Verifying Your Email
              </h3>
              <p className="text-gray-600">
                Please wait while we confirm your email address...
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <FiCheckCircle className="text-5xl text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Success!
              </h3>
              <p className="text-gray-600 mb-4">
                {message || "Your email has been verified successfully!"}
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-green-800">
                  ✅ You can now login to your account
                </p>
                <p className="text-xs text-green-600 mt-2">
                  Redirecting to login page in 3 seconds...
                </p>
              </div>
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#5056e6] text-white font-bold rounded-xl hover:bg-[#3d43d4] transition-all duration-300"
              >
                <FiLogIn />
                Go to Login
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                  <FiXCircle className="text-5xl text-red-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Verification Failed
              </h3>
              <p className="text-gray-600 mb-6">
                {message || "Unable to verify your email address."}
              </p>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-800">
                  ⚠️ The confirmation link may be invalid or expired.
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  to="/auth/login"
                  className="block w-full px-6 py-3 bg-[#5056e6] text-white font-bold rounded-xl hover:bg-[#3d43d4] transition-all duration-300"
                >
                  Go to Login
                </Link>
                
                <Link
                  to="/auth/register"
                  className="block w-full px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:border-[#5056e6] hover:text-[#5056e6] transition-all duration-300"
                >
                  Back to Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;