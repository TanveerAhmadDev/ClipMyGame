import { ChevronDown } from "lucide-react";

const FilterDropdown = ({
  label,
  value,
  options,
  isOpen,
  onToggle,
  onSelect,
}) => {
  return (
    <div className="relative">
      {/* Filter */}
      <div className="h-8 w-40 flex items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-full overflow-hidden">
        {/* Label */}
        <div className="w-[45%] h-full flex items-center justify-center border-r border-zinc-200 dark:border-zinc-700">
          <span className="text-sm text-zinc-400 dark:text-zinc-500">
            {label}
          </span>
        </div>

        {/* Value */}
        <button
          type="button"
          onClick={onToggle}
          className="w-[55%] h-full flex items-center justify-center gap-1.5 text-sm font-medium text-zinc-800 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
        >
          <span className="truncate max-w-20">{value || "None"}</span>

          <ChevronDown
            size={16}
            className={`shrink-0 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-10 right-0 z-50 w-40 p-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={`w-full px-3 py-2 text-left text-sm rounded-lg transition ${
                value === option.label
                  ? "bg-green-600 text-white"
                  : "text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
