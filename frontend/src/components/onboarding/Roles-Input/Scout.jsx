import React from "react";
import { Building2, Briefcase, MapPinned, Trophy, Search } from "lucide-react";

import InputField from "../../InputFiled";
import TagInput from "../../TagInput";
import TextAreaField from "../../TextAreaField";

const Scout = ({ roleData, updateField }) => {
  const talentLevels = [
    "Youth",
    "School",
    "College",
    "Amateur",
    "Semi Professional",
    "Professional",
    "Elite",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Scout Information</h2>

        <p className="mt-1 text-gray-500">
          Help athletes understand what kind of talent you're looking for.
        </p>
      </div>

      <InputField
        icon={Building2}
        label="Organization / Club"
        placeholder="Manchester United"
        value={roleData.organization || ""}
        onChange={(e) => updateField("organization", e.target.value)}
      />

      <InputField
        icon={Briefcase}
        label="Experience (Years)"
        type="number"
        placeholder="5"
        value={roleData.experience || ""}
        onChange={(e) => updateField("experience", e.target.value)}
      />

      <InputField
        icon={MapPinned}
        label="Scouting Region"
        placeholder="Pakistan, UAE, Europe..."
        value={roleData.region || ""}
        onChange={(e) => updateField("region", e.target.value)}
      />

      <TagInput
        label="Sports You Scout"
        value={roleData.sports || []}
        onChange={(sports) => updateField("sports", sports)}
        placeholder="Football, Cricket..."
      />

      <InputField
        icon={Trophy}
        label="Preferred Talent Level"
        type="select"
        value={roleData.talentLevel || ""}
        onChange={(e) => updateField("talentLevel", e.target.value)}
        options={talentLevels}
      />

      <TextAreaField
        icon={Search}
        label="Scouting Bio"
        placeholder="Describe your scouting experience, regions, clubs you've worked with, and the type of athletes you're looking for."
        value={roleData.bio || ""}
        onChange={(e) => updateField("bio", e.target.value)}
        maxLength={800}
        minHeight={80}
        maxHeight={220}
      />
    </div>
  );
};

export default Scout;
