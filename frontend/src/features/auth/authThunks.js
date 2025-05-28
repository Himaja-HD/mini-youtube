import { createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../app/axios';

// Login thunk
export const loginThunk = createAsyncThunk(
  'auth/login',               // ActionType
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await instance.post('/auth/login', credentials);  // APIRequest
      return { user: data.user, token: data.token };                    // ReturnData
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Login failed'); // ErrorHandling
    }
  }
);

// Register thunk
export const registerThunk = createAsyncThunk(
  'auth/register',             // ActionType
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await instance.post('/auth/register', userData);  // APIRequest
      return { user: data.user, token: data.token };                    // ReturnData
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Registration failed'); // ErrorHandling
    }
  }
);

// Logout thunk
export const logoutThunk = createAsyncThunk(
  'auth/logout',               // ActionType
  async (_, { rejectWithValue }) => {
    try {
      await instance.post('/auth/logout');                            // APIRequest
      return true;                                                    // ReturnSuccess
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Logout failed'); // ErrorHandling
    }
  }
);
