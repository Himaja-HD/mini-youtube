import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  subscribeToChannel,
  unsubscribeFromChannel,
  fetchSubscriptionStatus,
} from "../features/channel/channelThunks";

const SubscribeButton = ({ channelId }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user); // User
  const subscribed = useSelector((state) => state.channels.subscribed) || {}; // Subscribed
  const subscriptionLoading = useSelector((state) => state.channels.subscriptionLoading) || false; // Loading

  const isLoggedIn = Boolean(user); // LoggedIn
  const isSubscribed = Boolean(subscribed[channelId]); // SubscribedStatus

  useEffect(() => {
    if (isLoggedIn && channelId) {
      dispatch(fetchSubscriptionStatus(channelId)); // FetchStatus
    }
  }, [channelId, isLoggedIn, dispatch]);

  const handleToggle = () => {
    if (!isLoggedIn) {
      alert("Please log in to subscribe."); // AlertLogin
      return;
    }
    if (!channelId) {
      alert("Invalid channel ID."); // AlertInvalid
      return;
    }

    if (isSubscribed) {
      dispatch(unsubscribeFromChannel(channelId)); // Unsubscribe
    } else {
      dispatch(subscribeToChannel(channelId)); // Subscribe
    }
  };

  return (
    <button
      onClick={handleToggle} // Click
      disabled={subscriptionLoading || !channelId} // Disabled
      className={`px-4 py-2 rounded text-white font-semibold ${
        isSubscribed ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
      } transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`} // Style
      aria-pressed={isSubscribed} // ARIA Pressed
      aria-label={isSubscribed ? "Unsubscribe from channel" : "Subscribe to channel"} // ARIA Label
    >
      {subscriptionLoading ? "Processing..." : isSubscribed ? "Unsubscribe" : "Subscribe"} {/* Label */}
    </button>
  );
};

export default SubscribeButton;
