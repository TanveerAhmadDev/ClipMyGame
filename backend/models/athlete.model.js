import mongoose from "mongoose";

const athleteSchema = new mongoose.Schema(
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

    position: {
      type: String,
      required: true,
    },

    height: {
      type: Number, // centimeters
    },

    weight: {
      type: Number, // kilograms
    },

    dominantFoot: {
      type: String,
      enum: ["Left", "Right", "Both"],
    },

    currentClub: {
      type: String,
      default: "",
    },

    jerseyNumber: {
      type: Number,
    },

    experience: {
      type: Number, // years
      default: 0,
    },

    achievements: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const athleteModel = new mongoose.model("Athlete", athleteSchema);

export default athleteModel;
