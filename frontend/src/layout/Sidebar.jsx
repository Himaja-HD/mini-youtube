import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome, FaUserCircle, FaHistory, FaShoppingBag, FaMusic, FaTrophy,
  FaChalkboard, FaTshirt, FaPodcast
} from "react-icons/fa";
import {
  SiYoutubeshorts, SiTether, SiYoutubegaming
} from "react-icons/si";
import {
  MdSubscriptions, MdTrendingUp, MdNewspaper
} from "react-icons/md";
import { PiFilmSlateFill } from "react-icons/pi";

const Sidebar = () => {
  return (
    <>
      <div className="flex flex-col mt-16 gap-3 items-start Z-60 px-4 py-4 text-gray-700">
        <h1 className="text-sm font-semibold text-gray-500 px-4 mb-2">Menu</h1>
        <Link to="/">
          <div className="flex items-center gap-4 hover:bg-gray-100 px-4 py-3 rounded-lg w-full">
            <FaHome size={20} />
            <span className="text-sm font-medium">Home</span>
          </div>
        </Link>
        <div className="flex items-center gap-4 hover:bg-gray-100 px-4 py-3 rounded-lg w-full">
          <SiYoutubeshorts size={20} />
          <span className="text-sm font-medium">Shorts</span>
        </div>
        <div className="flex items-center gap-4 hover:bg-gray-100 px-4 py-3 rounded-lg w-full">
          <MdSubscriptions size={20} />
          <span className="text-sm font-medium">Subscription</span>
        </div>
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="mt-4 flex flex-col gap-3 items-start px-4 py-4 text-gray-700">
        <h2 className="text-sm font-semibold text-gray-500 px-4 mb-2">Explore</h2>
        {[{ icon: <MdTrendingUp size={20} />, label: 'Trending' },
          { icon: <FaShoppingBag size={20} />, label: 'Shopping' },
          { icon: <FaMusic size={20} />, label: 'Music' },
          { icon: <PiFilmSlateFill size={20} />, label: 'Films' },
          { icon: <SiTether size={20} />, label: 'Live' },
          { icon: <SiYoutubegaming size={20} />, label: 'Gaming' },
          { icon: <MdNewspaper size={20} />, label: 'News' },
          { icon: <FaTrophy size={20} />, label: 'Sports' },
          { icon: <FaChalkboard size={20} />, label: 'Courses' },
          { icon: <FaTshirt size={20} />, label: 'Fashion' },
          { icon: <FaPodcast size={20} />, label: 'Podcasts' }].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 hover:bg-gray-100 px-4 py-3 rounded-lg w-full">
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
