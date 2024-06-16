import { configureStore } from '@reduxjs/toolkit';
import projectReducer from '../Project/projectSlice';
import EditorSlice from '../store/editorSlice';
// Define the root state type
export type RootState = ReturnType<typeof store.getState>;

// Define the dispatch type
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    project: projectReducer,
    editor:EditorSlice
  },
});