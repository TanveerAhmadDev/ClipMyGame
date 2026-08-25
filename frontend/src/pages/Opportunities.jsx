import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import NavBar from "../components/NavBar";
import OpportunityCard from "../components/opportunity/OpportunityCard";
import useOpportunities from "../hooks/useOpportunities";

const types = [
  "All",
  "Job",
  "Scholarship",
  "Internship",
  "Trial",
  "Tournament",
  "Grant",
  "Course",
  "Volunteer",
];

const Opportunities = () => {
  const navigate = useNavigate();

  const opportunities = useSelector((state) => state.opportunity.opportunities);

  const [type, setType] = useState("");

  const [search, setSearch] = useState("");

  const { loading } = useOpportunities({
    type,
    search,
  });

  return (
    <>
      <NavBar />

      <main
        className="
        min-h-screen
        bg-zinc-50
        dark:bg-[#1E1E1E]
        px-4
        md:px-20
        lg:px-40
        py-6
      "
      >
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}

          <div
            className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-4
          "
          >
            <div>
              <h1
                className="
                text-3xl
                font-bold
                text-zinc-900
                dark:text-white
              "
              >
                Opportunities
              </h1>

              <p
                className="
                mt-1
                text-zinc-500
                dark:text-zinc-400
              "
              >
                Discover jobs, scholarships, trials and opportunities.
              </p>
            </div>

            <button
              onClick={() => navigate("/opportunities/create")}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                h-11
                px-5
                rounded-xl
                bg-green-600
                hover:bg-green-700
                text-white
                font-semibold
                transition
              "
            >
              <Plus size={18} />
              Create Opportunity
            </button>
          </div>

          {/* SEARCH */}

          <div
            className="
            mt-7
            relative
          "
          >
            <Search
              size={20}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-zinc-400
              "
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
                border
                border-zinc-200
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

          {/* FILTERS */}

          <div
            className="
            mt-5
            flex
            gap-2
            overflow-x-auto
            pb-2
          "
          >
            {types.map((item) => {
              const value = item === "All" ? "" : item;

              const active = type === value;

              return (
                <button
                  key={item}
                  onClick={() => setType(value)}
                  className={`
                    shrink-0
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    font-medium
                    transition
                    ${
                      active
                        ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                        : "bg-white text-zinc-600 border border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800"
                    }
                  `}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* RESULTS */}

          {loading ? (
            <div
              className="
              grid
              md:grid-cols-2
              lg:grid-cols-3
              gap-5
              mt-7
            "
            >
              {Array.from({
                length: 6,
              }).map((_, index) => (
                <div
                  key={index}
                  className="
                    h-80
                    rounded-2xl
                    bg-zinc-200
                    dark:bg-zinc-800
                    animate-pulse
                  "
                />
              ))}
            </div>
          ) : opportunities.length === 0 ? (
            <div
              className="
              mt-16
              text-center
              text-zinc-500
            "
            >
              No opportunities found.
            </div>
          ) : (
            <div
              className="
              grid
              md:grid-cols-2
              lg:grid-cols-3
              gap-5
              mt-7
            "
            >
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
