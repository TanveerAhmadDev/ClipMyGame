import { Folder } from "lucide-react";

const CategoryResult = ({ category }) => {
  return (
    <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-zinc-50 transition">
      <Folder size={18} className="text-amber-500" />

      <span className="font-medium">{category}</span>
    </button>
  );
};

export default CategoryResult;
