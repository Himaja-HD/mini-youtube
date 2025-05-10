import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../features/auth/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
        <LoginForm />

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <button
            className="text-blue-500 hover:text-blue-700 font-semibold"
            onClick={handleRegisterRedirect}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
