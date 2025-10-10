import { createSlice } from "@reduxjs/toolkit";

const examSlice = createSlice({
  name: "exam",
  initialState: {
    examData: null,
  },
  reducers: {
    setCurrentExam: (state, action) => {
      state.examData = action.payload;
    },
    clearCurrentExam: (state) => {
      state.examData = null;
    },
  },
});

export const { setCurrentExam, clearCurrentExam } = examSlice.actions;
export default examSlice.reducer;
