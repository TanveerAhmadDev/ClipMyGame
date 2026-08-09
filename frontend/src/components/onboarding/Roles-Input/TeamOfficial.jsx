import React from "react";
import {
  Building2,
  Briefcase,
  Trophy,
  Globe,
  ClipboardList,
  UserCog,
} from "lucide-react";

import InputField from "../../InputFiled";
import TagInput from "../../TagInput";
import TextAreaField from "../../TextAreaField";

const TeamOfficial = ({ roleData, updateField }) => {
  const roles = [
    "Team Manager",
    "Club Owner",
    "Club Director",
    "Team Administrator",
    "Operations Manager",
    "Medical Staff",
    "Physiotherapist",
    "Fitness Trainer",
    "Other",
  ];

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Team Official Information</h2>

        <p className="mt-1 text-gray-500">
          Tell clubs and athletes about your role within your organization.
        </p>
      </div>

      <InputField
        icon={Building2}
        label="Organization / Club"
        placeholder="Manchester United"
        // value={teamOfficialData.organization}
        value={roleData.organization || ""}
        onChange={(e) => updateField("organization", e.target.value)}
      />

      <InputField
        icon={UserCog}
        label="Official Role"
        type="select"
        options={roles}
        value={roleData.officialRole || ""}
        onChange={(e) => updateField("officialRole", e.target.value)}
      />

      <InputField
        icon={Briefcase}
        label="Department"
        placeholder="Player Recruitment"
        value={roleData.department || ""}
        onChange={(e) => updateField("department", e.target.value)}
      />

      <InputField
        icon={Briefcase}
        type="number"
        label="Experience (Years)"
        placeholder="5"
        value={roleData.experience || ""}
        onChange={(e) => updateField("experience", e.target.value)}
      />

      <InputField
        icon={Trophy}
        label="Sport"
        type="select"
        options={sports}
        value={roleData.sport || ""}
        onChange={(e) => updateField("sport", e.target.value)}
      />

      <InputField
        icon={Globe}
        label="Organization Website"
        type="url"
        placeholder="https://club.com"
        value={roleData.website || ""}
        onChange={(e) => updateField("website", e.target.value)}
      />

      <TagInput
        label="Responsibilities"
        placeholder="Enter Your Responsibilities"
        value={roleData.responsibilities || []}
        onChange={(e) => updateField("responsibilities", e.target.value)}
      />

      <TextAreaField
        icon={ClipboardList}
        label="Professional Summary"
        placeholder="Describe your role, experience, responsibilities, and how you contribute to your organization."
        value={roleData.bio || []}
        onChange={(e) => updateField("bio", e.target.value)}
        maxLength={800}
        minHeight={80}
        maxHeight={220}
      />
    </div>
  );
};

export default TeamOfficial;
