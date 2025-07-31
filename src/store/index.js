import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import usersSlice from './usersSlice';
import questionsSlice from './questionsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
    questions: questionsSlice,
  },
});

export default store;