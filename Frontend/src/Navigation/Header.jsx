"use client"

import { useState, useEffect, useRef } from "react"
import { FaBars, FaTimes, FaUser, FaSignInAlt, FaUserPlus, FaChevronDown } from "react-icons/fa"
import { NavLink, useNavigate } from "react-router-dom"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef(null)
  const navigate = useNavigate()

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/subscription", label: "Subscriptions" },
    { href: "/contact", label: "Contact Us" },
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Check if user is logged in
  const isLoggedIn = sessionStorage.getItem("token")

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/dashboard")
    } else {
      setIsModalOpen(true)
    }
  }

  return (
    <>
      {/* Add padding to body to prevent content from hiding behind fixed header */}
      <style>{`
        body {
          padding-top: 4rem; /* 64px for h-16 */
        }
        @media (min-width: 1024px) {
          body {
            padding-top: 5rem; /* 80px for lg:h-20 */
          }
        }
      `}</style>
      
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
            : "bg-white border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo - FIXED: Remove nested <a> */}
            <NavLink 
              to="/" 
              className="flex items-center gap-3 group transition-transform duration-300 hover:scale-105"
            >
              <div className="relative">
                <img src="/assets/images/home/logo-removebg-preview.png" alt="Precision Scan Logo" className="h-16" />
              </div>
              <div>
                <span className="text-xl lg:text-2xl font-bold text-black group-hover:text-[#5056e6] transition-colors duration-300">
                  Precision Scan
                </span>
                <p className="text-xs text-[#979999] hidden sm:block">AI Medical Diagnostics</p>
              </div>
            </NavLink>

            {/* Desktop Navigation Links - FIXED: Use NavLink instead of <a> */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) => 
                    `relative font-medium transition-colors duration-300 group ${
                      isActive ? "text-[#5056e6]" : "text-[#979999] hover:text-[#5056e6]"
                    }`
                  }
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-[#5056e6] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}></span>
                    </>
                  )}
                </NavLink>
              ))}

              {/* User Menu or Get Started Button */}
              {isLoggedIn ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#5056e6] text-white rounded-lg hover:bg-[#3d43d4] transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:scale-105"
                  >
                    <FaUser className="text-sm" />
                    <span>Dashboard</span>
                    <FaChevronDown
                      className={`text-xs transition-transform duration-300 ${showUserMenu ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown Menu - FIXED: Use NavLink */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-xl shadow-xl ring-1 overflow-hidden animate-fade-in-up">
                      <NavLink
                        to="/dashboard"
                        className={({ isActive }) => 
                          `flex items-center gap-2 px-4 py-3 transition-colors duration-200 ${
                            isActive ? "bg-[#5056e6]/10 text-[#5056e6]" : "text-gray-700 hover:bg-[#5056e6]/10 hover:text-[#5056e6]"
                          }`
                        }
                        onClick={() => setShowUserMenu(false)}
                      >
                        <FaUser className="text-sm" />
                        My Dashboard
                      </NavLink>
                      <NavLink
                        to="/profile"
                        className={({ isActive }) => 
                          `flex items-center gap-2 px-4 py-3 transition-colors duration-200 ${
                            isActive ? "bg-[#5056e6]/10 text-[#5056e6]" : "text-gray-700 hover:bg-[#5056e6]/10 hover:text-[#5056e6]"
                          }`
                        }
                        onClick={() => setShowUserMenu(false)}
                      >
                        <FaUser className="text-sm" />
                        Profile
                      </NavLink>
                      <div className="border-t border-gray-200"></div>
                      <button
                        onClick={() => {
                          sessionStorage.removeItem("token")
                          window.location.reload()
                        }}
                        className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center gap-2"
                      >
                        <FaSignInAlt className="text-sm rotate-180" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigate('/auth/login')}
                    className="px-6 py-2.5 bg-[#5056e6] text-white rounded-lg hover:bg-[#3d43d4] transition-all duration-300 font-semibold shadow-md hover:shadow-lg hover:scale-105 flex items-center gap-2 group"
                  >
                    <FaSignInAlt className="group-hover:translate-x-1 transition-transform" />
                    Get Started
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#979999] hover:text-[#5056e6] transition-colors duration-300 p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`md:hidden inset-0 z-40 transition-all duration-300 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${
              isOpen ? "opacity-50" : "opacity-0"
            }`}
            onClick={() => setIsOpen(false)}
          />

          {/* Slide-in Menu */}
          <div
            className={`fixed top-0 !bottom-0 right-0 h-[100vh] w-full sm:w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full"> {/* Added pt-16 for header height */}
              {/* Menu Header - FIXED: Remove duplicate text */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-[#5056e6] to-[#008059]">
                <div className="flex items-center gap-3">
                  <img src="/assets/images/logo.jpeg" alt="Logo" className="h-10" />
                  <div>
                    <h2 className="text-lg font-bold text-white">Precision Scan</h2>
                    <p className="text-xs text-white/80">AI Medical Diagnostics</p>
                  </div>
                </div>
                <button
                  className="text-white hover:text-gray-200 transition-colors p-2 rounded-lg hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Menu Links - FIXED: Use NavLink */}
              <div className="flex-1 p-6 space-y-2 overflow-y-auto">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    className={({ isActive }) => 
                      `flex px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                        isActive 
                          ? "text-[#5056e6] bg-[#5056e6]/10" 
                          : "text-gray-700 hover:text-[#5056e6] hover:bg-[#5056e6]/10"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="p-6 mb-10 border-t border-gray-200 space-y-3 bg-gray-50">
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      navigate("/dashboard")
                      setIsOpen(false)
                    }}
                    className="w-full px-4 py-3 bg-[#5056e6] text-white rounded-lg hover:bg-[#3d43d4] transition-colors duration-200 font-semibold flex items-center justify-center gap-2"
                  >
                    <FaUser />
                    Go to Dashboard
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigate("/auth/login")
                        setIsOpen(false)
                      }}
                      className="w-full px-4 py-3 bg-[#5056e6] text-white rounded-lg hover:bg-[#3d43d4] transition-colors duration-200 font-semibold flex items-center justify-center gap-2"
                    >
                      <FaSignInAlt />
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        navigate("/auth/register")
                        setIsOpen(false)
                      }}
                      className="w-full px-4 py-3 border-2 border-[#5056e6] text-[#5056e6] rounded-lg hover:bg-[#5056e6] hover:text-white transition-colors duration-200 font-semibold flex items-center justify-center gap-2"
                    >
                      <FaUserPlus />
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}