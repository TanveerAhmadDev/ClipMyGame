import advertisementInquiryModel from "../models/advertisementInquiry.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";

export const createAdvertisementInquiry = asyncHandler(async (req, res) => {
  const {
    name,
    company,
    email,
    phone,
    campaignType,
    budget,
    duration,
    message,
  } = req.body;

  if (!name || !email || !campaignType || !message) {
    throw new apiError(
      400,
      "Name, email, campaign type and message are required.",
    );
  }

  const inquiry = await advertisementInquiryModel.create({
    name,
    company,
    email,
    phone,
    campaignType,
    budget,
    duration,
    message,
  });

  return res
    .status(201)
    .json(
      new apiResponse(
        201,
        "Advertisement inquiry submitted successfully.",
        inquiry,
      ),
    );
});

export const getAdvertisementInquiries = asyncHandler(async (req, res) => {
  const inquiries = await advertisementInquiryModel
    .find()
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        "Advertisement inquiries fetched successfully.",
        inquiries,
      ),
    );
});
