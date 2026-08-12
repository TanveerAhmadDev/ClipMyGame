import jwt from "jsonwebtoken";
import apiError from "../utils/apiError.js";
import userModel from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log(authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new apiError(401, "Unauthorized");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await userModel.findById(decoded.userId);

    if (!user) {
      throw new apiError(401, "User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default verifyJWT;
