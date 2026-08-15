import React from "react";
import { toOptions } from "../../utils/postFilters";

const SportFilter = ({ filterOptions, filters, onUpdateFilter }) => {
  const options = toOptions(filterOptions?.sports || []);

  const selected = filters?.sport || "";

  const handleSelect = (value) => {
    onUpdateFilter("sport", value);
  };

  return (
    <div>
      <h3 className="hidden md:block text-xl font-semibold mb-1">Sport</h3>
      <p className="hidden md:block text-sm text-gray-500 mb-5">
        Select the sport you want to see.
      </p>

      <div className="space-y-2">
        <button
          onClick={() => handleSelect("")}
          className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl transition dark:text-white ${
            selected === ""
              ? "bg-green-50 text-green-800 dark:bg-green-900/30"
              : "hover:bg-gray-100 dark:hover:bg-zinc-800"
          }`}
        >
          All sports
        </button>

        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-2xl transition text-left dark:text-white ${
              selected === option.value
                ? "bg-green-50 text-green-800 dark:bg-green-900/30"
                : "hover:bg-gray-100  dark:hover:bg-zinc-800 "
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SportFilter;
