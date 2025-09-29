import { useState, useEffect } from "react"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FileText, Menu, X} from "lucide-react"
import ProfileDropdown from "../layout/ProfileDropdown"
import { useAuth } from "../../context/AuthContext"
import { Button } from "../ui/Button"
const Header = () => {

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();

  const navigate = useNavigate()

  const [profileDropdownOpen, setProfileDeopdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);


  }, []);

  return (

    <header
  className={`fixed top-0 w-full z-50 transition-all duration-300`}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
    <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg px-4 md:px-6 py-3 flex items-center justify-between">
      
      {/* ===== Left Section (Logo + Name) ===== */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-green-800 rounded-md flex items-center justify-center">
          <FileText className="w-4 h-4 text-white" />
        </div>
        <span className="text-lg md:text-xl font-bold text-slate-900">
          Hola IO
        </span>
      </div>

      {/* ===== Desktop Menu ===== */}
      <div className="hidden lg:flex lg:items-center lg:space-x-8">
        <a
          href="#features"
          className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black after:transition-all hover:after:w-full"
        >
          Features
        </a>
        <a
          href="#testimonials"
          className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black after:transition-all hover:after:w-full"
        >
          Testimonials
        </a>
        <a
          href="#faq"
          className="text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-black after:transition-all hover:after:w-full"
        >
          FAQ
        </a>
      </div>

      {/* ===== Right Section (Buttons / Profile) ===== */}
      <div className="hidden lg:flex items-center space-x-4">
        {isAuthenticated ? (
          <ProfileDropdown
            isOpen={profileDropdownOpen}
            onToggle={(e) => {
              e.stopPropagation();
              setProfileDeopdownOpen(!profileDropdownOpen);
            }}
            avatar={user?.avatar || ""}
            companyName={user?.name || ""}
            email={user?.email || ""}
            onLogout={logout}
          />
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-800 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-cyan-700 to-emerald-600 text-white px-5 py-2.5 rounded-full font-semibold hover:scale-105 hover:shadow-md border border-cyan-300 transition-all duration-200"
            >
              Login / Signup
            </Link>
          </>
        )}
      </div>

      {/* ===== Mobile Menu Button ===== */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </div>
  </div>

  {/* ===== Mobile Dropdown Menu ===== */}
  {isMenuOpen && (
    <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
      <div className="px-4 py-3 space-y-1">
        <a
          href="#features"
          className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium transition-colors duration-200"
        >
          Features
        </a>
        <a
          href="#testimonials"
          className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium transition-colors duration-200"
        >
          Testimonials
        </a>
        <a
          href="#faq"
          className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium transition-colors duration-200"
        >
          FAQ
        </a>

        <div className="border-t border-gray-200 my-2"></div>

        {isAuthenticated ? (
          <div className="p-4">
            <Button onClick={() => navigate("/dashboard")} className="w-full">
              Go to Dashboard
            </Button>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="block px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium transition-colors duration-200"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block w-full text-center bg-gradient-to-r from-cyan-700 to-emerald-600 hover:opacity-90 text-white px-4 py-3 rounded-full font-semibold transition-all duration-200"
            >
              Login / Signup
            </Link>
          </>
        )}
      </div>
    </div>
  )}
</header>
  )
}

export default Header