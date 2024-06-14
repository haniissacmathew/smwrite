import { createSlice } from '@reduxjs/toolkit';

interface ProjectState {
  filePath: string;
  projectname:string;
}

const initialState: ProjectState = {
    filePath:'',
    projectname:'',
};

const projectSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state,data) => {
      state.filePath=data.payload;
    },
    decrement: (state,data) => {
      state.projectname=data.payload;
    },
  },
});

export default projectSlice.reducer;
export const { increment, decrement } = projectSlice.actions;