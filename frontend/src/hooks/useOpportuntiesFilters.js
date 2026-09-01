import { useEffect, useState } from "react";
import api from "../utils/axios";

const initialFilters = {
  sport: "",
  skill: "",
  level: "",
  type: "",
  category: "",
  countryCode: "",
  stateCode: "",
  city: "",
  sortBy: "latest",
};

const useOpportuntiesFilters = () => {
  const [filterOptions, setFilterOptions] = useState({
    sports: [],
    skills: [],
    levels: [],
    type: [],
    category: [],
  });

  const [selectedFilters, setSelectedFilters] = useState(initialFilters);

  const [loadingFilters, setLoadingFilters] = useState(true);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setLoadingFilters(true);

        const { data } = await api.get("/opportunities/filters");

        console.log(data);

        setFilterOptions({
          sports: data.data?.sports || [],
          skills: data.data?.skills || [],
          levels: data.data?.levels || [],
          type: data.data?.type || [],
          category: data.data?.category || [],
        });
      } catch (error) {
        console.error("Failed to fetch filters:", error);
      } finally {
        setLoadingFilters(false);
      }
    };

    fetchFilters();
  }, []);

  const updateFilter = (filter, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filter]: value,
    }));
  };

  const resetFilters = () => {
    setSelectedFilters(initialFilters);
  };

  return {
    filterOptions,
    selectedFilters,
    updateFilter,
    resetFilters,
    loadingFilters,
  };
};

export default useOpportuntiesFilters;
