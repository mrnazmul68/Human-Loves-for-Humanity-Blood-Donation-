import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem("currentUser");
      const storedComplete = localStorage.getItem("isProfileComplete");
      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
        setIsProfileComplete(storedComplete ? JSON.parse(storedComplete) : true);
      } else {
        setCurrentUser(null);
      }
    };

    updateUser();
    window.addEventListener("storage", updateUser);
    
    const checkInterval = setInterval(updateUser, 500);
    return () => {
      window.removeEventListener("storage", updateUser);
      clearInterval(checkInterval);
    };
  }, []);

  const handleNavClick = (e, href) => {
    const storedUser = localStorage.getItem("currentUser");
    const storedComplete = localStorage.getItem("isProfileComplete");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      const complete = storedComplete ? JSON.parse(storedComplete) : true;

      if (user.isDonor === "donor" && !complete && href !== "/profile") {
        e.preventDefault();
        toast.error("Please complete your profile first!");
        navigate("/profile");
        return;
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY < 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setIsProfileDropdownOpen(false);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const navLinkClass = ({ isActive, isMobile }) =>
    `${isActive ? "text-red-500" : "text-gray-300"} hover:text-red-200 transition-colors ${!isMobile && isActive ? "underline underline-offset-4" : ""}`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="backdrop-blur-md bg-black/40 border border-red-900/30 mx-4 my-3 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="MATOMA"
                className="h-10 border-2  border-red-500 rounded-full w-10"
              />
              <span className="ml-2 text-lg font-bold text-red-200">
                MATOMA
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-5">
              <NavLink
                to="/"
                onClick={(e) => handleNavClick(e, "/")}
                className={navLinkClass}
              >
                Home
              </NavLink>
              <a
                href="#search-donor-form"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(e, "/");
                  const el = document.getElementById("search-donor-form");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="text-gray-300 hover:text-red-200 transition-colors"
              >
                Find Donor
              </a>
              <NavLink
                to="/all-donors"
                onClick={(e) => handleNavClick(e, "/all-donors")}
                className={navLinkClass}
              >
                All Donors
              </NavLink>
              <NavLink
                to="/about"
                onClick={(e) => handleNavClick(e, "/about")}
                className={navLinkClass}
              >
                About
              </NavLink>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                    className="flex items-center gap-3 hover:bg-zinc-800/50 px-3 py-2 rounded-xl transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center overflow-hidden">
                      {currentUser.profilePicture ? (
                        <img
                          src={currentUser.profilePicture}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaUser className="text-zinc-400" />
                      )}
                    </div>
                    <span className="text-white font-medium">
                      {currentUser.name}
                    </span>
                  </button>

                  {isProfileDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50">
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 text-zinc-200 transition-colors rounded-t-xl"
                      >
                        <FaUser />
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800 text-red-400 transition-colors rounded-b-xl"
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-1.5 text-white hover:text-red-200 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-1.5 bg-[#E11D48] text-white rounded-xl hover:bg-[#BE123C] transition-all hover:shadow-lg hover:shadow-[#E11D48]/30 text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        <div
          className={`absolute left-0 top-0 h-screen text-white w-72 bg-black  border-r border-gray-700 transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="p-6 space-y-4">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center mb-8"
            >
              <img src={logo} alt="MATOMA" className="h-10 w-10" />
              <span className="ml-2 text-lg font-bold text-red-200">
                MATOMA
              </span>
            </Link>
            <NavLink
              to="/"
              onClick={(e) => {
                handleNavClick(e, "/");
                setIsMobileMenuOpen(false);
              }}
              className={({ isActive }) => navLinkClass({ isActive, isMobile: true }) + " block py-2 text-lg"}
            >
              Home
            </NavLink>
            <a
              href="#search-donor-form"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(e, "/");
                setIsMobileMenuOpen(false);
                const el = document.getElementById("search-donor-form");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-gray-300 hover:text-red-200 transition-colors block py-2 text-lg"
            >
              Find Donor
            </a>
            <NavLink
              to="/all-donors"
              onClick={(e) => {
                handleNavClick(e, "/all-donors");
                setIsMobileMenuOpen(false);
              }}
              className={({ isActive }) => navLinkClass({ isActive, isMobile: true }) + " block py-2 text-lg"}
            >
              All Donors
            </NavLink>
            <NavLink
              to="/about"
              onClick={(e) => {
                handleNavClick(e, "/about");
                setIsMobileMenuOpen(false);
              }}
              className={({ isActive }) => navLinkClass({ isActive, isMobile: true }) + " block py-2 text-lg"}
            >
              About
            </NavLink>
            <div className="pt-6 border-t border-gray-700 space-y-3">
              {currentUser ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-2 border border-white text-white rounded-xl hover:bg-white hover:text-black transition-colors"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 bg-red-600 text-white text-center rounded-xl hover:bg-red-700 transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-2 border border-white text-white rounded-xl hover:bg-white hover:text-black transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full px-4 py-2 bg-[#E11D48] text-white text-center rounded-xl hover:bg-[#BE123C] transition-all"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
