import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerThunk } from '../features/auth/authThunks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const dispatch = useDispatch(); // dispatch
  const navigate = useNavigate(); // navigate

  const [email, setEmail] = useState(''); // email
  const [username, setUsername] = useState(''); // username
  const [password, setPassword] = useState(''); // password

  const { user, loading, error } = useSelector((state) => state.auth); // auth state

  useEffect(() => {
    if (user) {
      toast.success('Registration successful! Please log in.'); // success toast
      const redirectPath = location.state?.from || '/login'; // redirect path
      setTimeout(() => navigate(redirectPath, { replace: true }), 100); // redirect
    }
  }, [user, navigate, location]); // deps

  const handleRegister = (e) => {
    e.preventDefault(); // prevent
    dispatch(registerThunk({ email, username, password })); // dispatch thunk
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4"> {/* container */}
      <div className="bg-white p-8 shadow-lg rounded-md w-full max-w-md"> {/* card */}
        <h2 className="text-3xl font-bold mb-6 text-center">Create Your Account</h2> {/* title */}

        <form onSubmit={handleRegister}> {/* form */}
          <div className="mb-4"> {/* username input */}
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Your name"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4"> {/* email input */}
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6"> {/* password input */}
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading} // disable btn
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {loading ? 'Creating account...' : 'Register'} {/* button text */}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>} {/* error */}

        <div className="mt-6 text-center text-sm"> {/* switch login */}
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:underline font-medium"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
