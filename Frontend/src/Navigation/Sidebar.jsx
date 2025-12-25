"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md"
import { DashboardUrl } from "../assets/Constant"
import { getUserRole, logout } from "../utils/auth"

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [openDropdown, setOpenDropdown] = useState(null) // sirf ek menu track hoga
  const [userRole, setUserRole] = useState(null)

  const isActive = (url) => {
    return location.pathname.includes(url)
  }

  const toggleDropdown = (itemText) => {
    setOpenDropdown((prev) => (prev === itemText ? null : itemText))
  }

  useEffect(() => {
    // Get user role from token
    const role = getUserRole()
    console.log("Sidebar - User Role:", role)
    setUserRole(role)
  }, [])

  // Check if user has specific role
  const hasUserRole = (requiredRole) => {
    if (!userRole) return false
    return userRole.toLowerCase() === requiredRole.toLowerCase()
  }

  // SUPER ADMIN check
  const isSuperAdmin = hasUserRole('superadmin') || hasUserRole('super_admin')

  // role ke hisaab se filter karenge
  const filteredSections = DashboardUrl.map(section => {
    // SUPER ADMIN ko sab kuch dikhayein
    if (isSuperAdmin) {
      return section
    }
    
    const filteredItems = section.items.map(item => {
      if (item.children) {
        const filteredChildren = item.children.filter(child => {
          // Agar child mein roles property hai toh check karein
          if (child.roles && child.roles.length > 0) {
            // Check karein ki user role allowed roles mein hai
            const allowedRoles = child.roles.map(r => r.toLowerCase())
            return allowedRoles.includes(userRole?.toLowerCase())
          }
          // Agar roles property nahi hai toh sabko allow karein
          return true
        })
        
        // Agar filtered children hai toh return karein
        if (filteredChildren.length > 0) {
          return {
            ...item,
            children: filteredChildren
          }
        }
        // Agar koi child visible nahi hai toh null return karein
        return null
      }
      
      // Agar item mein children nahi hai
      if (item.roles && item.roles.length > 0) {
        const allowedRoles = item.roles.map(r => r.toLowerCase())
        return allowedRoles.includes(userRole?.toLowerCase()) ? item : null
      }
      
      return item
    }).filter(Boolean) // Null values remove karein
    
    // Agar section mein koi visible item hai toh return karein
    if (filteredItems.length > 0) {
      return {
        ...section,
        items: filteredItems
      }
    }
    
    return null
  }).filter(Boolean) // Null sections remove karein

  if (!userRole) {
    return (
      <div className="w-[100%] h-screen shadow-md p-4 overflow-y-auto flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="w-[100%] h-screen shadow-md p-4 overflow-y-auto">
      {/* Role Info */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-700 text-center">
          Logged in as: <span className="font-bold">
            {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
          </span>
          {isSuperAdmin && (
            <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
              Super Admin
            </span>
          )}
        </p>
      </div>
      
      {filteredSections.map((section, idx) => (
        <div key={idx} className="mb-4">
          {section.items.map((item, itemIdx) => (
            <div key={itemIdx} className="mb-2">
              {item.children ? (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold text-[16px] transition-colors duration-200"
                    onClick={() => toggleDropdown(item.text)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[16px]">{item.icon}</span>
                      <span className="text-sm">{item.text}</span>
                    </div>
                    <div className="transition-transform duration-200">
                      {openDropdown === item.text ? (
                        <MdKeyboardArrowDown className="text-gray-600 text-xl" />
                      ) : (
                        <MdKeyboardArrowRight className="text-gray-600 text-xl" />
                      )}
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      openDropdown === item.text
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0 overflow-hidden"
                    }`}
                  >
                    <div className="bg-white border-t border-gray-100">
                      {item.children.map((child, childIdx) => (
                        <Link
                          to={`/dashboard/${child.url}`}
                          key={childIdx}
                          className={`flex items-center justify-between px-6 py-3 text-sm border-b border-gray-50 last:border-b-0 hover:bg-blue-50 transition-colors duration-150 ${
                            isActive(child.url)
                              ? "text-blue-600 bg-blue-100 font-medium"
                              : "text-gray-600 hover:text-gray-800"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span className="text-xl">{child.icon}</span>
                            <span className="text-sm">{child.text}</span>
                          </span>
                          {child.badge && (
                            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full font-medium">
                              {child.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to={`/dashboard/${item.url}`}
                  className={`flex items-center gap-3 px-4 py-3 text-sm rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-all duration-150 ${
                    isActive(item.url)
                      ? "text-blue-600 bg-blue-100 border-blue-300 font-medium"
                      : "text-gray-700 bg-gray-50"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.text}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Sidebar