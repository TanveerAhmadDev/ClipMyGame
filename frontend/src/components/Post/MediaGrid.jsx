import React from "react";
// import { Play, Youtube, Facebook } from "lucide-react";

const MediaGrid = ({
  selectedFiles,
  activeIndex,
  setActiveIndex,
  removeMedia,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="grid grid-cols-2 gap-3">
        {selectedFiles.map((item, index) => {
          const isExternal = item.type === "external";
          const isImage = item.type === "image";
          const isVideo = item.type === "video";

          return (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition bg-gray-100
                ${
                  activeIndex === index
                    ? "border-green-600"
                    : "border-transparent"
                }`}
            >
              {/* Image */}
              {isImage && (
                <img
                  src={item.preview}
                  alt=""
                  className="w-full h-32 object-cover"
                />
              )}

              {/* Uploaded Video */}
              {isVideo && (
                <div className="relative">
                  <video
                    src={item.preview}
                    muted
                    className="w-full h-32 object-cover"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center">
                      {/* <Play size={17} fill="white" /> */}
                    </div>
                  </div>
                </div>
              )}

              {/* External Media */}
              {isExternal && (
                <div className="w-full h-32 bg-zinc-900 flex flex-col items-center justify-center text-white">
                  {item.platform === "youtube" ? (
                    <>
                      <span className="text-xs mt-2">YouTube</span>
                    </>
                  ) : (
                    <>
                      <span className="text-xs mt-2">Facebook</span>
                    </>
                  )}
                </div>
              )}

              {/* Remove */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeMedia(index);
                }}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MediaGrid;
