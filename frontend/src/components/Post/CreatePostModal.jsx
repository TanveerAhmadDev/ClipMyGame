import React, { useRef, useState } from "react";
import { Image, Pencil, X } from "lucide-react";
import PostMetaForm from "./PostMetaForm";

import MediaPreview from "./MediaPreview";
import MediaEditorModal from "./MediaEditorModal";
import useMediaEditor from "../../hooks/useMediaEditor";
import useCreatePost from "../../hooks/useCreatePost";

const CreatePostModal = ({ open, onClose, user }) => {
  const textareaRef = useRef(null);

  const [caption, setCaption] = useState("");

  const { createPost, posting } = useCreatePost();

  const {
    inputRef,

    mediaUploadBox,

    selectedFiles,
    setSelectedFiles,

    postMedia,

    activeIndex,
    setActiveIndex,

    uploadError,

    openEditor,
    closeEditor,

    handleNext,
    handleFileChange,
    removeMedia,
    tryAgain,
    setPostMedia,
  } = useMediaEditor();

  const handleChange = (e) => {
    setCaption(e.target.value);

    e.target.style.height = "auto";

    e.target.style.height = `${Math.min(e.target.scrollHeight, 500)}px`;
  };

  const [visibility, setVisibility] = useState("Public");

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const [metadata, setMetadata] = useState({
    contentType: "general",
    sport: "",
    skills: [],
    level: "",
    location: {
      countryCode: "",
      country: "",

      stateCode: "",
      state: "",

      city: "",
    },
    tags: [],
  });

  const addTag = (value) => {
    const tag = value.trim().replace(/\s+/g, "");

    if (!tag) return;

    if (tags.includes(tag)) return;

    if (tags.length >= 8) return;

    setTags((prev) => [...prev, tag]);

    setTagInput("");
  };

  const removeTag = (tag) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();

      addTag(tagInput);
    }
  };

  const handlePost = async () => {
    await createPost({
      caption,
      visibility,
      media: postMedia,

      ...metadata,

      onSuccess() {
        setCaption("");
        setPostMedia([]);
        onClose();
      },
    });
  };

  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/15 backdrop-blur-[1px]  z-9998"
      />

      <div className="fixed top-5 md:top-10 left-1/2 -translate-x-1/2 w-90 md:w-full max-w-200 h-[90vh] md:h-162.5 bg-white dark:bg-[#1E1E1E]  rounded-xl flex flex-col z-9999 overflow-hidden">
        {/* HEADER */}
        <header className="h-20 shrink-0 px-6 flex items-center justify-between border-b border-zinc-200">
          <div className="flex items-center gap-3">
            <img
              src={user?.profilePhoto}
              alt=""
              className="w-14 h-14 rounded-full object-cover"
            />

            <div>
              <h2 className="font-semibold text-lg dark:text-white">
                {user?.fullName}
              </h2>

              <p className="text-sm text-gray-500">@{user?.userName}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center dark:text-white"
          >
            <X />
          </button>
        </header>
        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-2">
          <div className="pt-2">
            <textarea
              ref={textareaRef}
              value={caption}
              onChange={handleChange}
              placeholder="Share your training, achievements or match highlights..."
              className="w-full min-h-48 resize-none outline-none text-lg placeholder:text-gray-400 dark:text-white"
            />

            <MediaPreview media={postMedia} />
          </div>

          <PostMetaForm metadata={metadata} setMetadata={setMetadata} />
        </div>
        {/* FOOTER */}
        <div className="shrink-0 px-5 py-4 border-t border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {postMedia.length > 0 ? (
              <button
                onClick={() => {
                  setSelectedFiles(postMedia);
                  openEditor();
                }}
                className="w-11 h-11 rounded-full hover:bg-gray-100 flex items-center justify-center"
              >
                <Pencil size={22} />
              </button>
            ) : (
              <button
                onClick={openEditor}
                className="w-11 h-11 rounded-full hover:bg-gray-500/20 flex items-center justify-center"
              >
                <Image className="dark:text-white" size={24} />
              </button>
            )}

            <select className="dark:bg-[#1E1E1E]  border rounded-md px-3 h-9 outline-none dark:text-white">
              <option className="">Public</option>
              <option>Followers</option>
              <option>Private</option>
            </select>
          </div>

          <button
            disabled={posting}
            onClick={handlePost}
            className="px-8 h-11 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold disabled:opacity-50"
          >
            {posting ? "Posting..." : "Post"}
          </button>
        </div>
      </div>

      <MediaEditorModal
        mediaUploadBox={mediaUploadBox}
        closeEditor={closeEditor}
        inputRef={inputRef}
        selectedFiles={selectedFiles}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        uploadError={uploadError}
        handleFileChange={handleFileChange}
        removeMedia={removeMedia}
        handleNext={handleNext}
        tryAgain={tryAgain}
      />
    </>
  );
};

export default CreatePostModal;
