import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menuOpen: false, 
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen; 
    },
  },
});

export const { toggleMenu } = appSlice.actions; 

export default appSlice.reducer;
