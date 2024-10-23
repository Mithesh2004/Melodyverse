import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/users";

async function logoutUser() {
  try {
    await axios.post(`${API_BASE_URL}/signout`, {}, { withCredentials: true });
    return { success: true };
  } catch (error) {
    console.error("Error logging out:", error);
    return { success: false, error };
  }
}

export default logoutUser;
