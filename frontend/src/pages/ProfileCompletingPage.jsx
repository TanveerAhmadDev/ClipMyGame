import React, { useEffect, useState } from "react";
import BasicInformation from "../components/onboarding/BasicInformation";
import ContactInformation from "../components/onboarding/ContactInformation";
import SportsInformation from "../components/onboarding/SportsInformation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "../features/auth/authSlice";

const ProfileCompletingPage = () => {
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({
    fullName: "",
    profilePhoto: null,
    userRole: "Coach",
    dateOfBirth: "",
    gender: "",
    location: {
      country: "",
      district: "",
      gps: {
        latitude: null,
        longitude: null,
      },
    },
    phoneNumber: "",
    whatsappNumber: "",
    shortBio: "",
    longBio: "",
    languagesSpoken: [],
    availabilityStatus: "Available",
  });

  const formData = new FormData();

  formData.append("fullName", profileData.fullName);
  formData.append("profilePhoto", profileData.profilePhoto);
  formData.append("userRole", profileData.userRole);
  formData.append("dateOfBirth", profileData.dateOfBirth);
  formData.append("gender", profileData.gender);
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

  const progress = {
    1: 10,
    2: 40,
    3: 70,
    4: 100,
  };

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("http://localhost:8080/api/user/me", {
          withCredentials: true,
        });

        dispatch(setUserData(data.data));
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [dispatch]);

  console.log(user);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 py-10 px-5">
      <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-green-600 text-white px-10 py-8">
          <h1 className="text-3xl font-bold">Complete Your Profile</h1>

          <p className="mt-2 text-green-100">
            Help coaches and scouts discover you.
          </p>

          {/* Progress */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Profile Completion</span>
              <span>{progress[step]}%</span>
            </div>

            <div className="h-3 bg-green-400/30 rounded-full overflow-hidden">
              <div
                className="w-[10%] h-full bg-white rounded-full "
                style={{ width: `${progress[step]}%` }}
              ></div>
            </div>
          </div>
        </div>
        {step === 1 && (
          <BasicInformation
            profileData={profileData}
            user={user}
            setProfileData={setProfileData}
            step={step}
            setStep={setStep}
            formData={formData}
          />
        )}

        {step === 2 && (
          <ContactInformation
            profileData={profileData}
            setProfileData={setProfileData}
            step={step}
            setStep={setStep}
            user={user}
          />
        )}

        {step === 3 && (
          <SportsInformation
            profileData={profileData}
            setProfileData={setProfileData}
            step={step}
            setStep={setStep}
            formData={formData}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileCompletingPage;
