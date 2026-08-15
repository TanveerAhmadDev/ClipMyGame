import React from "react";

const PostSkeleton = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl p-5 animate-pulse">
      {/* User */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-gray-200 dark:bg-zinc-800" />

        <div className="flex-1 space-y-2">
          <div className="h-3.5 w-32 rounded bg-gray-200 dark:bg-zinc-800" />
          <div className="h-3 w-20 rounded bg-gray-200 dark:bg-zinc-800" />
        </div>

        <div className="w-5 h-5 rounded bg-gray-200 dark:bg-zinc-800" />
      </div>

      {/* Caption */}
      <div className="mt-5 space-y-2">
        <div className="h-3.5 w-full rounded bg-gray-200 dark:bg-zinc-800" />
        <div className="h-3.5 w-4/5 rounded bg-gray-200 dark:bg-zinc-800" />
      </div>

      {/* Media */}
      <div className="mt-5 w-full h-64 rounded-xl bg-gray-200 dark:bg-zinc-800" />

      {/* Actions */}
      <div className="flex items-center gap-6 mt-5">
        <div className="h-8 w-16 rounded-lg bg-gray-200 dark:bg-zinc-800" />
        <div className="h-8 w-16 rounded-lg bg-gray-200 dark:bg-zinc-800" />
        <div className="h-8 w-16 rounded-lg bg-gray-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
};

export default PostSkeleton;
