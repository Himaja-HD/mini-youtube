import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerThunk } from '../features/auth/authThunks';
import { useNavigate, useLocation } from 'react-router-dom'; // added useLocation
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // needed for redirect logic

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(''); // new avatar input

  const { user, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      toast.success('Registration successful! Please log in.');
      const redirectPath = location.state?.from || '/login';
      setTimeout(() => navigate(redirectPath, { replace: true }), 100);
    }
  }, [user, navigate, location]);

  const handleRegister = (e) => {
    e.preventDefault();

    const finalAvatar = avatar.trim() || `https://api.dicebear.com/7.x/initials/svg?seed=${username}`;
    
    dispatch(registerThunk({ email, username, password, avatar: finalAvatar }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 shadow-lg rounded-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Create Your Account</h2>

        <form onSubmit={handleRegister}>
          <div className="mb-4">
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

          <div className="mb-4">
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL (optional)</label>
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="url image paste here"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
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
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        <div className="mt-6 text-center text-sm">
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
