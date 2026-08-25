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
import opportunityRouter from "../routes/opportunity.routes.js";

const app = express();

app.use(
  cors({
    origin: ["https://clip-my-game-rho.vercel.app", "http://localhost:5173"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(cookieParser());
app.use(express.json());

try {
  await dbConnect();
} catch (error) {
  console.error("Failed to start application because MongoDB is unavailable.");
  process.exit(1);
}

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/athlete", athleteRouter);
app.use("/api/post", postRouter);
app.use("/api/search", searchRouter);
app.use("/api/banner", bannerRouter);
app.use("/api/opportunities", opportunityRouter);

app.use(errorHandler);

export default app;
