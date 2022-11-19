import axios from "axios";
import { Like } from "../../types.d";

const API_URL = "http://localhost:5000/api/relationship";

// //* getRelationships
const getRelationships = async (userId: number) => {
  const response = await axios.get(API_URL + "?followedUserId=" + userId, {
    withCredentials: true,
  });

  return response.data;
};

// * createRelationship
const createRelationship = async (userId: { userId: number }) => {
  const response = await axios.post(API_URL, userId, {
    withCredentials: true,
  });

  return response.data;
};

// * deleteRelationship
const deleteRelationship = async (userId: number) => {
  const response = await axios.delete(API_URL + "?userId=" + userId, {
    withCredentials: true,
  });

  return response.data;
};

const relationshipServices = {
  getRelationships,
  createRelationship,
  deleteRelationship,
};

export default relationshipServices;
