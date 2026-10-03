import React from "react";
import { Play } from "lucide-react";

const MediaPreview = ({ media }) => {
  if (!media || media.length === 0) return null;

  return (
    <div className="mt-5 px-6 overflow-y-auto">
      <div
        className={`grid gap-2 ${
          media.length === 1 ? "grid-cols-1" : "grid-cols-2"
        }`}
      >
        {media.map((item, index) => {
          if (!item) return null;

          const isExternal = item.type === "external";
          const isVideo = item.type === "video";
          const isImage = item.type === "image";

          return (
            <div
              key={index}
              className="relative w-full rounded-xl overflow-hidden bg-zinc-100"
            >
              {/* IMAGE */}
              {isImage && (
                <img
                  src={item.preview}
                  alt=""
                  className="w-full rounded-xl object-cover max-h-87.5"
                />
              )}

              {/* VIDEO */}
              {isVideo && (
                <div className="relative">
                  <video
                    src={item.preview}
                    controls
                    className="w-full rounded-xl max-h-125 object-contain bg-black"
                  />

                  <div className="absolute top-3 left-3 pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center">
                      <Play size={15} fill="white" />
                    </div>
                  </div>
                </div>
              )}

              {/* YOUTUBE */}
              {isExternal && item.platform === "youtube" && (
                <div className="aspect-video w-full bg-black">
                  <iframe
                    src={item.url}
                    title="YouTube video"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {/* FACEBOOK */}
              {isExternal && item.platform === "facebook" && (
                <div className="aspect-video w-full bg-black">
                  <iframe
                    src={item.url}
                    title="Facebook video"
                    className="w-full h-full"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              )}

              {/* External platform badge */}
              {isExternal && (
                <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-black/70 text-white text-xs font-medium pointer-events-none">
                  <span className="font-bold">
                    {item.platform === "youtube" ? "▶" : "f"}
                  </span>

                  <span>
                    {item.platform === "youtube" ? "YouTube" : "Facebook"}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MediaPreview;
