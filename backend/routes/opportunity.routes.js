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
  getOpportunitiesFilters,
} from "../controllers/opportunity.controller.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import { upload } from "../middlewares/multer.middleware.js";

const opportunityRouter = express.Router();

opportunityRouter.get("/", getOpportunities);
opportunityRouter.get("/filters", getOpportunitiesFilters);

opportunityRouter.get("/my", verifyJWT, getMyOpportunities);

opportunityRouter.get("/applications/my", verifyJWT, getMyApplications);

opportunityRouter.get("/:id", getOpportunity);

opportunityRouter.post(
  "/",
  verifyJWT,
  upload.fields([
    { name: "featureImage", maxCount: 1 },
    { name: "MoreImages", maxCount: 3 },
  ]),
  createOpportunity,
);

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
