import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import Nav from './layout/Nav';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <>
      <ToastContainer /> 
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default App;
