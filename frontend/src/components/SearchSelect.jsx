import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Check, Search } from "lucide-react";

const SearchSelect = ({
  label,
  value,
  options,
  placeholder = "Select...",
  onChange,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (!wrapperRef.current?.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleOutside);

    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // Normalize options so component supports BOTH strings and objects
  const normalizedOptions = useMemo(() => {
    return options.map((option) =>
      typeof option === "string"
        ? {
            label: option,
            value: option,
          }
        : option,
    );
  }, [options]);

  const filtered = useMemo(() => {
    if (!query) return normalizedOptions;

    return normalizedOptions.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query, normalizedOptions]);

  const selectedOption = normalizedOptions.find((item) => item.value === value);

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block mb-2 text-sm font-medium dark:text-white">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`${open ? "border-t border-r border-l rounded-t-xl " : `rounded-xl  ${className}`} w-full h-11 px-4 flex items-center justify-between hover:border-green-600 transition`}
      >
        <span
          className={value ? "text-black dark:text-white" : "text-zinc-400 "}
        >
          {selectedOption?.label || placeholder}
        </span>

        <ChevronDown
          size={18}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 w-full rounded-b-xl border bg-white shadow-xl dark:bg-zinc-950 ">
          {/* Search */}

          <div className="relative border-b">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full h-10 pl-10 pr-3 outline-none dark:text-white "
            />
          </div>

          {/* Options */}

          <div className={`max-h-60 overflow-y-auto ${className}`}>
            {filtered.length === 0 && (
              <div className="p-4 text-center text-sm text-zinc-500">
                No results found
              </div>
            )}

            {filtered.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => {
                  onChange(item.value);
                  setOpen(false);
                  setQuery("");
                }}
                className={`w-full flex items-center justify-between px-4 py-3 hover:bg-green-500 transition ${className}`}
              >
                <span>{item.label}</span>

                {value === item.value && (
                  <Check size={18} className="text-green-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSelect;
