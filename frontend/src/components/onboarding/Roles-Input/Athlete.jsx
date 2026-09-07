import React from "react";
import {
  Dumbbell,
  Goal,
  Ruler,
  Weight,
  Footprints,
  Building2,
  Shirt,
  Trophy,
  Award,
  X,
} from "lucide-react";
import InputField from "../../InputFiled";
import TextAreaField from "../../TextAreaField";
const Athlete = ({ roleData, updateField }) => {
  const sports = [
    "Football",
    "Cricket",
    "Basketball",
    "Volleyball",
    "Tennis",
    "Badminton",
    "Hockey",
    "Baseball",
    "Athletics",
    "Swimming",
    "Boxing",
    "MMA",
    "Other",
  ];
  const dominantFoot = ["Left", "Right", "Both"];
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Athlete Information</h2>
        <p className="mt-1 text-gray-500">
          Tell coaches and scouts more about your sporting career.
        </p>
      </div>
      <InputField
        icon={Dumbbell}
        label="Sport"
        type="select"
        options={sports}
        value={roleData.sport || ""}
        onChange={(e) => updateField("sport", e.target.value)}
      />
      <InputField
        icon={Goal}
        label="Playing Position"
        placeholder="e.g. Striker"
        value={roleData.position || ""}
        onChange={(e) => updateField("position", e.target.value)}
      />
      <div className="grid md:grid-cols-2 gap-6">
        <InputField
          icon={Ruler}
          label="Height (cm)"
          type="number"
          placeholder="180"
          value={roleData.height || ""}
          onChange={(e) => updateField("height", e.target.value)}
        />
        <InputField
          icon={Weight}
          label="Weight (kg)"
          type="number"
          placeholder="72"
          value={roleData.weight || ""}
          onChange={(e) => updateField("weight", e.target.value)}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <InputField
          icon={Footprints}
          label="Dominant Foot"
          type="select"
          options={dominantFoot}
          value={roleData.dominantFoot || ""}
          onChange={(e) => updateField("dominantFoot", e.target.value)}
        />
        <InputField
          icon={Shirt}
          label="Jersey Number"
          type="number"
          placeholder="10"
          value={roleData.jerseyNumber || ""}
          onChange={(e) => updateField("jerseyNumber", e.target.value)}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <InputField
          icon={Building2}
          label="Current Club"
          placeholder="Manchester United"
          value={roleData.currentClub || ""}
          onChange={(e) => updateField("currentClub", e.target.value)}
        />
        <InputField
          icon={Trophy}
          label="Experience (Years)"
          type="number"
          placeholder="5"
          value={roleData.experience || ""}
          onChange={(e) => updateField("experience", e.target.value)}
        />
      </div>
      {(roleData.achievements || [""]).map((achievement, index) => (
        <div key={index} className="flex items-end gap-2">
          <div className="flex-1">
            <InputField
              icon={Award}
              label={`Achievement ${index + 1}`}
              type="text"
              placeholder="e.g. National U18 Champion"
              value={achievement}
              onChange={(e) => {
                const updatedAchievements = [...roleData.achievements];

                updatedAchievements[index] = e.target.value;

                updateField("achievements", updatedAchievements);
              }}
            />
          </div>

          {roleData.achievements?.length > 1 && (
            <button
              type="button"
              onClick={() => {
                const updatedAchievements = roleData.achievements.filter(
                  (_, i) => i !== index,
                );

                updateField("achievements", updatedAchievements);
              }}
              className="mb-1 w-10 h-10 rounded-xl text-red-500 hover:bg-red-50"
            >
              <X size={18} />
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          updateField("achievements", [...(roleData.achievements || []), ""])
        }
        className="mt-2 text-sm font-semibold text-green-600 hover:text-green-700"
      >
        + Add More Achievement
      </button>
    </div>
  );
};
export default Athlete;
