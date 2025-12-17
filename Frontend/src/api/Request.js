import axios from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: "https://precisionscan.runasp.net", 
  timeout: 180000, // 3 minutes in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional toast directly here
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    }

    return Promise.reject(error); 
  }
);

export default apiClient;
