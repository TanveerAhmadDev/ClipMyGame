import postModel from "../models/post.model.js";
import userModel from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const search = asyncHandler(async (req, res) => {
  const { q = "", type = "all" } = req.query;

  const regex = new RegExp(q, "i");

  let result = {};

  if (type === "all" || type === "users") {
    result.users = await userModel
      .find({
        $or: [{ fullName: regex }, { userName: regex }],
      })
      .limit(8);
  }

  if (type === "all" || type === "posts") {
    result.posts = await postModel
      .find({
        $or: [{ caption: regex }, { category: regex }, { tags: regex }],
      })
      .populate("userId")
      .limit(8);
  }

  res.status(200).json({
    success: true,
    data: result,
  });
});
