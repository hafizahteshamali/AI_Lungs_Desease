"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact Us" }
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/assets/images/logo.jpeg" 
              className="h-12 w-12 rounded-full object-cover"
              alt="Logo" 
            />
            <span className="ml-2 text-xl font-bold text-gray-900">
            Precious Scan
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-700 hover:text-[#4932e4] font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Get Started Button */}
            <button
              onClick={() => navigate('/auth/login')}
              className="px-6 py-2 bg-[#4932e4] text-white rounded-lg hover:bg-[#3a25b8] transition-colors font-medium"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block px-3 py-2 text-gray-700 hover:text-[#4932e4] hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <button
                onClick={() => {
                  navigate('/auth/login')
                  setIsOpen(false)
                }}
                className="w-full mt-4 px-3 py-2 bg-[#4932e4] text-white rounded-lg hover:bg-[#3a25b8] transition-colors font-medium"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation