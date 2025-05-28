import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../app/axios'; 

// Async thunk to upload a video
export const uploadVideo = createAsyncThunk(
  'upload/uploadVideo',
  async (videoData, thunkAPI) => {
    try {
      const response = await instance.post('/videos', videoData);
      return response.data; 
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Upload failed'
      );
    }
  }
);

const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    loading: false,
    error: null,
    uploaded: null, 
  },
  reducers: {
    resetUploadState: (state) => {
      state.loading = false;
      state.error = null;
      state.uploaded = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.uploaded = action.payload;
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUploadState } = uploadSlice.actions;
export default uploadSlice.reducer;
