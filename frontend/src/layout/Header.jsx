import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Top Header */}
      <div className="fixed-header grid grid-flow-col p-3 shadow-md items-center relative z-10 bg-white">
        <div className="flex items-center space-x-4 col-span-1">
          <button
            className="w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center"
            onClick={handleToggleMenu}
          >
            <i className="fas fa-bars text-black text-lg" />
          </button>

          {/* Logo */}
          <a href="/" className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="90" height="40" viewBox="0 0 90 20">
              <g fill="none" fillRule="evenodd">
                <path fill="#FF0000" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0z" />
                <path fill="#FFF" d="M8 14.5V5.5L14.5 10 8 14.5z" />
                <text x="22" y="14" fill="#000" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="bold">
                  YouTube
                </text>
              </g>
            </svg>
          </a>
        </div>

        <div className="col-span-1 flex justify-end">
          {isLoggedIn ? (
            <i
              className="fas fa-user-circle text-2xl text-gray-700 cursor-pointer"
              onClick={() => navigate("/profile")}
            />
          ) : (
            <button
              className="px-4 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Sidebar Drawer */}
      <div
        id="sidenav"
        className={`fixed top-0 left-0 z-40 h-full w-[240px] bg-white shadow-md transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ overflowY: 'auto', overflowX: 'hidden' }}
      >
        <Sidebar />
      </div>

      {/* Overlay */}
      <div
        id="cover"
        className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        }`}
        onClick={handleToggleMenu}
      />
    </>
  );
};

export default Header;
