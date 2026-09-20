import axios from "axios";

// Automatically ensure /api suffix if user supplies base host (e.g., on Vercel)
const rawUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const cleanBase = rawUrl.replace(/\/+$/, "");
const API_BASE = cleanBase.endsWith("/api") ? cleanBase : `${cleanBase}/api`;

const api = axios.create({
  baseURL: API_BASE,
  timeout: 25000, // Accommodate Render free-tier cold-start wake-up
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("portfolio_admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
