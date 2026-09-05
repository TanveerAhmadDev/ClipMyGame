import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";

import athleteModel from "../models/athlete.model.js";

export const createAthleteProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  const userId = user._id;

  const {
    sport,
    position,
    height,
    weight,
    dominantFoot,
    currentClub,
    jerseyNumber,
    experience,
    achievements,
    videos,
  } = req.body;

  const existingProfile = await athleteModel.findOne({ userId });

  if (existingProfile) {
    throw new apiError(409, "Athlete profile already exists.");
  }

  const athlete = await athleteModel.create({
    userId,
    sport,
    position,
    height,
    weight,
    dominantFoot,
    currentClub,
    jerseyNumber,
    experience,
    achievements,
    videos,
  });

  user.isProfileCompleted = true;
  await user.save();

  return res
    .status(201)
    .json(
      new apiResponse(201, "Athlete profile created successfully.", athlete),
    );
});
