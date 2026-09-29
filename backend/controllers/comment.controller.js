import asyncHandler from "../utils/asyncHandler.js";
import Comment from "../models/comment.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import commentModel from "../models/comment.model.js";

export const addcomment = asyncHandler(async (req, res, next) => {
  const { postId, text } = req.body;

  // Check post ID
  if (!postId) {
    throw new apiError(400, "Post ID is required");
  }

  // Check comment text
  if (!text || !text.trim()) {
    throw new apiError(400, "Comment cannot be empty");
  }

  // Create comment
  const comment = await commentModel.create({
    post: postId,
    user: req.user._id,
    text: text.trim(),
  });

  // Get comment with user information
  const createdComment = await Comment.findById(comment._id).populate(
    "user",
    "userName fullName profilePhoto",
  );

  return res
    .status(201)
    .json(new apiResponse(201, createdComment, "Comment added successfully"));
});
