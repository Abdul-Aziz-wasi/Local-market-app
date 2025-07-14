import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';

import Register from '../../Pages/Register/Register';
import Login from '../../Pages/Login/Login';

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logOutUser().then(() => console.log('Sign out user')).catch(console.error);
  };

  const navLinkStyle = ({ isActive }) =>
    isActive ? 'text-teal-900 font-bold' : 'hover:text-teal-700';

  const navItems = (
    <>
      <li>
        <NavLink to="/" className={navLinkStyle}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={navLinkStyle}>
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <div className="navbar  shadow-md px-4">
        {/* Logo */}
        <div className="navbar-start">
          <NavLink to="/">
            <img
              className="h-10 w-auto"
              src="https://ninetheme.com/themes/crisop/wp-content/uploads/2023/02/crisoplogo.png"
              alt="Logo"
            />
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">{navItems}</ul>
        </div>

        {/* Navbar End: Buttons and Hamburger */}
        <div className="navbar-end flex items-center space-x-2">
          {/* Always Visible Buttons (even on mobile) */}
          {user ? (
            <button onClick={handleLogout} className="btn btn-sm btn-warning text-white">
              Log out
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsRegisterOpen(true)}
                className="btn btn-sm bg-teal-800 hover:bg-teal-700 text-white"
              >
                Register
              </button>
              <button
                onClick={() => setIsLoginOpen(true)}
                className="btn btn-sm bg-teal-800 hover:bg-teal-700 text-white"
              >
                Login
              </button>
            </>
          )}

          {/* Hamburger Toggle - only shows nav items */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Nav Only (not login/register) */}
      {isMenuOpen && (
        <div className="lg:hidden bg-teal-800 text-white px-4 pb-4">
          <ul className="menu space-y-2 pt-3">{navItems}</ul>
        </div>
      )}

      {/* Modals */}
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <Register isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </>
  );
};

export default Navbar;
