import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Like } from "../../types.d";
import relationshipServices from "./relationshipServices";

type InitialState = {
  relationships: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  message: any;
};

// initial state
const initialState: InitialState = {
  relationships: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdating: false,
  message: "",
};

//? getRelationships
export const getRelationships = createAsyncThunk(
  "relationships/getRelationships",
  async (userId: number, thunkAPI) => {
    try {
      return relationshipServices.getRelationships(userId);
    } catch (error: any) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message.toString());
    }
  }
);

// ? createRelationship
export const createRelationship = createAsyncThunk(
  "relationships/createRelationship",
  async (userId: {userId: number}, thunkAPI) => {
    try {
      return relationshipServices.createRelationship(userId);
    } catch (error: any) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message.toString());
    }
  }
);

//? deleteRelationship
export const deleteRelationship = createAsyncThunk(
  "relationship/deleteRelationship",
  async (userId: number, thunkAPI) => {
    try {
      return relationshipServices.deleteRelationship(userId);
    } catch (error: any) {
      const message = error.response.data;
      return thunkAPI.rejectWithValue(message.toString());
    }
  }
);

export const relationshipSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRelationships.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRelationships.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
         state.relationships = action.payload;
      })
      .addCase(getRelationships.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.relationships = null;
      })
      .addCase(createRelationship.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRelationship.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdating = true;
      })
      .addCase(createRelationship.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.relationships = null;
        state.isUpdating = false;
      })
      .addCase(deleteRelationship.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRelationship.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdating = true;
      })
      .addCase(deleteRelationship.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isUpdating = false;
        state.relationships = null;
      });
  },
});

export const { reset } = relationshipSlice.actions;
export default relationshipSlice.reducer;
