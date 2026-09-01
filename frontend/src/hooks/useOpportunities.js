// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";

// import api from "../utils/axios";
// import { setOpportunities } from "../features/opportunity/opportunitySlice";

// const useOpportunities = (filters = {}) => {
//   const dispatch = useDispatch();

//   const [loading, setLoading] = useState(false);

//   const fetchOpportunities = async () => {
//     try {
//       setLoading(true);

//       const params = Object.fromEntries(
//         Object.entries(filters).filter(([, value]) => value),
//       );

//       const { data } = await api.get("/opportunities", {
//         params,
//       });

//       dispatch(setOpportunities(data.data?.opportunities || []));
//     } catch (error) {
//       console.error("Failed to fetch opportunities:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOpportunities();
//   }, [
//     filters.category,
//     filters.sport,
//     filters.countryCode,
//     filters.stateCode,
//     filters.city,
//     filters.mode,
//     filters.search,
//   ]);

//   return {
//     loading,
//     refetch: fetchOpportunities,
//   };
// };

// export default useOpportunities;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import api from "../utils/axios";
// import { setOpportunities } from "../features/opportunity/opportunitySlice.js";

// const useOpportunities = (filters = {}) => {
//   const dispatch = useDispatch();

//   const opportunities = useSelector(
//     (state) => state.opportunities.opportunities,
//   );

//   const [loadingOpportunities, setLoadingOpportunities] = useState(false);
//   const [opportunitiesError, setOpportunitiesError] = useState(null);

//   const fetchOpportunities = async () => {
//     try {
//       setLoadingOpportunities(true);
//       setOpportunitiesError(null);

//       const params = Object.fromEntries(
//         Object.entries(filters).filter(([, value]) => {
//           if (Array.isArray(value)) {
//             return value.length > 0;
//           }

//           return value !== "" && value !== null && value !== undefined;
//         }),
//       );

//       const { data } = await api.get("/opportunities", {
//         params,
//       });

//       dispatch(setOpportunities(data.data?.opportunities || []));
//     } catch (error) {
//       console.error("Failed to fetch opportunities:", error);

//       setOpportunitiesError(error);
//     } finally {
//       setLoadingOpportunities(false);
//     }
//   };

//   useEffect(() => {
//     fetchOpportunities();
//   }, [
//     filters.category,
//     filters.sport,
//     filters.skill,
//     filters.countryCode,
//     filters.stateCode,
//     filters.city,
//     filters.level,
//     filters.mode,
//     filters.search,
//   ]);

//   return {
//     opportunities,
//     loadingOpportunities,
//     opportunitiesError,
//     refetchOpportunities: fetchOpportunities,
//   };
// };

// export default useOpportunities;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import api from "../utils/axios";
import { setOpportunities } from "../features/opportunity/opportunitySlice";

const useOpportunities = (filters = {}) => {
  const dispatch = useDispatch();

  const opportunities = useSelector(
    (state) => state.opportunity?.opportunities || [],
  );

  const [loadingOpportunities, setLoadingOpportunities] = useState(false);
  const [opportunitiesError, setOpportunitiesError] = useState(null);

  const fetchOpportunities = async () => {
    try {
      setLoadingOpportunities(true);
      setOpportunitiesError(null);

      const params = Object.fromEntries(
        Object.entries(filters).filter(
          ([, value]) => value !== "" && value !== null && value !== undefined,
        ),
      );

      const { data } = await api.get("/opportunities", {
        params,
      });

      dispatch(setOpportunities(data.data?.opportunities || []));
    } catch (error) {
      console.error("Failed to fetch opportunities:", error);

      setOpportunitiesError(error);
    } finally {
      setLoadingOpportunities(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, [
    filters.category,
    filters.type,
    filters.sport,
    filters.countryCode,
    filters.stateCode,
    filters.city,
    filters.mode,
    filters.search,
  ]);

  return {
    opportunities,
    loadingOpportunities,
    opportunitiesError,
    refetchOpportunities: fetchOpportunities,
  };
};

export default useOpportunities;
