import axios from "axios";

const API_URL = "http://localhost:5000/api/upload/";

// * Upload Image
export const upload = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(API_URL, formData, {
      withCredentials: true,
    });

    return response.data;
  } catch (err: any) {
    console.log(err);
  }
};

