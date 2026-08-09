import { useRef, useState } from "react";
import { toast } from "react-toastify";

const useMediaEditor = () => {
  const inputRef = useRef(null);

  const [mediaUploadBox, setMediaUploadBox] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [postMedia, setPostMedia] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [uploadError, setUploadError] = useState(false);

  const openEditor = () => {
    setSelectedFiles([...postMedia]);
    setMediaUploadBox(true);

    setTimeout(() => {
      if (postMedia.length === 0) {
        inputRef.current?.click();
      }
    }, 100);
  };

  const closeEditor = () => {
    setPostMedia([...selectedFiles]);
    setMediaUploadBox(false);
    setUploadError(false);
  };

  const handleNext = () => {
    setPostMedia([...selectedFiles]);
    setMediaUploadBox(false);
  };

  const tryAgain = () => {
    setUploadError(false);

    setTimeout(() => {
      inputRef.current?.click();
    }, 100);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    const existingImages = selectedFiles.some((item) =>
      item.file.type.startsWith("image/"),
    );

    const existingVideo = selectedFiles.some((item) =>
      item.file.type.startsWith("video/"),
    );

    const newImages = files.some((file) => file.type.startsWith("image/"));

    const newVideo = files.some((file) => file.type.startsWith("video/"));

    if (
      (existingImages && newVideo) ||
      (existingVideo && newImages) ||
      (newImages && newVideo)
    ) {
      setUploadError(true);
      e.target.value = "";
      return;
    }

    if (existingVideo && newVideo) {
      toast.error("Only one video can be uploaded.");
      e.target.value = "";
      return;
    }

    const mapped = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedFiles((prev) => [...prev, ...mapped]);

    setUploadError(false);

    e.target.value = "";
  };

  const removeMedia = (index) => {
    URL.revokeObjectURL(selectedFiles[index].preview);

    const updated = selectedFiles.filter((_, i) => i !== index);

    setSelectedFiles(updated);

    if (activeIndex >= updated.length) {
      setActiveIndex(Math.max(updated.length - 1, 0));
    }
  };

  return {
    inputRef,
    mediaUploadBox,
    setMediaUploadBox,
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
  };
};

export default useMediaEditor;
