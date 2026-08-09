import React from "react";
import { Award, Briefcase, ClipboardList } from "lucide-react";

import InputField from "../../InputFiled";

const Coach = ({ roleData, updateField }) => {
  const specializations = [
    "Head Coach",
    "Assistant Coach",
    "Goalkeeping Coach",
    "Fitness Coach",
    "Strength & Conditioning Coach",
    "Technical Coach",
    "Tactical Coach",
    "Youth Coach",
    "Academy Coach",
    "Other",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Coach Information</h2>
        <p className="mt-1 text-gray-500">
          Tell athletes and clubs about your coaching experience.
        </p>
      </div>

      <InputField
        icon={Award}
        label="Coaching License"
        placeholder="e.g. UEFA A License"
        value={roleData.license || ""}
        onChange={(e) => updateField("license", e.target.value)}
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
        icon={ClipboardList}
        label="Specialization"
        type="select"
        options={specializations}
        value={roleData.specialization || ""}
        onChange={(e) => updateField("specialization", e.target.value)}
      />
    </div>
  );
};

export default Coach;
