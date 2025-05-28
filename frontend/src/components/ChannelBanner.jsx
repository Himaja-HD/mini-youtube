import React from 'react'; // Import

const ChannelBanner = ({ channel }) => {
  return (
    <div className="w-full h-80 rounded-2xl overflow-hidden mb-4"> {/* Wrapper */}
      <img
        src={channel?.channelBanner} // Source
        alt="channel_banner" // Alt
        className="w-full h-full object-cover" 
      />
    </div>
  );
};

export default ChannelBanner; // Export
