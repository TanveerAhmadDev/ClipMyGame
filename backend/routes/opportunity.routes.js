import express from "express";

import {
  createOpportunity,
  getOpportunities,
  getOpportunity,
  applyToOpportunity,
  getOpportunityApplications,
  updateApplicationStatus,
  getMyApplications,
  getMyOpportunities,
} from "../controllers/opportunity.controller.js";
import verifyJWT from "../middlewares/verifyJWT.js";

const opportunityRouter = express.Router();

opportunityRouter.get("/", getOpportunities);

opportunityRouter.get("/my", verifyJWT, getMyOpportunities);

opportunityRouter.get("/applications/my", verifyJWT, getMyApplications);

opportunityRouter.get("/:id", getOpportunity);

opportunityRouter.post("/", verifyJWT, createOpportunity);

opportunityRouter.post("/:id/apply", verifyJWT, applyToOpportunity);

opportunityRouter.get(
  "/:id/applications",
  verifyJWT,
  getOpportunityApplications,
);

opportunityRouter.patch(
  "/applications/:applicationId/status",
  verifyJWT,
  updateApplicationStatus,
);

export default opportunityRouter;
