import React from "react";
import { toOptions } from "../../utils/postFilters";

const ContentTypeFilter = ({ filterOptions, filters, onUpdateFilter }) => {
  const options = toOptions(filterOptions?.contentTypes || []);

  const selected = filters?.contentType || "";

  return (
    <div>
      <h3 className="hidden md:block text-xl font-semibold mb-1 dark:text-white">
        Content type
      </h3>

      <p className="hidden md:block text-sm text-gray-500 mb-5 dark:text-white">
        Choose the type of content.
      </p>

      <div className="space-y-2">
        {/* All Content */}
        <button
          onClick={() => onUpdateFilter("contentType", "")}
          className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl dark:text-white ${
            selected === ""
              ? "bg-green-50 text-green-700 dark:bg-green-900/30"
              : "hover:bg-gray-100 dark:hover:bg-zinc-800"
          }`}
        >
          All content
        </button>

        {/* Content Types */}
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onUpdateFilter("contentType", option.value)}
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

export default ContentTypeFilter;
