import Post from "./Post";
import "./styles/posts.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getPosts, reset } from "../features/post/postReducer";
import { Post as PostType } from "../types.d";

function Posts({ userId }: { userId: number | undefined }) {
  const dispatch = useAppDispatch();
  const { posts, isLoading, isError, isUpdating } = useAppSelector(
    (state) => state.posts
  );

  useEffect(() => {
    dispatch(getPosts(userId));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isUpdating]);

  return (
    <div className="posts">
      {isError
        ? "Something went wrong"
        : isLoading
        ? "Loading"
        : posts.map((post: PostType) => <Post post={post} key={post.id} />)}
    </div>
  );
}

export default Posts;
