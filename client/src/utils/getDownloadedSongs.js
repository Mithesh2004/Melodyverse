import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const getDownloadedSongs = async (userData) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/get-downloaded-songs`,
      {
        withCredentials: true,
      }
    );
    console.log("not getting error");
    return response.data.downloadedSongs;
  } catch (error) {
    console.log("i am getting error");
    return { error: error.response?.data?.error || error.message };
  }
};

export default getDownloadedSongs;
