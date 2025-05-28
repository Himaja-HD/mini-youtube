import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllVideos,
  fetchVideoById,
  likeVideo,
  dislikeVideo,
  fetchVideosBySearch,
} from './videoThunks';

const initialState = {
  videos: [],        
  video: null,      
  loading: false,
  error: null,
  isLiked: false,
  isDisliked: false,
};

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    resetLikes(state) {
      state.isLiked = false;
      state.isDisliked = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all videos
      .addCase(fetchAllVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload.videos || []; 
        state.error = null;
      })
      .addCase(fetchAllVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load videos';
      })

      // Fetch video by ID
      .addCase(fetchVideoById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.video = null;
        state.isLiked = false;
        state.isDisliked = false;
      })
      .addCase(fetchVideoById.fulfilled, (state, action) => {
        state.loading = false;
        state.video = action.payload;

        const userId = localStorage.getItem('userId');
        if (userId && action.payload) {
          state.isLiked = Array.isArray(action.payload.likes) && action.payload.likes.includes(userId);
          state.isDisliked = Array.isArray(action.payload.dislikes) && action.payload.dislikes.includes(userId);
        } else {
          state.isLiked = false;
          state.isDisliked = false;
        }
      })
      .addCase(fetchVideoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to load video';
      })

      // Like video
      .addCase(likeVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likeVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.video = action.payload;
        state.isLiked = true;
        state.isDisliked = false;
      })
      .addCase(likeVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to like video';
      })

      // Dislike video
      .addCase(dislikeVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(dislikeVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.video = action.payload;
        state.isDisliked = true;
        state.isLiked = false;
      })
      .addCase(dislikeVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to dislike video';
      })

      // Search videos
      .addCase(fetchVideosBySearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideosBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideosBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to search videos';
      });
  },
});

export const { resetLikes } = videosSlice.actions;
export default videosSlice.reducer;
