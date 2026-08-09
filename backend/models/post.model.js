import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    caption: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },

    media: [
      {
        url: {
          type: String,
          required: true,
        },

        type: {
          type: String,
          enum: ["image", "video"],
          required: true,
        },
      },
    ],

    contentType: {
      type: String,
      enum: ["general", "news", "highlights", "drills", "documentaries"],
      default: "general",
    },

    sport: {
      type: String,
      enum: [
        "football",
        "cricket",
        "basketball",
        "volleyball",
        "tennis",
        "athletics",
        "swimming",
        "fitness",
        "esports",
      ],
      required: true,
    },

    skills: [
      {
        type: String,
      },
    ],

    level: {
      type: String,
      enum: [
        "u14",
        "u16",
        "u20",
        "amateur",
        "semi_pro",
        "professional",
        "elite",
        "social",
      ],
    },

    location: {
      country: String,
      region: String,
      district: String,
    },

    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    visibility: {
      type: String,
      enum: ["Public", "Followers", "Private"],
      default: "Public",
    },

    performance: {
      views: {
        type: Number,
        default: 0,
      },

      likes: {
        type: Number,
        default: 0,
      },

      comments: {
        type: Number,
        default: 0,
      },

      shares: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  },
);

// Latest feed
postSchema.index({ createdAt: -1 });

// User profile posts
postSchema.index({ userId: 1, createdAt: -1 });

// Sport feed
postSchema.index({ sport: 1, createdAt: -1 });

// Sport + content type
postSchema.index({
  sport: 1,
  contentType: 1,
  createdAt: -1,
});

// Sport + level
postSchema.index({
  sport: 1,
  level: 1,
  createdAt: -1,
});

// Main filtering
postSchema.index({
  sport: 1,
  contentType: 1,
  level: 1,
  "location.country": 1,
  "location.region": 1,
  "location.district": 1,
  createdAt: -1,
});

// Tags
postSchema.index({ tags: 1 });

// Skills
postSchema.index({ skills: 1 });

// Trending
postSchema.index({
  "performance.likes": -1,
  "performance.comments": -1,
});

// Most viewed
postSchema.index({
  "performance.views": -1,
});

// Caption search
postSchema.index({
  caption: "text",
});

export default mongoose.model("Post", postSchema);
