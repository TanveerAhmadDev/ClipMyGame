import {
  House,
  Trophy,
  Users,
  MessageCircle,
  Bell,
  Moon,
  Sun,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";
import SearchBar from "./Search/SearchBar";

const NavBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const user = useSelector((state) => state.auth.user);

  const navItems = [
    { label: "Home", path: "/", icon: <House size={22} /> },
    { label: "Discover", path: "/discover", icon: <Users size={22} /> },
    { label: "Matches", path: "/matches", icon: <Trophy size={22} /> },
    { label: "Messages", path: "/messages", icon: <MessageCircle size={22} /> },
    { label: "Alerts", path: "/alerts", icon: <Bell size={22} /> },
  ];

  return (
    <>
      <nav className=" fixed bottom-0 border-t md:sticky md:top-0 md:border-b z-50 bg-white dark:bg-[#1E1E1E]  border-gray-200 dark:border-zinc-700 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-4">
            <img
              src="/eeimg.png"
              alt="ClipMyGame"
              className="w-12"
              onClick={() => navigate("/")}
            />

            <div className="relative hidden md:block">
              <SearchBar />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-8 text-gray-600 dark:text-gray-300">
            {navItems.map((item) => (
              <NavItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                active={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              />
            ))}

            <NavItem
              image={user?.profilePhoto || "https://i.pravatar.cc/150?img=12"}
              label="Profile"
              onClick={() => navigate("/profile")}
            />

            {/* Theme Toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`hidden md:block relative w-14 h-8 rounded-full transition-all duration-300 ${
                darkMode ? "bg-green-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`flex absolute top-1 w-6 h-6 rounded-full bg-white shadow-md items-center justify-center transition-all duration-300 ${
                  darkMode ? "translate-x-7" : "translate-x-1"
                }`}
              >
                {darkMode ? (
                  <Moon size={15} className="text-green-700" />
                ) : (
                  <Sun size={15} className="text-yellow-500" />
                )}
              </div>
            </button>
          </div>
        </div>
      </nav>

      <nav className="md:sticky md:top-0 md:border-b md:hidden z-50 bg-white dark:bg-[#1E1E1E] border-gray-200 dark:border-zinc-700 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto h-16 px-3 flex items-center justify-between">
          <img
            src={user?.profilePhoto || "https://i.pravatar.cc/150?img=12"}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
          <SearchBar />
        </div>
      </nav>
    </>
  );
};

const NavItem = ({ icon, image, label, active, onClick }) => {
  return (
    <div onClick={onClick}>
      <button
        className={`flex flex-col items-center gap-1 transition-colors duration-300 ${
          active
            ? "text-green-600 dark:text-green-500"
            : "text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500"
        }`}
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
