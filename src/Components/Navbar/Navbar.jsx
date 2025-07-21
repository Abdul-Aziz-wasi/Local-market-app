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
    logOutUser()
      .then(() => console.log('Sign out user'))
      .catch(console.error);
  };

  return (
    <>
      <div className="navbar bg-white shadow-md px-4 sticky top-0 left-0 w-full z-50">
        {/* Logo */}
        <div className="navbar-start">
          <NavLink to="/">
           <h3 className='text-2xl font-bold text-teal-700'>CRISPO</h3>
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'text-teal-800 font-semibold' : 'hover:text-teal-600'
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/allproducts"
                className={({ isActive }) =>
                  isActive ? 'text-teal-800 font-semibold' : 'hover:text-teal-600'
                }
              >
                All products
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right Side */}
        <div className="navbar-end flex items-center gap-2">
          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-sm bg-teal-800 text-white"
            >
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

          {/* Hamburger Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-teal-800 focus:outline-none"
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white text-gray-800 shadow-md px-4 pt-16 pb-4">
          <ul className="flex flex-col gap-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'text-teal-800 font-semibold' : 'hover:text-teal-600'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? 'text-teal-800 font-semibold' : 'hover:text-teal-600'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      {/* Modals */}
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <Register isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </>
  );
};

export default Navbar;
