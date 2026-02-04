import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa"
import { NavLink } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section - Flex layout */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-12">
          {/* Left: Brand Info */}
          <div className="flex flex-col lg:w-1/3 mb-8 lg:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <NavLink to="/">
                <img 
                  src="/assets/images/home/logo-removebg-preview.png" 
                  alt="CareVision Logo" 
                  className="h-16 object-contain" 
                />
              </NavLink>
              <div>
                <h2 className="text-2xl font-bold text-white">CareVision</h2>
                <p className="text-sm text-[#979999]">FYP Project - FEST BSSE</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              AI-powered diagnostic system for early detection of lung diseases and breast cancer from medical images. Designed for low-resource healthcare settings.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <FaFacebook size={16} />, color: "hover:bg-[#4932e4]" },
                { icon: <FaTwitter size={16} />, color: "hover:bg-[#008059]" },
                { icon: <FaLinkedin size={16} />, color: "hover:bg-[#007a9b]" },
                { icon: <FaGithub size={16} />, color: "hover:bg-[#f0b100] hover:text-slate-900" }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`p-2 bg-slate-800 text-slate-400 rounded-lg transition-all duration-200 ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Links Container */}
          <div className="flex flex-wrap gap-8 lg:gap-12 lg:w-2/3">
            <div className="flex-1 min-w-[150px]">
              <h4 className="font-bold text-white text-lg mb-6">System Features</h4>
              <ul className="space-y-3">
                {["Dual Disease Detection", "Explainable AI (Grad-CAM)", "Clinical Decision Support", "Cloud Deployment"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#4932e4] transition-colors duration-200 text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 min-w-[150px]">
              <h4 className="font-bold text-white text-lg mb-6">Project Info</h4>
              <ul className="space-y-3">
                {["Methodology", "Datasets", "Team Members", "Contact"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#008059] transition-colors duration-200 text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 min-w-[150px]">
              <h4 className="font-bold text-white text-lg mb-6">Research</h4>
              <ul className="space-y-3">
                {["Literature Review", "Validation Metrics", "Future Work", "Publications"].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#007a9b] transition-colors duration-200 text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-800 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-slate-500 mb-4 md:mb-0">
            <p>© 2026 CareVision - Final Year Project</p>
            <p className="mt-1">Department of Computing, FEST BSSE | Group: Sajjad Ali, Muhammad Huzaifa Latif, Hafiz Ahtesham Ali Rehmani</p>
          </div>
        </div>
      </div>
    </footer>
  )
}