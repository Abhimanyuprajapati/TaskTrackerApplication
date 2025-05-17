import axios from "axios";

const FROENTEND_URL = import.meta.env.VITE_BASE_FRONTEND_URL;

const api = axios.create({
  baseURL: FROENTEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
