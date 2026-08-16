import { Bell, Headphones, Moon, Sun } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleTheme } from "../features/theme/themeSlice";

const HomeHeader = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <div className="md:hidden flex items-center justify-between px-5 pt-5 pb-4 dark:bg-[#1E1E1E] ">
      {/* LEFT */}
      <div className="flex items-center gap-2 ">
        <img
          src={
            user?.profilePhoto ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.userName || "User")}&background=1f2937&color=fff`
          }
          alt={user?.userName || "Profile"}
          className=" w-10 h-10 rounded-full object-cover shrink-0 cursor-pointer"
          onClick={() => navigate("/profile")}
        />
        <div className="flex flex-col">
          <span className="text-md font-semibold leading-5 text-gray-900 dark:text-white">
            Hello, {user?.fullName || user?.userName}
          </span>
          <span className="text-sm text-gray-400  leading-tight tracking-tight">
            What would you like to do today?
          </span>
        </div>
      </div>
      {/* RIGHT */}
      <div className="flex items-center gap-2 ">
        <button
          onClick={() => dispatch(toggleTheme())}
          className={`rounded-md bg-white dark:bg-zinc-900 flex items-center justify-center shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-800  md:hidden relative  w-8 h-8 transition-all duration-300  dark:shadow-gray-50/5`}
        >
          {darkMode ? (
            <Moon className="text-green-700" />
          ) : (
            <Sun className="text-yellow-500" />
          )}
        </button>
        <button
          type="button"
          className="rounded-md bg-white dark:bg-zinc-900 flex items-center justify-center shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-800  md:hidden relative  w-8 h-8 transition-all duration-300  dark:shadow-gray-50/5"
        >
          <Bell
            size={18}
            strokeWidth={2}
            className="text-gray-700 dark:text-gray-200"
            onClick={() => navigate("/alerts")}
          />
        </button>
      </div>
    </div>
  );
};

export default HomeHeader;
