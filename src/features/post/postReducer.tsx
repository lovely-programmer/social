import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postServices from "./postServices";
import { CreatePost } from "../../types.d";

type InitialState = {
  posts: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  message: any;
};

// initial state
const initialState: InitialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdating: false,
  message: "",
};

//? getPosts
export const getPosts = createAsyncThunk(
  "post/getpost",
  async (userId: number | undefined, thunkAPI) => {
    try {
      return postServices.getPosts(userId);
    } catch (error: any) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message.toString());
    }
  }
);

// ? createPost
export const createPost = createAsyncThunk(
  "post/createpost",
  async (post: CreatePost, thunkAPI) => {
    try {
      return postServices.createPost(post);
    } catch (error: any) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message.toString());
    }
  }
);

//  ? deletePost
export const deletePost = createAsyncThunk(
  "post/deletepost",
  async (postId: number, thunkAPI) => {
    try {
      return postServices.deletePost(postId);
    } catch (error: any) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message.toString());
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.posts = null;
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdating = true
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.posts = null;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdating = true
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.posts = null;
      })
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
