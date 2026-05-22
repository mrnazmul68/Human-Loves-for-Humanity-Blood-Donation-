import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-950 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <img src={logo} alt="MATOMA" className="h-10 w-10" />
              <span className="ml-2 text-lg font-bold text-red-200">
                MATOMA
              </span>
            </Link>
            <p className="text-gray-400 mb-4">
              The next-generation logistics platform for life-saving blood
              coordination.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-[#E11D48] transition-colors text-xl"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#E11D48] transition-colors text-xl"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#E11D48] transition-colors text-xl"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-[#E11D48] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-[#E11D48] transition-colors"
                >
                  Find Donor
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-[#E11D48] transition-colors"
                >
                  All Donors
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-[#E11D48] transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-[#E11D48] transition-colors"
                >
                  Blood Donation
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-[#E11D48] transition-colors"
                >
                  Blood Bank
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-[#E11D48] transition-colors"
                >
                  Emergency Help
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-[#E11D48] transition-colors"
                >
                  Awareness
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400">
                <FaEnvelope className="text-[#E11D48]" />
                <span>contact@matoma.org</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <FaPhone className="text-[#E11D48]" />
                <span>+880 1700-000000</span>
              </li>
              <li className="text-gray-400">Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} MATOMA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
