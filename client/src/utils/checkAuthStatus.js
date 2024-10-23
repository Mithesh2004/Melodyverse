import axios from "axios";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/users";

async function checkAuthStatus() {
  try {
    const response = await axios.get(`${API_BASE_URL}/check-auth`, {
      withCredentials: true,
    });
   return response.data //contains isLoggedIn,userId
  } catch (error) {
    console.log("Error checking authentication status", error);
    return {isLoggedIn:false}
  }
}
export default checkAuthStatus;
