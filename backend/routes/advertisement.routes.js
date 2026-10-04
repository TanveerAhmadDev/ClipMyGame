import express from "express";
import {
  createAdvertisementInquiry,
  getAdvertisementInquiries,
} from "../controllers/advertisement.controller.js";

const advertisementRouter = express.Router();

advertisementRouter.post("/inquiry", createAdvertisementInquiry);
advertisementRouter.get("/inquiries", getAdvertisementInquiries);

export default advertisementRouter;
