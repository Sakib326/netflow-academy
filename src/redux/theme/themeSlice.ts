import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLessionSidebarOpen: false, // Sidebar starts visible on large screens
};

const themeSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleLessionSidebar: (state) => {
      state.isLessionSidebarOpen = !state.isLessionSidebarOpen;
    },
    openLessionSidebar: (state) => {
      state.isLessionSidebarOpen = true;
    },
    closeLessionSidebar: (state) => {
      state.isLessionSidebarOpen = false;
    },
    setLessionSidebarForScreen: (state, action) => {
      // Automatically hide on medium screens or smaller
      const width = action.payload;
      if (width < 1024) {
        state.isLessionSidebarOpen = true;
      } else {
        state.isLessionSidebarOpen = false;
      }
    },
  },
});

export const {
  toggleLessionSidebar,
  openLessionSidebar,
  closeLessionSidebar,
  setLessionSidebarForScreen,
} = themeSlice.actions;

export default themeSlice.reducer;
