import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  fetchChannelByHandle,
  subscribeToChannel,
  unsubscribeFromChannel,
} from "../features/channel/channelThunks";

import VideoCardHorizontal from "../components/VideoCardHorizontal";

// fetch subscription
const fetchSubscriptionStatus = async (channelId, token) => {
  try {
    const response = await axios.get(
      `/api/channels/${channelId}/is-subscribed`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.isSubscribed;
  } catch (err) {
    console.error("Failed to fetch subscription status:", err);
    return false; // fallback
  }
};

const ChannelPage = () => {
  const { handle } = useParams();
  const dispatch = useDispatch();

  // selectors
  const channel = useSelector((state) => state.channels.channel);
  const loading = useSelector((state) => state.channels.loading);
  const error = useSelector((state) => state.channels.error);
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  // local state
  const [isSubscribed, setIsSubscribed] = useState(false);

  // fetch channel
  useEffect(() => {
    if (handle) dispatch(fetchChannelByHandle(handle));
  }, [handle, dispatch]);

  // check subscription
  useEffect(() => {
    const checkSubscription = async () => {
      if (channel && token) {
        const status = await fetchSubscriptionStatus(channel._id, token);
        setIsSubscribed(status);
      }
    };
    checkSubscription();
  }, [channel, token]);

  // subscribe/unsubscribe
  const handleSubscribeClick = () => {
    if (!channel || !token) return;
    if (isSubscribed) {
      dispatch(unsubscribeFromChannel(channel._id)).then(() => setIsSubscribed(false));
    } else {
      dispatch(subscribeToChannel(channel._id)).then(() => setIsSubscribed(true));
    }
  };

  // loading state
  if (loading) return <div className="text-center py-8">Loading channel...</div>;
  if (error) return <div className="text-red-600 text-center py-8">Error: {error}</div>;
  if (!channel) return <div className="text-center py-8">Channel not found.</div>;

  return (
    <div className="container ml-24 mt-24 p-4 flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        {/* banner */}
        <div className="relative h-48 w-full rounded-lg overflow-hidden">
          {channel.banner ? (
            <img
              src={channel.banner}
              alt={`${channel.name} Banner`}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="bg-gray-300 w-full h-full flex items-center justify-center">
              <span className="text-gray-700 text-xl">No Banner</span>
            </div>
          )}

          {/* avatar */}
          <div className="absolute -bottom-12 left-8 h-24 w-24 rounded-full overflow-hidden border-4 border-white bg-white">
            <img
              src={
                channel.avatar ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${channel.name}`
              }
              alt={`${channel.name} Avatar`}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* name + subscribe */}
        <div className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold">{channel.name}</h1>
          {user && (
            <button
              onClick={handleSubscribeClick}
              className={`mt-4 md:mt-0 px-4 py-2 rounded ${
                isSubscribed ? "bg-gray-300" : "bg-red-600 text-white"
              } hover:bg-red-700 hover:text-white`}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          )}
        </div>

        {/* description */}
        <p className="mt-3 text-gray-700">{channel.description}</p>

        {/* videos */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Videos</h2>
        <div className="space-y-4">
          {channel.videos?.length > 0 ? (
            channel.videos.map((video) => (
              <VideoCardHorizontal key={video._id} video={video} />
            ))
          ) : (
            <p>No videos uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;
