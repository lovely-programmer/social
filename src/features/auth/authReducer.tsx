import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "./authServices";
import { User } from "../../types.d";

type InitialState = {
  user: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: any;
};

const userJSON = localStorage.getItem("user");
const user = userJSON ? JSON.parse(userJSON) : null;

// initial state
const initialState: InitialState = {
  user: user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// @Register User
export const register = createAsyncThunk(
  "auth/register",
  async (user: User, thunkAPI) => {
    try {
      return await authServices.register(user);
    } catch (error: any) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message.toString());
    }
  }
);

// @Login User
export const login = createAsyncThunk(
  "auth/login",
  async (user: Partial<User>, thunkAPI) => {
    try {
      return await authServices.login(user);
    } catch (error: any) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
