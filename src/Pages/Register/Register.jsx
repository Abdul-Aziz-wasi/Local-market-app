import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Register = ({ isOpen, onClose }) => {
  const { createUser, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      const { email, displayName, photoURL } = result.user;

      // ✅ Save user to DB (if not exists)
      await axios.post('https://local-market-omega.vercel.app/users', {
        email,
        name: displayName,
        photo: photoURL,
        role: 'user'
      });

      toast.success('Registered with Google');
      onClose();
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await createUser(email, password);
      const user = result.user;

      // ✅ Insert to DB after manual signup
      await axios.post('https://local-market-omega.vercel.app/users', {
        email: user.email,
        name: user.displayName || 'Anonymous',
        photo: user.photoURL || '',
        role: 'user'
      });

      toast.success('Registration successful');
      onClose();
      navigate('/');
    } catch (error) {
      console.error(error);
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

        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">
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
            Register
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn bg-white w-full text-black border-[#e5e5e5]"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff" />
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                />
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                />
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                />
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                />
              </g>
            </svg>
            Register with Google
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
