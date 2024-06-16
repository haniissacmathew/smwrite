import { createSlice } from '@reduxjs/toolkit';

interface EditorState {
  openedScreenplay: ScreenPlayLine[];
}
interface ScreenPlayLine {
  text: string;
  type: string;
  index: number;
}
const initialState: EditorState = {
  openedScreenplay: [],
};

const EditorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    loadScreenplay: (state,data:any) => {
      state.openedScreenplay=data.payload;
      console.log('loadScreenplay triggered',state.openedScreenplay)
    },
    updateByIndex: (state,data:any) => {
      state.openedScreenplay[data.payload.index]=data.payload.content;
      console.log('update index triggered',state.openedScreenplay)
    },
    updateFile: (state,data:any) => {
      state.openedScreenplay=data;
    },
  },
});

export default EditorSlice.reducer;
export const { loadScreenplay, updateFile,updateByIndex } = EditorSlice.actions;
export const selectScreenplay = (state:EditorState) => state.editor.openedScreenplay;