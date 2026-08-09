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
      <div
        onClick={closeEditor}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-9998"
      />

      <div className="fixed top-8 left-1/2 -translate-x-1/2 w-280 h-205 bg-white rounded-2xl shadow-2xl z-9999 flex flex-col md:overflow-hidden">
        {/* Header */}

        <header className="flex items-center justify-between px-6 h-16 border-b border-zinc-100">
          <h2 className="text-xl font-semibold">Editor</h2>

          <button
            onClick={closeEditor}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center"
          >
            <X />
          </button>
        </header>

        {selectedFiles.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-[#f8fafd]">
            <div className="w-52 h-40 rounded-xl bg-gray-200 flex items-center justify-center text-6xl">
              📷
            </div>

            <h1 className="text-3xl font-semibold">Select files to begin</h1>

            <p className="text-gray-500">Share images or a single video.</p>

            <label className="px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold cursor-pointer">
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
          <div className="flex flex-1 overflow-hidden">
            {/* Preview */}

            <div className="flex-1 bg-[#f8fafd] flex items-center justify-center p-8">
              {selectedFiles[activeIndex]?.file.type.startsWith("image") ? (
                <img
                  src={selectedFiles[activeIndex].preview}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <video
                  controls
                  src={selectedFiles[activeIndex].preview}
                  className="max-w-full max-h-full"
                />
              )}
            </div>

            {/* Sidebar */}

            {uploadError ? (
              <UploadError tryAgain={tryAgain} />
            ) : (
              <div className="w-84 border-l border-zinc-100 flex flex-col">
                <div className="px-5 py-3 flex justify-between items-center">
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

                <MediaGrid
                  selectedFiles={selectedFiles}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                  removeMedia={removeMedia}
                />
              </div>
            )}
          </div>
        )}

        <div className="h-15 flex justify-end items-center px-5 border-t border-zinc-100">
          <button
            onClick={handleNext}
            className="px-8 h-11 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default MediaEditorModal;
