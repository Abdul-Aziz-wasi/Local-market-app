import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router';
import logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/AuthContext';

import Register from '../../Pages/Register/Register';
import Login from '../../Pages/Login/Login';


const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleLogout = () => {
    logOutUser().then(() => console.log('signout user')).catch(console.error);
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <NavLink to="/">
            <img className="h-12 w-12" src={logo} alt="Logo" />
          </NavLink>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About Us</NavLink></li>
          </ul>
        </div>

        <div className="navbar-end space-x-2">
          {user ? (
            <button onClick={handleLogout} className="btn">Log out</button>
          ) : (
            <>
              <button onClick={() => setIsRegisterOpen(true)} className="btn">Register</button>
              <button onClick={() => setIsLoginOpen(true)} className="btn">Login</button>
            </>
          )}
        </div>
      </div>

      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <Register isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
    </>
  );
};

export default Navbar;
