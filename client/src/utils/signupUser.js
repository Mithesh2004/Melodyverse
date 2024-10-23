import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/users/signup`, userData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return { error: error.response?.data?.error || error.message };
  }
};

export default signupUser;
