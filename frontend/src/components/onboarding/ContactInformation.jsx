import React, { useRef, useState } from "react";
import InputField from "../InputFiled";
import {
  Briefcase,
  FileText,
  PersonStandingIcon,
  PhoneCall,
  User,
} from "lucide-react";
import "react-phone-number-input/style.css";
import { FaWhatsapp } from "react-icons/fa";

import TagInput from "../TagInput";
import TextAreaField from "../TextAreaField";
import PhoneField from "../PhoneField";
import OnBoardingBtn from "./OnBoardingBtn";

const ContactInformation = ({
  step,
  setStep,
  profileData,
  setProfileData,
  user,
}) => {
  const availabilityList = ["Available", "Contracted", "Retired", "Student"];

  return (
    <>
      <div className="p-10">
        <TextAreaField
          label="Short Bio"
          icon={FileText}
          value={profileData.shortBio}
          placeholder="Tell everyone about yourself..."
          maxLength={250}
          minHeight={50}
          maxHeight={200}
          onChange={(e) =>
            setProfileData({
              ...profileData,
              shortBio: e.target.value,
            })
          }
        />
        <TextAreaField
          label="Long Bio"
          icon={FileText}
          value={profileData.longBio}
          placeholder="Tell everyone about yourself in deatil..."
          maxLength={1000}
          minHeight={150}
          maxHeight={320}
          onChange={(e) =>
            setProfileData({
              ...profileData,
              longBio: e.target.value,
            })
          }
        />

        <TagInput
          label="Languages Spoken"
          value={profileData.languagesSpoken}
          onChange={(languages) =>
            setProfileData({
              ...profileData,
              languagesSpoken: languages,
            })
          }
        />
        <InputField
          label={"Availability"}
          type="select"
          options={availabilityList}
          value={profileData?.availabilityStatus}
          onChange={(e) =>
            setProfileData({
              ...profileData,
              availabilityStatus: e.target.value,
            })
          }
        />

        <PhoneField
          label="Phone Number"
          icon={PhoneCall}
          value={profileData?.phoneNumber}
          onChange={(value) =>
            setProfileData({
              ...profileData,
              phoneNumber: value || "",
            })
          }
        />

        <PhoneField
          label="WhatsApp Number"
          icon={FaWhatsapp}
          value={profileData?.whatsappNumber}
          onChange={(value) =>
            setProfileData({
              ...profileData,
              whatsappNumber: value || "",
            })
          }
        />
      </div>
      <OnBoardingBtn step={step} setStep={setStep} />
    </>
  );
};

export default ContactInformation;
