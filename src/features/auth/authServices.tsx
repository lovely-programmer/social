import axios from "axios";
import { User } from "../../types.d";

const API_URL = "http://localhost:5000/api/auth/";

//* register user
const register = async (userData: User) => {
  const response = await axios.post(API_URL + "register", userData);

  // if (response.data) {
  //   localStorage.setItem("user", JSON.stringify(response.data));
  // }

  return response.data;
};

//* login user
const login = async (userData: Partial<User>) => {
  const response = await axios.post(API_URL + "login", userData, {
    withCredentials: true,
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//* logout user
const logout = async (userData: any) => {
  const response = await axios.post(API_URL + "logout", userData);
};

const authServices = {
  register,
  login,
  // logout,
  // updateOffice,
  // deleteOffice,
};

export default authServices;
