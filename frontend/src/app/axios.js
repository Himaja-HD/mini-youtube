import axios from "axios";

// Create
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api", // URL
  withCredentials: true, // Cookies
  headers: {
    "Content-Type": "application/json", // JSON
  },
});

// Intercept
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Auth
    }

    // FormData
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"]; // Remove
    }

    return config; // Return
  },
  (error) => Promise.reject(error) // Error
);

export default instance; // Export
