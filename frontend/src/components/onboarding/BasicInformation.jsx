import React, { useEffect, useState } from "react";
import {
  Camera,
  User,
  Briefcase,
  Calendar,
  Globe,
  MapPinned,
} from "lucide-react";
import { useSelector } from "react-redux";
import InputField from "../InputFiled";
import { Country, State } from "country-state-city";

const BasicInformation = ({
  step,
  setStep,
  profileData,
  setProfileData,
  formData,
  user,
}) => {
  const updateField = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const genderList = ["Male", "Female", "Others"];
  const roleList = [
    "Athlete",
    "Coach",
    "Scout",
    "Referee",
    "Agent",
    "TeamOfficial",
    "Media",
  ];

  const countries = Country.getAllCountries();
  const selectedCountry = countries.find(
    (country) => country.name === profileData?.location?.country,
  );

  const district = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.isoCode)
    : [];

  const [gps, setGps] = useState({
    latitude: null,
    longitude: null,
  });

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGps({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        alert("Unable to get your location.");
      },
    );
  };

  const isBasicInfoCompleted = (data) =>
    Boolean(
      data?.fullName?.trim() &&
      data?.userRole &&
      data?.dateOfBirth &&
      data?.gender &&
      data?.location?.country &&
      data?.location?.district,
    );
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    user?.profilePhoto || `https://ui-avatars.com/api/?name=${user?.userName}`,
  );

  const handleProfileImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setProfileData((prev) => ({
      ...prev,
      profilePhoto: file,
    }));

    setPreviewImage(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (!user) return;

    setProfileData({
      ...user,

      dateOfBirth: user.dateOfBirth?.split("T")[0] || "",

      location: {
        country: user.location?.country || "",
        district: user.location?.district || "",
        gps: {
          latitude: user.location?.gps?.latitude || null,
          longitude: user.location?.gps?.longitude || null,
        },
      },
    });
  }, [user]);

  useEffect(() => {
    console.log(profileData);
  }, [profileData]);

  return (
    <div className="p-10">
      <div className="flex justify-center">
        <label className="relative cursor-pointer">
          <img
            src={user?.profilePhoto || previewImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
          />

          <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
            <Camera size={18} />
          </div>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfileImage}
          />
        </label>
      </div>

      <InputField
        label="Username"
        value={profileData?.userName}
        icon={User}
        disabled={true}
      />
      <InputField
        label="Email"
        value={profileData?.email}
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
        icon={Calendar}
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
      <button
        type="button"
        onClick={getCurrentLocation}
        className="mt-6 w-full h-12 rounded-xl border border-green-600 text-green-600 hover:bg-green-50"
      >
        📍 Use Current Location
      </button>

      {!isBasicInfoCompleted(profileData) && (
        <p className="mt-3 text-sm text-red-500">
          Please complete all required fields to continue.
        </p>
      )}
      <div className="flex justify-between ">
        {step > 1 && (
          <button
            onClick={() => setStep((prev) => prev - 1)}
            className="px-8 py-3 rounded-xl border"
          >
            Back
          </button>
        )}

        <button
          disabled={!isBasicInfoCompleted(profileData)}
          onClick={() => setStep((prev) => prev + 1)}
          className={`mt-10 w-full h-13 rounded-xl font-semibold transition-all duration-300 ${
            isBasicInfoCompleted(profileData)
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {step === 3 ? "Finish" : "Next →"}
        </button>
      </div>
    </div>
  );
};

export default BasicInformation;
