import { useEffect, useState } from "react";
import api from "../utils/axios";

const EMPTY_RESULTS = {
  users: [],
  posts: [],
  tags: [],
  categories: [],
  teams: [],
};

const useSearch = (query, type) => {
  const [results, setResults] = useState(EMPTY_RESULTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchQuery = query.trim();

    if (!searchQuery) {
      setResults(EMPTY_RESULTS);
      setLoading(false);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await api.get("/search", {
          params: {
            q: searchQuery,
            type,
          },
        });

        console.log("Search API:", res.data);

        setResults({
          users: res.data?.data?.users || [],
          posts: res.data?.data?.posts || [],
          tags: res.data?.data?.tags || [],
          categories: res.data?.data?.categories || [],
          teams: res.data?.data?.teams || [],
        });
      } catch (error) {
        console.error("Search error:", error);

        setResults(EMPTY_RESULTS);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, type]);

  return {
    results,
    loading,
  };
};

export default useSearch;
