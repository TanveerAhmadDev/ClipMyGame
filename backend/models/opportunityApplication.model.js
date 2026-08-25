import mongoose from "mongoose";

const opportunityApplicationSchema = new mongoose.Schema(
  {
    opportunityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Opportunity",
      required: true,
      index: true,
    },

    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    coverLetter: {
      type: String,
      default: "",
    },

    answers: [
      {
        question: String,
        answer: String,
      },
    ],

    status: {
      type: String,
      enum: ["Pending", "Shortlisted", "Accepted", "Rejected", "Withdrawn"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  },
);

/*
 * A user can only apply once
 * to the same opportunity.
 */
opportunityApplicationSchema.index(
  {
    opportunityId: 1,
    applicantId: 1,
  },
  {
    unique: true,
  },
);

export default mongoose.model(
  "OpportunityApplication",
  opportunityApplicationSchema,
);
