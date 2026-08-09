import express from "express";
import {
  completeBasicInformation,
  coverImage,
  profilePhoto,
  userData,
} from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = express.Router();

userRouter.get("/me", verifyJWT, userData);
userRouter.patch(
  "/me/basic-information",
  verifyJWT,
  upload.single("profilePhoto"),
  completeBasicInformation,
);
userRouter.patch(
  "/me/cover-photo",
  verifyJWT,
  upload.single("coverPhoto"),
  coverImage,
);
userRouter.patch(
  "/me/profile-photo",
  verifyJWT,
  upload.single("profilePhoto"),
  profilePhoto,
);

export default userRouter;
