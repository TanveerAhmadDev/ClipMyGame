import postModel from "../models/post.model.js";
import buildPostFilter from "../utils/post/buildPostFilter.js";
import getPostSort from "../utils/post/getPostSort.js";

export const findPosts = async (query) => {
  const filter = buildPostFilter(query);

  const sort = getPostSort(query.sortBy);

  return await postModel
    .find(filter)
    .populate("userId", "fullName userName profilePhoto")
    .sort(sort);
};
