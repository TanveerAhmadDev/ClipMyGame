// // src/hooks/usePostFilters.js

// import { useEffect, useState } from "react";
// import api from "../utils/axios";
// import { INITIAL_POST_FILTERS } from "../utils/postFilters";

// const usePostFilters = () => {
//   const [filterOptions, setFilterOptions] = useState({
//     sports: [],
//     skills: [],
//     levels: [],
//     contentTypes: [],
//     locations: {
//       countries: [],
//       regions: [],
//       districts: [],
//     },
//   });

//   const [selectedFilters, setSelectedFilters] = useState(INITIAL_POST_FILTERS);

//   const [loadingFilters, setLoadingFilters] = useState(true);

//   const [filterError, setFilterError] = useState(null);

//   /*
//    * Get available filters from backend.
//    */
//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         setLoadingFilters(true);
//         setFilterError(null);

//         const { data } = await api.get("/post/filters");

//         setFilterOptions({
//           sports: data.data?.sports || [],
//           skills: data.data?.skills || [],
//           levels: data.data?.levels || [],
//           contentTypes: data.data?.contentTypes || [],

//           locations: {
//             countries: data.data?.locations?.countries || [],

//             regions: data.data?.locations?.regions || [],

//             districts: data.data?.locations?.districts || [],
//           },
//         });
//       } catch (error) {
//         console.error("Failed to fetch post filters:", error);

//         setFilterError(error);
//       } finally {
//         setLoadingFilters(false);
//       }
//     };

//     fetchFilters();
//   }, []);

//   /*
//    * Update a filter.
//    *
//    * Location is dependent:
//    *
//    * Country
//    *    ↓
//    * Region
//    *    ↓
//    * District
//    */
//   const updateFilter = (name, value) => {
//     setSelectedFilters((prev) => {
//       /*
//        * Country changed
//        *
//        * Region and district must reset.
//        */
//       if (name === "country") {
//         return {
//           ...prev,

//           country: value,
//           region: "",
//           district: "",
//         };
//       }

//       /*
//        * Region changed
//        *
//        * District must reset.
//        */
//       if (name === "region") {
//         return {
//           ...prev,

//           region: value,
//           district: "",
//         };
//       }

//       return {
//         ...prev,
//         [name]: value,
//       };
//     });
//   };

//   /*
//    * Clear every filter.
//    */
//   const clearFilters = () => {
//     setSelectedFilters({
//       ...INITIAL_POST_FILTERS,
//     });
//   };

//   /*
//    * Clear only location.
//    */
//   const clearLocationFilters = () => {
//     setSelectedFilters((prev) => ({
//       ...prev,

//       country: "",
//       region: "",
//       district: "",
//     }));
//   };

//   return {
//     filterOptions,
//     selectedFilters,

//     updateFilter,
//     clearFilters,
//     clearLocationFilters,

//     loadingFilters,
//     filterError,
//   };
// };

// export default usePostFilters;

import { useEffect, useState } from "react";
import api from "../utils/axios";

const initialFilters = {
  sport: "",
  skill: "",
  level: "",
  contentType: "",
  countryCode: "",
  stateCode: "",
  city: "",
  sortBy: "latest",
};

const usePostFilters = () => {
  const [filterOptions, setFilterOptions] = useState({
    sports: [],
    skills: [],
    levels: [],
    contentTypes: [],
  });

  const [selectedFilters, setSelectedFilters] = useState(initialFilters);

  const [loadingFilters, setLoadingFilters] = useState(true);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setLoadingFilters(true);

        const { data } = await api.get("/post/filters");

        setFilterOptions({
          sports: data.data?.sports || [],
          skills: data.data?.skills || [],
          levels: data.data?.levels || [],
          contentTypes: data.data?.contentTypes || [],
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

export default usePostFilters;
