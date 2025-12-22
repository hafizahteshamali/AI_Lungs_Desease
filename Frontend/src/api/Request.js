import axios from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: "https://precisionscan.runasp.net",
  timeout: 180000, // 3 minutes
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===========================
   REQUEST INTERCEPTOR
   (Bearer Token Attach)
=========================== */
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token"); // login ke baad save hota hai
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ===========================
   RESPONSE INTERCEPTOR
=========================== */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.title ||
      "Something went wrong";

    toast.error(message);

    return Promise.reject(error);
  }
);

export default apiClient;
