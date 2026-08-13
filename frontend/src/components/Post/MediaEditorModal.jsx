import React from "react";
import { X } from "lucide-react";

import UploadError from "./UploadError";
import MediaGrid from "./MediaGrid";

const MediaEditorModal = ({
  mediaUploadBox,
  closeEditor,

  inputRef,

  selectedFiles,
  activeIndex,

  setActiveIndex,

  uploadError,

  handleFileChange,

  removeMedia,

  handleNext,

  tryAgain,
}) => {
  if (!mediaUploadBox) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeEditor}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-9998"
      />

      {/* Modal */}
      <div
        className="
          fixed z-9999
          top-2 sm:top-4 md:top-3
          left-1/2 -translate-x-1/2

          w-[calc(100%-1rem)]
          sm:w-[calc(100%-2rem)]
          md:w-280

          h-[calc(100vh-1rem)]
          sm:h-[calc(100vh-2rem)]
          md:h-205

          max-w-full
          max-h-[calc(100vh-1rem)]

          bg-white
          rounded-xl sm:rounded-2xl
          shadow-2xl

          flex flex-col
          overflow-hidden
        "
      >
        {/* Header */}
        <header className="flex items-center justify-between px-4 sm:px-6 h-14 sm:h-16 border-b border-zinc-100 shrink-0">
          <h2 className="text-lg sm:text-xl font-semibold">Editor</h2>

          <button
            onClick={closeEditor}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </header>

        {/* Content */}
        {selectedFiles.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-[#f8fafd] px-4 text-center overflow-auto">
            <div
              className="
                w-36 h-28
                sm:w-52 sm:h-40
                rounded-xl bg-gray-200
                flex items-center justify-center
                text-5xl sm:text-6xl
              "
            >
              📷
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold">
              Select files to begin
            </h1>

            <p className="text-sm sm:text-base text-gray-500">
              Share images or a single video.
            </p>

            <label className="px-5 sm:px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold cursor-pointer text-sm sm:text-base">
              Upload from computer
              <input
                hidden
                ref={inputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
        ) : (
          <div className="flex flex-1 min-h-0 overflow-hidden flex-col md:flex-row">
            {/* Preview */}
            <div
              className="
                flex-1
                min-h-0
                bg-[#f8fafd]
                flex items-center justify-center
                p-3 sm:p-6 md:p-8
                overflow-hidden
              "
            >
              {selectedFiles[activeIndex]?.file.type.startsWith("image") ? (
                <img
                  src={selectedFiles[activeIndex].preview}
                  className="max-w-full max-h-full object-contain"
                  alt="Preview"
                />
              ) : (
                <video
                  controls
                  src={selectedFiles[activeIndex].preview}
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>

            {/* Sidebar */}
            {uploadError ? (
              <div className="w-full md:w-84 border-t md:border-t-0 md:border-l border-zinc-100">
                <UploadError tryAgain={tryAgain} />
              </div>
            ) : (
              <div
                className="
                  w-full
                  md:w-84
                  h-48
                  md:h-auto
                  border-t md:border-t-0
                  md:border-l
                  border-zinc-100
                  flex flex-col
                  shrink-0
                "
              >
                <div className="px-4 sm:px-5 py-3 flex justify-between items-center">
                  <span className="font-medium">
                    {activeIndex + 1} of {selectedFiles.length}
                  </span>

                  <button
                    onClick={() => inputRef.current.click()}
                    className="text-green-600 font-medium"
                  >
                    + Add
                  </button>
                </div>

                <input
                  hidden
                  ref={inputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileChange}
                />

                <div className="flex-1 min-h-0 overflow-auto">
                  <MediaGrid
                    selectedFiles={selectedFiles}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    removeMedia={removeMedia}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="h-14 sm:h-15 flex justify-end items-center px-4 sm:px-5 border-t border-zinc-100 shrink-0">
          <button
            onClick={handleNext}
            className="px-6 sm:px-8 h-10 sm:h-11 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default MediaEditorModal;
