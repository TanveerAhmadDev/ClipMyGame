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
const MobilePostFilters = ({
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
    <div className="contents">
      {/* FILTER BUTTON */}
      <div className="shrink-0">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openFilters}
            className=" bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 inline-flex items-center justify-center w-12 h-12 rounded-xl hover:bg-gray-200 dark:hover:bg-zinc-700 transition dark:text-white "
          >
            <SlidersHorizontal size={21} />
            {totalSelected > 0 && (
              <span className=" absolute mt-6.25 ml-6.25 min-w-5 h-5 px-1 rounded-full bg-green-600 text-white text-[11px] flex items-center justify-center ">
                {totalSelected}
              </span>
            )}
          </button>
          {totalSelected > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className=" md:hidden w-8 h-8 rounded-xl border border-gray-300 dark:border-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-800 transition dark:text-white "
            >
              <RotateCcw size={17} />
            </button>
          )}
        </div>
      </div>
      {/* FILTER CHIPS */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className=" col-span-full w-full overflow-hidden "
          >
            <div className=" flex gap-2 mt-2 pb-2 overflow-x-auto overflow-y-hidden scrollbar-thin [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full ">
              {filteredItems.map((item) => {
                const selectedCount = getSelectedCount(item.key);
                const isActive = activeFilter === item.key;
                return (
                  <motion.button
                    key={item.key}
                    type="button"
                    onClick={() => handleFilterClick(item.key)}
                    whileTap={{ scale: 0.96 }}
                    className={` shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap ${isActive ? "bg-zinc-500 border-zinc-500 text-white" : "bg-white border-gray-200 text-gray-700 dark:bg-zinc-900 dark:border-zinc-700 dark:text-gray-300"} `}
                  >
                    <span>{item.label}</span>
                    {selectedCount > 0 && (
                      <span className=" min-w-5 h-5 px-1 rounded-full bg-green-600 text-white text-[11px] font-semibold flex items-center justify-center ">
                        {selectedCount}
                      </span>
                    )}
                    <ChevronRight
                      size={14}
                      className={` transition-transform ${isActive ? "rotate-90" : ""} `}
                    />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {activeFilter && (
          <>
            {/* Backdrop */}
            <motion.div
              key="filter-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={() => setActiveFilter(null)}
              className="fixed inset-0 bg-black/15 backdrop-blur-[1px] z-60 md:hidden"
            />
            {/* Filter Popup */}
            <motion.div
              key="filter-popup"
              initial={{ opacity: 0, scale: 0.94, y: -8, filter: "blur(3px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.96, y: -6, filter: "blur(2px)" }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 30,
                mass: 0.7,
              }}
              onClick={(event) => event.stopPropagation()}
              className=" z-100000 absolute top-45 md:hidden pointer-events-auto min-w-70 max-h-[80vh] w-fit overflow-hidden bg-white dark:bg-zinc-900 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.45)] border border-gray-200 dark:border-zinc-700 origin-top "
            >
              <div className="flex flex-col max-h-[80vh]">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ delay: 0.04, duration: 0.2 }}
                  className=" shrink-0 z-10 flex items-center justify-between px-6 py-2 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700 "
                >
                  <div className="flex items-center gap-2">
                    {/* Small animated indicator */}
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.08,
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      }}
                      className="w-1.5 h-5 rounded-full bg-green-500"
                    />
                    <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                      {
                        filterItems.find((item) => item.key === activeFilter)
                          ?.label
                      }
                    </h3>
                  </div>
                  {/* Close button */}
                  <motion.button
                    type="button"
                    onClick={() => setActiveFilter(null)}
                    whileHover={{ scale: 1.08, rotate: 90 }}
                    whileTap={{ scale: 0.88 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className=" w-8 h-8 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors "
                  >
                    <X size={18} />
                  </motion.button>
                </motion.div>
                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ delay: 0.07, duration: 0.22, ease: "easeOut" }}
                  className=" flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-2 py-2 "
                >
                  {renderActiveFilter()}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
export default MobilePostFilters;
