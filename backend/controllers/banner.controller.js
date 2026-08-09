import Banner from "../models/banner.model.js";

import asyncHandler from "../utils/asyncHandler.js";
import apiResponse from "../utils/apiResponse.js";
import apiError from "../utils/apiError.js";

import uploadToCloudinary from "../utils/uploadToCloudinary.js";

export const createBanner = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    redirectUrl,
    sport,
    priority,
    startDate,
    endDate,
  } = req.body;

  if (!title) {
    throw new apiError(400, "Title is required.");
  }

  if (!req.file) {
    throw new apiError(400, "Banner image is required.");
  }

  const uploaded = await uploadToCloudinary(
    req.file.path,
    "ClipMyGame/Banners",
  );

  const banner = await Banner.create({
    title,
    description,
    redirectUrl,
    sport,
    priority,
    startDate,
    endDate,
    image: uploaded.secure_url,
    createdBy: req.userId,
  });

  return res
    .status(201)
    .json(new apiResponse(201, "Banner created successfully.", banner));
});

export const getFeedBanner = asyncHandler(async (req, res) => {
  const { sport = "all" } = req.query;

  const now = new Date();

  const query = {
    active: true,
    startDate: { $lte: now },
    endDate: { $gte: now },
  };

  if (sport === "all") {
    // show every active banner
  } else {
    query.sport = { $in: [sport, "all"] };
  }

  const banners = await Banner.find(query).sort({ priority: -1 });

  return res.json(new apiResponse(200, "Banner fetched.", banners));
});

export const getAllBanners = asyncHandler(async (req, res) => {
  const banners = await Banner.find().sort({
    createdAt: -1,
  });

  return res
    .status(200)
    .json(new apiResponse(200, "Banners fetched successfully", banners));
});

export const updateBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findById(req.params.id);

  if (!banner) {
    throw new apiError(404, "Banner not found.");
  }

  if (req.file) {
    const uploaded = await uploadToCloudinary(
      req.file.path,
      "ClipMyGame/Banners",
    );

    banner.image = uploaded.secure_url;
  }

  banner.title = req.body.title ?? banner.title;
  banner.description = req.body.description ?? banner.description;
  banner.redirectUrl = req.body.redirectUrl ?? banner.redirectUrl;
  banner.priority = req.body.priority ?? banner.priority;
  banner.sport = req.body.sport ?? banner.sport;
  banner.startDate = req.body.startDate ?? banner.startDate;
  banner.endDate = req.body.endDate ?? banner.endDate;
  banner.active = req.body.active ?? banner.active;

  await banner.save();

  return res.json(new apiResponse(200, "Banner updated successfully.", banner));
});

export const deleteBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.findById(req.params.id);

  if (!banner) {
    throw new apiError(404, "Banner not found.");
  }

  await banner.deleteOne();

  return res.json(new apiResponse(200, "Banner deleted."));
});

export const increaseImpression = asyncHandler(async (req, res) => {
  await Banner.findByIdAndUpdate(req.params.id, {
    $inc: {
      "analytics.impressions": 1,
    },
  });

  return res.json(new apiResponse(200, "Impression updated."));
});

export const increaseClick = asyncHandler(async (req, res) => {
  await Banner.findByIdAndUpdate(req.params.id, {
    $inc: {
      "analytics.clicks": 1,
    },
  });

  return res.json(new apiResponse(200, "Click updated."));
});
