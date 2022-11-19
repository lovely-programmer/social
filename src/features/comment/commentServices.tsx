import axios from "axios";
import { CreateComment } from "../../types.d";

const API_URL = "http://localhost:5000/api/comments";

//* getComments
const getComments = async (postId: number) => {
  const response = await axios.get(API_URL + "?postId=" + postId, {
    withCredentials: true,
  });

  return response.data;
};

const createComment = async (comment: CreateComment) => {
  const response = await axios.post(API_URL, comment, {
    withCredentials: true,
  });

  return response.data;
};

const commentServices = {
  getComments,
  createComment,
};

export default commentServices;
