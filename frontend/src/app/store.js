import { configureStore } from '@reduxjs/toolkit'; // Redux
import authReducer from '../features/auth/authSlice'; // Auth
import appReducer from '../features/app/appSlice'; // App
import channelsReducer from '../features/channel/channelSlice'; // Channels
import commentsReducer from '../features/comment/commentSlice'; // Comments
import videosReducer from '../features/video/videoSlice'; // Videos
import userReducer from '../features/user/userSlice'; // User
import uploadReducer from '../features/video/uploadSlice'; // Upload

export const store = configureStore({
  reducer: {
    upload: uploadReducer,     // Upload
    user: userReducer,         // User
    auth: authReducer,         // Auth
    app: appReducer,           // App
    channels: channelsReducer, // Channels
    comments: commentsReducer, // Comments
    videos: videosReducer,     // Videos
  },
});

export default store; // Export
