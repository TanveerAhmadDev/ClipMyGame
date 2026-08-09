// import { useEffect, useMemo, useRef, useState } from "react";
// import { ChevronDown, Check, Search } from "lucide-react";

// const SearchSelect = ({
//   label,
//   value,
//   options,
//   placeholder = "Select...",
//   onChange,
// }) => {
//   const [open, setOpen] = useState(false);
//   const [query, setQuery] = useState("");

//   const wrapperRef = useRef(null);

//   useEffect(() => {
//     const handleOutside = (e) => {
//       if (!wrapperRef.current?.contains(e.target)) {
//         setOpen(false);
//         setQuery("");
//       }
//     };

//     document.addEventListener("mousedown", handleOutside);

//     return () => document.removeEventListener("mousedown", handleOutside);
//   }, []);

//   const filtered = useMemo(() => {
//     if (!query) return options;

//     return options.filter((item) =>
//       item.toLowerCase().includes(query.toLowerCase()),
//     );
//   }, [query, options]);

//   return (
//     <div className="relative" ref={wrapperRef}>
//       <label className="block mb-2 text-sm font-medium">{label}</label>

//       <button
//         type="button"
//         onClick={() => setOpen((prev) => !prev)}
//         className="w-full h-11 border rounded-xl px-4 flex items-center justify-between hover:border-green-600 transition"
//       >
//         <span className={value ? "text-black" : "text-zinc-400"}>
//           {value || placeholder}
//         </span>

//         <ChevronDown
//           size={18}
//           className={`transition ${open ? "rotate-180" : ""}`}
//         />
//       </button>

//       {open && (
//         <div className="absolute z-50 mt-2 w-full rounded-xl border bg-white shadow-xl">
//           {/* Search */}

//           <div className="relative border-b">
//             <Search
//               size={16}
//               className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400"
//             />

//             <input
//               autoFocus
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search..."
//               className="w-full rounded-lg h-10 pl-10 pr-3 outline-none"
//             />
//           </div>

//           {/* List */}

//           <div className="max-h-60 overflow-y-auto">
//             {filtered.length === 0 && (
//               <div className="p-4 text-center text-sm text-zinc-500">
//                 No results found
//               </div>
//             )}

//             {filtered.map((item) => (
//               <button
//                 key={item}
//                 type="button"
//                 onClick={() => {
//                   onChange(item);

//                   setOpen(false);

//                   setQuery("");
//                 }}
//                 className="w-full flex justify-between items-center px-4 py-3 hover:bg-green-50 transition"
//               >
//                 <span>{item}</span>

//                 {value === item && (
//                   <Check size={18} className="text-green-600" />
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchSelect;

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Check, Search } from "lucide-react";

const SearchSelect = ({
  label,
  value,
  options,
  placeholder = "Select...",
  onChange,
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
      <label className="block mb-2 text-sm font-medium">{label}</label>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`${open ? "border-t border-r border-l rounded-t-xl" : "border rounded-xl"} w-full h-11 px-4 flex items-center justify-between hover:border-green-600 transition`}
      >
        <span className={value ? "text-black" : "text-zinc-400"}>
          {selectedOption?.label || placeholder}
        </span>

        <ChevronDown
          size={18}
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 w-full rounded-b-xl border bg-white shadow-xl">
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
              className="w-full h-10 pl-10 pr-3 outline-none"
            />
          </div>

          {/* Options */}

          <div className="max-h-60 overflow-y-auto">
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
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-green-50 transition"
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
