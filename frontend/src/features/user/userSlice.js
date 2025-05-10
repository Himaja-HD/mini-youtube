import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  profilePicture: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.profilePicture = action.payload.profilePicture;
    },
    clearUserDetails: (state) => {
      state.name = '';
      state.email = '';
      state.profilePicture = '';
    },
  },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
