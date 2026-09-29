import express from "express";
import {
  addcomment,
  likeComment,
  unlikeComment,
} from "../controllers/comment.controller.js";
import verifyJWT from "../middlewares/verifyJWT.js";

const commentRouter = express.Router();

commentRouter.post("/add", verifyJWT, addcomment);

commentRouter.post("/like", verifyJWT, likeComment);

commentRouter.post("/unlike", verifyJWT, unlikeComment);

export default commentRouter;
