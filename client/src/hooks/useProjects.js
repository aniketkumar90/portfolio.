import { useState, useEffect, useCallback } from "react";
import projectService from "../services/projectService";
import { initialProjects } from "../data/profile";

export const useProjects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const data = await projectService.getProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      console.warn("[useProjects] Error fetching, fallback active:", err);
      setError(err.message);
      setProjects(initialProjects);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, loading, error, refresh: fetchProjects };
};

export default useProjects;
