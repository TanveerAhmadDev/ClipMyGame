import mongoose from "mongoose";

const refereeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    sport: {
      type: String,
      required: true,
    },

    certificationLevel: {
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

    governingBody: {
      type: String,
      default: "",
    },

    officiatingLevel: {
      type: String,
      enum: [
        "School",
        "College",
        "District",
        "State",
        "National",
        "International",
      ],
      default: "District",
    },

    languages: [
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

export default mongoose.model("Referee", refereeSchema);
