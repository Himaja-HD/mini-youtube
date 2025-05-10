import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome, FaUserCircle
} from "react-icons/fa";
import {
  SiYoutubeshorts
} from "react-icons/si";
import {
  MdSubscriptions
} from "react-icons/md";

const Nav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:top-16 md:w-20 md:h-full flex md:flex-col justify-around md:justify-start items-center bg-white border-t md:border-r shadow md:shadow-md Z-1">
      
      <Link to="/" className="flex flex-col items-center justify-center py-2 md:py-6 text-gray-700 hover:text-black">
        <FaHome size={20} />
        <span className="text-[10px] md:text-xs">Home</span>
      </Link>

      <Link to="/shorts" className="flex flex-col items-center justify-center py-2 md:py-6 text-gray-700 hover:text-black">
        <SiYoutubeshorts size={20} />
        <span className="text-[10px] md:text-xs">Shorts</span>
      </Link>

      <Link to="/subscriptions" className="flex flex-col items-center justify-center py-2 md:py-6 text-gray-700 hover:text-black">
        <MdSubscriptions size={20} />
        <span className="text-[10px] md:text-xs">Subscriptions</span>
      </Link>

      <Link to="/channel/me" className="flex flex-col items-center justify-center py-2 md:py-6 text-gray-700 hover:text-black">
        <FaUserCircle size={20} />
        <span className="text-[10px] md:text-xs">Channel</span>
      </Link>

    </nav>
  );
};

export default Nav;
