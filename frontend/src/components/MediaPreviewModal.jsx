import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

const MediaPreviewModal = ({
  open,
  media,
  currentIndex,
  setCurrentIndex,
  onClose,
}) => {
  useEffect(() => {
    if (!open) return;

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();

      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % media.length);
      }

      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [open, media]);

  if (!open) return null;

  const current = media[currentIndex];

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 bg-black/90 z-9998" />

      <div className="fixed inset-0 z-9999 flex items-center justify-center">
        <button onClick={onClose} className="absolute top-6 right-6 text-white">
          <X size={35} />
        </button>

        {media.length > 1 && (
          <button
            onClick={() =>
              setCurrentIndex((prev) =>
                prev === 0 ? media.length - 1 : prev - 1,
              )
            }
            className="absolute left-6 text-white"
          >
            <ChevronLeft size={40} />
          </button>
        )}

        {current.type === "image" ? (
          <img
            src={current.url}
            className="max-w-[95vw] max-h-[90vh] object-contain"
          />
        ) : (
          <video
            src={current.url}
            controls
            autoPlay
            className="max-w-[95vw] max-h-[90vh]"
          />
        )}

        {media.length > 1 && (
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % media.length)}
            className="absolute right-6 text-white"
          >
            <ChevronRight size={40} />
          </button>
        )}
      </div>
    </>
  );
};

export default MediaPreviewModal;
