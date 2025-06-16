import React from 'react';
import { FaTwitter, FaLinkedin, FaFacebookF } from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo + Tagline */}
        <div>
         <div className="flex items-center font-bold">
          <span className="text-3xl text-blue-400 font-bold">Edu</span>
          <span className="text-3xl text-green-400 font-bold">Hive</span>
        </div>
          <p className="text-sm">
            Empowering learners with knowledge and skills to succeed in a digital world.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-semibold text-blue-500 mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-blue-500">About Us</a></li>
            <li><a href="#" className="hover:text-blue-500">Contact Us</a></li>
            <li><a href="#" className="hover:text-blue-500">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-blue-500">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="font-semibold text-blue-500 mb-3">Newsletter</h2>
          <p className="text-sm mb-2">Get updates, tips and educational resources.</p>
          <form className="flex">
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full p-2 rounded-l bg-gray-800 text-sm focus:outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded-r text-sm">
              Subscribe
            </button>
          </form>
        </div>

        {/* Social */}
        <div>
          <h2 className="font-semibold text-blue-600 mb-3">Follow Us</h2>
          <div className="flex space-x-4">
            <Link to='https://web.facebook.com/eduhive/?_rdc=1&_rdr#' className="hover:text-blue-500"><FaFacebookF size={20} /></Link>
            <Link to='https://x.com/i/flow/login?redirect_after_login=%2Fsearch%3Fq%3D%2523eduhive%26src%3Dhashtag_click'  className="hover:text-blue-500"><FaTwitter size={20} /></Link>
            <Link to='https://www.linkedin.com/company/eduhive/?originalSubdomain=bd' className="hover:text-blue-500"><FaLinkedin size={20} /></Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} eduHive. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
