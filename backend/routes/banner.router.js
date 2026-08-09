import express from "express";

import {
  createBanner,
  getFeedBanner,
  updateBanner,
  deleteBanner,
  increaseClick,
  increaseImpression,
  getAllBanners,
} from "../controllers/banner.controller.js";

import verifyJWT from "../middlewares/verifyJWT.js";
import { upload } from "../middlewares/multer.middleware.js";

const bannerRouter = express.Router();

// Feed
bannerRouter.get("/feed", getFeedBanner);

bannerRouter.get("/", verifyJWT, getAllBanners);

// Admin
bannerRouter.post("/", verifyJWT, upload.single("image"), createBanner);

bannerRouter.patch("/:id", verifyJWT, upload.single("image"), updateBanner);

bannerRouter.delete("/:id", verifyJWT, deleteBanner);

// Analytics
bannerRouter.patch("/:id/impression", increaseImpression);
bannerRouter.patch("/:id/click", increaseClick);

export default bannerRouter;
