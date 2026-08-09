import React from "react";

const MediaGrid = ({
  selectedFiles,
  activeIndex,
  setActiveIndex,
  removeMedia,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="grid grid-cols-2 gap-3">
        {selectedFiles.map((item, index) => (
          <div
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition
            ${
              activeIndex === index
                ? "border-green-600"
                : "border-transparent"
            }`}
          >
            {item.file.type.startsWith("image") ? (
              <img
                src={item.preview}
                alt=""
                className="w-full h-auto max-h-60 object-cover bg-gray-100"
              />
            ) : (
              <video
                src={item.preview}
                muted
                className="w-full h-auto"
              />
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                removeMedia(index);
              }}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white hover:bg-black/80"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaGrid;