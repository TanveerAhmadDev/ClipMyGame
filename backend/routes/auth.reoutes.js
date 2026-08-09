import express from "express";
import {
  login,
  optResend,
  refreshAccessToken,
  register,
  verifyOtp,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/signin", login);
authRouter.post("/verfiy/account", verifyOtp);
authRouter.post("/resendotp", optResend);
authRouter.post("/refresh-token", refreshAccessToken);

export default authRouter;
