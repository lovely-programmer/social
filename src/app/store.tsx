import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "../features/darkMode/darkModeReducer";
import authReducer from "../features/auth/authReducer";
import postReducer from "../features/post/postReducer";
import commentReducer from "../features/comment/commentReducer";
import likeReducer from "../features/like/likeReducer";
import relationshipReducer from "../features/relationship/relationshipReducer"

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    auth: authReducer,
    posts: postReducer,
    comments: commentReducer,
    likes: likeReducer,
    relationships: relationshipReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
