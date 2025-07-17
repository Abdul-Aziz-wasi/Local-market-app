// Login.jsx
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const Login = ({ isOpen, onClose, redirectTo = '/' }) => {
  const { loginUser, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(result => {
        console.log(result)
        toast.success('Logged in with Google');
        onClose();
        navigate(redirectTo); // ✅ go to original page
      })
      .catch(error => toast.error(error.message));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await loginUser(email, password);
      console.log(result)
      toast.success('Login successful');
      onClose();
      navigate(redirectTo); // ✅ go to original page
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-teal-900 bg-opacity-50 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="relative w-full max-w-md bg-white rounded-xl shadow-lg p-6"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-2xl font-bold text-gray-400 hover:text-red-500"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-800 hover:bg-teal-700 text-white py-2 rounded transition"
          >
            Login
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn bg-white w-full text-black border mt-2"
          >
            Login with Google
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
