import api from "./api";
import { initialProjects } from "../data/profile";

export const projectService = {
  // Fetch all projects (with seamless offline fallback and deduplication)
  async getProjects() {
    try {
      const res = await api.get("/projects");
      const list = res.data?.data && res.data.data.length > 0 ? res.data.data : initialProjects;

      // Deduplicate into exactly the 3 clean projects:
      // 1. NEW SHIV JEWELLERS
      // 2. Real Estate Platform (removing Dynamic duplicate)
      // 3. E-Commerce Platform (removing RelayMart duplicate)
      const result = [];

      // 1. Jewellers
      const jewel = list.find((p) => /jewel|shiv/i.test(p.title)) || initialProjects[0];
      result.push({
        ...jewel,
        title: "NEW SHIV JEWELLERS",
        image: "/projects/new-shiv-jewellers.png",
        link: "https://jewllary-ten.vercel.app/",
        websiteUrl: "https://jewllary-ten.vercel.app/",
        order: 1,
      });

      // 2. Real Estate Platform
      const realEstate = list.find((p) => /real.*estate/i.test(p.title)) || initialProjects[1];
      result.push({
        ...realEstate,
        title: "Real Estate Platform",
        image: "/projects/real-estate.png",
        link: "https://dynamicrealestateweb.vercel.app/",
        websiteUrl: "https://dynamicrealestateweb.vercel.app/",
        order: 2,
      });

      // 3. E-Commerce Platform
      const ecommerce = list.find((p) => /e-?commerce|relay/i.test(p.title)) || initialProjects[2];
      result.push({
        ...ecommerce,
        title: "E-Commerce Platform",
        image: "/projects/relaymart.png",
        link: "https://relaymart.netlify.app/",
        websiteUrl: "https://relaymart.netlify.app/",
        order: 3,
      });

      return result;
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

  // Admin: Create project
  async createProject(formData) {
    const res = await api.post("/projects", formData, {
      headers: {
        "Content-Type": formData instanceof FormData ? "multipart/form-data" : "application/json",
      },
    });
    return res.data;
  },

  // Admin: Update project
  async updateProject(id, formData) {
    const res = await api.put(`/projects/${id}`, formData, {
      headers: {
        "Content-Type": formData instanceof FormData ? "multipart/form-data" : "application/json",
      },
    });
    return res.data;
  },

  // Admin: Delete project
  async deleteProject(id) {
    const res = await api.delete(`/projects/${id}`);
    return res.data;
  },
};

export default projectService;
