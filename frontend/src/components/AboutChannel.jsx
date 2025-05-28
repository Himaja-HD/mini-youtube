import React from 'react'; // Import

const AboutChannel = ({ channel }) => {
  if (!channel) return null; // Check

  return (
    <div className="p-4 mb-4 bg-slate-800 rounded-xl shadow"> {/* Container */}
      <div className="flex items-center space-x-4"> {/* Layout */}
        <img
          src={channel?.avatar} // Avatar
          alt="channel_avatar"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div> {/* Info */}
          <h2 className="text-2xl font-bold text-white">{channel?.userName}</h2> {/* Name */}
          <p className="text-gray-400">@{channel?.channelName?.toLowerCase()}</p> {/* Handle */}
          <p className="text-gray-300">{channel?.description}</p> {/* Description */}
        </div>
      </div>
    </div>
  );
};

export default AboutChannel; // Export
