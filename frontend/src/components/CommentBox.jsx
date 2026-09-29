import React, { useEffect, useRef, useState } from "react";
import { Image, Smile, Send, ThumbsUp } from "lucide-react";
import { useDispatch } from "react-redux";

import api from "../utils/axios";
import { updatePostComments } from "../features/post/postSlice";

const CommentBox = ({ user, post }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [commentLikes, setCommentLikes] = useState({});

  const [loadingComments, setLoadingComments] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [likingComment, setLikingComment] = useState(null);

  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const fetchComments = async () => {
    if (!post?._id) return;

    try {
      setLoadingComments(true);

      const response = await api.get(`comment/${post._id}`);

      const fetchedComments = response.data.message || [];

      setComments(fetchedComments);

      // -----------------------------------------------------
      // Create initial like state
      // -----------------------------------------------------

      const likesState = {};

      fetchedComments.forEach((item) => {
        likesState[item._id] = {
          liked: Boolean(item.liked),
          likeCount: Number(item.likeCount || 0),
        };
      });

      setCommentLikes(likesState);
    } catch (error) {
      console.log("Get comments error:", error);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [post?._id]);

  const handleLikeComment = async (commentId) => {
    if (likingComment === commentId) {
      return;
    }

    const currentLike = commentLikes[commentId];

    if (!currentLike) {
      console.log("Like state not found for:", commentId);
      return;
    }

    const oldLiked = currentLike.liked;
    const oldLikeCount = currentLike.likeCount;

    const newLiked = !oldLiked;

    const newLikeCount = newLiked
      ? oldLikeCount + 1
      : Math.max(oldLikeCount - 1, 0);

    console.log("LIKE CLICK");
    console.log("Comment ID:", commentId);
    console.log("Old:", oldLiked);
    console.log("New:", newLiked);

    setCommentLikes((previous) => ({
      ...previous,

      [commentId]: {
        liked: newLiked,
        likeCount: newLikeCount,
      },
    }));

    try {
      setLikingComment(commentId);

      let response;

      if (newLiked) {
        response = await api.post("comment/like", {
          commentId,
        });
      } else {
        response = await api.post("comment/unlike", {
          commentId,
        });
      }

      console.log("BACKEND LIKE RESPONSE:", response.data);

      const { liked, likeCount } = response.data.data;

      setCommentLikes((previous) => ({
        ...previous,

        [commentId]: {
          liked: Boolean(liked),
          likeCount: Number(likeCount),
        },
      }));
    } catch (error) {
      console.log("Comment like error:", error);

      setCommentLikes((previous) => ({
        ...previous,

        [commentId]: {
          liked: oldLiked,
          likeCount: oldLikeCount,
        },
      }));
    } finally {
      setLikingComment(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = comment.trim();

    if (!text || submitting) {
      return;
    }

    try {
      setSubmitting(true);

      const response = await api.post("comment/add", {
        postId: post._id,
        text,
      });

      const newComment = response.data.message.comment;

      const commentsCount = response.data.message.commentsCount;

      setComments((previous) => [newComment, ...previous]);

      setCommentLikes((previous) => ({
        ...previous,

        [newComment._id]: {
          liked: false,
          likeCount: 0,
        },
      }));

      dispatch(
        updatePostComments({
          postId: post._id,
          comments: commentsCount,
        }),
      );

      setComment("");

      inputRef.current?.focus();
    } catch (error) {
      console.log("Add comment error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-2 mb-4 px-5 w-full border-t border-zinc-200 dark:border-zinc-800 pt-4">
      {loadingComments ? (
        <div className="py-4 text-center text-sm text-zinc-500">
          Loading comments...
        </div>
      ) : comments.length > 0 ? (
        <div className="mb-5 space-y-4">
          {comments.map((item) => {
            // Get like state for THIS comment
            const likeData = commentLikes[item._id];

            const isLiked = likeData?.liked ?? false;

            const likeCount = likeData?.likeCount ?? 0;

            const isProcessing = likingComment === item._id;

            return (
              <div key={item._id} className="flex gap-3 px-2">
                <img
                  src={item.user?.profilePhoto || "/default-avatar.png"}
                  alt={item.user?.userName || "User"}
                  className="w-9 h-9 rounded-full object-cover shrink-0 self-start"
                />

                <div className="flex-1 min-w-0">
                  <div className="inline-block max-w-full bg-zinc-100 dark:bg-zinc-900 rounded-2xl px-4 py-2">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                      {item.user?.fullName || item.user?.userName || "User"}
                    </p>

                    <p className="text-sm text-zinc-700 dark:text-zinc-300 mt-0.5 break-words">
                      {item.text}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-1 ml-2 text-xs">
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => handleLikeComment(item._id)}
                      className={`flex items-center gap-1 font-medium transition-all duration-200 ${
                        isLiked
                          ? "text-blue-600"
                          : "text-zinc-500 hover:text-blue-600"
                      }`}
                    >
                      <ThumbsUp
                        size={14}
                        className={`transition-all duration-200 ${
                          isLiked ? "fill-blue-600 scale-110" : ""
                        }`}
                      />

                      <span>{isLiked ? "Liked" : "Like"}</span>
                    </button>

                    {likeCount > 0 && (
                      <span className="text-zinc-500">{likeCount}</span>
                    )}

                    <button
                      type="button"
                      className="text-zinc-500 hover:text-blue-600 font-medium"
                    >
                      Reply
                    </button>

                    <span className="text-zinc-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-4 mb-2 text-center text-sm text-zinc-500">
          No comments yet. Be the first to comment.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <div className="shrink-0">
          <img
            src={user?.profilePhoto || "/default-avatar.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
          />
        </div>

        <div className="flex-1 flex items-center bg-zinc-100 dark:bg-zinc-900 rounded-full px-4 py-2 border border-transparent focus-within:border-zinc-300 dark:focus-within:border-zinc-700">
          <input
            ref={inputRef}
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            disabled={submitting}
            className="flex-1 bg-transparent outline-none text-sm text-zinc-900 dark:text-white placeholder:text-zinc-500"
          />

          <button
            type="button"
            title="Emoji"
            className="p-1.5 text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition"
          >
            <Smile size={19} />
          </button>

          <button
            type="button"
            title="Add image"
            className="p-1.5 text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition"
          >
            <Image size={19} />
          </button>
        </div>

        <button
          type="submit"
          disabled={!comment.trim() || submitting}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 disabled:bg-zinc-300 disabled:text-zinc-500 dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600 transition"
        >
          {submitting ? (
            <span className="text-xs">...</span>
          ) : (
            <Send size={18} />
          )}
        </button>
      </form>
    </div>
  );
};

export default CommentBox;
