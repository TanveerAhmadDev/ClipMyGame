import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  Hamburger,
  HamburgerIcon,
  Menu,
  Plus,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import OpportunityCard from "../components/opportunity/OpportunityCard";
import useOpportunities from "../hooks/useOpportunities";
import { motion, AnimatePresence } from "framer-motion";
import DesktopOpportunityFilters from "../components/opportunity/filters/DesktopOpportunityFilters";
import MobileOpportunityFilters from "../components/opportunity/filters/MobileOpportunityFilters";
import useOpportuntiesFilters from "../hooks/useOpportuntiesFilters";
const types = [
  {
    key: "All",
    label: "All",
  },
  {
    key: "Job",
    label: "Job",
  },
  {
    key: "Scholarship",
    label: "Scholarship",
  },
  {
    key: "Internship",
    label: "Internship",
  },
  {
    key: "Trial",
    label: "Trial",
  },
  {
    key: "Tournament",
    label: "Tournament",
  },
  {
    key: "Grant",
    label: "Grant",
  },
  {
    key: "Course",
    label: "Course",
  },
  {
    key: "Volunteer",
    label: "Volunteer",
  },
];

const filterOptions = [
  {
    label: "Type",
  },
  {
    label: "Category",
  },
];

const Opportunities = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [activeFilter, setActiveFilter] = useState(null);
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const {
    filterOptions,
    selectedFilters,
    updateFilter,
    resetFilters,
    loadingFilters,
  } = useOpportuntiesFilters();

  const {
    opportunities,
    loadingOpportunities,
    opportunitiesError,
    refetchOpportunities,
  } = useOpportunities(selectedFilters);

  const handleFilterClick = (key) => {
    setCategory(key);
    setActiveFilter((prev) => (prev === key ? null : key));
  };

  const openFilters = () => {
    setOpen((prev) => !prev);
  };
  const { loading } = useOpportunities({ category, search });

  return (
    <>
      <NavBar />
      <main className=" min-h-screen bg-zinc-50 dark:bg-[#1E1E1E] px-4 md:px-20 lg:px-40 py-6 ">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className=" flex flex-col md:flex-row md:items-center md:justify-between gap-4 ">
            <div>
              <h1 className=" text-3xl font-bold text-zinc-900 dark:text-white ">
                Opportunities
              </h1>
              <p className=" mt-1 text-zinc-500 dark:text-zinc-400 ">
                Discover jobs, scholarships, trials and opportunities.
              </p>
            </div>
            <button
              onClick={() => navigate("/opportunities/create")}
              className=" inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition "
            >
              <Plus size={18} /> Create Opportunity
            </button>
          </div>

          <div className="mt-7 w-full">
            {/* TOP ROW */}
            <div className="flex items-center gap-2 w-full">
              {/* Search */}
              <div className="relative flex-1 min-w-0">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search opportunities..."
                  className="
          w-full
          h-12
          pl-12
          pr-4
          rounded-xl
          border border-zinc-200
          dark:border-zinc-800
          bg-white
          dark:bg-zinc-900
          outline-none
          focus:ring-2
          focus:ring-green-500/20
          dark:text-white
        "
                />
              </div>

              {/* Filter Button */}
              <button
                type="button"
                onClick={openFilters}
                className=" shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-700 transition dark:text-white "
              >
                <Menu size={21} />
              </button>
            </div>

            {/* FILTER OPTIONS — NEW ROW */}
            <div className="w-full">
              <MobileOpportunityFilters
                filterOptions={filterOptions}
                filters={selectedFilters}
                onUpdateFilter={updateFilter}
                onReset={resetFilters}
                open={open}
                setOpen={setOpen}
              />
            </div>

            {/* DESKTOP */}
            <DesktopOpportunityFilters
              filterOptions={filterOptions}
              filters={selectedFilters}
              onUpdateFilter={updateFilter}
              onReset={resetFilters}
              open={open}
              setOpen={setOpen}
            />
          </div>
          {/* FILTERS */}
          {/* <div className=" mt-2 flex gap-2 overflow-x-auto pb-2 ">
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
                    {filterOptions.map((item) => {
                      const isActive = activeFilter === item.key;
                      return (
                        <motion.button
                          key={item.key}
                          type="button"
                          onClick={() => handleFilterClick(item.key)}
                          whileTap={{ scale: 0.96 }}
                          className={` shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap  ${isActive ? "bg-zinc-500 border-zinc-500 text-white" : "bg-white border-gray-200 text-gray-700 dark:bg-zinc-900 dark:border-zinc-700 dark:text-gray-300"}`}
                          //
                        >
                          <span>{item.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div> */}
          {/* RESULTS */}
          {loading ? (
            <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7 ">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className=" h-80 rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse "
                />
              ))}
            </div>
          ) : opportunities.length === 0 ? (
            <div className=" mt-16 text-center text-zinc-500 ">
              No opportunities found.
            </div>
          ) : (
            <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7 ">
              {opportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity._id}
                  opportunity={opportunity}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};
export default Opportunities;
