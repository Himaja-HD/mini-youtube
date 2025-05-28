import React, { useState } from "react";

const YouTubeVideoPlayer = ({ videoUrl, thumbnailUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false); // State

  if (!videoUrl) {
    return (
      <div className="bg-black w-full h-full sm:h-64 rounded-lg flex items-center justify-center text-white">
        No video URL provided {/* NoURL */}
      </div>
    );
  }

  // YouTubeCheck
  const isYouTubeUrl = /youtube\.com|youtu\.be/.test(videoUrl);

  if (isYouTubeUrl) {
    // ExtractID
    const getYouTubeVideoId = (url) => {
      const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = url.match(regex);
      return match ? match[1] : null;
    };

    const videoId = getYouTubeVideoId(videoUrl);

    if (!videoId) {
      return (
        <div className="bg-black w-full h-full sm:h-64 rounded-lg flex items-center justify-center text-white">
          Invalid YouTube URL {/* InvalidURL */}
        </div>
      );
    }

    return (
      <iframe
        width="100%"                         // FullWidth
        height="256"                        // FixedHeight
        src={`https://www.youtube.com/embed/${videoId}`} // EmbedURL
        title="YouTube Video Player"        // Title
        frameBorder="0"                     // Border
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" // Permissions
        allowFullScreen                     // FullScreen
        className="rounded-lg bg-black"    // Style
      ></iframe>
    );
  }

  // CustomVideo
  return (
    <div className="relative w-full h-64 sm:h-64 rounded-lg bg-black overflow-hidden">
      {!isPlaying && thumbnailUrl && (
        <img
          src={thumbnailUrl}                 // Thumbnail
          alt="Video thumbnail"             // AltText
          className="absolute inset-0 w-full h-full object-cover cursor-pointer" // Style
          onClick={() => setIsPlaying(true)} // PlayOnClick
          draggable={false}                 // NoDrag
        />
      )}

      {!isPlaying && !thumbnailUrl && (
        <div
          onClick={() => setIsPlaying(true)} // PlayOnClick
          className="absolute inset-0 flex items-center justify-center cursor-pointer text-white select-none"
        >
          ▶ Click to play video             // PlayPrompt
        </div>
      )}

      {isPlaying && (
        <video
          src={videoUrl}                   // VideoSrc
          controls                        // Controls
          autoPlay                       // AutoPlay
          className="w-full h-full rounded-lg bg-black" // Style
          title="Video Player"             // Title
          onPause={() => setIsPlaying(false)} // PauseReset
          onEnded={() => setIsPlaying(false)} // EndReset
        >
          Sorry, your browser does not support embedded videos. {/* Fallback */}
        </video>
      )}
    </div>
  );
};

export default YouTubeVideoPlayer;
