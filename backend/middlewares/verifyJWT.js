import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    throw new apiError(401, "Unauthorized");
  }

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  req.userId = decoded.userId;

  next();
});

export default verifyJWT;
