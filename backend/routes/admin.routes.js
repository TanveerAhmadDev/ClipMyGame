import express from "express";
import { verifyAdminPassword } from "../controllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.post("/verify-password", verifyAdminPassword);

export default adminRouter;
