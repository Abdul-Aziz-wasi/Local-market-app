import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router'; 
import logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/AuthContext';
import Login from '../../Pages/Login/Login';
 

const Navbar = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const [isLoginOpen, setIsLoginOpen] = useState(false); 

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        console.log('signout user');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navItems = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/about">About Us</NavLink></li>
    </>
  );

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
              {navItems}
            </ul>
          </div>
          <NavLink to="/"><img className="h-12 w-12" src={logo} alt="Logo" /></NavLink>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        <div className="navbar-end space-x-2">
          {user ? (
            <button onClick={handleLogout} className="btn">Log out</button>
          ) : (
            <>
              <NavLink to="/register" className="btn">Register</NavLink>
              <button onClick={() => setIsLoginOpen(true)} className="btn">Login</button> 
            </>
          )}
        </div>
      </div>

      
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Navbar;
