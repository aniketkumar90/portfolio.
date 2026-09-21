import api from "./api";

const TOKEN_KEY = "portfolio_admin_token";
const USER_KEY = "portfolio_admin_user";

export const authService = {
  // Login with username and password
  login: async (username, password) => {
    const response = await api.post("/auth/login", { username, password });
    if (response.data && response.data.token) {
      localStorage.setItem(TOKEN_KEY, response.data.token);
      if (response.data.user) {
        localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
      }
    }
    return response.data;
  },

  // Logout current user
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // Get current logged-in user profile from local storage
  getCurrentUser: () => {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  // Get token
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Check if token exists
  isAuthenticated: () => {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  },

  // Verify active session with backend /api/auth/me
  verifySession: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;

    try {
      const response = await api.get("/auth/me");
      if (response.data && response.data.user) {
        localStorage.setItem(USER_KEY, JSON.stringify(response.data.user));
        return response.data.user;
      }
      return null;
    } catch (err) {
      // If 401 or token invalid, clear bad token
      if (err.response && err.response.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
      return null;
    }
  },
};

export default authService;
