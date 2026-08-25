import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { toggleTheme } from "../features/theme/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ setProfileMenu }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={() => setProfileMenu(false)}
      />

      <div className="fixed left-0 top-0 z-50 h-screen w-full bg-white dark:bg-[#1E1E1E] shadow-2xl">
        <div className="p-5 flex items-center relative border-b dark:border-zinc-400">
          <div className="dark:bg-zinc-700 bg-zinc-400 p-1.5 rounded-full">
            <ArrowLeft
              size={20}
              onClick={() => setProfileMenu(false)}
              className="hover:cursor-pointer text-white"
            />
          </div>
          <h2 className="text-2xl font-semibold absolute left-[40%] dark:text-white">
            Setting
          </h2>
        </div>
        <div className="px-2 py-5 flex flex-col gap-2">
          <div
            onClick={() => navigate("/profile")}
            className="py-3 flex items-center justify-between bg-white dark:bg-zinc-900 rounded-[22px] overflow-hidden border border-gray-200 dark:border-zinc-700 shadow-sm"
          >
            <div className="px-5  flex items-center gap-2 ">
              <img
                src={user?.profilePhoto}
                alt="Profile Image"
                className="w-11 h-11 rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-xl dark:text-white">
                  {user?.fullName}
                </span>
                <span className="dark:text-zinc-400">@{user?.userName}</span>
              </div>
            </div>
            <ChevronRight className="mr-5 dark:text-zinc-400" />
          </div>
          <div className="py-2 bg-white dark:bg-zinc-900 rounded-[22px] overflow-hidden border border-gray-200 dark:border-zinc-700 shadow-sm">
            <div className="px-5 py-2 flex justify-between items-center  border-b">
              <div className="flex items-center gap-2">
                <Moon className="dark:text-white" />
                <span className="text-xl dark:text-white">Dark Mode</span>
              </div>
              <button
                onClick={() => dispatch(toggleTheme())}
                className={`relative w-14 h-7 rounded-full transition-all duration-300 ${darkMode ? "bg-green-600" : "bg-gray-300"} `}
              >
                <div
                  className={` flex absolute top-0 w-7 h-7 rounded-full bg-white shadow-md items-center justify-center transition-all duration-300 ${darkMode ? "translate-x-7" : "translate-x-0"} `}
                ></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileMenu;
