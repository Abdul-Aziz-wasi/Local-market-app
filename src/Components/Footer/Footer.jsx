import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link, NavLink } from 'react-router';
// import logo from '../../assets/logo.png'; // Update the path based on your folder structure

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        
        {/* Logo & Website Name */}
        <div>
          {/* <img src={logo} alt="Logo" className="w-14 h-14 mb-2" /> */}
          <h3 className=' font-bold '><span className='text-2xl text-green-500'>V</span>egist</h3>
          <h3 className="text-xl font-semibold">Local Market</h3>
          <p className="text-sm text-gray-300 mt-1">Tracking daily prices made easy</p>
        </div>

        {/* Contact Details */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
          <p className="text-sm text-gray-300">Email: support@localmarket.com</p>
          <p className="text-sm text-gray-300">Phone: +880-1234-567890</p>
          <p className="text-sm text-gray-300">Address: Dhaka, Bangladesh</p>
        </div>

        {/* Terms & Policies */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Useful Links</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            {/* <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li> */}

            <Link to='terms'><p>Terms & Conditions</p></Link>
            <Link to='privacy'><p>Privacy Policy</p></Link>
         
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/ma.aziz.79025" target="_blank" rel="noreferrer">
              <FaFacebookF className="text-white hover:text-blue-500 text-xl" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="text-white hover:text-blue-400 text-xl" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="text-white hover:text-pink-500 text-xl" />
            </a>
            <a href="https://www.linkedin.com/in/abdul-aziz-730b97372" target="_blank" rel="noreferrer">
              <FaLinkedin className="text-white hover:text-blue-600 text-xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm text-gray-400 mt-8">
        &copy; {new Date().getFullYear()} Local Market Tracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
