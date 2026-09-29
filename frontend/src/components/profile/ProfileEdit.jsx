import {
  Briefcase,
  Calendar,
  FileText,
  Globe,
  MapPinned,
  PhoneCall,
  User,
  X,
} from "lucide-react";
import InputField from "../InputFiled";
import api from "../../utils/axios";
import { useState } from "react";
import { Country, State } from "country-state-city";
import { genderList, roleList } from "../onboarding/BasicInformation";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import PhoneField from "../PhoneField";
import TagInput from "../TagInput";
import TextAreaField from "../TextAreaField";
import { availabilityList } from "../onboarding/ContactInformation";
import { FaWhatsapp } from "react-icons/fa";

const ProfileEdit = ({ setProfileEditBox, profileData, setProfileData }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const countries = Country.getAllCountries();
  const selectedCountry = countries.find(
    (country) => Country.name === profileData?.location?.country,
  );

  const district = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.isoCode)
    : [];

  const [gps, setGps] = useState({
    latitude: null,
    longitude: null,
  });

  const updateField = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      const formData = new FormData();

      formData.append("fullName", profileData.fullName);
      formData.append("userRole", profileData.userRole);
      formData.append("dateOfBirth", profileData.dateOfBirth);
      formData.append("gender", profileData.gender);
      formData.append("nationality", profileData.nationality);

      formData.append("location", JSON.stringify(profileData.location));

      formData.append("phoneNumber", profileData.phoneNumber);
      formData.append("whatsappNumber", profileData.whatsappNumber);
      formData.append("shortBio", profileData.shortBio);
      formData.append("longBio", profileData.longBio);

      formData.append(
        "languagesSpoken",
        JSON.stringify(profileData.languagesSpoken),
      );

      formData.append("availabilityStatus", profileData.availabilityStatus);

      if (profileData.profilePhoto instanceof File) {
        formData.append("profilePhoto", profileData.profilePhoto);
      }

      const { data } = await api.patch("/user/me/basic-information", formData);

      dispatch(setUserData(data.data));

      toast.success("Profile updated successfully");

      setProfileEditBox(false);
    } catch (error) {
      console.error("Profile update error:", error);

      toast.error(error?.response?.data?.message || "Failed to update profile");
    }
  };
  return (
    <>
      <div
        className="fixed inset-0 bg-black/75 z-60"
        onClick={() => setProfileEditBox(false)}
      />

      <div className="dark:bg-[#1E1E1E] fixed top-10 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] md:w-180 z-61 max-h-[calc(100vh-5rem)] rounded-xl bg-white flex flex-col overflow-hidden">
        <header className="h-12.5 shrink-0 px-6 flex justify-between items-center border-b border-zinc-200">
          <h1 className="text-[20px] font-semibold dark:text-white">
            Edit Profile
          </h1>

          <button
            type="button"
            onClick={() => setProfileEditBox(false)}
            className="p-1 rounded-full hover:bg-zinc-500 dark:text-white"
          >
            <X size={20} />
          </button>
        </header>

        <div className="p-6 overflow-y-auto flex-1">
          <InputField
            label="Username"
            value={profileData?.userName}
            icon={User}
            disabled={true}
          />

          <InputField
            label="Full Name"
            placeholder="Enter your full name"
            value={profileData?.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            icon={User}
          />
          <InputField
            icon={Briefcase}
            type="select"
            label="Account Role"
            value={profileData.userRole}
            onChange={(e) => updateField("userRole", e.target.value)}
            options={roleList}
          />
          <InputField
            icon={Calendar}
            type="date"
            label="Date of Birth"
            value={profileData?.dateOfBirth?.split("T")[0] || ""}
            onChange={(e) => updateField("dateOfBirth", e.target.value)}
          />
          <InputField
            icon={User}
            type="select"
            label={"Gender"}
            options={genderList}
            value={profileData?.gender}
            onChange={(e) => updateField("gender", e.target.value)}
          />

          <InputField
            icon={Globe}
            label="Country"
            type="select"
            value={profileData?.location?.country || ""}
            onChange={(e) => {
              const country = e.target.value;

              setProfileData((prev) => ({
                ...prev,
                location: {
                  ...prev.location,
                  country,
                  state: "",
                  district: "",
                },
              }));
            }}
            options={countries.map((country) => country.name)}
          />
          <InputField
            icon={MapPinned}
            label="District / Province"
            type="select"
            value={profileData?.location?.district || ""}
            onChange={(e) => {
              setProfileData((prev) => ({
                ...prev,
                location: {
                  ...prev.location,
                  district: e.target.value,
                },
              }));
            }}
            options={district.map((district) => district.name)}
            disabled={!profileData?.location?.country}
          />

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
          {/* other fields */}
        </div>

        <div className="shrink-0 border-t border-zinc-200 p-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setProfileEditBox(false)}
            className="px-5 py-2.5 rounded-lg border border-zinc-700 text-zinc-900 hover:bg-zinc-900 hover:text-white dark:bg-zinc-500"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSaveProfile}
            className="px-5 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
