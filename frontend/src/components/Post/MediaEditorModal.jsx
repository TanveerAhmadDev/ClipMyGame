import React, { useState } from "react";
import { X, Upload, Link2 } from "lucide-react";
import UploadError from "./UploadError";
import MediaGrid from "./MediaGrid";
import api from "../../utils/axios";
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
  onAddExternalMedia,
}) => {
  const [source, setSource] = useState(null);
  const [externalUrl, setExternalUrl] = useState("");
  const [externalError, setExternalError] = useState("");

  const handleAddExternalMedia = async () => {
    const url = externalUrl.trim();

    if (!url) {
      setExternalError("Please enter a media URL.");
      return;
    }

    try {
      new URL(url);
    } catch {
      setExternalError("Please enter a valid URL.");
      return;
    }

    try {
      setExternalError("");

      const { data } = await api.post("/post/resolve-media", {
        url,
      });

      const media = data.data;

      const externalMedia = {
        id: crypto.randomUUID(),
        source: "external",
        url: media.url,
        preview: media.url,
        type: media.type,
      };

      if (onAddExternalMedia) {
        onAddExternalMedia(externalMedia);
      }

      setExternalUrl("");
      setSource(null);
    } catch (error) {
      console.log(error);

      setExternalError(
        error.response?.data?.message || "Unable to load this media URL.",
      );
    }
  };
  if (!mediaUploadBox) return null;
  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeEditor}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-9998"
      />
      {/* Modal */}
      <div className=" fixed z-9999 top-2 sm:top-4 md:top-3 left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] md:w-280 h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)] md:h-205 max-w-full max-h-[calc(100vh-1rem)] bg-white rounded-xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden ">
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
            <div className="flex flex-col items-center gap-5">
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-125">
                {/* Upload from device */}
                <label className=" flex-1 cursor-pointer border border-zinc-200 bg-white hover:bg-zinc-50 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 transition shadow-sm ">
                  <div className=" w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center ">
                    <Upload size={22} />
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900">
                      Upload from device
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      Photos or videos from your device
                    </p>
                  </div>
                  <input
                    hidden
                    ref={inputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                  />
                </label>
                {/* External source */}
                <button
                  type="button"
                  onClick={() => setSource("external")}
                  className=" flex-1 border border-zinc-200 bg-white hover:bg-zinc-50 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 transition shadow-sm "
                >
                  <div className=" w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center ">
                    <Link2 size={22} />
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900">
                      Add external source
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      Add media using a URL
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 min-h-0 overflow-hidden flex-col md:flex-row">
            {/* Preview */}
            <div className=" flex-1 min-h-0 bg-[#f8fafd] flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-hidden ">
              {selectedFiles[activeIndex]?.type === "image" ? (
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
              <div className=" w-full md:w-84 h-48 md:h-auto border-t md:border-t-0 md:border-l border-zinc-100 flex flex-col shrink-0 ">
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
        {source === "external" && (
          <>
            <div
              className="absolute inset-0 z-20 bg-black/20"
              onClick={() => setSource(null)}
            />
            <div className=" absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-120 bg-white rounded-2xl shadow-2xl border border-zinc-200 p-5 ">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="hidden text-lg font-semibold">
                    Add external media
                  </h3>
                  <p className="hidden text-sm text-zinc-500 mt-1">
                    Paste a direct image or video URL.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSource(null)}
                  className=" w-9 h-9 rounded-full flex items-center justify-center hover:bg-zinc-100 transition "
                >
                  <X size={18} />
                </button>
              </div>
              {/* <input
                type="url"
                value={externalUrl}
                onChange={(e) => {
                  setExternalUrl(e.target.value);
                  setExternalError("");
                }}
                placeholder="https://example.com/image.jpg"
                className="
    w-full
    h-12
    px-4
    rounded-xl
    border
    border-zinc-200
    outline-none
    focus:border-green-500
    focus:ring-2
    focus:ring-green-500/10
  "
              /> */}

              <h1 className="text-center mb-10">
                This Feature is Currently Under Development
              </h1>
              {externalError && (
                <p className="text-sm text-red-500 mt-2">{externalError}</p>
              )}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setSource(null)}
                  className=" px-4 h-10 rounded-xl border border-zinc-200 hover:bg-zinc-50 "
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={true}
                  onClick={handleAddExternalMedia}
                  className="
    px-5
    h-10
    rounded-xl
    bg-green-600
    hover:bg-green-700
    text-white
    font-semibold disabled:bg-gray-500
  "
                >
                  Add media
                </button>
              </div>
            </div>
          </>
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
