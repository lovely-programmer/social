import { createSlice } from "@reduxjs/toolkit";

const darkJson = localStorage.getItem("darkMode");
const darkMode: boolean = darkJson ? JSON.parse(darkJson) : false;

// initial state
const initialState: { darkMode: boolean } = {
  darkMode,
};

export const darkSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      localStorage.setItem("darkMode", action.payload);
      state.darkMode = action.payload;
    },
    setLightMode: (state, action) => {
      localStorage.setItem("darkMode", action.payload);
      state.darkMode = action.payload;
    },
  },
});

export const { setDarkMode, setLightMode } = darkSlice.actions;
export default darkSlice.reducer;
