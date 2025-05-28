import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../app/axios'; 

// Fetch all videos
export const fetchAllVideos = createAsyncThunk(
  'videos/fetchAllVideos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get('/videos');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch a single video by ID
export const fetchVideoById = createAsyncThunk(
  'videos/fetchVideoById',
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/videos/${videoId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Like a video 
export const likeVideo = createAsyncThunk(
  'videos/likeVideo',
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await instance.put(`/videos/like/${videoId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Dislike a video 
export const dislikeVideo = createAsyncThunk(
  'videos/dislikeVideo',
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await instance.put(`/videos/unlike/${videoId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Search videos by query string
export const fetchVideosBySearch = createAsyncThunk(
  'videos/fetchVideosBySearch',
  async (query, { rejectWithValue }) => {
    try {
     
      const response = await instance.get('/videos/search', {
        params: { query }, 
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
