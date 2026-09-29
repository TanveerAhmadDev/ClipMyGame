import React, { useRef, useState } from "react";
import { Image, Smile, Send } from "lucide-react";
import api from "../utils/axios";

const CommentBox = ({ user, post }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments || []);

  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    try {
      const response = await api.post("comment/add", {
        postId: post._id,
        text: comment.trim(),
      });

      console.log(response.data);

      // Get newly created comment
      const newComment = response.data.data;

      // Add new comment immediately to UI
      setComments((prev) => [newComment, ...prev]);

      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmojiClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="mt-2 mb-4 px-5 w-full border-t border-zinc-200 dark:border-zinc-800 pt-4">
      {/* ================= COMMENTS ================= */}
      {comments.length > 0 && (
        <div className="mb-5 space-y-4">
          {comments.map((item) => (
            <div key={item._id} className="flex gap-3">
              {/* Comment User Image */}
              <img
                src={item.user?.profilePhoto}
                alt={item.user?.userName || "User"}
                className="w-9 h-9 rounded-full object-cover shrink-0"
              />

              {/* Comment Content */}
              <div className="flex-1">
                <div className="inline-block bg-zinc-100 dark:bg-zinc-900 rounded-2xl px-4 py-2">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {item.user?.fullName || item.user?.userName}
                  </p>

                  <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-0.5">
                    {item.text}
                  </p>
                </div>

                {/* Comment Actions */}
                <div className="flex items-center gap-4 mt-1 ml-2 text-xs text-zinc-500">
                  <button
                    type="button"
                    className="hover:text-blue-600 font-medium"
                  >
                    Like
                  </button>

                  <button
                    type="button"
                    className="hover:text-blue-600 font-medium"
                  >
                    Reply
                  </button>

                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= COMMENT INPUT ================= */}
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        {/* Current User Image */}
        <div className="shrink-0">
          <img
            src={user?.profilePhoto}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
          />
        </div>

        {/* Input Area */}
        <div className="flex-1 flex items-center bg-zinc-100 dark:bg-zinc-900 rounded-full px-4 py-2 border border-transparent focus-within:border-zinc-300 dark:focus-within:border-zinc-700">
          <input
            ref={inputRef}
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 bg-transparent outline-none text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500"
          />

          {/* Emoji */}
          <button
            type="button"
            onClick={handleEmojiClick}
            title="Emoji"
            className="p-1.5 text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition"
          >
            <Smile size={19} />
          </button>

          {/* Image */}
          <button
            type="button"
            title="Add image"
            className="p-1.5 text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition"
          >
            <Image size={19} />
          </button>
        </div>

        {/* Send */}
        <button
          type="submit"
          disabled={!comment.trim()}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 disabled:bg-zinc-300 disabled:text-zinc-500 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600 transition"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default CommentBox;
