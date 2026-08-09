import { User } from "lucide-react";

const UserResult = ({ user }) => {
  return (
    <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-zinc-50 transition">
      <img
        src={user.profilePhoto || "/default-avatar.png"}
        alt=""
        className="w-11 h-11 rounded-full object-cover"
      />

      <div className="flex-1 text-left">
        <h3 className="font-medium text-zinc-900">{user.fullName}</h3>

        <p className="text-sm text-zinc-500">@{user.userName}</p>
      </div>

      <User size={18} className="text-zinc-400" />
    </button>
  );
};

export default UserResult;
