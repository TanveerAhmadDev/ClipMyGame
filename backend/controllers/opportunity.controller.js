import asyncHandler from "../utils/asyncHandler.js";
import opportunityModel from "../models/opportunity.model.js";
import opportunityApplicationModel from "../models/opportunityApplication.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";

export const createOpportunity = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const {
    title,
    type,
    description,
    organization = "",
    coverImage = "",
    sport = "",
    location = {},
    mode = "Onsite",
    deadline = null,
    requirements = [],
    benefits = [],
    applicationUrl = "",
  } = req.body;

  console.log(type);

  if (!title?.trim()) {
    throw new apiError(400, "Opportunity title is required.");
  }

  if (!type) {
    throw new apiError(400, "Opportunity type is required.");
  }

  if (!description?.trim()) {
    throw new apiError(400, "Opportunity description is required.");
  }

  const opportunity = await opportunityModel.create({
    creatorId: userId,
    title,
    type,
    description,
    organization,
    coverImage,
    sport,
    location,
    mode,
    deadline,
    requirements,
    benefits,
    applicationUrl,
  });

  const populatedOpportunity = await opportunityModel
    .findById(opportunity._id)
    .populate("creatorId", "fullName userName profilePhoto");

  return res
    .status(201)
    .json(
      new apiResponse(
        201,
        "Opportunity created successfully.",
        populatedOpportunity,
      ),
    );
});

export const getOpportunities = asyncHandler(async (req, res) => {
  const { type, sport, countryCode, stateCode, city, mode, search } = req.query;

  const filter = {
    isActive: true,
  };

  if (type) {
    filter.type = type;
  }

  if (sport) {
    filter.sport = sport;
  }

  if (countryCode) {
    filter["location.countryCode"] = countryCode;
  }

  if (stateCode) {
    filter["location.stateCode"] = stateCode;
  }

  if (city) {
    filter["location.city"] = city;
  }

  if (mode) {
    filter.mode = mode;
  }

  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
      {
        organization: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const opportunities = await opportunityModel
    .find(filter)
    .populate("creatorId", "fullName userName profilePhoto")
    .sort({
      createdAt: -1,
    });

  return res.status(200).json(
    new apiResponse(200, "Opportunities fetched successfully.", {
      opportunities,
    }),
  );
});

export const getOpportunity = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const opportunity = await opportunityModel
    .findById(id)
    .populate("creatorId", "fullName userName profilePhoto");

  if (!opportunity) {
    throw new apiError(404, "Opportunity not found.");
  }

  await opportunityModel.findByIdAndUpdate(id, {
    $inc: {
      views: 1,
    },
  });

  return res
    .status(200)
    .json(
      new apiResponse(200, "Opportunity fetched successfully.", opportunity),
    );
});

export const applyToOpportunity = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const { id } = req.params;

  const {
    fullName = "Tanveer Ahmad",
    email = "tanveeera84@gmail.com",
    phone = "03299968400",
    resume = "",
    coverLetter = "",
    answers = [],
  } = req.body;

  console.log(userId, id);

  const opportunity = await opportunityModel.findById(id);

  if (!opportunity) {
    throw new apiError(404, "Opportunity not found.");
  }

  if (!opportunity.isActive) {
    throw new apiError(
      400,
      "This opportunity is no longer accepting applications.",
    );
  }

  if (opportunity.deadline && new Date(opportunity.deadline) < new Date()) {
    throw new apiError(400, "The application deadline has passed.");
  }

  const existingApplication = await opportunityApplicationModel.findOne({
    opportunityId: id,
    applicantId: userId,
  });

  if (existingApplication) {
    throw new apiError(409, "You have already applied to this opportunity.");
  }

  const application = await opportunityApplicationModel.create({
    opportunityId: id,
    applicantId: userId,
    fullName,
    email,
    phone,
    resume,
    coverLetter,
    answers,
  });

  await opportunityModel.findByIdAndUpdate(id, {
    $inc: {
      applicationsCount: 1,
    },
  });

  return res
    .status(201)
    .json(
      new apiResponse(201, "Application submitted successfully.", application),
    );
});

export const getOpportunityApplications = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const { id } = req.params;

  const opportunity = await opportunityModel.findById(id);

  if (!opportunity) {
    throw new apiError(404, "Opportunity not found.");
  }

  if (opportunity.creatorId.toString() !== userId.toString()) {
    throw new apiError(403, "You are not allowed to view these applications.");
  }

  const applications = await opportunityApplicationModel
    .find({
      opportunityId: id,
    })
    .populate("applicantId", "fullName userName profilePhoto")
    .sort({
      createdAt: -1,
    });

  return res.status(200).json(
    new apiResponse(200, "Applications fetched successfully.", {
      applications,
    }),
  );
});

export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const { applicationId } = req.params;

  const { status } = req.body;

  const allowedStatuses = [
    "Pending",
    "Shortlisted",
    "Accepted",
    "Rejected",
    "Withdrawn",
  ];

  if (!allowedStatuses.includes(status)) {
    throw new apiError(400, "Invalid application status.");
  }

  const application = await opportunityApplicationModel
    .findById(applicationId)
    .populate("opportunityId");

  if (!application) {
    throw new apiError(404, "Application not found.");
  }

  if (application.opportunityId.creatorId.toString() !== userId.toString()) {
    throw new apiError(403, "You are not allowed to update this application.");
  }

  application.status = status;

  await application.save();

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        "Application status updated successfully.",
        application,
      ),
    );
});

export const getMyApplications = asyncHandler(async (req, res) => {
  const applications = await opportunityApplicationModel
    .find({
      applicantId: req.user._id,
    })
    .populate({
      path: "opportunityId",
      populate: {
        path: "creatorId",
        select: "fullName userName profilePhoto",
      },
    })
    .sort({
      createdAt: -1,
    });

  return res.status(200).json(
    new apiResponse(200, "Applications fetched successfully.", {
      applications,
    }),
  );
});

export const getMyOpportunities = asyncHandler(async (req, res) => {
  const opportunities = await opportunityModel
    .find({
      creatorId: req.user._id,
    })
    .sort({
      createdAt: -1,
    });

  return res.status(200).json(
    new apiResponse(200, "Your opportunities fetched successfully.", {
      opportunities,
    }),
  );
});
