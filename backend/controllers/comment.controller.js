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

export const likeComment = asyncHandler(async (req, res) => {
  const { commentId } = req.body;

  if (!commentId) {
    throw new apiError(400, "Comment ID is required");
  }

  // Check comment exists
  const comment = await commentModel.findById(commentId);

  if (!comment) {
    throw new apiError(404, "Comment not found");
  }

  // Check if user already liked it
  const existingLike = await commentLikeModel.findOne({
    commentId,
    userId: req.user._id,
  });

  if (existingLike) {
    throw new apiError(400, "You already liked this comment");
  }

  // Create like
  const like = await commentLikeModel.create({
    commentId,
    userId: req.user._id,
  });

  return res
    .status(201)
    .json(new apiResponse(201, like, "Comment liked successfully"));
});

export const unlikeComment = asyncHandler(async (req, res) => {
  const { commentId } = req.body;

  if (!commentId) {
    throw new apiError(400, "Comment ID is required");
  }

  const deletedLike = await commentLikeModel.findOneAndDelete({
    commentId,
    userId: req.user._id,
  });

  if (!deletedLike) {
    throw new apiError(400, "Comment is not liked");
  }

  return res
    .status(200)
    .json(new apiResponse(200, null, "Comment unliked successfully"));
});
