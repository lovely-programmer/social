import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ProfileUser } from "../../types.d";

const API_URL = "http://localhost:5000/api/users/";

type InitialState = {
  data: null | string;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isUpdated: boolean;
  message: any;
};

// initial state
const initialState: InitialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdated: false,
  message: "",
};

// * Update User Profile
export const updateUser = createAsyncThunk(
  "user/update",
  async (user: Partial<ProfileUser>, thunkAPI) => {
    try {
      const response = await axios.put(API_URL, user, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message.toString());
    }
  }
);

export const updateUserSlice = createSlice({
  name: "updateUser",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdated = true;
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = "";
      });
  },
});

export const { reset } = updateUserSlice.actions;
export default updateUserSlice.reducer;
