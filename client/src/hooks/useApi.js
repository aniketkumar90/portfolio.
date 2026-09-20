import { useState, useCallback } from "react";

export const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiFunc(...args);
        setData(result);
        return { success: true, data: result };
      } catch (err) {
        const message = err.response?.data?.message || err.message || "An unexpected error occurred";
        setError(message);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    [apiFunc]
  );

  return { data, loading, error, request };
};

export default useApi;
