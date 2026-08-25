import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import api from "../utils/axios";
import { setOpportunities } from "../features/opportunity/opportunitySlice";

const useOpportunities = (filters = {}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);

      const params = Object.fromEntries(
        Object.entries(filters).filter(([, value]) => value),
      );

      const { data } = await api.get("/opportunities", {
        params,
      });

      dispatch(setOpportunities(data.data?.opportunities || []));
    } catch (error) {
      console.error("Failed to fetch opportunities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, [
    filters.type,
    filters.sport,
    filters.countryCode,
    filters.stateCode,
    filters.city,
    filters.mode,
    filters.search,
  ]);

  return {
    loading,
    refetch: fetchOpportunities,
  };
};

export default useOpportunities;
