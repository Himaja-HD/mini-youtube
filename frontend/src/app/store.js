import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import appReducer from '../features/app/appSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
  },
});

export default store;