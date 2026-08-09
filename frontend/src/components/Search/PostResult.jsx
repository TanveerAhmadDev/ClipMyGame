import { FileText } from "lucide-react";

const PostResult = ({ post }) => {
  return (
    <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-zinc-50 transition">
      <div className="w-11 h-11 rounded-lg overflow-hidden bg-zinc-100 flex items-center justify-center">
        {post.media?.length ? (
          post.media[0].type === "image" ? (
            <img
              src={post.media[0].url}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={post.media[0].url}
              className="w-full h-full object-cover"
            />
          )
        ) : (
          <FileText size={18} className="text-zinc-500" />
        )}
      </div>

      <div className="flex-1 text-left">
        <p className="text-sm font-medium line-clamp-1">
          {post.caption || "Untitled Post"}
        </p>

        <p className="text-xs text-zinc-500">by {post.userId?.fullName}</p>
      </div>
    </button>
  );
};

export default PostResult;
