import React, { useEffect } from 'react'; // Import
import { useDispatch, useSelector } from 'react-redux'; // Redux
import { useNavigate } from 'react-router-dom'; // Navigation
import { fetchChannelByUser } from '../features/channel/channelThunks'; // Thunk
import { clearChannelError } from '../features/channel/channelSlice'; // Slice

export default function ChannelMenuButton({ setDropdownOpen }) {
  const dispatch = useDispatch(); // Dispatch
  const navigate = useNavigate(); // Navigate

  const user = useSelector((state) => state.auth.user); // User
  const { currentChannel, loading, error } = useSelector((state) => state.channels); // Channel

  const hasChannelFromError = error === 'User already has a channel'; // Check
  const userHasChannel = Boolean(currentChannel?._id) || hasChannelFromError; // Boolean

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchChannelByUser()); // Fetch
    }
  }, [dispatch, user?._id]);

  useEffect(() => {
    return () => {
      dispatch(clearChannelError()); // Cleanup
    };
  }, [dispatch]);

  if (loading) {
    return <div className="px-4 py-2 text-sm text-gray-600">Loading channel...</div>; // Loading
  }

  if (error && !hasChannelFromError) {
    return <div className="px-4 py-2 text-sm text-red-600">Error: {error}</div>; // Error
  }

  const handleClick = () => {
    navigate(userHasChannel ? '/channels/me' : '/create-channel'); // Route
    if (setDropdownOpen) setDropdownOpen(false); // Close
  };

  return (
    <button
      disabled={loading} // Disabled
      onClick={handleClick} // Click
      className="block w-full px-4 py-2 text-left hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {userHasChannel ? 'View Your Channel' : 'Create Channel'} 
    </button>
  );
}
