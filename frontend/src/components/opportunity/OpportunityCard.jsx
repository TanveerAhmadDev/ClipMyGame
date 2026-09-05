import React from "react";
import { MapPin, CalendarDays, Briefcase, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
const OpportunityCard = ({ opportunity }) => {
  const navigate = useNavigate();

  const deadlineDate = opportunity.deadline
    ? new Date(opportunity.deadline)
    : null;

  const deadline = deadlineDate
    ? deadlineDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "No deadline";

  const isExpired = deadlineDate && deadlineDate < new Date();

  return (
    <article className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 h-fit">
      {opportunity.featureImage && (
        <img
          src={opportunity.featureImage}
          alt={opportunity.title}
          className="w-full h-44 object-cover"
        />
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className=" inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 text-xs font-semibold ">
              @{opportunity.creatorId.userName}
            </span>
            <span className=" inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 text-xs font-semibold ">
              {opportunity.type}
            </span>
            <h2 className=" mt-3 text-lg font-bold text-zinc-900 dark:text-white ">
              {opportunity.title}
            </h2>
            {opportunity.organization && (
              <p className="mt-1 text-sm text-zinc-500">
                {opportunity.organization}
              </p>
            )}
          </div>
          <button
            onClick={() => navigate(`/opportunities/${opportunity._id}`)}
            className=" w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 transition "
          >
            <ArrowUpRight size={18} className="dark:text-zinc-300" />
          </button>
        </div>
        <p className=" mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400 line-clamp-3 ">
          {opportunity.description}
        </p>
        <div className=" mt-5 flex flex-wrap gap-3 text-xs text-zinc-500 dark:text-zinc-400 ">
          {opportunity.location?.city ? (
            <span className="flex items-center gap-1">
              <MapPin size={14} /> {opportunity.location.country},
              {opportunity.location.state}, {opportunity.location.city}
            </span>
          ) : (
            <span className="flex items-center gap-1">No Location Add</span>
          )}
          <span className="flex items-center gap-1">
            <Briefcase size={14} /> {opportunity.mode}
          </span>
          <span
            className={`flex items-center gap-1 ${
              isExpired ? "text-red-500" : ""
            }`}
          >
            <CalendarDays size={14} />
            {isExpired ? "Deadline Passed" : deadline}
          </span>
        </div>
        <button
          disabled={isExpired}
          onClick={() => navigate(`/opportunities/${opportunity._id}`)}
          className=" disabled:bg-gray-500 disabled:cursor-not-allowed mt-5 w-full h-11 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold hover:opacity-90 transition "
        >
          View Opportunity
        </button>
      </div>
    </article>
  );
};
export default OpportunityCard;
