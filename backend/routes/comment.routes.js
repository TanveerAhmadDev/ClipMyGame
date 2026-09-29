import express from "express";
import { addcomment } from "../controllers/comment.controller.js";
import verifyJWT from "../middlewares/verifyJWT.js";

const commentRouter = express.Router();

commentRouter.post("/add", verifyJWT, addcomment);

export default commentRouter;
