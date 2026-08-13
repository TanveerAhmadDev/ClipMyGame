import React, { useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

const OtpVerify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const newOtp = [...otp];

    pasted.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    inputRefs.current[Math.min(pasted.length, 5)].focus();
  };

  const verifyOtp = async () => {
    const code = otp.join("");

    if (code.length !== 6) {
      toast.error("Please enter the complete OTP.");
      return;
    }

    try {
      const res = await api.post("/auth/verfiy/account", {
        email: user.email,
        otp: code,
      });

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/complete-profile");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    }
  };

  const otpResendHandler = async () => {
    try {
      const res = await api.post("/auth/resendotp", {
        email: user.email,
      });
      console.log(res);

      toast.success(res.data.message);
    } catch (err) {
      console.log(err);

      toast.error("Something wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-8">
        <div className="flex justify-center">
          <div className="w-18 h-18 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <ShieldCheck className="text-green-600" size={36} />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mt-6 dark:text-white">
          Verify Email
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Enter the 6-digit code sent to your email.
        </p>

        {/* OTP Boxes */}
        <div className="flex justify-between mt-10" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-16 rounded-xl border-2 border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-center text-2xl font-bold outline-none focus:border-green-600 dark:text-white transition"
            />
          ))}
        </div>

        <button
          disabled={otp.join("").length !== 6}
          onClick={verifyOtp}
          className={`w-full h-12 rounded-xl mt-10 font-semibold transition ${
            otp.join("").length === 6
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Verify OTP
        </button>

        <p className="text-center mt-6 text-gray-500">
          Didn't receive the code?
        </p>

        <button
          onClick={otpResendHandler}
          className="w-full mt-2 text-green-600 font-semibold hover:underline"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default OtpVerify;
