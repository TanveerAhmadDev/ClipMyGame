import React, { useEffect, useState } from "react";
import OnBoardingBtn from "./OnBoardingBtn";
import Athlete from "./Roles-Input/Athlete";
import Coach from "./Roles-Input/Coach";
import Scout from "./Roles-Input/Scout";
import Referee from "./Roles-Input/Referee";
import Agent from "./Roles-Input/Agen";
import TeamOfficial from "./Roles-Input/TeamOfficial";
import Media from "./Roles-Input/Media";

const SportsInformation = ({
  step,
  setStep,
  profileData,
  setProfileData,
  formData,
}) => {
  const [roleData, setRoleData] = useState({});
  const RoleComponent = {
    Athlete,
    Coach,
    Scout,
    Referee,
    Agent,
    TeamOfficial,
    Media,
  };
  const CurrentRole = RoleComponent[profileData.userRole];

  const updateField = (field, value) => {
    setRoleData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <>
      <div className="p-10">
        {CurrentRole && (
          <CurrentRole roleData={roleData} updateField={updateField} />
        )}
      </div>

      <OnBoardingBtn
        step={step}
        setStep={setStep}
        roleData={roleData}
        formData={formData}
        profileData={profileData}
      />
    </>
  );
};

export default SportsInformation;
