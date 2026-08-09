import React from "react";

const MediaPreview = ({ media }) => {
  if (media.length === 0) return null;

  if (media[0].file.type.startsWith("video/")) {
    return (
      <div className="mt-5 px-6 overflow-y-auto">
        <video
          src={media[0].preview}
          controls
          className="w-full rounded-xl max-h-125 object-contain bg-black"
        />
      </div>
    );
  }

  return (
    <div className="mt-5 px-6 overflow-y-auto">
      <div
        className={`grid gap-2 ${
          media.length === 1 ? "grid-cols-1" : "grid-cols-2"
        }`}
      >
        {media.map((item, index) => (
          <img
            key={index}
            src={item.preview}
            alt=""
            className="w-full rounded-xl object-cover max-h-87.5"
          />
        ))}
      </div>
    </div>
  );
};

export default MediaPreview;
