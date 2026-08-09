import { useEffect, useState } from "react";
import api from "../utils/axios";

const useSearch = (query, type) => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults({});
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const res = await api.get("/search", {
          params: {
            q: query,
            type,
          },
        });

        setResults(res.data.data);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, type]);

  return { results, loading };
};

export default useSearch;
