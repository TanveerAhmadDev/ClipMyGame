import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      required: true,
    },

    redirectUrl: {
      type: String,
      default: "",
    },

    sport: {
      type: String,
      enum: [
        "all",
        "football",
        "basketball",
        "netball",
        "volleyball",
        "track",
        "cricket",
        "hockey",
        "swimming",
        "cycling",
      ],
      default: "all",
      index: true,
    },

    priority: {
      type: Number,
      default: 1,
    },

    active: {
      type: Boolean,
      default: true,
    },

    startDate: Date,

    endDate: Date,

    analytics: {
      impressions: {
        type: Number,
        default: 0,
      },

      clicks: {
        type: Number,
        default: 0,
      },
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

bannerSchema.index({
  sport: 1,
  active: 1,
  priority: -1,
});

bannerSchema.index({
  startDate: 1,
  endDate: 1,
});

export default mongoose.model("Banner", bannerSchema);
