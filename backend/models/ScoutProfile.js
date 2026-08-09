const scoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  organization: String,

  experience: Number,

  region: String,

  sports: [
    {
      type: String,
    },
  ],

  talentLevel: {
    type: String,
    enum: [
      "Youth",
      "School",
      "College",
      "Amateur",
      "Semi Professional",
      "Professional",
      "Elite",
    ],
  },

  bio: {
    type: String,
    default: "",
  },
});
