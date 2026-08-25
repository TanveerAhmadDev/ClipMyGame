import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    type: {
      type: String,
      enum: ["Request", "Offer"],
      required: true,
      index: true,
    },
    category: {
      type: String,
      enum: [
        "Job",
        "Scholarship",
        "Internship",
        "Trial",
        "Tournament",
        "Grant",
        "Course",
        "Volunteer",
        "Other",
      ],
      required: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    organization: {
      type: String,
      trim: true,
      default: "",
    },

    featureImage: {
      type: String,
      default: "",
    },
    extraImages: [{ type: String, default: "" }],

    sport: {
      type: String,
      default: "",
      index: true,
    },

    location: {
      countryCode: {
        type: String,
        default: "",
      },

      country: {
        type: String,
        default: "",
      },

      stateCode: {
        type: String,
        default: "",
      },

      state: {
        type: String,
        default: "",
      },

      city: {
        type: String,
        default: "",
      },
    },

    mode: {
      type: String,
      enum: ["Onsite", "Remote", "Hybrid"],
      default: "Onsite",
    },

    deadline: {
      type: Date,
      default: null,
    },

    requirements: {
      type: [String],
      default: [],
    },

    benefits: {
      type: [String],
      default: [],
    },

    applicationUrl: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    applicationsCount: {
      type: Number,
      default: 0,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Opportunity", opportunitySchema);
