import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/users";

const signinUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signin`, userData, {
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

export default signinUser;
