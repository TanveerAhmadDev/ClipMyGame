import React from "react";
import { useSelector } from "react-redux";

const PostingBox = ({ onClick }) => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="hidden md:block bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-sm overflow-hidden px-3 py-4 md:p-6 md:h-30">
      <div className="flex items-center gap-3 ">
        <img
          src={
            user?.profilePhoto ||
            `https://ui-avatars.com/api/?name=${user?.userName}`
          }
          alt=""
          className="hidden md:block w-12 h-12 rounded-full dark:border-zinc-900 object-cover shadow-md"
        />
        <div
          onClick={onClick}
          className="hover:cursor-pointer flex-1 h-[50%] p-2 pl-4 border-2 border-zinc-300 dark:border-zinc-500 dark:text-zinc-400 font-semibold rounded-3xl"
        >
          Start a post
        </div>
      </div>
    </div>
  );
};

export default PostingBox;
