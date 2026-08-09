import { Shield } from "lucide-react";

const TeamResult = ({ team }) => {
  return (
    <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-zinc-50 transition">
      <img
        src={team.logo || "/default-team.png"}
        alt=""
        className="w-11 h-11 rounded-lg object-cover"
      />

      <div className="flex-1 text-left">
        <h3 className="font-medium">{team.name}</h3>

        <p className="text-sm text-zinc-500">{team.city}</p>
      </div>

      <Shield size={18} className="text-zinc-400" />
    </button>
  );
};

export default TeamResult;
