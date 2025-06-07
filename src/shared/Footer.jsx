
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content p-10 mt-auto border-t-4 border-primary min-h-screen">
      <div className="footer max-w-7xl mx-auto flex flex-wrap justify-between items-start">
        {/* Logo Section */}
        <div className="footer-section mb-8 md:mb-0 w-full md:w-auto">
          {/* Using Link for the logo to navigate to the homepage */}
      <div className="flex items-center font-bold">
          <span className="text-3xl text-blue-400 font-bold">Edu</span>
          <span className="text-3xl text-green-400 font-bold">Hive</span>
        </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section mb-8 md:mb-0 w-full md:w-auto">
          <h6 className="footer-title text-lg font-semibold text-blue-500">Quick Links</h6>
          <ul>
            <li>
              <NavLink
                to="/about-us" // Example: Actual path for About Us page
                className={({ isActive }) =>
                  `link link-hover text-base-content mb-2 block ${isActive ? 'text-primary font-semibold' : 'hover:text-primary'}`
                }
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact-us" // Example: Actual path for Contact Us page
                className={({ isActive }) =>
                  `link link-hover text-base-content mb-2 block ${isActive ? 'text-primary font-semibold' : 'hover:text-primary'}`
                }
              >
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/terms-conditions" // Example: Actual path for Terms & Conditions page
                className={({ isActive }) =>
                  `link link-hover text-base-content mb-2 block ${isActive ? 'text-primary font-semibold' : 'hover:text-primary'}`
                }
              >
                Terms & Conditions
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Connect With Us Section */}
        <div className="footer-section w-full md:w-auto">
          <h6 className="footer-title text-lg font-semibold text-blue-500">Connect With Us</h6>
          <div className="grid grid-flow-col gap-4 text-2xl">
            {/* Social media links are external, so standard <a> tags are appropriate */}
            <a href="https://twitter.com/eduhiveofficial" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter className="text-base-content hover:text-primary transition-colors duration-300" />
            </a>
            <a href="https://linkedin.com/company/eduhive" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn className="text-base-content hover:text-primary transition-colors duration-300" />
            </a>
            <a href="https://facebook.com/eduhiveofficial" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF className="text-base-content hover:text-primary transition-colors duration-300" />
            </a>
            <a href="https://instagram.com/eduhiveofficial" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="text-base-content hover:text-primary transition-colors duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="footer-bottom mt-10 border-t border-base-300 pt-6 text-center text-sm text-base-content">
        &copy; 2025 EduHive. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;