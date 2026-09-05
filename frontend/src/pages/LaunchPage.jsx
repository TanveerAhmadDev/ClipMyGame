import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Trophy,
  Users,
  Search,
  BriefcaseBusiness,
  GraduationCap,
  Video,
  Target,
  Zap,
  ShieldCheck,
  Sparkles,
  Check,
  ChevronRight,
  Clapperboard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
const roles = [
  {
    icon: Trophy,
    title: "Athletes",
    description:
      "Build your profile, showcase your skills and put your game in front of the right people.",
  },
  {
    icon: Search,
    title: "Scouts",
    description:
      "Discover emerging talent through profiles, clips, skills and performance.",
  },
  {
    icon: Users,
    title: "Coaches",
    description:
      "Connect with athletes and build stronger teams around your vision.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Teams",
    description:
      "Find the players and people you need to take your team forward.",
  },
];
const opportunities = [
  {
    icon: BriefcaseBusiness,
    title: "Jobs",
    description: "Find your next role in the sports ecosystem.",
  },
  {
    icon: GraduationCap,
    title: "Scholarships",
    description:
      "Discover opportunities to take your education and game further.",
  },
  {
    icon: Trophy,
    title: "Trials",
    description: "Find trials and opportunities to prove yourself.",
  },
];
const steps = [
  {
    number: "01",
    title: "Create your profile",
    description:
      "Build a professional sports profile that represents who you are.",
  },
  {
    number: "02",
    title: "Show your game",
    description:
      "Upload your best clips, skills and achievements in one place.",
  },
  {
    number: "03",
    title: "Get discovered",
    description:
      "Put yourself in front of coaches, scouts, teams and organizations.",
  },
  {
    number: "04",
    title: "Find opportunities",
    description:
      "Connect with opportunities that can move your career forward.",
  },
];
const LaunchPage = () => {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-zinc-950 overflow-hidden">
      {/* ========================================================= NAVBAR ========================================================= */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-10 pt-4">
          <div className="h-16 rounded-2xl border border-zinc-200/80 bg-white/85 backdrop-blur-xl shadow-sm flex items-center justify-between px-4 sm:px-6">
            {/* Logo */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 group"
            >
              <Clapperboard />
              <span className="font-black tracking-tight text-lg">
                ClipMyGame
              </span>
            </button>
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
              <a href="#platform" className="hover:text-zinc-950 transition">
                Platform
              </a>
              <a
                href="#opportunities"
                className="hover:text-zinc-950 transition"
              >
                Opportunities
              </a>
              <a
                href="#how-it-works"
                className="hover:text-zinc-950 transition"
              >
                How it works
              </a>
              <a href="#community" className="hover:text-zinc-950 transition">
                Community
              </a>
            </div>
            <button
              onClick={() => navigate("/signup")}
              className="group inline-flex items-center gap-2 bg-zinc-950 text-white px-4 sm:px-5 h-10 rounded-xl text-sm font-semibold hover:bg-zinc-800 transition"
            >
              Join ClipMyGame
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </nav>
      {/* ========================================================= HERO ========================================================= */}
      <section className="relative min-h-screen overflow-hidden pt-28 sm:pt-32 lg:pt-40 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-10">
        {/* Background decoration */}
        <div className=" absolute top-40 left-1/2 -translate-x-1/2 w-80 h-80 sm:w-125 sm:h-125 lg:w-175 lg:h-175 bg-green-400/15 rounded-full blur-[90px] sm:blur-[120px] lg:blur-[140px] pointer-events-none " />
        <div className=" absolute top-100 -right-30 sm:right-0 w-72 h-72 sm:w-100 sm:h-100 bg-blue-400/10 rounded-full blur-[100px] pointer-events-none " />
        <div className="relative mx-auto max-w-350">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className=" grid lg:grid-cols-[1.05fr_0.95fr] gap-10 sm:gap-14 lg:gap-20 items-center "
          >
            {/* ===================================================== */}
            {/* LEFT */}
            {/* ===================================================== */}
            <div className="min-w-0">
              {/* Badge */}
              <motion.div
                variants={fadeUp}
                className=" inline-flex max-w-full items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-300 bg-white text-[11px] sm:text-sm font-semibold mb-6 sm:mb-7 "
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="truncate">
                  The future of sports networking
                </span>
              </motion.div>
              {/* Heading */}
              <motion.h1
                variants={fadeUp}
                className=" font-black tracking-[-0.065em] leading-[0.86] text-[2.8rem] xs:text-[3.5rem] sm:text-[4rem] md:text-[6rem] lg:text-[clamp(5rem,5.5vw,8.5rem)] max-w-full "
              >
                YOUR GAME. <br />
                <span className="text-green-600">YOUR STORY.</span> <br /> YOUR
                NEXT <br />
                <span className="relative inline-block max-w-full wrap-break-word text-green-600">
                  OPPORTUNITY.
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                    className=" absolute left-0 bottom-0.5 sm:bottom-2 h-1.5 sm:h-3 bg-green-400 -z-10 "
                  />
                </span>
                YOUR MOMENTS
                <span className="relative inline-block max-w-full wrap-break-word text-green-600">
                  AMPLIFIED.
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                    className=" absolute left-0 bottom-0.5 sm:bottom-2 h-1.5 sm:h-3 bg-green-400 -z-10 "
                  />
                </span>
              </motion.h1>
              {/* Description */}
              <motion.p
                variants={fadeUp}
                className=" mt-7 sm:mt-8 max-w-160 text-sm sm:text-base lg:text-xl leading-relaxed text-zinc-600 "
              >
                ClipMyGame is where athletes showcase their game, connect with
                the sports community and discover opportunities that can take
                their career further.
              </motion.p>
              {/* Buttons */}
              <motion.div
                variants={fadeUp}
                className=" mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3 w-full sm:w-auto "
              >
                <button
                  onClick={() => navigate("/signup")}
                  className=" group h-12 sm:h-13 w-full sm:w-auto px-6 sm:px-7 rounded-xl bg-zinc-950 text-white font-bold flex items-center justify-center gap-3 hover:bg-green-600 transition-colors "
                >
                  Create your profile
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
                <a
                  href="#platform"
                  className=" h-12 sm:h-13 w-full sm:w-auto px-6 sm:px-7 rounded-xl border border-zinc-300 bg-white font-bold flex items-center justify-center gap-3 hover:bg-zinc-100 transition-colors "
                >
                  <Play size={17} fill="currentColor" /> Explore ClipMyGame
                </a>
              </motion.div>
              {/* Stats */}
              <motion.div
                variants={fadeUp}
                className=" mt-9 sm:mt-12 flex flex-wrap items-center gap-x-5 sm:gap-x-8 gap-y-4 "
              >
                <div>
                  <p className="text-xl sm:text-2xl font-black">01</p>
                  <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider">
                    Platform
                  </p>
                </div>
                <div className="w-px h-8 sm:h-9 bg-zinc-300" />
                <div>
                  <p className="text-xl sm:text-2xl font-black">∞</p>
                  <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider">
                    Possibilities
                  </p>
                </div>
                <div className="w-px h-8 sm:h-9 bg-zinc-300" />
                <div>
                  <p className="text-xl sm:text-2xl font-black">24/7</p>
                  <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-wider">
                    Discovery
                  </p>
                </div>
              </motion.div>
            </div>
            {/* ===================================================== */}
            {/* RIGHT VISUAL */}
            {/* ===================================================== */}
            <motion.div
              variants={scaleIn}
              className=" relative min-h-95 sm:min-h-125 lg:min-h-165 w-full mt-6 lg:mt-0 "
            >
              {/* Main visual */}
              <motion.div
                animate={{ rotate: [-1, 1, -1], y: [0, -5, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className=" absolute inset-x-2 sm:inset-x-8 top-2 bottom-5 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-zinc-950 shadow-[10px_12px_0px_#18181b] sm:shadow-[20px_25px_0px_#18181b] "
              >
                <img
                  src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop"
                  alt="Athlete"
                  className=" absolute inset-0 w-full h-full object-cover opacity-80 "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                {/* Top labels */}
                <div className="absolute top-3 sm:top-5 left-3 sm:left-5 right-3 sm:right-5 flex justify-between gap-2">
                  <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/90 text-[9px] sm:text-xs font-bold">
                    CLIPMYGAME
                  </span>
                  <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-green-400 text-[9px] sm:text-xs font-bold">
                    LIVE
                  </span>
                </div>
                {/* Bottom text */}
                <div className="absolute bottom-5 sm:bottom-7 left-4 sm:left-6 right-4 sm:right-6 text-white">
                  <p className="text-[10px] sm:text-sm text-white/70 mb-1 sm:mb-2">
                    SHOWCASE YOUR GAME
                  </p>
                  <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[0.9]">
                    GET <br /> DISCOVERED.
                  </h2>
                </div>
              </motion.div>
              {/* ================================================= */}
              {/* FLOATING PROFILE CARD */}
              {/* ================================================= */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className=" absolute left-0 sm:left-2 bottom-1 sm:bottom-5 bg-white rounded-xl sm:rounded-2xl shadow-xl border border-zinc-200 p-2.5 sm:p-4 w-48 sm:w-64 z-10 "
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                    className=" w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover shrink-0 "
                    alt=""
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-xs sm:text-sm truncate">
                      Athlete Profile
                    </p>
                    <p className="text-[10px] sm:text-xs text-zinc-500 truncate">
                      Ready to be discovered
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex gap-1.5 overflow-hidden">
                  <span className="text-[9px] sm:text-[10px] bg-zinc-100 rounded-full px-2 py-1 whitespace-nowrap">
                    Football
                  </span>
                  <span className="text-[9px] sm:text-[10px] bg-zinc-100 rounded-full px-2 py-1 whitespace-nowrap">
                    U21
                  </span>
                  <span className="text-[9px] sm:text-[10px] bg-green-100 text-green-700 rounded-full px-2 py-1 whitespace-nowrap">
                    Verified
                  </span>
                </div>
              </motion.div>
              {/* ================================================= */}
              {/* OPPORTUNITY CARD */}
              {/* ================================================= */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className=" absolute right-0 sm:right-2 top-12 sm:top-24 bg-green-400 rounded-xl sm:rounded-2xl shadow-xl p-2.5 sm:p-4 w-42 sm:w-58 z-10 "
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-black text-white flex items-center justify-center">
                    <Target size={17} className="sm:hidden" />
                    <Target size={20} className="hidden sm:block" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold">NEW</span>
                </div>
                <p className="mt-3 sm:mt-4 text-[9px] sm:text-xs font-semibold uppercase">
                  Opportunity
                </p>
                <p className="font-black text-sm sm:text-lg leading-tight">
                  Scholarship Open
                </p>
                <div className="mt-2 sm:mt-3 flex items-center gap-1 text-[10px] sm:text-xs font-semibold">
                  View opportunity <ChevronRight size={13} />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* ========================================================= MARQUEE ========================================================= */}
      <section className="border-y border-zinc-200 bg-zinc-950 text-white overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex w-max"
        >
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="flex items-center gap-8 py-5 pr-8">
              {[
                "ATHLETES",
                "COACHES",
                "SCOUTS",
                "TEAMS",
                "OPPORTUNITIES",
                "YOUR GAME",
                "YOUR FUTURE",
              ].map((item) => (
                <React.Fragment key={item}>
                  <span className="text-xl sm:text-2xl font-black tracking-tight">
                    {item}
                  </span>
                  <Sparkles size={18} className="text-green-400 shrink-0" />
                </React.Fragment>
              ))}
            </div>
          ))}
        </motion.div>
      </section>
      {/* ========================================================= PLATFORM ========================================================= */}
      <section id="platform" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-10">
        <div className="max-w-350 mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div variants={fadeUp}>
              <p className="text-sm font-black text-green-600 uppercase tracking-widest">
                One platform. Everyone connected.
              </p>
              <h2 className="mt-4 text-5xl sm:text-6xl lg:text-8xl font-black tracking-[-0.06em] leading-[0.9] max-w-220">
                BUILT FOR <br /> THE SPORTS <br />
                <span className="text-zinc-400">ECOSYSTEM.</span>
              </h2>
            </motion.div>
            <motion.div
              variants={stagger}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16"
            >
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <motion.div
                    key={role.title}
                    variants={fadeUp}
                    whileHover={{ y: -8 }}
                    className="group rounded-3xl bg-white border border-zinc-200 p-6 sm:p-7 hover:shadow-xl transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-zinc-950 text-white flex items-center justify-center group-hover:bg-green-500 group-hover:text-zinc-950 transition-colors">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-8 text-2xl font-black">{role.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                      {role.description}
                    </p>
                    <div className="mt-8 flex items-center gap-2 text-sm font-bold">
                      Learn more
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* ========================================================= SHOWCASE ========================================================= */}
      <section className="px-4 sm:px-6 lg:px-10 pb-24 sm:pb-32">
        <div className="max-w-350 mx-auto">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#d9ff49] px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950 text-white text-xs font-bold">
                  <Video size={14} /> YOUR GAME, YOUR WAY
                </div>
                <h2 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.06em] leading-[0.9]">
                  TURN YOUR <br /> GAME INTO <br /> YOUR STORY.
                </h2>
                <p className="mt-7 max-w-130 text-zinc-700 leading-relaxed">
                  Your best moments deserve more than a camera roll. Create a
                  profile where your clips, skills, achievements and journey
                  live together.
                </p>
                <button
                  onClick={() => navigate("/signup")}
                  className="mt-8 inline-flex items-center gap-3 bg-zinc-950 text-white px-6 h-12 rounded-xl font-bold hover:bg-zinc-800 transition"
                >
                  Start building <ArrowRight size={18} />
                </button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40, rotate: 3 }}
                whileInView={{ opacity: 1, x: 0, rotate: 2 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-2xl rotate-2">
                  <div className="aspect-video rounded-2xl overflow-hidden bg-zinc-900 relative">
                    <img
                      src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1200&auto=format&fit=crop"
                      alt="Sports"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute left-5 bottom-5 text-white">
                      <p className="text-xs uppercase font-bold text-white/60">
                        Highlight
                      </p>
                      <p className="text-2xl font-black mt-1">Match Day</p>
                    </div>
                    <div className="absolute right-4 top-4 w-10 h-10 rounded-full bg-white flex items-center justify-center text-zinc-950">
                      <Play size={17} fill="currentColor" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <p className="font-black">Your latest clip</p>
                      <p className="text-xs text-zinc-500">
                        Showcase your performance
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center">
                      <Zap size={18} />
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: [-3, 3, -3], y: [0, -8, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-5 -left-3 sm:-left-8 bg-zinc-950 text-white rounded-2xl px-5 py-4 shadow-xl"
                >
                  <p className="text-xs text-zinc-400">PROFILE STATUS</p>
                  <p className="font-black mt-1">READY TO DISCOVER</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* ========================================================= OPPORTUNITIES ========================================================= */}
      <section
        id="opportunities"
        className="bg-zinc-950 text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-10"
      >
        <div className="max-w-350 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
          >
            <motion.div
              variants={fadeUp}
              className="flex flex-col lg:flex-row lg:items-end justify-between gap-8"
            >
              <div>
                <p className="text-green-400 text-sm font-black uppercase tracking-widest">
                  Don't just get discovered.
                </p>
                <h2 className="mt-4 text-5xl sm:text-6xl lg:text-8xl font-black tracking-[-0.06em] leading-[0.88]">
                  DISCOVER <br /> WHAT'S <br />
                  <span className="text-zinc-500">NEXT.</span>
                </h2>
              </div>
              <p className="max-w-120 text-zinc-400 leading-relaxed">
                Find opportunities created for people in sports. From jobs and
                scholarships to trials and recruiting opportunities.
              </p>
            </motion.div>
            <motion.div
              variants={stagger}
              className="grid md:grid-cols-3 gap-4 mt-16"
            >
              {opportunities.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    whileHover={{ y: -8, rotate: index % 2 === 0 ? -1 : 1 }}
                    className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7 group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-green-400 text-zinc-950 flex items-center justify-center">
                        <Icon size={22} />
                      </div>
                      <span className="text-zinc-600 font-black">
                        0{index + 1}
                      </span>
                    </div>
                    <h3 className="mt-12 text-3xl font-black">{item.title}</h3>
                    <p className="mt-3 text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-8 flex items-center justify-between">
                      <span className="text-sm font-bold">
                        Explore opportunities
                      </span>
                      <div className="w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center group-hover:bg-green-400 group-hover:text-zinc-950 group-hover:border-green-400 transition">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* ========================================================= HOW IT WORKS ========================================================= */}
      <section
        id="how-it-works"
        className="py-24 sm:py-32 px-4 sm:px-6 lg:px-10"
      >
        <div className="max-w-350 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <p className="text-sm font-black text-green-600 uppercase tracking-widest">
                Simple by design
              </p>
              <h2 className="mt-4 text-5xl sm:text-6xl lg:text-8xl font-black tracking-[-0.06em] leading-[0.88]">
                FROM <br /> <span className="text-zinc-400">CLIP</span> <br />{" "}
                TO <br />
                <span className="text-green-600">OPPORTUNITY.</span>
              </h2>
            </motion.div>
            <motion.div variants={stagger} className="mt-20">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  className="group border-t border-zinc-300 py-8 sm:py-10 grid md:grid-cols-[100px_1fr_1fr] gap-5 md:gap-10 items-start"
                >
                  <span className="text-green-600 text-sm font-black">
                    {step.number}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tight group-hover:translate-x-2 transition-transform">
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 max-w-120 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* ========================================================= COMMUNITY ========================================================= */}
      <section id="community" className="px-4 sm:px-6 lg:px-10 pb-24 sm:pb-32">
        <div className="max-w-350 mx-auto">
          <div className="rounded-[2rem] overflow-hidden bg-white border border-zinc-200">
            <div className="grid lg:grid-cols-2">
              <div className="p-7 sm:p-10 lg:p-16">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={stagger}
                >
                  <motion.div
                    variants={fadeUp}
                    className="w-14 h-14 rounded-2xl bg-zinc-950 text-white flex items-center justify-center"
                  >
                    <Users size={25} />
                  </motion.div>
                  <motion.h2
                    variants={fadeUp}
                    className="mt-8 text-5xl sm:text-6xl font-black tracking-[-0.05em] leading-[0.9]"
                  >
                    MORE THAN <br /> A PROFILE. <br />
                    <span className="text-green-600">A COMMUNITY.</span>
                  </motion.h2>
                  <motion.p
                    variants={fadeUp}
                    className="mt-7 text-zinc-500 leading-relaxed max-w-120"
                  >
                    ClipMyGame brings the sports ecosystem together so people
                    can connect, share, discover and create new possibilities.
                  </motion.p>
                  <motion.div variants={fadeUp} className="mt-8 space-y-3">
                    {[
                      "Connect with people in sports",
                      "Share your journey and achievements",
                      "Discover talent and opportunities",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center shrink-0">
                          <Check size={14} />
                        </div>
                        <span className="text-sm font-semibold">{item}</span>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
              <div className="relative min-h-100 lg:min-h-150 bg-zinc-950 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1547347298-4074fc3086f0?q=80&w=1200&auto=format&fit=crop"
                  alt="Sports community"
                  className="absolute inset-0 w-full h-full object-cover opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-green-500/20" />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-8 right-8 bg-white text-zinc-950 rounded-2xl p-4 shadow-xl"
                >
                  <ShieldCheck className="text-green-600" size={22} />
                  <p className="mt-3 font-black text-sm">
                    SPORT <br /> CONNECTED.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ========================================================= FINAL CTA ========================================================= */}
      <section className="px-4 sm:px-6 lg:px-10 pb-10">
        <div className="max-w-350 mx-auto">
          <div className="relative overflow-hidden rounded-[2rem] bg-green-400 px-6 sm:px-10 lg:px-20 py-20 sm:py-28 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Sparkles className="mx-auto text-zinc-950" size={28} />
              <h2 className="mt-6 text-5xl sm:text-7xl lg:text-[7rem] font-black tracking-[-0.07em] leading-[0.82]">
                YOUR NEXT <br /> CHAPTER <br /> STARTS HERE.
              </h2>
              <p className="mt-8 mx-auto max-w-130 text-zinc-800 leading-relaxed">
                Create your ClipMyGame profile and start putting your game, your
                story and your future in motion.
              </p>
              <button
                onClick={() => navigate("/signup")}
                className="group mt-9 h-13 px-8 rounded-xl bg-zinc-950 text-white font-bold inline-flex items-center gap-3 hover:bg-zinc-800 transition"
              >
                Join ClipMyGame
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </motion.div>
            {/* Decorative circles */}
            <div className="absolute -top-30 -left-30 w-60 h-60 rounded-full border border-zinc-950/10 pointer-events-none" />
            <div className="absolute -bottom-40 -right-20 w-80 h-80 rounded-full border border-zinc-950/10 pointer-events-none" />
          </div>
        </div>
      </section>
      {/* ========================================================= FOOTER ========================================================= */}
      <footer className="px-4 sm:px-6 lg:px-10 py-10">
        <div className="max-w-350 mx-auto border-t border-zinc-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <Clapperboard />
            <span className="font-black">ClipMyGame</span>
          </div>
          <p className="text-xs text-zinc-500">
            Your game. Your story. Your opportunity. Your moments amplified.
          </p>
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} ClipMyGame
          </p>
        </div>
      </footer>
    </main>
  );
};
export default LaunchPage;
