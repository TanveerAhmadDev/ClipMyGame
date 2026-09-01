import React, { useMemo, useState } from "react";
import {
  X,
  Search,
  ChevronRight,
  SlidersHorizontal,
  RotateCcw,
  Earth,
  Menu,
} from "lucide-react";
import LocationFilter from "../../filters/LocationFilter";
import LevelFilter from "../../filters/LevelFilter";
import SportFilter from "../../filters/SportFilter";
import TypeFilter from "../../filters/TypeFilter";
import CategoryFilter from "../../filters/CategoryFilter";
const DesktopOpportunityFilters = ({
  filterOptions = {},
  filters = {},
  onUpdateFilter,
  onReset,
  open,
  setOpen,
}) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [search, setSearch] = useState("");
  const filterItems = [
    {
      key: "type",
      label: "Type",
      description: "General, News, Highlights...",
    },
    {
      key: "category",
      label: "Category",
      description: "General, News, Highlights...",
    },
    {
      key: "sport",
      label: "Sport",
      description: "Football, Cricket, Basketball...",
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
      case "type":
        return (
          <TypeFilter
            filterOptions={filterOptions}
            filters={filters}
            onUpdateFilter={onUpdateFilter}
          />
        );
      case "category":
        return (
          <CategoryFilter
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
    </>
  );
};
export default DesktopOpportunityFilters;
