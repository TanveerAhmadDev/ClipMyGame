import React, { useMemo, useState } from "react";
import {
  X,
  Search,
  ChevronRight,
  SlidersHorizontal,
  RotateCcw,
  Earth,
} from "lucide-react";
import SportFilter from "./SportFilter";
import SkillFilter from "./SkillFilter";
import LocationFilter from "./LocationFilter";
import LevelFilter from "./LevelFilter";
import ContentTypeFilter from "./ContentTypeFilter";
import { motion, AnimatePresence } from "framer-motion";
const PostFilters = ({
  filterOptions = {},
  filters = {},
  onUpdateFilter,
  onReset,
}) => {
  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [search, setSearch] = useState("");
  const filterItems = [
    {
      key: "sport",
      label: "Sport",
      description: "Football, Cricket, Basketball...",
    },
    {
      key: "skill",
      label: "Skill",
      description: "Shooting, Passing, Defending...",
    },
    {
      key: "location",
      label: "Location",
      description: "Country, Region, District",
    },
    {
      key: "level",
      label: "Level",
      description: "U14, Amateur, Professional...",
    },
    {
      key: "contentType",
      label: "Content type",
      description: "General, News, Highlights...",
    },
  ];
  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return filterItems;
    }
    return filterItems.filter((item) =>
      item.label.toLowerCase().includes(query),
    );
  }, [search]);

  const getSelectedCount = (key) => {
    if (key === "location") {
      return filters?.countryCode || filters?.stateCode || filters?.city
        ? 1
        : 0;
    }

    const value = filters?.[key];

    if (!value) {
      return 0;
    }

    if (Array.isArray(value)) {
      return value.length;
    }

    return 1;
  };

  const totalSelected = filterItems.reduce(
    (total, item) => total + getSelectedCount(item.key),
    0,
  );

  const openFilters = () => {
    setOpen((prev) => !prev);
  };

  const closeModal = () => {
    setOpen(false);
    setActiveFilter(null);
    setSearch("");
  };

  const handleFilterEnter = (key) => {
    setActiveFilter(key);
  };
  const handleFilterClick = (key) => {
    setActiveFilter((prev) => (prev === key ? null : key));
  };

  const renderActiveFilter = () => {
    switch (activeFilter) {
      case "sport":
        return (
          <SportFilter
            filterOptions={filterOptions}
            filters={filters}
            onUpdateFilter={onUpdateFilter}
          />
        );
      case "skill":
        return (
          <SkillFilter
            filterOptions={filterOptions}
            filters={filters}
            onUpdateFilter={onUpdateFilter}
          />
        );
      case "location":
        return (
          <LocationFilter
            filterOptions={filterOptions}
            filters={filters}
            onUpdateFilter={onUpdateFilter}
          />
        );
      case "level":
        return (
          <LevelFilter
            filterOptions={filterOptions}
            filters={filters}
            onUpdateFilter={onUpdateFilter}
          />
        );
      case "contentType":
        return (
          <ContentTypeFilter
            filterOptions={filterOptions}
            filters={filters}
            onUpdateFilter={onUpdateFilter}
          />
        );
      default:
        return null;
    }
  };

  const handleReset = () => {
    onReset?.();
    setActiveFilter(null);
  };

  const handleApply = () => {
    onApply?.();
    closeModal();
  };
  return (
    <>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={openFilters}
          className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 inline-flex items-center gap-3 px-5 py-3 rounded-2xl hover:bg-gray-200 focus:bg-gray-200 dark:focus:bg-zinc-700  dark:hover:bg-zinc-700 transition dark:text-white"
        >
          <SlidersHorizontal size={21} />
          <span className="font-medium">Filters</span>
          {totalSelected > 0 && (
            <span className=" min-w-6 h-6 px-1.5 rounded-full bg-green-600 text-white text-xs flex items-center justify-center ">
              {totalSelected}
            </span>
          )}
        </button>
        {totalSelected > 0 && (
          <button
            type="button"
            onClick={handleReset}
            className="md:hidden  px-2 h-8 rounded-xl border  border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 transition dark:text-white"
          >
            <RotateCcw size={17} />
          </button>
        )}
      </div>

      {open && (
        <>
          <div
            className="hidden md:block fixed inset-0 z-100 bg-black/30 backdrop-blur-[2px] "
            onClick={closeModal}
          />
          <div className="hidden md:flex fixed top-16 left-1/2 -translate-x-1/2 z-110 items-start gap-3 pointer-events-none ">
            {/* ================================================= MODAL 1 — FILTER CATEGORIES ================================================== */}
            <div
              onClick={(event) => event.stopPropagation()}
              className=" pointer-events-auto w-100 max-h-[80vh] bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-zinc-700 flex flex-col overflow-hidden "
            >
              {/* HEADER */}
              <div
                id="HEADER"
                className=" flex items-center justify-between px-7 py-4 border-b border-gray-200 dark:border-zinc-700 shrink-0 "
              >
                <h2 className=" text-xl font-semibold text-gray-900 dark:text-white ">
                  Filters
                </h2>
                <button
                  type="button"
                  onClick={closeModal}
                  className=" w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 transition "
                >
                  <X size={20} />
                </button>
              </div>
              <div id="SEARCH" className="px-6 pt-5 shrink-0">
                <div className=" flex items-center gap-3 px-4 h-12 rounded-2xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 ">
                  <Search size={20} className=" text-gray-400 shrink-0 " />
                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search attributes..."
                    className=" flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-400 "
                  />
                </div>
              </div>
              {/* =============================================== TITLE ================================================ */}
              <div className="px-7 pt-5 pb-2">
                <p className=" text-sm text-gray-500 dark:text-gray-400 ">
                  Post attributes
                </p>
              </div>
              <div className=" px-4 pb-4 overflow-y-auto flex-1 ">
                {filteredItems.length === 0 ? (
                  <div className=" py-10 text-center text-gray-500 dark:text-gray-400 ">
                    No filters found.
                  </div>
                ) : (
                  filteredItems.map((item) => {
                    const selectedCount = getSelectedCount(item.key);
                    const isActive = activeFilter === item.key;
                    return (
                      <div
                        key={item.key}
                        onMouseEnter={() => handleFilterEnter(item.key)}
                      >
                        <button
                          type="button"
                          onClick={() => handleFilterClick(item.key)}
                          className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-2xl transition text-left ${isActive ? "bg-gray-100 dark:bg-zinc-800" : "hover:bg-gray-100 dark:hover:bg-zinc-800"} `}
                        >
                          {/* ICON */}
                          {item.label === "Location" ? (
                            <Earth
                              size={15}
                              className=" text-gray-700 dark:text-gray-300 shrink-0 "
                            />
                          ) : (
                            <SlidersHorizontal
                              size={15}
                              className=" text-gray-700 dark:text-gray-300 shrink-0 "
                            />
                          )}
                          {/* TEXT */}
                          <div className=" flex-1 min-w-0 ">
                            <div className=" flex items-center justify-between gap-2 ">
                              <p className=" font-medium text-gray-900 dark:text-white ">
                                {item.label}
                              </p>
                              {selectedCount > 0 && (
                                <span className="px-1 py-0.4 border rounded-md bg-gray-200 dark:bg-zinc-700 text-xs text-gray-700 dark:text-gray-200 ">
                                  {selectedCount}
                                </span>
                              )}
                            </div>
                          </div>
                          {/* ARROW */}
                          <ChevronRight
                            size={20}
                            className=" text-gray-700 dark:text-gray-300 shrink-0 "
                          />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
              {/* =============================================== FOOTER ================================================ */}
              <div className=" border-t border-gray-200 dark:border-zinc-700 p-4 flex gap-3 shrink-0 ">
                {/* RESET */}
                <button
                  type="button"
                  onClick={handleReset}
                  className=" flex-1 h-12 rounded-xl border border-gray-300 dark:border-zinc-700 flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-zinc-800 transition "
                >
                  <RotateCcw size={17} /> Reset
                </button>
                {/* APPLY */}
                <button
                  type="button"
                  onClick={handleApply}
                  className=" flex-1 h-12 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition "
                >
                  Apply filters
                </button>
              </div>
            </div>
            {/* ================================================= MODAL 2 — INDIVIDUAL FILTER OPTIONS THIS IS A SEPARATE MODAL. ================================================== */}
            {/* ============================================= SECOND MODAL ============================================= */}
            {activeFilter && (
              <div
                onMouseEnter={() => setActiveFilter(activeFilter)}
                onMouseLeave={() => setActiveFilter(null)}
                onClick={(event) => event.stopPropagation()}
                className="hidden md:block pointer-events-auto w-87.5 max-h-[80vh] overflow-hidden bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-zinc-700 "
              >
                <div className="flex flex-col max-h-[80vh]">
                  <div className=" shrink-0 z-10 flex items-center justify-between px-6 py-4 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700 ">
                    <h3 className=" text-lg font-semibold text-gray-900 dark:text-white ">
                      {
                        filterItems.find((item) => item.key === activeFilter)
                          ?.label
                      }
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveFilter(null)}
                      className=" w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 transition "
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className=" flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-5 ">
                    {renderActiveFilter()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden block md:hidden"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05 } },
              }}
              className="flex gap-2 mt-3 pb-2 overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-700 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full"
            >
              {filteredItems.map((item) => {
                const selectedCount = getSelectedCount(item.key);
                const isActive = activeFilter === item.key;
                return (
                  <motion.div
                    key={item.key}
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: -8,
                        scale: 0.9,
                      },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                      },
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="shrink-0"
                    onMouseEnter={() => handleFilterEnter(item.key)}
                  >
                    <motion.button
                      type="button"
                      onClick={() => handleFilterClick(item.key)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-colors ${isActive ? ` bg-zinc-500 border-zinc-500 text-white dark:bg-white dark:border-white dark:text-gray-900 ` : ` bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 dark:bg-zinc-900 dark:border-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-800 `} `}
                    >
                      <span>{item.label}</span>
                      <AnimatePresence>
                        {selectedCount > 0 && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className=" min-w-5 h-5 px-1 rounded-full bg-green-600 text-white text-[11px] font-semibold flex items-center justify-center "
                          >
                            {selectedCount}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      <motion.span
                        animate={{ rotate: isActive ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center"
                      >
                        <ChevronRight size={14} />
                      </motion.span>
                    </motion.button>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
        {activeFilter && (
          <div
            onMouseEnter={() => setActiveFilter(activeFilter)}
            onMouseLeave={() => setActiveFilter(null)}
            onClick={(event) => event.stopPropagation()}
            className="block absolute md:hidden pointer-events-auto min-w-70 max-h-[80vh] w-fit  overflow-hidden bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-zinc-700 "
          >
            <div className="flex flex-col max-h-[80vh]">
              <div className=" shrink-0 z-10 flex items-center justify-between px-6 py-2 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700 ">
                <h3 className="text-md font-semibold text-gray-900 dark:text-white ">
                  {filterItems.find((item) => item.key === activeFilter)?.label}
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveFilter(null)}
                  className=" w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-zinc-800 transition dark:text-white"
                >
                  <X size={18} />
                </button>
              </div>
              <div className=" flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-2 py-2">
                {renderActiveFilter()}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
export default PostFilters;
