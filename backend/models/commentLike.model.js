import mongoose from "mongoose";

const commentLikeSchema = new mongoose.Schema(
  {
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// One user can like a comment only once
commentLikeSchema.index({ commentId: 1, userId: 1 }, { unique: true });

const commentLikeModel = mongoose.model("CommentLike", commentLikeSchema);

export default commentLikeModel;
