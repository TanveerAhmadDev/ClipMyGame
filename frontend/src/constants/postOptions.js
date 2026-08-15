export const CONTENT_TYPES = [
  { label: "General", value: "general" },
  { label: "News", value: "news" },
  { label: "Highlights", value: "highlights" },
  { label: "Drills", value: "drills" },
  { label: "Documentaries", value: "documentaries" },
];

export const SPORTS = [
  { label: "All", value: "" },
  {
    label: "Football",
    value: "football",
  },
  {
    label: "Cricket",
    value: "cricket",
  },
  {
    label: "Basketball",
    value: "basketball",
  },
  {
    label: "Volleyball",
    value: "volleyball",
  },
  {
    label: "Tennis",
    value: "tennis",
  },
  {
    label: "Athletics",
    value: "athletics",
  },
  {
    label: "Swimming",
    value: "swimming",
  },
  {
    label: "Fitness",
    value: "fitness",
  },
  {
    label: "Esports",
    value: "esports",
  },
];

export const SKILLS = {
  football: [
    "shooting",
    "scoring",
    "defending",
    "attacking",
    "speed",
    "build_up_play",
    "passing",
    "set_pieces",
    "receiving",
  ],

  basketball: [
    "shooting",
    "passing",
    "dribbling",
    "defending",
    "rebounding",
    "speed",
  ],

  cricket: ["batting", "bowling", "fielding", "catching", "running"],

  volleyball: ["serving", "spiking", "blocking", "receiving"],

  hockey: ["passing", "shooting", "dribbling", "defending"],

  swimming: ["freestyle", "butterfly", "breaststroke", "backstroke"],

  cycling: ["sprint", "climbing", "endurance"],

  track: ["sprint", "relay", "hurdles", "long_jump", "high_jump"],

  netball: ["passing", "shooting", "defending"],
};

export const LEVELS = [
  { label: "U14", value: "u14" },
  { label: "U16", value: "u16" },
  { label: "U20", value: "u20" },
  { label: "Amateur", value: "amateur" },
  { label: "Semi Pro", value: "semi_pro" },
  { label: "Professional", value: "professional" },
  { label: "Elite", value: "elite" },
  { label: "Social", value: "social" },
];

export const SORT_OPTIONS = [
  "trending",
  "latest",
  "most_viewed",
  "top_rated",
  "most_discussed",
];

export const CATEGORY_TAGS = {
  Football: [
    "Training",
    "Match",
    "Goal",
    "Highlights",
    "Academy",
    "Skills",
    "Fitness",
  ],

  Cricket: ["Batting", "Bowling", "Match", "Practice", "Highlights"],

  Basketball: ["Dunk", "ThreePointer", "Training", "Highlights"],

  Volleyball: ["Spike", "Serve", "Training"],

  Tennis: ["Forehand", "Backhand", "Match"],

  Gym: ["Workout", "Strength", "LegDay"],

  Fitness: ["Fitness", "Cardio", "Transformation"],

  Swimming: ["Race", "Training"],

  Athletics: ["Sprint", "LongJump"],

  Esports: ["Gameplay", "Tournament"],
};
