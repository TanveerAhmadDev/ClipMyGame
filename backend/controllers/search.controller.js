// import postModel from "../models/post.model.js";
// import userModel from "../models/user.model.js";
// import asyncHandler from "../utils/asyncHandler.js";

// export const search = asyncHandler(async (req, res) => {
//   const { q = "", type = "all" } = req.query;

//   const searchQuery = q.trim();

//   if (!searchQuery) {
//     return res.status(200).json({
//       success: true,
//       data: {
//         users: [],
//         posts: [],
//       },
//     });
//   }

//   const regex = new RegExp(searchQuery, "i");

//   const result = {
//     users: [],
//     posts: [],
//   };

//   // =========================
//   // SEARCH USERS
//   // =========================
//   if (type === "all" || type === "user") {
//     result.users = await userModel
//       .find({
//         $or: [{ fullName: regex }, { userName: regex }],
//       })
//       .select("_id fullName userName profilePhoto userRole")
//       .limit(8);
//   }

//   // =========================
//   // SEARCH POSTS
//   // =========================
//   if (type === "all" || type === "post") {
//     result.posts = await postModel
//       .find({
//         $or: [{ caption: regex }, { category: regex }, { tags: regex }],
//       })
//       .populate("userId", "_id fullName userName profilePhoto userRole")
//       .limit(8);
//   }

//   return res.status(200).json({
//     success: true,
//     data: result,
//   });
// });

import postModel from "../models/post.model.js";
import userModel from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const search = asyncHandler(async (req, res) => {
  const { q = "", type = "all" } = req.query;

  const searchQuery = q.trim();

  if (!searchQuery) {
    return res.status(200).json({
      success: true,
      data: {
        users: [],
        posts: [],
      },
    });
  }

  // Escape special regex characters
  const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escapedQuery, "i");

  const result = {
    users: [],
    posts: [],
  };

  // =========================
  // SEARCH USERS
  // =========================

  if (type === "all" || type === "user") {
    result.users = await userModel
      .find({
        $or: [{ fullName: regex }, { userName: regex }],
      })
      .select("_id fullName userName profilePhoto userRole")
      .limit(8);
  }

  // =========================
  // SEARCH POSTS
  // =========================

  if (type === "all" || type === "post") {
    result.posts = await postModel
      .find({
        $or: [{ caption: regex }, { category: regex }, { tags: regex }],
      })
      .populate("userId", "_id fullName userName profilePhoto userRole")
      .limit(8);
  }

  return res.status(200).json({
    success: true,
    data: result,
  });
});
