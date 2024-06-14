import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

// Define the root state type
export type RootState = ReturnType<typeof store.getState>;

// Define the dispatch type
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});