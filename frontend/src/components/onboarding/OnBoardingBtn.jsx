import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../../utils/axios";

const OnBoardingBtn = ({
  step,
  setStep,
  isBasicInfoCompleted,
  profileData,
  formData,
  roleData,
}) => {
  const [submitting, setSubmitting] = useState(false);

  const roleRoutes = {
    Athlete: "/athlete/me",
    Coach: "/coach/me",
    Scout: "/scout/me",
    Referee: "/referee/me",
    Agent: "/agent/me",
    TeamOfficial: "/team-official/me",
  };

  const basicInfoUpdateHandler = async () => {
    try {
      setSubmitting(true);

      const result = await api.patch("/user/me/basic-information", formData);

      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const roleInfoUpdateHandler = async () => {
    try {
      console.log(profileData);

      const endpoint = roleRoutes[profileData.userRole];

      console.log(endpoint);

      if (!endpoint) {
        throw new Error("Invalid user role");
      }

      const { data } = await api.patch(`${endpoint}`, roleData);

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleNext = async () => {
    if (step === 3) {
      try {
        await basicInfoUpdateHandler();

        toast.success("Basic Inforrmation send");
        await roleInfoUpdateHandler();
        toast.success("Sport Inforrmation send");
        setTimeout(() => {
          setStep(4);
        }, 1000);
      } catch (err) {
        console.error(err);
        toast.error("Some thing went wrong");
      }
      return;
    }

    setStep((prev) => prev + 1);
  };

  return (
    <div className="pr-10 pl-10 pb-10 flex items-center justify-between gap-4">
      {step > 1 ? (
        <button
          onClick={() => setStep((prev) => prev - 1)}
          className="flex-1 h-13 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-gray-700 dark:text-gray-300 
            font-semibold transition-all duration-300 hover:bg-gray-100 dark:hover:bg-zinc-800 
      active:scale-[0.98]"
        >
          ← Back
        </button>
      ) : (
        <div className="flex-1" />
      )}

      <button
        disabled={submitting}
        onClick={handleNext}
        className={`flex-1 h-13 rounded-xl text-white font-semibold transition-all duration-300 active:scale-[0.98]
    ${
      submitting
        ? "bg-green-400 cursor-not-allowed"
        : "bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20 hover:shadow-xl hover:shadow-green-600/30"
    }`}
      >
        {submitting ? "Saving..." : step === 3 ? "Finish ✓" : "Next →"}
      </button>
    </div>
  );
};

export default OnBoardingBtn;
