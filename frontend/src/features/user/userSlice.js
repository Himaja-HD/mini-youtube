import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../app/axios'; 

// fetch
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, thunkAPI) => {
    try {
      const response = await instance.get('/users/profile');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch profile'
      );
    }
  }
);

// update
export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (formData, thunkAPI) => {
    try {
      const response = await instance.put('/users/profile', formData);
      return response.data.user || response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update profile'
      );
    }
  }
);

// slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: null,  // data
    loading: false,  // loading
    error: null,     // error
    success: false,  // success
  },
  reducers: {
    clearStatus: (state) => { // clear
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch pending
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      // fetch fulfilled
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      // fetch rejected
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      })

      // update pending
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      // update fulfilled
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.success = true;
      })
      // update rejected
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { clearStatus } = userSlice.actions;

export default userSlice.reducer;
