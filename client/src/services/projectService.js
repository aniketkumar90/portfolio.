import api from "./api";
import { initialProjects } from "../data/profile";

export const projectService = {
  // Fetch all projects from live MongoDB backend with seamless offline fallback
  async getProjects() {
    try {
      const res = await api.get("/projects");
      if (res.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
        return res.data.data;
      }
      return initialProjects;
    } catch (err) {
      console.warn("[ProjectService] API unreachable, using local fallback seed:", err.message);
      return initialProjects;
    }
  },

  // Fetch single project by ID
  async getProjectById(id) {
    try {
      const res = await api.get(`/projects/${id}`);
      return res.data.data;
    } catch (err) {
      return initialProjects.find((p) => p._id === id || p.title === id) || null;
    }
  },

  // Admin: Create project in MongoDB
  async createProject(formData) {
    const res = await api.post("/projects", formData, {
      headers: {
        "Content-Type": formData instanceof FormData ? "multipart/form-data" : "application/json",
      },
    });
    return res.data;
  },

  // Admin: Update project in MongoDB
  async updateProject(id, formData) {
    const res = await api.put(`/projects/${id}`, formData, {
      headers: {
        "Content-Type": formData instanceof FormData ? "multipart/form-data" : "application/json",
      },
    });
    return res.data;
  },

  // Admin: Delete project from MongoDB
  async deleteProject(id) {
    const res = await api.delete(`/projects/${id}`);
    return res.data;
  },
};

export default projectService;
