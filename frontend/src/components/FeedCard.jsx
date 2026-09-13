import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Play,
  MoreHorizontal,
  MapPin,
} from "lucide-react";
import TimeAgo from "./TimeAgo";
import MediaPreviewModal from "./MediaPreviewModal";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../utils/axios";

const FeedCard = ({
  post,
  onLike,
  postOptionBox,
  setPostOptionBox,
  addSuffix,
}) => {
  const images = post?.media?.filter((item) => item.type === "image") || [];

  const videos = post?.media?.filter((item) => item.type === "video") || [];

  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openPreview = (index) => {
    setCurrentIndex(index);
    setPreviewOpen(true);
  };

  const handleDeletePost = async (postId) => {
    try {
      await api.delete(`/post/${postId}`);

      toast.success("Post deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete post.");
    }
  };

  const likes = post?.performance?.likes || 0;
  const liked = post?.liked || false;
  return (
    <>
      <div className="relative bg-white mb-3 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-sm overflow-hidden">
        {postOptionBox === post._id && (
          <div className="absolute top-14 right-5 z-50 w-40 rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-lg p-2">
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700">
              Edit Post
            </button>

            <button
              onClick={() => handleDeletePost(post._id)}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700"
            >
              Delete Post
            </button>

            <button
              onClick={() => setPostOptionBox(null)}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700"
            >
              Cancel
            </button>
          </div>
        )}
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <img
              src={
                post?.userId?.profilePhoto ||
                `https://ui-avatars.com/api/?name=${post?.userId?.userName}`
              }
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />

            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                {post?.userId?.fullName || post?.userId?.userName}
              </h2>

              <p className="text-sm text-green-600">
                {post?.roleData?.sport},{" "}
                {post?.roleData?.position || post?.userId?.userRole || "User"} •{" "}
                <TimeAgo date={post.createdAt} addSuffix={addSuffix} />
              </p>

              {post?.location?.city && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin size={13} />
                  {post.location.city}
                  {post.location.country && `, ${post.location.country}`}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() =>
              setPostOptionBox(postOptionBox === post._id ? null : post._id)
            }
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <MoreHorizontal className="text-gray-500" />
          </button>
        </div>

        {/* Caption */}
        <div className="px-5 pb-4">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {post?.caption}
          </p>
        </div>

        {/* Video */}
        <div className="relative">
          {images.length > 0 ? (
            <div
              className={`grid gap-1 overflow-hidden rounded-xl ${
                images.length === 1
                  ? "grid-cols-1"
                  : images.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-2"
              }`}
            >
              {images.slice(0, 4).map((item, index) => (
                <div key={item._id} className="relative">
                  <img
                    src={item.url}
                    alt=""
                    onClick={() => openPreview(index)}
                    className={`cursor-pointer object-cover w-full ${
                      images.length === 1 ? "h-130" : "h-65"
                    }`}
                  />

                  {index === 3 && images.length > 4 && (
                    <div
                      onClick={() => openPreview(index)}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-4xl font-bold cursor-pointer"
                    >
                      +{images.length - 4}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : videos.length > 0 ? (
            <div className="relative">
              <video
                src={videos[0].url}
                onClick={() => openPreview(0)}
                className="w-full max-h-162.5 object-cover cursor-pointer"
              />

              <button
                onClick={() => openPreview(0)}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-18 h-18 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                  <Play fill="white" className="text-white ml-1" size={30} />
                </div>
              </button>
            </div>
          ) : null}
        </div>

        {/* Stats */}
        <div className="flex justify-between px-5 py-3 text-sm text-gray-500 border-b border-gray-200 dark:border-zinc-800">
          <span className="flex gap-1">
            <Heart size={20} fill={liked ? "red" : "none"} />
            {post?.performance?.likes || 0} Likes
          </span>

          <span>{post?.performance?.comments || 0} Comments</span>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-4">
          <Action
            icon={<Heart size={20} fill={liked ? "red" : "none"} />}
            label={likes}
            active={liked}
            onClick={() => onLike(post._id)}
          />
          <Action icon={<MessageCircle size={20} />} label="Comment" />
          <Action icon={<Share2 size={20} />} label="Share" />
          <Action icon={<Bookmark size={20} />} label="Save" />
        </div>
        <MediaPreviewModal
          open={previewOpen}
          media={post.media}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClose={() => setPreviewOpen(false)}
        />
      </div>
    </>
  );
};

const Action = ({ icon, label, onClick, disabled = false, active = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        flex
        items-center
        justify-center
        gap-2
        py-4
        transition
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${
          active
            ? "text-blue-600 dark:text-blue-400"
            : "text-gray-600 dark:text-gray-300"
        }
        hover:bg-gray-100
        dark:hover:bg-zinc-800
      `}
    >
      {icon}

      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default FeedCard;
