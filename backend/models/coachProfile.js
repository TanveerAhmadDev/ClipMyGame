import mongoose from "mongoose";

const coachSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    license: {
      type: String,
      default: "",
    },

    experience: {
      type: Number, // Years
      default: 0,
    },

    specialization: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Coach", coachSchema);
