import axios from "axios";
import { CreatePost } from "../../types.d";

const API_URL = "http://localhost:5000/api/posts/";

//* getPosts
const getPosts = async (userId: number | undefined) => {
  const response = await axios.get(API_URL + "?userId=" + userId, {
    withCredentials: true,
  });

  return response.data;
};

const createPost = async (post: CreatePost) => {
  const response = await axios.post(API_URL, post, {
    withCredentials: true,
  });

  return response.data;
};

const deletePost = async (postId: number) => {
  const response = await axios.delete(API_URL + postId, {
    withCredentials: true,
  });

  return response.data;
};

const postServices = {
  getPosts,
  createPost,
  deletePost,
};

export default postServices;
