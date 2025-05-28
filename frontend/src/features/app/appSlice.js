import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',                   // SliceName
  initialState: {
    menuOpen: false,             // InitialState
  },
  reducers: {
    toggleMenu: (state, action) => {
      state.menuOpen = typeof action.payload === 'boolean' // CheckPayload
        ? action.payload           // SetDirect
        : !state.menuOpen;         // Toggle
    },
  },
});

export const { toggleMenu } = appSlice.actions; // ExportActions
export default appSlice.reducer;                 // ExportReducer
