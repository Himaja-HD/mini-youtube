import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './commentApi.js';

// fetch
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (videoId, thunkAPI) => {
    try {
      return await api.getComments(videoId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// create
export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ videoId, content }, thunkAPI) => {
    try {
      return await api.postComment(videoId, content);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// delete
export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId, thunkAPI) => {
    try {
      await api.deleteComment(commentId);
      return commentId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// update
export const updateComment = createAsyncThunk(
  'comments/updateComment',
  async ({ commentId, content }, thunkAPI) => {
    try {
      return await api.editComment(commentId, content);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
