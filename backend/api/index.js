import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "../routes/auth.reoutes.js";
import errorHandler from "../middlewares/errorHandler.js";
import dbConnect from "../utils/dbConnect.js";
import userRouter from "../routes/user.routes.js";
import athleteRouter from "../routes/athlete.routes.js";
import postRouter from "../routes/post.routes.js";
import searchRouter from "../routes/search.router.js";
import bannerRouter from "../routes/banner.router.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.3.106:5173","https://clip-my-game-rho.vercel.app"],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

dbConnect();

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

app.get("/api/debug/cookies", (req, res) => {
  console.log("Cookies received:", req.cookies);

  res.json({
    cookies: req.cookies,
  });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/athlete", athleteRouter);
app.use("/api/post", postRouter);
app.use("/api/search", searchRouter);
app.use("/api/banner", bannerRouter);

app.use(errorHandler);

export default app;
