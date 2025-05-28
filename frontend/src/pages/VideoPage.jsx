import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

import YouTubeVideoPlayer from "../components/YouTubeVideoPlayer";
import CommentSection from "../components/CommentSection";
import VideoCardHorizontal from "../components/VideoCardHorizontal";
import SubscribeButton from "../components/SubscribeButton";

import {
  fetchVideoById,
  fetchAllVideos,
  likeVideo,
  dislikeVideo,
} from "../features/video/videoThunks";

const VideoPage = () => {
  const { id } = useParams(); // param
  const dispatch = useDispatch(); // dispatch

  const { video, videos: allVideos, isLiked, isDisliked, loading, error } = useSelector(
    (state) => state.videos
  ); // state

  useEffect(() => {
    if (id) {
      dispatch(fetchVideoById(id)); // fetch video
      dispatch(fetchAllVideos()); // fetch all
    }
  }, [id, dispatch]); // deps

  const handleLike = () => dispatch(likeVideo(id)); // like
  const handleDislike = () => dispatch(dislikeVideo(id)); // dislike

  if (loading) return <div className="text-center py-8 text-lg">Loading...</div>; // loading
  if (error) return <div className="text-red-600 text-center py-8">Error: {error}</div>; // error
  if (!video) return <div className="text-center py-8">No video found.</div>; // no video

  return (
    <div className="container ml-24 mt-24 p-4 flex flex-col md:flex-row gap-6"> {/* container */}
      <div className="flex-1 w-full"> {/* main */}
        <div className="rounded-lg overflow-hidden bg-black"> {/* video wrapper */}
          <YouTubeVideoPlayer videoUrl={video.url} thumbnailUrl={video.thumbnail} /> {/* player */}
        </div>

        <h1 className="text-2xl font-semibold mt-4">{video.title}</h1> {/* title */}

        <div className="flex flex-wrap items-center gap-4 mt-3"> {/* actions */}
          <button
            onClick={handleLike} // like click
            className={`flex items-center space-x-2 px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 ${
              isLiked ? "text-blue-600 font-semibold" : ""
            }`}
          >
            <FaThumbsUp /> {/* like icon */}
            <span>{video.likes?.length ?? 0}</span> {/* like count */}
          </button>

          <button
            onClick={handleDislike} // dislike click
            className={`flex items-center space-x-2 px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 ${
              isDisliked ? "text-red-600 font-semibold" : ""
            }`}
          >
            <FaThumbsDown /> {/* dislike icon */}
            <span>{video.dislikes?.length ?? 0}</span> {/* dislike count */}
          </button>

          <SubscribeButton channelId={video.channel?._id} /> {/* subscribe */}
        </div>

        <div className="mt-6 border-t pt-4 flex gap-5"> {/* channel info */}
          <div className="flex mb-6">
            <div className="h-12 w-12 rounded-full overflow-hidden border border-slate-300"> {/* avatar */}
              <img
                src={
                  video.channel?.avatar
                    ? video.channel.avatar
                    : `https://api.dicebear.com/7.x/initials/svg?seed=${
                        video.channel?.name || "default"
                      }`
                }
                alt="Channel Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-md mb-1">{video.channel?.name ?? "N/A"}</h2> {/* name */}
            <p className="text-sm text-gray-500">
              {video.channel?.subscribers?.length ?? 0} subscribers {/* subs */}
            </p>
          </div>
        </div>

        <div className="mt-8"> {/* comments */}
          <CommentSection videoId={id} />
        </div>
      </div>

      <div className="w-full md:w-1/3"> {/* sidebar */}
        <h2 className="font-semibold text-lg mb-3">Up Next</h2> {/* heading */}
        <div className="space-y-3"> {/* list */}
          {allVideos
            ?.filter((v) => v._id !== id) // exclude current
            .map((v) => (
              <VideoCardHorizontal key={v._id} video={v} /> // related video
            ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
