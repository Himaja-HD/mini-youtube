import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleMenu } from "../features/app/appSlice";
import { logout } from "../features/auth/authSlice";
import Sidebar from "./Sidebar";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuOpen = useSelector((state) => state.app.menuOpen);
  const user = useSelector((state) => state.auth.user);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle sidebar toggle
  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white shadow px-4 py-2">
        {/* Left: Toggle + Logo */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleToggleMenu}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200"
          >
            <i className="fas fa-bars text-xl text-gray-800" />
          </button>

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

        {/* Right: Login or Profile */}
        <div className="relative" ref={dropdownRef}>
          {user ? (
            <>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-2xl text-gray-800 focus:outline-none"
              >
                <i className="fas fa-user-circle" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-md z-50">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setDropdownOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      navigate("/settings");
                      setDropdownOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-[240px] bg-white shadow-md transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </aside>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={handleToggleMenu}
      />
    </>
  );
};

export default Header;
