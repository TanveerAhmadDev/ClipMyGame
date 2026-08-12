import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import userModel from "../models/user.model.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

//library
import jwt from "jsonwebtoken";
import fs from "fs";

export const userData = asyncHandler(async (req, res) => {
  const user = req.user;

  console.log(user);

  if (user.isProfileCompleted == false) {
    throw new apiError(402, "Complete Your profile First");
  }

  return res
    .status(200)
    .json(new apiResponse(200, "User data fetched successfully", user));
});

export const completeBasicInformation = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.userId);

  if (!user) {
    throw new apiError(404, "User not found");
  }

  // Parse JSON fields sent through FormData
  if (req.body.location) {
    req.body.location = JSON.parse(req.body.location);
  }

  if (req.body.languagesSpoken) {
    req.body.languagesSpoken = JSON.parse(req.body.languagesSpoken);
  }

  // Upload profile photo
  if (req.file) {
    const uploadedImage = await uploadToCloudinary(
      req.file.path,
      "ClipMyGame/ProfilePhotos",
    );

    user.profilePhoto = uploadedImage.secure_url.replace(
      "/upload/",
      "/upload/w_300,h_300,c_fill,f_auto,q_auto/",
    );

    fs.unlinkSync(req.file.path);
  }

  // Update user fields
  user.fullName = req.body.fullName;
  user.userRole = req.body.userRole;
  user.dateOfBirth = req.body.dateOfBirth;
  user.gender = req.body.gender;
  user.nationality = req.body.nationality;
  user.location = req.body.location;
  user.phoneNumber = req.body.phoneNumber;
  user.whatsappNumber = req.body.whatsappNumber;
  user.shortBio = req.body.shortBio;
  user.longBio = req.body.longBio;
  user.languagesSpoken = req.body.languagesSpoken;
  user.availabilityStatus = req.body.availabilityStatus;

  await user.save();

  return res
    .status(200)
    .json(
      new apiResponse(200, "Basic information updated successfully.", user),
    );
});

export const coverImage = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.userId);

  if (!user) {
    throw new apiError(404, "User not found");
  }

  if (req.file) {
    const uploadedImage = await uploadToCloudinary(
      req.file.path,
      "ClipMyGame/CoverPhoto",
    );

    user.coverPhoto = uploadedImage.secure_url.replace(
      "/upload/",
      "/upload/w_300,h_300,c_fill,f_auto,q_auto/",
    );

    fs.unlinkSync(req.file.path);
  }

  await user.save();

  return res
    .status(200)
    .json(new apiResponse(200, "Cover photo Uploaded.", user));
});
export const profilePhoto = asyncHandler(async (req, res) => {
  const user = await userModel.findById(req.userId);

  if (!user) {
    throw new apiError(404, "User not found");
  }

  if (req.file) {
    const uploadedImage = await uploadToCloudinary(
      req.file.path,
      "ClipMyGame/ProfilePhoto",
    );

    user.profilePhoto = uploadedImage.secure_url.replace(
      "/upload/",
      "/upload/w_300,h_300,c_fill,f_auto,q_auto/",
    );

    fs.unlinkSync(req.file.path);
  }

  await user.save();

  return res
    .status(200)
    .json(new apiResponse(200, "Profile photo Uploaded.", user));
});
