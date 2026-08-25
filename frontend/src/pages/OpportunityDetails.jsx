import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  GraduationCap,
  Trophy,
  Heart,
  MapPin,
  CalendarDays,
  ExternalLink,
  Heart as SaveIcon,
  Share2,
  CheckCircle2,
  Building2,
  Clock3,
  X,
} from "lucide-react";
import NavBar from "../components/NavBar";
import api from "../utils/axios";
import { toast } from "react-toastify";
const OpportunityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [saved, setSaved] = useState(false);

  const [applyBox, setApplyBox] = useState(false);

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/opportunities/${id}`);
        setOpportunity(data.data);
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Failed to load opportunity.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchOpportunity();
  }, [id]);
  // const handleApply = async () => {
  //   try {
  //     setApplying(true);
  //     await api.post(`/opportunities/${id}/apply`, { fullName: "Tanveerr" });
  //     toast.success("Application submitted successfully.");
  //   } catch (error) {
  //     toast.error(
  //       error.response?.data?.message || "Failed to submit application.",
  //     );
  //   } finally {
  //     setApplying(false);
  //   }
  // };

  const getTypeConfig = () => {
    const configs = {
      job: {
        label: "Job",
        icon: Briefcase,
        className: "bg-blue-50 text-blue-600 dark:bg-blue-500/10",
      },
      scholarship: {
        label: "Scholarship",
        icon: GraduationCap,
        className: "bg-purple-50 text-purple-600 dark:bg-purple-500/10",
      },
      trial: {
        label: "Trial",
        icon: Trophy,
        className: "bg-orange-50 text-orange-600 dark:bg-orange-500/10",
      },
      volunteer: {
        label: "Volunteer",
        icon: Heart,
        className: "bg-green-50 text-green-600 dark:bg-green-500/10",
      },
    };
    return (
      configs[opportunity?.type] || {
        label: "Opportunity",
        icon: Briefcase,
        className: "bg-gray-100 text-gray-600",
      }
    );
  };

  useEffect(() => {
    if (applyBox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [applyBox]);
  if (loading) {
    return (
      <>
        <NavBar />
        <main className="min-h-screen bg-gray-50 dark:bg-[#1E1E1E]">
          <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="animate-pulse space-y-5">
              <div className="h-5 w-20 bg-gray-200 dark:bg-zinc-800 rounded" />
              <div className="h-48 bg-white dark:bg-zinc-900 rounded-2xl" />
              <div className="h-80 bg-white dark:bg-zinc-900 rounded-2xl" />
            </div>
          </div>
        </main>
      </>
    );
  }
  if (!opportunity) {
    return (
      <>
        <NavBar />
        <main className="min-h-screen bg-gray-50 dark:bg-[#1E1E1E] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Opportunity not found
            </h1>
            <button
              onClick={() => navigate("/opportunities")}
              className="mt-4 px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold"
            >
              Browse opportunities
            </button>
          </div>
        </main>
      </>
    );
  }
  const config = getTypeConfig();
  const Icon = config.icon;
  return (
    <>
      {applyBox && (
        <>
          <div
            onClick={() => setApplyBox((prev) => !prev)}
            className="fixed inset-0 bg-black/15 backdrop-blur-[1px]  z-9998"
          />
          <div className="fixed top-1/2 md:top-20 left-1/2  -translate-x-1/2 -translate-y-1/2 md:translate-y-0 w-90 md:w-full max-w-200 h-[50vh] md:h-100 bg-white rounded-xl flex flex-col z-9999 overflow-hidden p-5">
            <div className="flex justify-end">
              <X onClick={() => setApplyBox(false)} />
            </div>
            <div className="">
              <h1 className="text-2xl md:text-4xl font-bold mt-5 mb-3 text-center">
                This is feature is currently under development
              </h1>
            </div>
          </div>
        </>
      )}
      <NavBar />
      <main className="min-h-screen bg-gray-50 dark:bg-[#1E1E1E] transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
          >
            <ArrowLeft size={18} /> Back
          </button>
          {/* Hero */}
          <section className="mt-5 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${config.className}`}
                >
                  <Icon size={28} />
                </div>
                <div>
                  <span className="text-sm font-semibold text-green-600">
                    {config.label}
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-1">
                    {opportunity.title}
                  </h1>
                  <div className="flex items-center gap-2 mt-2 text-gray-500 dark:text-gray-400">
                    <Building2 size={16} /> {opportunity.organization}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSaved(!saved)}
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center transition ${saved ? "bg-green-50 border-green-200 text-green-600" : "border-gray-200 dark:border-zinc-800 text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800"}`}
                >
                  <SaveIcon size={19} fill={saved ? "currentColor" : "none"} />
                </button>
                <button className="w-11 h-11 rounded-xl border border-gray-200 dark:border-zinc-800 flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 transition">
                  <Share2 size={19} />
                </button>
              </div>
            </div>
            {/* Meta */}
            {/* <div className="flex flex-wrap gap-x-6 gap-y-3 mt-7 pt-5 border-t border-gray-100 dark:border-zinc-800 text-sm text-gray-500 dark:text-gray-400"> {opportunity.location && ( <div className="flex items-center gap-2"> <MapPin size={17} /> {opportunity.location} </div> )} {opportunity.deadline && ( <div className="flex items-center gap-2"> <CalendarDays size={17} /> Deadline: {opportunity.deadline} </div> )} <div className="flex items-center gap-2"> <Clock3 size={17} /> Posted recently </div> </div> */}
          </section>
          {/* Main */}
          <div className="grid lg:grid-cols-[1fr_300px] gap-6 mt-6">
            {/* Description */}
            <section className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                About this opportunity
              </h2>
              <p className="mt-4 whitespace-pre-line leading-7 text-gray-600 dark:text-gray-400">
                {opportunity.description}
              </p>
              {/* Details */}
              {(opportunity.sport ||
                opportunity.level ||
                opportunity.compensation) && (
                <div className="mt-7 pt-6 border-t border-gray-100 dark:border-zinc-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Details
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    {opportunity.sport && (
                      <Detail label="Sport" value={opportunity.sport} />
                    )}
                    {opportunity.level && (
                      <Detail label="Level" value={opportunity.level} />
                    )}
                    {opportunity.compensation && (
                      <Detail
                        label="Compensation"
                        value={opportunity.compensation}
                      />
                    )}
                  </div>
                </div>
              )}
              {/* Tags */}
              {opportunity.tags?.length > 0 && (
                <div className="mt-7 pt-6 border-t border-gray-100 dark:border-zinc-800">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Skills & tags
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {opportunity.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-zinc-800 text-sm text-gray-600 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
            {/* Apply */}
            <aside>
              <div className="sticky top-20 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Interested?
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-5">
                  Apply now and take the next step toward this opportunity.
                </p>
                <button
                  onClick={() => setApplyBox(true)}
                  disabled={applying}
                  className="w-full mt-5 h-12 rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold transition"
                >
                  {applying ? "Applying..." : "Apply now"}
                </button>
                {opportunity.applicationUrl && (
                  <a
                    href={opportunity.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-2 h-11 rounded-xl border border-gray-200 dark:border-zinc-800 flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                  >
                    External application <ExternalLink size={16} />
                  </a>
                )}
                <div className="flex items-center gap-2 mt-5 text-xs text-gray-400">
                  <CheckCircle2 size={15} /> Your application will be sent
                  securely.
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
};
const Detail = ({ label, value }) => {
  return (
    <div className="rounded-xl bg-gray-50 dark:bg-zinc-800/60 p-4">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-medium text-gray-900 dark:text-white mt-1">{value}</p>
    </div>
  );
};
export default OpportunityDetails;
