import React from "react";
import { Link } from "react-router-dom";

const VideoCardHorizontal = ({ video }) => {
  if (!video) return null;       // Guard

  const {
    _id,
    thumbnail = "/default-thumbnail.jpg", // DefaultThumb
    title = "Untitled Video",             // DefaultTitle
    views = 0,                           // DefaultViews
    timestamp = "00:00",                 // DefaultTime
    channel = {},                        // DefaultChannel
  } = video;

  const {
    name: channelName = "Unknown Channel", // DefaultName
    handle = "",                           // DefaultHandle
    avatar = "",                          // DefaultAvatar
  } = channel;

  const avatarUrl =
    avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(channelName)}`; // AvatarURL

  return (
    <Link to={`/watch/${_id}`} className="flex gap-4 group cursor-pointer"> {/* Link */}
      {/* Thumbnail */}
      <div className="w-64 aspect-video rounded-xl overflow-hidden flex-shrink-0"> {/* ThumbContainer */}
        <img
          src={thumbnail}            // ThumbSrc
          alt={title}                // AltText
          className="w-full h-full object-cover group-hover:scale-105 transition-transform" // ThumbStyle
        />
      </div>

      {/* Text Info */}
      <div className="flex flex-col justify-between"> {/* InfoContainer */}
        <h3 className="text-black dark:text-white text-base font-semibold line-clamp-2"> {/* Title */}
          {title}
        </h3>
        <p className="text-sm text-gray-400">@{handle || "channel"}</p> {/* Handle */}
        <div className="text-sm text-gray-500 flex gap-1 mt-1"> {/* Stats */}
          <span>{views.toLocaleString()} views</span> {/* Views */}
          <span>•</span>                             {/* Separator */}
          <span>{timestamp}</span>                    {/* Time */}
        </div>
      </div>
    </Link>
  );
};

export default VideoCardHorizontal;
