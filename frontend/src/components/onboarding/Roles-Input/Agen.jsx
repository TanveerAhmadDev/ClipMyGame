import React from "react";
import {
  Building2,
  BadgeCheck,
  Briefcase,
  Globe,
  ClipboardList,
} from "lucide-react";
import InputField from "../../InputFiled";
import TextAreaField from "../../TextAreaField";
import TagInput from "../../TagInput";
const Agent = ({ roleData, updateField }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Agent Information</h2>
        <p className="mt-1 text-gray-500">
          Let athletes and clubs know about your agency and expertise.
        </p>
      </div>
      <InputField
        icon={Building2}
        label="Agency Name"
        placeholder="Elite Sports Agency"
        value={roleData.agencyName || ""}
        onChange={(e) => updateField("agencyName", e.target.value)}
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
        type="number"
        label="Experience (Years)"
        placeholder="5"
        value={roleData.experience || ""}
        onChange={(e) => updateField("experience", e.target.value)}
      />
      <TagInput
        label="Specializations"
        value={roleData.specialization || []}
        onChange={(specialization) =>
          updateField("specialization", specialization)
        }
        placeholder="Football Contracts"
      />
      <TagInput
        label="Represented Sports"
        value={roleData.representedSports || []}
        onChange={(representedSports) =>
          updateField("representedSports", representedSports)
        }
        placeholder="Football"
      />
      <TagInput
        label="Operating Countries"
        value={roleData.operatingCountries || []}
        onChange={(operatingCountries) =>
          updateField("operatingCountries", operatingCountries)
        }
        placeholder="Pakistan"
      />
      <InputField
        icon={Globe}
        label="Website"
        type="url"
        placeholder="https://youragency.com"
        value={roleData.website || ""}
        onChange={(e) => updateField("website", e.target.value)}
      />
      <TextAreaField
        icon={ClipboardList}
        label="Professional Summary"
        placeholder="Describe your agency, services, experience, and the athletes you represent."
        value={roleData.bio || ""}
        onChange={(e) => updateField("bio", e.target.value)}
        maxLength={800}
        minHeight={80}
        maxHeight={220}
      />
    </div>
  );
};
export default Agent;
