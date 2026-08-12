import { Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../features/auth/authSlice";
import api from "../utils/axios";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isFormCompleted, setIsFormCompleted] = useState(false);

  const signUpHandler = async (e) => {
    e.preventDefault();

    if (!isFormCompleted) return;

    try {
      const res = await api.post("/auth/register", {
        email,
        password,
        userName,
      });

      toast.success(res.data.message);
      console.log(res);

      dispatch(setUserData(res.data.data));

      setEmail("");
      setPassword("");
      setUserName("");

      setTimeout(() => {
        navigate("/verfiy/otp");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  useEffect(() => {
    setIsFormCompleted(
      email.trim() !== "" && password.trim() !== "" && userName.trim() !== "",
    );
  }, [email, password, userName]);

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-100 dark:bg-zinc-950">
      {/* Left Side */}
      <div className="hidden lg:flex relative items-center justify-center overflow-hidden">
        <img
          src="/1.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[90%_20%]"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 max-w-md text-white px-8">
          <img src="/eeimg.png" className="w-24 mb-6" />

          <h1 className="text-5xl font-bold leading-tight">
            Showcase Your Talent.
          </h1>

          <p className="mt-5 text-lg text-gray-200">
            Upload highlights, connect with coaches, scouts and clubs, and build
            your sports career with ClipMyGame.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white  rounded-3xl shadow-xl border border-gray-200 dark:border-zinc-800 p-8">
          <div className="text-center">
            <img src="/eeimg.png" className="w-16 mx-auto mb-4 lg:hidden" />

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create Account
            </h2>

            <p className="mt-2 text-gray-500">
              Join thousands of athletes on ClipMyGame
            </p>
          </div>

          <div className="mt-8 relative">
            <User
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full h-12 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 pl-12 pr-4 outline-none focus:border-green-600 dark:text-white"
            />
          </div>

          {/* Email */}
          <div className="mt-5 relative">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="email"
              placeholder="Email"
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

          <button
            onClick={(e) => signUpHandler(e)}
            type="submit"
            disabled={!isFormCompleted}
            className={`w-full h-12 mt-8 rounded-xl font-semibold transition ${
              isFormCompleted
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-300 cursor-not-allowed text-gray-500"
            }`}
          >
            Create Account
          </button>

          <p className="mt-8 text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/signin" className="text-green-600 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
