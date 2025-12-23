import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaHeartbeat, FaArrowRight } from "react-icons/fa"
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md"

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4932e4] opacity-5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#008059] opacity-5 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Top Section - Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-3 bg-gradient-to-br from-[#4932e4] to-[#007a9b] rounded-lg">
                <FaHeartbeat className="text-[#f0b100] text-xl" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#4932e4] via-[#008059] to-[#007a9b] bg-clip-text text-transparent">
                MediScan AI
              </h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI-powered early detection of lung disease and breast cancer from medical images. Empowering healthcare
              with cutting-edge technology.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="p-2 bg-[#4932e4] hover:bg-[#008059] text-white rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <FaFacebook size={16} />
              </a>
              <a
                href="#"
                className="p-2 bg-[#008059] hover:bg-[#007a9b] text-white rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <FaTwitter size={16} />
              </a>
              <a
                href="#"
                className="p-2 bg-[#007a9b] hover:bg-[#4932e4] text-white rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <FaLinkedin size={16} />
              </a>
              <a
                href="#"
                className="p-2 bg-[#f0b100] hover:bg-white text-slate-900 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <FaGithub size={16} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-[#4932e4] to-[#007a9b] rounded-full"></span>
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-[#4932e4] transition-colors duration-300 flex items-center gap-2 group"
                >
                  <FaArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-400 hover:text-[#008059] transition-colors duration-300 flex items-center gap-2 group"
                >
                  <FaArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#security"
                  className="text-gray-400 hover:text-[#007a9b] transition-colors duration-300 flex items-center gap-2 group"
                >
                  <FaArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Security
                </a>
              </li>
              <li>
                <a
                  href="#documentation"
                  className="text-gray-400 hover:text-[#f0b100] transition-colors duration-300 flex items-center gap-2 group"
                >
                  <FaArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-[#008059] to-[#f0b100] rounded-full"></span>
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-[#4932e4] transition-colors duration-300 flex items-center gap-2 group"
                >
                  <FaArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  About
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="text-gray-400 hover:text-[#008059] transition-colors duration-300 flex items-center gap-2 group"
                >
                  <FaArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#careers"
                  className="text-gray-400 hover:text-[#007a9b] transition-colors duration-300 flex items-center gap-2 group"
                >
                  <FaArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-[#f0b100] transition-colors duration-300 flex items-center gap-2 group"
                >
                  <FaArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Press Kit
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-[#007a9b] to-[#4932e4] rounded-full"></span>
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#privacy"
                  className="text-gray-400 hover:text-[#4932e4] transition-colors duration-300 flex items-center gap-2 group"
                >
                  <FaArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="text-gray-400 hover:text-[#008059] transition-colors duration-300 flex items-center gap-2 group"
                >
                  <FaArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#compliance"
                  className="text-gray-400 hover:text-[#007a9b] transition-colors duration-300 flex items-center gap-2 group"
                >
                  <FaArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Compliance
                </a>
              </li>
              <li>
                <a
                  href="#cookies"
                  className="text-gray-400 hover:text-[#f0b100] transition-colors duration-300 flex items-center gap-2 group"
                >
                  <FaArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-[#f0b100] to-[#008059] rounded-full"></span>
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group cursor-pointer">
                <MdLocationOn className="text-[#4932e4] text-xl flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 group-hover:text-white transition-colors text-sm">
                  123 Medical Plaza, Healthcare City, HC 12345
                </span>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer hover:text-[#008059] transition-colors">
                <MdEmail className="text-[#008059] text-xl flex-shrink-0" />
                <a
                  href="mailto:info@mediscan.ai"
                  className="text-gray-400 group-hover:text-[#008059] transition-colors text-sm"
                >
                  info@mediscan.ai
                </a>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer hover:text-[#007a9b] transition-colors">
                <MdPhone className="text-[#007a9b] text-xl flex-shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="text-gray-400 group-hover:text-[#007a9b] transition-colors text-sm"
                >
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#4932e4] to-transparent opacity-30 mb-8"></div>

        {/* Bottom Section - Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
          <p className="text-gray-500 text-sm">
            © 2025 MediScan AI. All rights reserved. | Advancing Healthcare with AI Innovation
          </p>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-[#4932e4] bg-opacity-10 text-[#4932e4] text-xs rounded-full border border-[#4932e4] border-opacity-30">
              HIPAA Compliant
            </span>
            <span className="px-3 py-1 bg-[#008059] bg-opacity-10 text-[#008059] text-xs rounded-full border border-[#008059] border-opacity-30">
              ISO 27001
            </span>
            <span className="px-3 py-1 bg-[#f0b100] bg-opacity-10 text-[#f0b100] text-xs rounded-full border border-[#f0b100] border-opacity-30">
              FDA Registered
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer