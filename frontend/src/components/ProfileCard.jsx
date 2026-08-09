import { MapPin, ShieldCheck, Trophy, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfileCard = () => {
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-700 shadow-sm">
      {/* Cover */}
      <div className="h-20 bg-linear-to-r from-green-600 via-green-500 to-emerald-400 overflow-hidden">
        <img
          src={user?.coverPhoto || "/default-cover.jpg"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Profile */}
      <div className="px-6 pb-6">
        <div className="-mt-10 flex justify-center">
          <img
            src={
              user?.profilePhoto ||
              `https://ui-avatars.com/api/?name=${user?.userName}`
            }
            alt=""
            className="w-20 h-20 rounded-full border-4 border-white dark:border-zinc-900 object-cover"
          />
        </div>

        <div className="text-center mt-3">
          <h2 className="font-bold text-lg text-gray-900 dark:text-white">
            {user?.fullName}
          </h2>

          <p className="text-green-600 font-medium">Football Player</p>

          <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mt-2">
            <MapPin size={15} />
            {user?.location?.country}, {user?.location?.district}
          </div>
        </div>

        {/* Verification */}
        <div className="flex justify-center mt-3">
          <span className="flex items-center gap-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-medium">
            <ShieldCheck size={14} />
            Verified Athlete
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 text-center">
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              0
            </h3>
            <p className="text-xs text-gray-500">Highlights</p>
          </div>

          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              0
            </h3>
            <p className="text-xs text-gray-500">Followers</p>
          </div>

          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              0
            </h3>
            <p className="text-xs text-gray-500">Trophies</p>
          </div>
        </div>

        {/* Buttons */}
        <button
          onClick={() => navigate("/profile")}
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white rounded-xl py-2 font-semibold transition"
        >
          View Profile
        </button>

        {/* Extra */}
        <div className="mt-5 border-t border-gray-200 dark:border-zinc-800 pt-4 space-y-3 text-sm">
          <div className="flex justify-between text-gray-600 dark:text-gray-300">
            <span className="flex items-center gap-2">
              <Users size={16} />
              Connections
            </span>

            <span className="font-semibold">0</span>
          </div>

          <div className="flex justify-between text-gray-600 dark:text-gray-300">
            <span className="flex items-center gap-2">
              <Trophy size={16} />
              Ranking
            </span>

            <span className="font-semibold text-green-600">#0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
