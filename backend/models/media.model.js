import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    mediaType: {
      type: String,
      enum: [
        "Journalist",
        "Photographer",
        "Videographer",
        "Commentator",
        "Content Creator",
        "Broadcaster",
        "Social Media Manager",
        "Other",
      ],
      default: "Journalist",
    },

    organization: {
      type: String,
      default: "",
    },

    experience: {
      type: Number,
      default: 0,
    },

    sportsCovered: [
      {
        type: String,
      },
    ],

    languages: [
      {
        type: String,
      },
    ],

    website: {
      type: String,
      default: "",
    },

    portfolioLinks: [
      {
        type: String,
      },
    ],

    bio: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const mediaModel = mongoose.model("Media", mediaSchema);

export default mediaModel;
