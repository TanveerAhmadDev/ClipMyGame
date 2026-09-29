import asyncHandler from "../utils/asyncHandler.js";
import Comment from "../models/comment.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import commentModel from "../models/comment.model.js";
import postModel from "../models/post.model.js";
import commentLikeModel from "../models/commentLike.model.js";

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

  // Update post comment count
  const post = await postModel.findById(postId);

  if (!post) {
    throw new apiError(404, "Post not found");
  }

  post.performance.comments += 1;

  await post.save();

  // Get comment with user information
  const createdComment = await commentModel
    .findById(comment._id)
    .populate("user", "userName fullName profilePhoto");

  return res.status(201).json(
    new apiResponse(
      201,
      {
        comment: createdComment,
        commentsCount: post.performance.comments,
      },
      "Comment added successfully",
    ),
  );
});

export const likeComment = asyncHandler(async (req, res) => {
  const { commentId } = req.body;

  // Check comment ID
  if (!commentId) {
    throw new apiError(400, "Comment ID is required");
  }

  // Check comment exists
  const comment = await commentModel.findById(commentId);

  if (!comment) {
    throw new apiError(404, "Comment not found");
  }

  // Check whether current user already liked this comment
  const existingLike = await commentLikeModel.findOne({
    commentId,
    userId: req.user._id,
  });

  if (existingLike) {
    throw new apiError(400, "You already liked this comment");
  }

  // Create like
  await commentLikeModel.create({
    commentId,
    userId: req.user._id,
  });

  // Get current total likes
  const likeCount = await commentLikeModel.countDocuments({
    commentId,
  });

  return res.status(201).json(
    new apiResponse(
      201,
      {
        liked: true,
        likeCount,
      },
      "Comment liked successfully",
    ),
  );
});

export const unlikeComment = asyncHandler(async (req, res) => {
  const { commentId } = req.body;

  // Check comment ID
  if (!commentId) {
    throw new apiError(400, "Comment ID is required");
  }

  // Delete user's like
  const deletedLike = await commentLikeModel.findOneAndDelete({
    commentId,
    userId: req.user._id,
  });

  if (!deletedLike) {
    throw new apiError(400, "Comment is not liked");
  }

  // Get current total likes
  const likeCount = await commentLikeModel.countDocuments({
    commentId,
  });

  return res.status(200).json(
    new apiResponse(
      200,
      {
        liked: false,
        likeCount,
      },
      "Comment unliked successfully",
    ),
  );
});

export const getComments = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  if (!postId) {
    throw new apiError(400, "Post ID is required");
  }

  const comments = await commentModel
    .find({ post: postId })
    .populate("user", "userName fullName profilePhoto")
    .sort({ createdAt: -1 })
    .lean();

  const commentIds = comments.map((comment) => comment._id);

  // Get all likes for these comments
  const likes = await commentLikeModel
    .find({
      commentId: { $in: commentIds },
    })
    .lean();

  const currentUserId = req.user._id.toString();

  const formattedComments = comments.map((comment) => {
    const commentLikes = likes.filter(
      (like) => like.commentId.toString() === comment._id.toString(),
    );

    const liked = commentLikes.some(
      (like) => like.userId.toString() === currentUserId,
    );

    return {
      ...comment,

      likeCount: commentLikes.length,

      liked,
    };
  });

  return res
    .status(200)
    .json(
      new apiResponse(200, formattedComments, "Comments fetched successfully"),
    );
});
