import axios from "axios";
import { Like } from "../../types.d";

const API_URL = "http://localhost:5000/api/likes";

// //* getLikes
const getLikes = async (postId: number) => {
  try {
    const response = await axios.get(API_URL + "?postId=" + postId, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};

// * createLike
const createLike = async (postId: Like) => {
  const response = await axios.post(API_URL, postId, {
    withCredentials: true,
  });

  return response.data;
};

// * deleteLike
const deleteLike = async (postId: Like) => {
  const response = await axios.delete(API_URL + "?postId=" + postId, {
    withCredentials: true,
  });

  return response.data;
};

const likeServices = {
  getLikes,
  createLike,
  deleteLike,
};

export default likeServices;
