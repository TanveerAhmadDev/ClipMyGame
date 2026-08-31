import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const isFormCompleted = email.trim() !== "" && password.trim() !== "";

  // const loginHandler = async (e) => {
  //   e.preventDefault();

  //   if (!isFormCompleted) return;

  //   const result = await api
  //     .post("/auth/signin", { email, password })
  //     .then((res) => {
  //       console.log(res);
  //       navigate("/");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!isFormCompleted) return;

    try {
      const response = await api.post("/auth/signin", {
        email,
        password,
      });

      const { accessToken, user } = response.data.data;

      localStorage.setItem("accessToken", accessToken);

      navigate("/feed");
    } catch (error) {
      console.log(error);

      const message = error.response?.data?.message || "Login failed";

      setMessage(message);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-100 dark:bg-zinc-950">
      {/* Left Side */}
      <div className="hidden lg:flex relative items-center justify-center overflow-hidden">
        <img
          src="/1.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[90%_20%]"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-md text-white px-8">
          <img src="/eeimg.png" className="w-24 mb-6" alt="ClipMyGame" />

          <h1 className="text-5xl font-bold leading-tight">Welcome Back.</h1>

          <p className="mt-5 text-lg text-gray-200">
            Continue your sports journey. Connect with athletes, coaches,
            scouts, and clubs around the world.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-200 dark:border-zinc-800 p-8">
          <div className="text-center">
            <img
              src="/eeimg.png"
              className="w-16 mx-auto mb-4 lg:hidden"
              alt="ClipMyGame"
            />

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Sign In
            </h2>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Login to your ClipMyGame account
            </p>
          </div>

          {/* Email */}
          <div className="mt-8 relative">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 pl-12 pr-4 outline-none focus:border-green-600 dark:text-white"
            />
          </div>

          {/* Password */}
          <div className="mt-5 relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 pl-12 pr-4 outline-none focus:border-green-600 dark:text-white"
            />
          </div>

          {message && <p className="text-red-500">{message}</p>}
          {/* Forgot Password */}
          <div className="mt-4 flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-green-600 hover:text-green-700 font-medium"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            onClick={loginHandler}
            disabled={!isFormCompleted}
            className={`w-full h-12 mt-6 rounded-xl font-semibold transition-all duration-300 ${
              isFormCompleted
                ? "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-green-600/30"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gray-300 dark:bg-zinc-700"></div>
            <span className="text-sm text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-zinc-700"></div>
          </div>

          {/* Google Button */}
          <button
            className="w-full h-12 rounded-xl border border-gray-300 dark:border-zinc-700
            hover:bg-gray-50 dark:hover:bg-zinc-800 transition
            flex items-center justify-center gap-3"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
              alt="Google"
            />
            Continue with Google
          </button>

          <p className="mt-8 text-center text-gray-500 dark:text-gray-400">
            Don't have an account?
            <Link
              to="/signup"
              className="text-green-600 font-semibold hover:text-green-700"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
