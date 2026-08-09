import express from "express";
import { search } from "../controllers/search.controller.js";
import verifyJWT from "../middlewares/verifyJWT.js";

const searchRouter = express.Router();

searchRouter.get("/", verifyJWT, search);

export default searchRouter;
