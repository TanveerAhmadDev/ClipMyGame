import mongoose from "mongoose";

const advertisementInquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      trim: true,
      default: "",
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    campaignType: {
      type: String,
      required: true,
    },

    budget: {
      type: String,
      default: "",
    },

    duration: {
      type: String,
      default: "",
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "In Progress", "Closed"],
      default: "New",
    },
  },
  {
    timestamps: true,
  },
);

const advertisementInquiryModel = mongoose.model(
  "AdvertisementInquiry",
  advertisementInquirySchema,
);

export default advertisementInquiryModel;
