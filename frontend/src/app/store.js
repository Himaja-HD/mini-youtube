import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/app/appSlice';
import userReducer from '../features/user/userSlice';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    auth: authReducer,
  },
});

export default store;
