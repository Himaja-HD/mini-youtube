import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser } from './authAPI';  // Import your API functions

export const register = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await registerUser(username, email, password);

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Registration failed');
      }

      const userData = await response.json();
      return userData;  // Returning user data on success

    } catch (error) {
      return rejectWithValue(error.message || 'Server error');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginUser(email, password);

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Login failed');
      }

      const userData = await response.json();
      return userData;  // Returning user data on success

    } catch (error) {
      return rejectWithValue(error.message || 'Server error');
    }
  }
);
