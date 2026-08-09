import React from "react";
import {
  Camera,
  Building2,
  Briefcase,
  Globe,
  ClipboardList,
  Newspaper,
} from "lucide-react";

import InputField from "../../InputFiled";
import TextAreaField from "../../TextAreaField";
import TagInput from "../../TagInput";

const Media = ({ roleData, updateField }) => {
  const mediaTypes = [
    "Journalist",
    "Photographer",
    "Videographer",
    "Commentator",
    "Content Creator",
    "Broadcaster",
    "Social Media Manager",
    "Other",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Media Information</h2>

        <p className="mt-1 text-gray-500">
          Showcase your experience, media work, and the sports you cover.
        </p>
      </div>

      <InputField
        icon={Newspaper}
        label="Media Role"
        type="select"
        options={mediaTypes}
        value={roleData.mediaType || ""}
        onChange={(e) => updateField("mediaType", e.target.value)}
      />

      <InputField
        icon={Building2}
        label="Organization"
        placeholder="ESPN, Geo Super..."
        value={roleData.organization || ""}
        onChange={(e) => updateField("organization", e.target.value)}
      />

      <InputField
        icon={Briefcase}
        type="number"
        label="Experience (Years)"
        placeholder="5"
        value={roleData.experience || ""}
        onChange={(e) => updateField("experience", e.target.value)}
      />

      <TagInput
        label="Sports Covered"
        value={roleData.sportsCovered || []}
        onChange={(sportsCovered) =>
          updateField("sportsCovered", sportsCovered)
        }
      />

      <TagInput
        label="Working Languages"
        value={roleData.languages || []}
        onChange={(languages) => updateField("languages", languages)}
      />

      <InputField
        icon={Globe}
        label="Website"
        type="url"
        placeholder="https://yourwebsite.com"
        value={roleData.website || ""}
        onChange={(e) => updateField("website", e.target.value)}
      />

      <TagInput
        label="Portfolio Links"
        value={roleData.portfolioLinks || []}
        onChange={(e) => updateField("portfolioLinks", e.target.value)}
      />

      <TextAreaField
        icon={ClipboardList}
        label="Professional Bio"
        placeholder="Tell people about your work, sports coverage, achievements, and experience."
        value={roleData.bio || ""}
        onChange={(e) => updateField("bio", e.target.value)}
        maxLength={1000}
        minHeight={80}
        maxHeight={220}
      />
    </div>
  );
};

export default Media;
