import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import Nav from './layout/Nav';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const App = () => (
  <Router>
    <div className="flex">
      <div className="flex-1 mt-14">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <ToastContainer position="top-right"  autoClose={3000}  hideProgressBar={false}
          newestOnTop={true} closeOnClick  pauseOnHover draggable theme="light"  />
      </div>
    </div>
  </Router>
);

export default App;
