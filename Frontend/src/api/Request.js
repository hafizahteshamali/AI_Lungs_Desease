import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://precisionscan.runasp.net",
  timeout: 180000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ===========================
   REQUEST INTERCEPTOR
=========================== */
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token") || 
                  localStorage.getItem("token");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* ===========================
   RESPONSE INTERCEPTOR
   (NO TOASTS HERE - Let components handle errors)
=========================== */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Sirf log karo, toast nahi dikhao
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;