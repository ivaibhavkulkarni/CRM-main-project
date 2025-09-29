// frontend/hola-io-crm/src/components/landing/Header.jsx (fixed)
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { FileText, Menu, X } from "lucide-react"
import ProfileDropdown from "../layout/ProfileDropdown"
import { useAuth } from "../../context/AuthContext"
import { Button } from "../ui/Button"
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  // Close mobile menu after clicking
  const handleLinkClick = (id) => {
    const section = document.querySelector(id)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }
  return (
    <header className="fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg px-4 md:px-6 py-3 flex items-center justify-between">
         
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-emerald-500 to-cyan-700 bg-[length:200%_200%] animate-text-shine text-xl">Hola IO</span>
          </div>
          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <button onClick={() => handleLinkClick("#features")} className="text-gray-700 hover:text-gray-900 font-medium">Features</button>
            <button onClick={() => handleLinkClick("#testimonials")} className="text-gray-700 hover:text-gray-900 font-medium">Testimonials</button>
            <button onClick={() => handleLinkClick("#faq")} className="text-gray-700 hover:text-gray-900 font-medium">FAQ</button>
          </div>
          {/* Right Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <ProfileDropdown
                isOpen={profileDropdownOpen}
                onToggle={() => setProfileDropdownOpen(!profileDropdownOpen)}
                avatar={user?.avatar || ""}
                companyName={user?.name || ""}
                email={user?.email || ""}
                onLogout={logout}
              />
            ) : (
              <>
                <Link to="/login" className="text-gray-800 hover:text-gray-900 font-medium">Login</Link>
                <Link to="/signup" className="bg-slate-900 text-white px-6 py-2 rounded-full hover:bg-cyan-100 hover:text-slate-900 transition">SignUp</Link>
              </>
            )}
          </div>
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            <button onClick={() => handleLinkClick("#features")} className="block px-4 py-3 text-gray-700 hover:bg-gray-50 w-full text-left">Features</button>
            <button onClick={() => handleLinkClick("#testimonials")} className="block px-4 py-3 text-gray-700 hover:bg-gray-50 w-full text-left">Testimonials</button>
            <button onClick={() => handleLinkClick("#faq")} className="block px-4 py-3 text-gray-700 hover:bg-gray-50 w-full text-left">FAQ</button>
            <div className="border-t border-gray-200 my-2"></div>
            {isAuthenticated ? (
              <Button onClick={() => { navigate("/dashboard"); setIsMenuOpen(false) }} className="w-full">Go to Dashboard</Button>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 w-full text-center">Login</Link>
                <Link to="/signup" className="block mx-auto bg-slate-900 text-white px-6 py-2 rounded-full hover:bg-cyan-100 hover:text-slate-900 transition text-center">SignUp</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
export default Header