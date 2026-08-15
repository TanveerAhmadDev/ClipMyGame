import mongoose from "mongoose";

const postLikeSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
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

// A user can like a post only once
postLikeSchema.index(
  {
    postId: 1,
    userId: 1,
  },
  {
    unique: true,
  },
);

const postLikeModel = mongoose.model("PostLike", postLikeSchema);

export default postLikeModel;
