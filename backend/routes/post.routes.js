import express from "express";

import {
  createPost,
  deletePost,
  getPost,
  getPostFilters,
  getPosts,
  posts,
  togglePostLike,
} from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/verifyJWT.js";

const postRouter = express.Router();

postRouter.post(
  "/createpost",
  verifyJWT,
  upload.array("media", 10),
  createPost,
);

postRouter.delete("/:id", deletePost);

postRouter.get("/posts", verifyJWT, getPosts);
postRouter.get("/getposts", verifyJWT, getPost);
postRouter.get("/filters", getPostFilters);
postRouter.post("/:postId/like", verifyJWT, togglePostLike);

export default postRouter;
