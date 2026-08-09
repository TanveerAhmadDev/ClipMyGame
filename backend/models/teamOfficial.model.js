import mongoose from "mongoose";

const teamOfficialSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    organization: {
      type: String,
      default: "",
    },

    officialRole: {
      type: String,
      enum: [
        "Team Manager",
        "Club Owner",
        "Club Director",
        "Team Administrator",
        "Operations Manager",
        "Medical Staff",
        "Physiotherapist",
        "Fitness Trainer",
        "Other",
      ],
      default: "Team Manager",
    },

    department: {
      type: String,
      default: "",
    },

    experience: {
      type: Number,
      default: 0,
    },

    sport: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    responsibilities: [
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

export default mongoose.model("TeamOfficial", teamOfficialSchema);
