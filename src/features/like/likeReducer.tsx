import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Like } from "../../types.d";
import likeServices from "./likeServices";

type InitialState = {
  likes: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  message: any;
};

// initial state
const initialState: InitialState = {
  likes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdating: false,
  message: "",
};

//? getLikes
export const getLike = (postId: number) => likeServices.getLikes(postId);

// ? createLike
export const createLike = createAsyncThunk(
  "likes/createLike",
  async (postId: Like, thunkAPI) => {
    try {
      return likeServices.createLike(postId);
    } catch (error: any) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message.toString());
    }
  }
);

//? deleteLike
export const deleteLike = createAsyncThunk(
  "likes/deleteLike",
  async (postId: Like, thunkAPI) => {
    try {
      return likeServices.deleteLike(postId);
    } catch (error: any) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message.toString());
    }
  }
);

export const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLike.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdating = true;
      })
      .addCase(createLike.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.likes = null;
        state.isUpdating = false;
      })
      .addCase(deleteLike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLike.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdating = true;
      })
      .addCase(deleteLike.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isUpdating = false;
        state.likes = null;
      });
  },
});

export const { reset } = likeSlice.actions;
export default likeSlice.reducer;
