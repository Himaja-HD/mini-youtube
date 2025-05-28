import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, registerThunk, logoutThunk } from './authThunks';

let parsedUser = null;       // InitUser
const storedUser = localStorage.getItem('user');  // GetStoredUser
try {
  if (storedUser && storedUser !== 'undefined') {
    parsedUser = JSON.parse(storedUser);  // ParseUser
  }
} catch (err) {
  console.error('Failed to parse user from localStorage:', err); // ParseError
}

const initialState = {
  user: parsedUser,                   // CurrentUser
  token: localStorage.getItem('token') || null,  // Token
  currentActiveChannelId: parsedUser?.channels?.[0] || null,  // ActiveChannel
  loading: false,                    // LoadingFlag
  error: null,                      // ErrorMessage
};

const authSlice = createSlice({
  name: 'auth',                      // SliceName
  initialState,
  reducers: {
    logout(state) {                  // Logout
      state.user = null;             // ClearUser
      state.token = null;            // ClearToken
      state.currentActiveChannelId = null;  // ClearChannel
      state.error = null;            // ClearError
      localStorage.removeItem('token');   // RemoveToken
      localStorage.removeItem('user');    // RemoveUser
    },
    setCredentials(state, action) {  // SetCreds
      const { user, token } = action.payload;
      state.user = user;             // SetUser
      state.token = token;           // SetToken
      state.currentActiveChannelId = user?.channels?.[0] || null;  // SetChannel
      localStorage.setItem('token', token);  // StoreToken
      localStorage.setItem('user', JSON.stringify(user));  // StoreUser
    },
    setCurrentActiveChannel(state, action) { // SetChannelId
      state.currentActiveChannelId = action.payload; // UpdateChannel
    },
  },
  extraReducers: (builder) => {
    const setAuthData = (state, action) => {
      state.loading = false;          // StopLoading
      state.user = action.payload.user;   // SetUser
      state.token = action.payload.token; // SetToken
      state.currentActiveChannelId = action.payload.user?.channels?.[0] || null; // SetChannel
      localStorage.setItem('token', action.payload.token);  // StoreToken
      localStorage.setItem('user', JSON.stringify(action.payload.user));  // StoreUser
    };

    builder
      // Login
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;         // LoadingStart
        state.error = null;           // ClearError
      })
      .addCase(loginThunk.fulfilled, setAuthData)  // LoginSuccess
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;        // LoadingStop
        state.error = action.payload || 'Login failed'; // SetError
      })

      // Register
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;         // LoadingStart
        state.error = null;           // ClearError
      })
      .addCase(registerThunk.fulfilled, setAuthData)  // RegisterSuccess
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;        // LoadingStop
        state.error = action.payload || 'Registration failed'; // SetError
      })

      // Logout
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;            // ClearUser
        state.token = null;           // ClearToken
        state.currentActiveChannelId = null; // ClearChannel
        state.error = null;           // ClearError
        localStorage.removeItem('token');    // RemoveToken
        localStorage.removeItem('user');     // RemoveUser
      });
  },
});

// Selectors
export const {
  logout,                       // ActionLogout
  setCredentials,               // ActionSetCreds
  setCurrentActiveChannel,      // ActionSetChannel
} = authSlice.actions;

export const checkAuthStatus = (state) => Boolean(state.auth.user);  // IsLoggedIn
export const selectCurrentUser = (state) => state.auth.user;         // GetUser
export const selectAuthToken = (state) => state.auth.token;          // GetToken
export const selectCurrentChannelId = (state) => state.auth.currentActiveChannelId; // GetChannelId
export const selectAuthLoading = (state) => state.auth.loading;      // GetLoading
export const selectAuthError = (state) => state.auth.error;          // GetError

export default authSlice.reducer;   // ExportReducer
