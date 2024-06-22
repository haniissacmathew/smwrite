import { createSlice } from "@reduxjs/toolkit";

interface EditorState {
  openedScreenplay: ScreenPlayLine[];
}
interface ScreenPlayLine {
  text: string;
  type: string;
}
const initialState: EditorState = {
  openedScreenplay: [], // {type: '_scene_', text:'Scene 1' }
};

const EditorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    loadScreenplay: (state, data: any) => {
      state.openedScreenplay = data.payload;
      // console.log('loadScreenplay triggered',state.openedScreenplay)
    },
    updateByIndex: (state, data: any) => {
      const { index, content } = data.payload;

      // Input validation (optional but recommended)
      if (index < 0 || index >= state.openedScreenplay.length) {
        // console.warn('Invalid index for updateOpenedScreenplay');
        return state;
      }
      const newArray = [...state.openedScreenplay]; // Create a copy
      if (newArray.length > 0) {
        // console.log('loadScreenplay triggered',newArray,index)
        newArray[index].text = content;
        state.openedScreenplay = newArray; // Assign the new array
      }
    },
    insertElement: (state, data: any) => {
      const { index, type, content } = data.payload;
      const element = { type: type, text: content };
      const newArray = [...state.openedScreenplay]; // Create a copy

      if (newArray.length > 0) {
        // Input validation (optional but recommended)
        if (index > state.openedScreenplay.length) {
          // console.warn('Invalid index for updateOpenedScreenplay');
          newArray.push(element);
        } else {
          newArray.splice(index, 0, element);
        }
        state.openedScreenplay = newArray; // Assign the new array
      }
    },
    updateFile: (state, data: any) => {
      state.openedScreenplay = data;
    },
  },
});

export default EditorSlice.reducer;
export const { loadScreenplay, updateFile, updateByIndex,insertElement } =
  EditorSlice.actions;
export const selectScreenplay = (state: EditorState) =>
  state.editor.openedScreenplay;
