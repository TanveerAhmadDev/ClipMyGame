const getPostSort = (sortBy = "latest") => {
  switch (sortBy) {
    case "trending":
      return {
        "performance.likes": -1,
        "performance.comments": -1,
        createdAt: -1,
      };

    case "most_viewed":
      return {
        "performance.views": -1,
        createdAt: -1,
      };

    case "most_discussed":
      return {
        "performance.comments": -1,
        createdAt: -1,
      };

    case "latest":
    default:
      return {
        createdAt: -1,
      };
  }
};

export default getPostSort;
