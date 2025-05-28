import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome, FaShoppingBag, FaMusic, FaTrophy, FaChalkboard,
  FaTshirt, FaPodcast
} from "react-icons/fa";
import { SiYoutubeshorts, SiTether, SiYoutubegaming } from "react-icons/si";
import { MdSubscriptions, MdTrendingUp, MdNewspaper } from "react-icons/md";
import { PiFilmSlateFill } from "react-icons/pi";

const Sidebar = () => {
  // Links
  const exploreLinks = [
    { to: "/explore/trending", icon: <MdTrendingUp size={20} />, label: 'Trending' }, // Trending
    { to: "/explore/shopping", icon: <FaShoppingBag size={20} />, label: 'Shopping' }, // Shopping
    { to: "/explore/music", icon: <FaMusic size={20} />, label: 'Music' }, // Music
    { to: "/explore/films", icon: <PiFilmSlateFill size={20} />, label: 'Films' }, // Films
    { to: "/explore/live", icon: <SiTether size={20} />, label: 'Live' }, // Live
    { to: "/explore/gaming", icon: <SiYoutubegaming size={20} />, label: 'Gaming' }, // Gaming
    { to: "/explore/news", icon: <MdNewspaper size={20} />, label: 'News' }, // News
    { to: "/explore/sports", icon: <FaTrophy size={20} />, label: 'Sports' }, // Sports
    { to: "/explore/courses", icon: <FaChalkboard size={20} />, label: 'Courses' }, // Courses
    { to: "/explore/fashion", icon: <FaTshirt size={20} />, label: 'Fashion' }, // Fashion
    { to: "/explore/podcasts", icon: <FaPodcast size={20} />, label: 'Podcasts' }, // Podcasts
  ];

  return (
    <>
      {/* Main Menu */}
      <div className="flex flex-col mt-16 gap-3 items-start z-50 px-4 py-4 text-gray-700">
        <h1 className="text-sm font-semibold text-gray-500 px-4 mb-2">Menu</h1>

        <Link to="/" className="flex items-center gap-4 hover:bg-gray-100 px-4 py-3 rounded-lg w-full">
          <FaHome size={20} /> {/* Home Icon */}
          <span className="text-sm font-medium">Home</span> {/* Home */}
        </Link>

        <Link to="/shorts" className="flex items-center gap-4 hover:bg-gray-100 px-4 py-3 rounded-lg w-full">
          <SiYoutubeshorts size={20} /> {/* Shorts Icon */}
          <span className="text-sm font-medium">Shorts</span> {/* Shorts */}
        </Link>

        <Link to="/subscriptions" className="flex items-center gap-4 hover:bg-gray-100 px-4 py-3 rounded-lg w-full">
          <MdSubscriptions size={20} /> {/* Subscriptions Icon */}
          <span className="text-sm font-medium">Subscriptions</span> {/* Subscriptions */}
        </Link>
      </div>

      {/* Divider */}
      <hr className="my-4 border-gray-200" />

      {/* Explore Section */}
      <div className="mt-4 flex flex-col gap-3 items-start px-4 py-4 text-gray-700">
        <h2 className="text-sm font-semibold text-gray-500 px-4 mb-2">Explore</h2>
        {exploreLinks.map(({ to, icon, label }, idx) => (
          <Link key={idx} to={to} className="flex items-center gap-4 hover:bg-gray-100 px-4 py-3 rounded-lg w-full">
            {icon} {/* Icon */}
            <span className="text-sm font-medium">{label}</span> {/* Label */}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
