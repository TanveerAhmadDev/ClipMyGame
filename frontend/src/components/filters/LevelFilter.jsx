import React from "react";
import { toOptions } from "../../utils/postFilters";

const LevelFilter = ({ filterOptions, filters, onUpdateFilter }) => {
  const options = toOptions(filterOptions?.levels || []);

  const selected = filters?.level || "";

  return (
    <div>
      <h3 className="hidden md:block text-xl font-semibold mb-1 dark:text-white">
        Level
      </h3>

      <p className="hidden md:block text-sm text-gray-500 mb-5 dark:text-white">
        Choose the competition level.
      </p>

      <div className="space-y-2">
        {/* All Levels */}
        <button
          onClick={() => onUpdateFilter("level", "")}
          className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl dark:text-white ${
            selected === ""
              ? "bg-green-50 text-green-700 dark:bg-green-900/30"
              : "hover:bg-gray-100 dark:hover:bg-zinc-800"
          }`}
        >
          All levels
        </button>

        {/* Levels */}
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onUpdateFilter("level", option.value)}
            className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-2xl transition text-left dark:text-white ${
              selected === option.value
                ? "bg-green-50 text-green-700 dark:bg-green-900/30"
                : "hover:bg-gray-100 dark:hover:bg-zinc-800"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LevelFilter;
