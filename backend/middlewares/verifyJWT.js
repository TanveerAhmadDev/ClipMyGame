import jwt from "jsonwebtoken";
import apiError from "../utils/apiError.js";
import userModel from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return next(new apiError(401, "Unauthorized"));
    }

    const token = authHeader.split(" ")[1];

    let decoded;

    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return next(new apiError(401, "Access token expired"));
      }

      if (error.name === "JsonWebTokenError") {
        return next(new apiError(401, "Invalid access token"));
      }

      return next(error);
    }

    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return next(new apiError(401, "User not found"));
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default verifyJWT;
