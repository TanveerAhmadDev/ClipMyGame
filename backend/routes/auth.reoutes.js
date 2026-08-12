import express from "express";
import {
  login,
  optResend,
  register,
  verifyOtp,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/signin", login);
authRouter.post("/verfiy/account", verifyOtp);
authRouter.post("/resendotp", optResend);

export default authRouter;
