import express from "express";

import { createAthleteProfile } from "../controllers/athlete.contoller.js";
import verifyJWT from "../middlewares/verifyJWT.js";

const athleteRouter = express.Router();

athleteRouter.patch("/me", verifyJWT, createAthleteProfile);

export default athleteRouter;
