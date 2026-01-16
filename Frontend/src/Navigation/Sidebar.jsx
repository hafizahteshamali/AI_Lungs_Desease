"use client"

import { useState, useEffect } from "react" // React hooks import karte hain
import { Link, useLocation, useNavigate } from "react-router-dom" // Routing ke liye import
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md" // Icons import karte hain
import { DashboardUrl } from "../assets/Constant" // Dashboard navigation data import karte hain
import { getUserRole, logout } from "../utils/auth" // Authentication utilities import karte hain

const Sidebar = () => {
  const location = useLocation() // Current URL location get karte hain
  const navigate = useNavigate() // Navigation function get karte hain
  const [openDropdown, setOpenDropdown] = useState(null) // Dropdown state manage karte hain
  const [userRole, setUserRole] = useState(null) // User role state manage karte hain

  // Check karte hain ke URL active hai ya nahi
  const isActive = (url) => {
    return location.pathname.includes(url)
  }

  // Dropdown toggle karne ka function
  const toggleDropdown = (itemText) => {
    setOpenDropdown((prev) => (prev === itemText ? null : itemText))
  }

  // Component mount hone par user role fetch karte hain
  useEffect(() => {
    const role = getUserRole()
    setUserRole(role)
  }, [])

  // Check karte hain ke user ke paas specific role hai ya nahi
  const hasUserRole = (requiredRole) => {
    if (!userRole) return false
    return userRole.toLowerCase() === requiredRole.toLowerCase()
  }

  // SUPER ADMIN check karne ka function
  const isSuperAdmin = hasUserRole('superadmin') || hasUserRole('super_admin')

  // User role ke according navigation items filter karte hain
  const filteredSections = DashboardUrl.map(section => {
    // SUPER ADMIN ko sab kuch dikhate hain
    if (isSuperAdmin) {
      return section
    }
    
    // Section ke items filter karte hain
    const filteredItems = section.items.map(item => {
      // Agar item ke children hain
      if (item.children) {
        const filteredChildren = item.children.filter(child => {
          // Agar child mein roles property hai toh check karte hain
          if (child.roles && child.roles.length > 0) {
            const allowedRoles = child.roles.map(r => r.toLowerCase())
            return allowedRoles.includes(userRole?.toLowerCase())
          }
          // Agar roles property nahi hai toh sabko allow karte hain
          return true
        })
        
        // Agar filtered children hain toh return karte hain
        if (filteredChildren.length > 0) {
          return {
            ...item,
            children: filteredChildren
          }
        }
        // Agar koi child visible nahi hai toh null return karte hain
        return null
      }
      
      // Agar item mein children nahi hai
      if (item.roles && item.roles.length > 0) {
        const allowedRoles = item.roles.map(r => r.toLowerCase())
        return allowedRoles.includes(userRole?.toLowerCase()) ? item : null
      }
      
      return item
    }).filter(Boolean) // Null values remove karte hain
    
    // Agar section mein koi visible item hai toh return karte hain
    if (filteredItems.length > 0) {
      return {
        ...section,
        items: filteredItems
      }
    }
    
    return null
  }).filter(Boolean) // Null sections remove karte hain

  // Agar user role load nahi hua toh loading show karte hain
  if (!userRole) {
    return (
      <div className="w-[100%] h-screen shadow-md p-4 overflow-y-auto flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-6 w-6 bg-blue-500/20 rounded-full animate-ping"></div>
            </div>
          </div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[100%] h-screen bg-white shadow-lg p-4 overflow-y-auto">
      {/* Role Info Card - User ka role display karte hain */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
              <span className="text-white font-bold text-lg">
                {userRole.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <p className="text-white text-sm font-medium mb-1">
            Logged in as:
          </p>
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
            <span className="text-white font-bold text-base">
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Navigation Items - Flex container use karte hain */}
      <div className="space-y-3">
        {filteredSections.map((section, idx) => (
          <div key={idx} className="mb-4 last:mb-0">
            {/* Section Title (agar hai toh) */}
            {section.title && (
              <div className="px-2 mb-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {section.title}
                </p>
              </div>
            )}
            
            {/* Section ke items - Flex container */}
            <div className="space-y-2">
              {section.items.map((item, itemIdx) => (
                <div key={itemIdx} className="group">
                  {/* Agar item ke children hain (dropdown wala item) */}
                  {item.children ? (
                    <div className="bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors duration-200">
                      <button
                        className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-blue-50 rounded-lg text-gray-800 font-semibold text-sm transition-all duration-200 active:bg-blue-100"
                        onClick={() => toggleDropdown(item.text)}
                      >
                        {/* Left side: icon aur text */}
                        <div className="flex items-center gap-3">
                          <span className="text-blue-600 text-lg group-hover:text-blue-700 transition-colors">
                            {item.icon}
                          </span>
                          <span className="text-gray-700 font-medium">{item.text}</span>
                        </div>
                        {/* Right side: arrow icon */}
                        <div className="transition-transform duration-200">
                          {openDropdown === item.text ? (
                            <MdKeyboardArrowDown className="text-blue-600 text-xl" />
                          ) : (
                            <MdKeyboardArrowRight className="text-gray-500 text-xl group-hover:text-blue-600" />
                          )}
                        </div>
                      </button>

                      {/* Dropdown content */}
                      <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          openDropdown === item.text
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="bg-white border-t border-gray-100">
                          {/* Dropdown ke children items */}
                          {item.children.map((child, childIdx) => (
                            <Link
                              to={`/dashboard/${child.url}`}
                              key={childIdx}
                              className={`flex items-center justify-between px-6 py-3 text-sm border-b border-gray-50 last:border-b-0 hover:bg-blue-50 transition-colors duration-150 relative ${
                                isActive(child.url)
                                  ? "text-blue-600 bg-blue-50 font-medium"
                                  : "text-gray-600 hover:text-gray-800"
                              }`}
                            >
                              {/* Child item ka left side */}
                              <span className="flex items-center gap-3">
                                <span className={`text-lg transition-colors ${
                                  isActive(child.url) 
                                    ? "text-blue-500" 
                                    : "text-gray-500"
                                }`}>
                                  {child.icon}
                                </span>
                                <span className="font-medium">{child.text}</span>
                              </span>
                              {/* Child item ka badge agar hai toh */}
                              {child.badge && (
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                  isActive(child.url)
                                    ? "bg-blue-500 text-white"
                                    : "bg-blue-100 text-blue-600"
                                }`}>
                                  {child.badge}
                                </span>
                              )}
                              {/* Active child ke liye left border */}
                              {isActive(child.url) && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r"></div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Single item (dropdown nahi hai) */
                    <Link
                      to={`/dashboard/${item.url}`}
                      className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg border transition-all duration-150 hover:shadow-sm active:scale-[0.98] ${
                        isActive(item.url)
                          ? "text-blue-600 bg-blue-50 border-blue-300 font-medium shadow-sm"
                          : "text-gray-700 bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-200"
                      }`}
                    >
                      {/* Icon */}
                      <span className={`text-lg transition-colors ${
                        isActive(item.url)
                          ? "text-blue-500"
                          : "text-gray-600 group-hover:text-blue-500"
                      }`}>
                        {item.icon}
                      </span>
                      {/* Text */}
                      <span className="font-medium">{item.text}</span>
                      {/* Active indicator */}
                      {isActive(item.url) && (
                        <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Responsive Design ke liye CSS */}
      <style jsx>{`
        /* Medium screens (tablets) */
        @media (max-width: 768px) {
          .w-[100%] {
            width: 100%;
            padding: 1rem;
          }
          
          .px-4 {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
          
          .px-6 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          .text-sm {
            font-size: 0.875rem;
          }
          
          .text-lg {
            font-size: 1.125rem;
          }
        }
        
        /* Small screens (mobile) */
        @media (max-width: 480px) {
          .p-4 {
            padding: 0.75rem;
          }
          
          .px-4 {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
          
          .px-6 {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
          
          .gap-3 {
            gap: 0.5rem;
          }
          
          .text-base {
            font-size: 0.875rem;
          }
          
          .text-lg {
            font-size: 1rem;
          }
        }
        
        /* Custom scrollbar styling */
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 #f1f5f9;
        }
        
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: #3b82f6;
          border-radius: 3px;
        }
      `}</style>
    </div>
  )
}

export default Sidebar