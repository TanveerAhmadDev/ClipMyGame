import express from "express";

import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  posts,
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

export default postRouter;
