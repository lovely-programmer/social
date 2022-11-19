import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentServices from "./commentServices";
import { CreateComment } from "../../types.d";

type InitialState = {
  comments: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  message: any;
};

// initial state
const initialState: InitialState = {
  comments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdating: false,
  message: "",
};

//? getComments
export const getComments = createAsyncThunk(
  "post/getcomment",
  async (postId: number, thunkAPI) => {
    try {
      return commentServices.getComments(postId);
    } catch (error: any) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message.toString());
    }
  }
);

// ? createComment
export const createComment = createAsyncThunk(
  "post/createcomment",
  async (comment: CreateComment, thunkAPI) => {
    try {
      return commentServices.createComment(comment);
    } catch (error: any) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message.toString());
    }
  }
);

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.comments = null;
      })
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdating = true
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.comments = null;
      });
  },
});

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;
