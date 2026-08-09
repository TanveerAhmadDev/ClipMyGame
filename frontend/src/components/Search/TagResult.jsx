import { Hash } from "lucide-react";

const TagResult = ({ tag }) => {
  return (
    <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-zinc-50 transition">
      <Hash size={18} className="text-green-600" />

      <span className="font-medium">{tag}</span>
    </button>
  );
};

export default TagResult;
