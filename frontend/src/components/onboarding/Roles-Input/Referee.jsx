import React from "react";
import {
  Trophy,
  Award,
  BadgeCheck,
  Briefcase,
  Building2,
  ClipboardList,
} from "lucide-react";

import InputField from "../../InputFiled";
import TagInput from "../../TagInput";
import TextAreaField from "../../TextAreaField";

const Referee = ({ roleData, updateField }) => {
  const sports = [
    "Football",
    "Cricket",
    "Basketball",
    "Volleyball",
    "Tennis",
    "Badminton",
    "Hockey",
    "Athletics",
    "Swimming",
    "Other",
  ];

  const levels = [
    "School",
    "College",
    "District",
    "State",
    "National",
    "International",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Referee Information</h2>

        <p className="text-gray-500 mt-1">
          Tell organizations about your officiating experience.
        </p>
      </div>

      <InputField
        icon={Trophy}
        label="Sport"
        type="select"
        options={sports}
        value={roleData.sport || ""}
        onChange={(e) => updateField("sport", e.target.value)}
      />

      <InputField
        icon={Award}
        label="Certification Level"
        placeholder="FIFA, ICC, National..."
        value={roleData.certificationLevel || ""}
        onChange={(e) => updateField("certificationLevel", e.target.value)}
      />

      <InputField
        icon={BadgeCheck}
        label="License Number"
        placeholder="Enter your license number"
        value={roleData.licenseNumber || ""}
        onChange={(e) => updateField("licenseNumber", e.target.value)}
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
        icon={Building2}
        label="Governing Body"
        placeholder="FIFA, PCB, ICC..."
        value={roleData.governingBody || ""}
        onChange={(e) => updateField("governingBody", e.target.value)}
      />

      <InputField
        icon={Award}
        label="Officiating Level"
        type="select"
        options={levels}
        value={roleData.officiatingLevel || ""}
        onChange={(e) => updateField("officiatingLevel", e.target.value)}
      />

      <TagInput
        label="Languages"
        value={roleData.languages || []}
        onChange={(e) => updateField("languages", e.target.value)}
      />

      <TextAreaField
        icon={ClipboardList}
        label="Professional Summary"
        placeholder="Describe your officiating experience, certifications, tournaments, and achievements."
        value={roleData.bio || ""}
        onChange={(e) => updateField("bio", e.target.value)}
        maxLength={800}
        minHeight={80}
        maxHeight={220}
      />
    </div>
  );
};

export default Referee;
