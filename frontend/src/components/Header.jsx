import React, { useState, useRef, useEffect } from "react"; // imports  
import { useDispatch, useSelector } from "react-redux"; // redux  
import { useNavigate } from "react-router-dom"; // routing  
import { FaSearch } from "react-icons/fa"; // icon  
import ChannelMenuButton from "./ChannelMenuButton"; // component  
import { logout } from "../features/auth/authSlice"; // auth action  
import { toggleMenu } from "../features/app/appSlice"; // app action  
import Sidebar from "./Sidebar"; // component  

const Header = () => {
  const dispatch = useDispatch(); // dispatch  
  const navigate = useNavigate(); // navigate  

  const menuOpen = useSelector((state) => state.app.menuOpen); // menu state  
  const user = useSelector((state) => state.auth.user); // user state  

  const [dropdownOpen, setDropdownOpen] = useState(false); // dropdown  
  const [searchQuery, setSearchQuery] = useState(""); // search  
  const dropdownRef = useRef(null); // ref  

  const handleToggleMenu = () => dispatch(toggleMenu()); // toggle  

  const handleLogout = () => {
    dispatch(logout()); // logout  
    navigate("/login"); // redirect  
  };

  const handleSearch = () => {
    const query = searchQuery.trim(); // trim  
    if (query) {
      navigate(`/search/${encodeURIComponent(query)}`); // search  
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false); // close  
      }
    };
    document.addEventListener("mousedown", handleClickOutside); // listen  
    return () => document.removeEventListener("mousedown", handleClickOutside); // cleanup  
  }, []);

  useEffect(() => {
    if (dropdownOpen && menuOpen) {
      dispatch(toggleMenu(false)); // close menu  
    }
  }, [dropdownOpen, menuOpen, dispatch]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white shadow px-4 py-2">
        {/* Left: Logo and Menu */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleToggleMenu}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200"
            aria-label="Toggle menu"
          >
            <i className="fas fa-bars text-xl text-gray-800" /> {/* icon */}
          </button>
          <a href="/" className="flex items-center">
            <svg width="90" height="40" viewBox="0 0 90 20" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fillRule="evenodd">
                <path fill="#FF0000" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0z" /> {/* circle */}
                <path fill="#FFF" d="M8 14.5V5.5L14.5 10 8 14.5z" /> {/* play */}
                <text x="22" y="14" fill="#000" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="bold">YouTube</text> {/* text */}
              </g>
            </svg>
          </a>
        </div>

        {/* Center: Search */}
        <div className="hidden md:block flex-1 max-w-lg mx-4">
          <div className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // input  
              onKeyDown={(e) => e.key === "Enter" && handleSearch()} // enter  
              placeholder="Search"
              className="w-full px-4 py-2 bg-white border-2 border-slate-400 rounded-full pr-12 focus:outline-none focus:border-blue-400 text-gray-800 font-medium"
              aria-label="Search videos"
            />
            <button
              onClick={handleSearch}
              className="absolute right-0 top-0 h-full px-4 hover:bg-slate-100 rounded-r-full border-l"
              aria-label="Search button"
            >
              <FaSearch className="w-5 h-5 text-gray-800" /> {/* icon */}
            </button>
          </div>
        </div>

        {/* Right: User dropdown / login */}
        <div className="relative" ref={dropdownRef}>
          {user ? (
            <>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)} // toggle dropdown  
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                className="text-2xl text-gray-800 focus:outline-none"
                aria-label="User menu"
              >
                <i className="fas fa-user-circle" /> {/* icon */}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-md z-50 divide-y divide-gray-200">
                  <button
                    onClick={() => {
                      navigate("/profile"); // profile  
                      setDropdownOpen(false); // close  
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <ChannelMenuButton user={user} setDropdownOpen={setDropdownOpen} /> {/* channel menu */}
                  <button
                    onClick={handleLogout} // logout  
                    className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={() => navigate("/login")} // login  
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
        }`} // slide  
      >
        <Sidebar /> {/* sidebar */}
      </aside>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`} // overlay  
        onClick={handleToggleMenu} // close menu  
        aria-hidden={menuOpen ? "false" : "true"}
      />
    </>
  );
};

export default Header; // export  
