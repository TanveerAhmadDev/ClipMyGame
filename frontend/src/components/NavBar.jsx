import {
  House,
  Trophy,
  Users,
  MessageCircle,
  Bell,
  Moon,
  Sun,
  Plus,
  Headphones,
  BriefcaseBusiness,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";
import SearchBar from "./Search/SearchBar";

const NavBar = ({ setIsPosting }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const user = useSelector((state) => state.auth.user);

  const MobileNavItems = [
    { label: "Home", path: "/", icon: <House size={22} /> },
    {
      label: "Opportunities",
      path: "/opportunities",
      icon: <BriefcaseBusiness size={22} />,
    },
    { label: "Add", path: "/add", icon: <Plus size={26} />, isAdd: true },
    { label: "Messages", path: "/messages", icon: <MessageCircle size={22} /> },
    { label: "Matches", path: "/matches", icon: <Trophy size={22} /> },
  ];
  const DesktopNavItems = [
    { label: "Home", path: "/", icon: <House size={22} /> },
    {
      label: "Ospportunities",
      path: "/opportunities",
      icon: <BriefcaseBusiness size={22} />,
    },
    { label: "Matches", path: "/matches", icon: <Trophy size={22} /> },
    { label: "Messages", path: "/messages", icon: <MessageCircle size={22} /> },
    { label: "Alerts", path: "/alerts", icon: <Bell size={22} /> },
  ];

  return (
    <>
      <nav className=" w-full max-w-full md:px-40 overflow-x-hidden fixed -bottom-1 md:sticky md:top-0 border-t md:border-t-0  md:border-b z-50 bg-white dark:bg-[#1E1E1E] border-gray-200 dark:border-zinc-700 shadow-sm transition-colors duration-300 ">
        <div className=" w-full max-w-full h-16 flex items-center overflow-hidden ">
          <div className=" hidden md:flex items-center gap-4 shrink-0 ">
            <img
              src="/eeimg.png"
              alt="ClipMyGame"
              className="w-12 cursor-pointer"
              onClick={() => navigate("/")}
            />
            <div className="relative">
              <SearchBar />
            </div>
          </div>
          {/* ========================================= NAVIGATION ========================================= */}
          <div className="hidden md:flex items-center w-full md:w-auto md:gap-7 md:ml-auto h-full text-gray-600 dark:text-gray-300 ">
            {DesktopNavItems.map((item) => (
              <div
                key={item.path}
                className=" flex-1 md:flex-none h-full flex items-center justify-center "
              >
                <NavItem
                  icon={item.icon}
                  label={item.label}
                  active={location.pathname === item.path}
                  onClick={() => navigate(item.path)}
                />
              </div>
            ))}
            {/* ========================================= PROFILE — DESKTOP ONLY ========================================= */}
            <div className=" hidden md:flex items-center justify-center ">
              <NavItem
                image={
                  user?.profilePhoto ||
                  `https://ui-avatars.com/api/?name=${user?.userName}`
                }
                label="Profile"
                onClick={() => navigate("/profile")}
                className={""}
              />
            </div>
            {/* ========================================= THEME — DESKTOP ONLY ========================================= */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className={` hidden md:block relative w-14 h-8 rounded-full transition-all duration-300 ${darkMode ? "bg-green-600" : "bg-gray-300"} `}
            >
              <div
                className={` flex absolute top-1 w-6 h-6 rounded-full bg-white shadow-md items-center justify-center transition-all duration-300 ${darkMode ? "translate-x-7" : "translate-x-1"} `}
              >
                {darkMode ? (
                  <Moon size={15} className="text-green-700" />
                ) : (
                  <Sun size={15} className="text-yellow-500" />
                )}
              </div>
            </button>
          </div>

          <div className="flex md:hidden items-center w-full md:w-auto md:gap-7 md:ml-auto h-full text-gray-600 dark:text-gray-300">
            {MobileNavItems.map((item) => (
              <div
                key={item.path}
                className={` flex-1 md:flex-none h-full flex items-center justify-center ${item.isAdd ? "relative" : ""} `}
              >
                {item.isAdd ? (
                  <button
                    type="button"
                    onClick={() => setIsPosting(true)}
                    className=" w-12 h-12 rounded-full bg-[#16A34A] text-white flex items-center justify-center shadow-lg shadow-green-500/30 border-4 border-white dark:border-zinc-900 -translate-y-3 hover:scale-105 active:scale-95 transition-all duration-200 "
                  >
                    {item.icon}
                  </button>
                ) : (
                  <NavItem
                    icon={item.icon}
                    label={item.label}
                    active={location.pathname === item.path}
                    onClick={() => navigate(item.path)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      <nav className="w-full max-w-full overflow-hidden md:sticky md:top-0 md:border-b hidden z-50 bg-white dark:bg-[#1E1E1E] border-gray-200 dark:border-zinc-700 shadow-sm transition-colors duration-300">
        <div className="w-full max-w-full h-16 px-3 flex items-center justify-between gap-3 overflow-hidden ">
          <img
            src={
              user?.profilePhoto ||
              `https://ui-avatars.com/api/?name=${user?.userName}`
            }
            alt=""
            className="w-10 h-10 rounded-full object-cover shrink-0"
            onClick={() => navigate("/profile")}
          />

          <div className="min-w-0 flex-1 overflow-hidden">
            <SearchBar />
          </div>
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`md:hidden relative flex items-center justify-center w-8 h-8 transition-all duration-300  `}
          >
            {darkMode ? (
              <Moon className="text-green-700" />
            ) : (
              <Sun className="text-yellow-500" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
};

const NavItem = ({ icon, image, label, active, onClick, className }) => {
  return (
    <div onClick={onClick}>
      <button
        className={`flex flex-col items-center  gap-1 transition-colors duration-300  ${
          active
            ? "text-green-600 dark:text-green-500"
            : "text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500"
        } ${className}`}
      >
        {image ? (
          <img
            src={image}
            alt={label}
            className="w-6 h-6 rounded-full object-cover"
          />
        ) : (
          icon
        )}

        <span className="text-xs font-medium">{label}</span>
      </button>
    </div>
  );
};

export default NavBar;
