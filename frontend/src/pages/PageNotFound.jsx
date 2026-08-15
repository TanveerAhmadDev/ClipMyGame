import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Search, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1E1E1E] text-gray-900 dark:text-white transition-colors duration-300">
      <NavBar />
      <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden flex items-center justify-center px-5 py-16">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          {/* Stadium lines */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 border border-gray-200 dark:border-zinc-800 rounded-full" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 border border-gray-200 dark:border-zinc-800 rounded-full" />
        </div>
        <div className="relative z-10 w-full max-w-3xl text-center">
          {/* Small badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-sm font-medium"
          >
            <Trophy size={16} className="text-red-500" />
            <span>Match interrupted</span>
          </motion.div>
          {/* 404 */}
          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className=" text-[clamp(8rem,25vw,18rem)] leading-none font-black tracking-[-0.08em] bg-gradient-to-br from-red-500 via-red-600 to-orange-500 bg-clip-text text-transparent select-none "
            >
              404
            </motion.h1>
            {/* Floating ball */}
            <motion.div
              animate={{ y: [0, -18, 0], rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-2xl flex items-center justify-center "
            >
              <span className="text-3xl">⚽</span>
            </motion.div>
          </div>
          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mt-5 mb-3">
              Looks like this play went out of bounds.
            </h2>
            <p className="max-w-xl mx-auto text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
              The page you're looking for doesn't exist, was moved, or the
              referee just called it offside.
            </p>
          </motion.div>
          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-9"
          >
            <button
              onClick={() => navigate("/")}
              className=" w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium shadow-lg shadow-red-600/20 transition-all duration-200 hover:-translate-y-0.5 "
            >
              <Home size={18} /> Back to Home
            </button>
            <button
              onClick={() => navigate(-1)}
              className=" w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-800 font-medium transition-all duration-200 "
            >
              <ArrowLeft size={18} /> Go Back
            </button>
          </motion.div>
          {/* Bottom status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-14 flex items-center justify-center gap-3 text-xs text-gray-400"
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>ClipMyGame • Error 404</span>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
export default PageNotFound;
