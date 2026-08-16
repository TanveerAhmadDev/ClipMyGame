// import { Search, X } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import SearchDropdown from "./SearchDropdown";

// const SearchBar = () => {
//   const [query, setQuery] = useState("");
//   const [focused, setFocused] = useState(false);

//   const wrapperRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (!wrapperRef.current?.contains(e.target)) {
//         setFocused(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <>
//       {/* Blur Background */}
//       {focused && (
//         <div className="fixed inset-0 bg-black/15 backdrop-blur-[1px] z-40" />
//       )}

//       <div ref={wrapperRef} className="relative hidden lg:block z-50">
//         <Search
//           size={18}
//           className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
//         />

//         <input
//           value={query}
//           onFocus={() => setFocused(true)}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search athletes, coaches, teams..."
//           className="
//           w-90
//           h-11
//           rounded-full
//           bg-zinc-100
//           border
//           border-transparent
//           pl-11
//           pr-11
//           text-[15px]
//           placeholder:text-zinc-500
//           outline-none
//           transition-all
//           duration-200
//           focus:bg-white
//           focus:border-green-600
//           focus:ring-2
//           focus:ring-green-600/20
//           "
//         />

//         {query && (
//           <button
//             onClick={() => setQuery("")}
//             className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full hover:bg-zinc-200 flex items-center justify-center"
//           >
//             <X size={16} />
//           </button>
//         )}

//         {focused && <SearchDropdown query={query} />}
//       </div>
//     </>
//   );
// };

// export default SearchBar;

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SearchDropdown from "./SearchDropdown.jsx";
import useSearch from "../../hooks/useSearch.js";

const SearchBar = ({ className }) => {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [type, setType] = useState("all");

  const wrapperRef = useRef(null);

  const { loading, results } = useSearch(query, type);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!wrapperRef.current?.contains(e.target)) {
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {focused && (
        <div className="fixed inset-0 bg-black/15 backdrop-blur-[1px] z-40" />
      )}

      <div ref={wrapperRef} className={`relative z-50 flex-1`}>
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
        />

        <input
          value={query}
          onFocus={() => setFocused(true)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search athletes, coaches, teams..."
          className="
          md:w-90
          w-full
          h-11
          rounded-full
          bg-zinc-100
          border
          border-transparent
          pl-11
          pr-11
          text-[15px]
          placeholder:text-zinc-500
          outline-none
          transition-all
          duration-200
          focus:bg-white
          focus:border-green-600
          focus:ring-2
          focus:ring-green-600/20
          "
        />

        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full hover:bg-zinc-200 flex items-center justify-center"
          >
            <X size={16} />
          </button>
        )}

        {focused && (
          <SearchDropdown
            query={query}
            type={type}
            setType={setType}
            loading={loading}
            results={results}
          />
        )}
      </div>
    </>
  );
};

export default SearchBar;
