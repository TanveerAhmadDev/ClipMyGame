import userModel from "../models/user.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import bcrypt from "bcrypt";
import {
  accessTokenGenerator,
  refreshTokenGenerator,
} from "../utils/tokenGenrator.js";
import { sendOtpEmail } from "../utils/sendOtpEmail.js";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res) => {
  let { email, password, userName } = req.body;

  email = email.trim().toLowerCase();

  if (!email || !password || !userName) {
    throw new apiError(400, "Email, password and username are required.");
  }

  const existingUser = await userModel.findOne({
    $or: [{ email }, { userName }],
  });

  if (existingUser) {
    throw new apiError(409, "Email or username already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    email,
    userName,
    password: hashedPassword,
  });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  newUser.otp = otp;

  newUser.otpExpiry = Date.now() + 10 * 60 * 1000;

  await newUser.save();

  if (process.env.NODE_ENV === "production") {
    await sendOtpEmail(newUser.email, otp);
  }

  const userData = newUser.toObject();

  delete userData.password;
  delete userData.otp;
  delete userData.otpExpiry;

  return res
    .status(201)
    .json(new apiResponse(201, "OTP sent successfully.", userData));
});

// export const login = asyncHandler(async (req, res) => {
//   let { email, password } = req.body;

//   email = email.trim().toLowerCase();

//   const userChecking = await userModel.findOne({ email });

//   if (!userChecking) {
//     throw new apiError(403, "User not found");
//   }

//   const passwordChecking = await bcrypt.compare(
//     password,
//     userChecking.password,
//   );

//   if (!passwordChecking) {
//     throw new apiError(403, "Password incorrect");
//   }

//   const accessToken = accessTokenGenerator(userChecking._id);

//   res.cookie("accessToken", accessToken, {
//     httpOnly: true,
//     maxAge: 15 * 60 * 10000,
//   });

//   res
//     .status(200)
//     .json(new apiResponse(200, "User login successfully.", userChecking));
// });

export const login = asyncHandler(async (req, res) => {
  let { email, password } = req.body;

  email = email.trim().toLowerCase();

  const user = await userModel.findOne({ email });

  if (!user) {
    throw new apiError(403, "User not found");
  }

  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (!passwordCorrect) {
    throw new apiError(403, "Password incorrect");
  }

  const accessToken = accessTokenGenerator(user._id);

  return res.status(200).json(
    new apiResponse(200, "User login successfully.", {
      accessToken,
      user,
    }),
  );
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    throw new apiError(404, "User not found");
  }

  if (user.otp !== otp) {
    throw new apiError(400, "Invalid OTP");
  }

  if (user.otpExpiry < Date.now()) {
    throw new apiError(400, "OTP expired");
  }

  user.isVerified = true;

  user.otp = null;
  user.otpExpiry = null;

  const accessToken = accessTokenGenerator(user._id);
  const refreshToken = refreshTokenGenerator(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  const userData = user.toObject();

  delete userData.password;
  delete userData.otp;
  delete userData.otpExpiry;

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(200)
    .json(new apiResponse(200, "Email verified successfully.", userData));
});

export const optResend = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.otp = otp;

  user.otpExpiry = Date.now() + 10 * 60 * 1000;

  await user.save();

  await sendOtpEmail(user.email, otp);

  return res.status(200).json(new apiResponse(200, "OTP resent successfully"));
});

// export const refreshAccessToken = asyncHandler(async (req, res) => {
//    console.log("========== REFRESH ==========");
//   console.log("Cookies:", req.cookies);

//   const refreshToken = req.cookies.refreshToken;

//   if (!refreshToken) {
//     console.log("❌ NO REFRESH TOKEN");
//     throw new apiError(401, "Unauthorized");
//   }
//   const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

//   const user = await userModel.findById(decoded.userId);

//   if (!user) {
//     throw new apiError(401, "User not found");
//   }

//   if (user.refreshToken !== refreshToken) {
//     throw new apiError(401, "Invalid refresh token");
//   }

//   const newAccessToken = accessTokenGenerator(user._id);

// const isProduction = process.env.NODE_ENV === "production";

// res.cookie("accessToken", newAccessToken, {
//   httpOnly: true,
//   secure: isProduction,
//   sameSite: isProduction ? "none" : "lax",
//   path: "/",
//   maxAge: 15 * 60 * 1000,
// });

//   res.status(200).json({
//     success: true,
//   });
// });
