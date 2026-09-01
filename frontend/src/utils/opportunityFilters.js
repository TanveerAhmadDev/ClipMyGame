export const INITIAL_POST_FILTERS = {
  sport: "",
  level: "",
  type: "",
  category: "",
  country: "",
  region: "",
  city: "",
};

export const toOptions = (items = []) => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .filter((item) => item !== null && item !== undefined)
    .map((item) => {
      if (typeof item === "string") {
        return {
          label: item,
          value: item,
        };
      }

      return {
        label: item?.label || item?.name || item?.value || "",
        value: item?.value || item?.name || item?.label || "",
      };
    })
    .filter((item) => item.label && item.value);
};

export const getFilterLabel = (options = [], value) => {
  if (!value) {
    return "All";
  }

  const option = options.find((item) => item.value === value);

  return option?.label || "All";
};

export const buildPostQuery = (filters = {}) => {
  const params = {};

  if (filters.sport) {
    params.sport = filters.sport;
  }

  if (filters.skill) {
    params.skill = filters.skill;
  }

  if (filters.level) {
    params.level = filters.level;
  }

  if (filters.contentType) {
    params.contentType = filters.contentType;
  }

  if (filters.countryCode) {
    params.countryCode = filters.countryCode;
  }

  if (filters.stateCode) {
    params.stateCode = filters.stateCode;
  }

  if (filters.city) {
    params.city = filters.city;
  }

  if (filters.sortBy) {
    params.sortBy = filters.sortBy;
  }

  return params;
};
