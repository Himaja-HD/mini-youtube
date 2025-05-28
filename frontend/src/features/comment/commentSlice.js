import { createSlice } from '@reduxjs/toolkit';
import {
  fetchComments,
  createComment,
  deleteComment,
  updateComment,
} from './commentThunks.js';

const initialState = {
  comments: [],      // list
  loading: false,    // status
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;    // loading
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;   // loaded
        state.comments = Array.isArray(action.payload) ? action.payload : []; // set
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loading = false;   // error
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload); // add
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(c => c._id !== action.payload); // remove
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(c => c._id === action.payload._id);
        if (index !== -1) state.comments[index] = action.payload;  // update
      });
  },
});

export default commentSlice.reducer;
