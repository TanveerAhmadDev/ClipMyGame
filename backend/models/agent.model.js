import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    agencyName: {
      type: String,
      default: "",
    },

    licenseNumber: {
      type: String,
      default: "",
    },

    experience: {
      type: Number,
      default: 0,
    },

    specialization: [
      {
        type: String,
      },
    ],

    representedSports: [
      {
        type: String,
      },
    ],

    operatingCountries: [
      {
        type: String,
      },
    ],

    website: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Agent", agentSchema);
