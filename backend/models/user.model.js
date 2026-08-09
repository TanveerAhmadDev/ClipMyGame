import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // =========================
    // Authentication
    // =========================
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    userRole: {
      type: String,
      // required: true,
      enum: [
        "Athlete",
        "Coach",
        "Referee",
        "Scout",
        "Agent",
        "TeamOfficial",
        "Media",
        "Admin",
      ],
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },

    // =========================
    // Core Profile
    // =========================

    fullName: {
      type: String,
      // required: true,
      trim: true,
      default: "",
    },

    profilePhoto: {
      type: String,
      default: "",
    },

    coverPhoto: {
      type: String,
      default: "",
    },

    dateOfBirth: {
      type: Date,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    nationality: {
      type: String,
    },

    location: {
      country: String,
      district: String,

      gps: {
        latitude: Number,
        longitude: Number,
      },
    },

    // =========================
    // Contact
    // =========================

    phoneNumber: {
      type: String,
    },

    whatsappNumber: {
      type: String,
    },

    idVerification: {
      type: String, // Passport / National ID image URL
    },

    // Bio

    shortBio: {
      type: String,
      maxlength: 250,
      default: "",
    },

    longBio: {
      type: String,
      default: "",
    },

    languagesSpoken: [
      {
        type: String,
      },
    ],

    availabilityStatus: {
      type: String,
      enum: ["Available", "Contracted", "Retired", "Student"],
      default: "Available",
    },

    // Account Status

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    isProfileCompleted: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      default: null,
    },

    otpExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
