import Modal from "react-modal";
import { useEffect } from "react";

type Props = {
  isVideoOpen: boolean;
  setIsVideoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  videoUrl: string;
};

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu")) {
      // Handle youtube.com/watch?v=ID format
      if (parsed.searchParams.get("v")) {
        return `https://www.youtube.com/embed/${parsed.searchParams.get(
          "v"
        )}?autoplay=1&rel=0&modestbranding=1`;
      }
      // Handle youtu.be/ID format
      const pathnameId = parsed.pathname.split("/").filter(Boolean).pop();
      if (pathnameId) {
        return `https://www.youtube.com/embed/${pathnameId}?autoplay=1&rel=0&modestbranding=1`;
      }
    }
  } catch (error) {
    console.warn("Failed to parse YouTube URL:", error);
  }
  return null;
}

const VideoPopup = ({ isVideoOpen, setIsVideoOpen, videoUrl }: Props) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isVideoOpen) {
        setIsVideoOpen(false);
      }
    };

    if (isVideoOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isVideoOpen, setIsVideoOpen]);

  if (!videoUrl) return null;

  const isYouTube =
    videoUrl.includes("youtube") || videoUrl.includes("youtu.be");
  const embedUrl = isYouTube ? getYouTubeEmbedUrl(videoUrl) : null;
  const videoFullUrl = videoUrl.startsWith("http")
    ? videoUrl
    : `${process.env.NEXT_PUBLIC_FILE_URL ?? ""}${videoUrl}`;

  const handleClose = () => {
    setIsVideoOpen(false);
  };

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  return (
    <Modal
      isOpen={isVideoOpen}
      onRequestClose={handleClose}
      contentLabel="Video Player"
      className="tw:fixed tw:inset-0 tw:flex tw:items-center tw:justify-center tw:p-4 tw:z-50"
      overlayClassName="tw:fixed tw:inset-0 tw:bg-black/80 tw:backdrop-blur-sm tw:z-40 tw:transition-all tw:duration-300"
      closeTimeoutMS={300}
      ariaHideApp={false}
    >
      <div
        className="tw:relative tw:w-full tw:max-w-6xl tw:bg-gray-900 tw:rounded-2xl tw:shadow-2xl tw:overflow-hidden tw:animate-in tw:fade-in tw:zoom-in-95 tw:duration-300"
        onClick={handleOverlayClick}
      >
        {/* Header with close button */}
        <div className="tw:absolute tw:top-0 tw:left-0 tw:right-0 tw:h-12 tw:bg-gradient-to-b tw:from-black/50 tw:to-transparent tw:z-10 tw:flex tw:justify-end tw:items-start tw:p-3">
          <button
            onClick={handleClose}
            className="tw:group tw:w-10 tw:h-10 tw:flex tw:items-center tw:justify-center tw:rounded-full tw:bg-black/20 hover:tw:bg-black/40 tw:text-white/80 hover:tw:text-white tw:transition-all tw:duration-200 tw:backdrop-blur-sm hover:tw:scale-110"
            aria-label="Close video"
            type="button"
          >
            <svg
              className="tw:w-5 tw:h-5 tw:transition-transform group-hover:tw:rotate-90 tw:duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Video container with aspect ratio */}
        <div className="tw:relative tw:w-full tw:aspect-video tw:bg-black">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              className="tw:w-full tw:h-full tw:border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title="YouTube video player"
              loading="lazy"
            />
          ) : (
            <video
              src={videoFullUrl}
              controls
              autoPlay
              preload="metadata"
              className="tw:w-full tw:h-full tw:object-contain"
              onError={(e) => {
                console.error("Video failed to load:", e);
              }}
            >
              <track kind="captions" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Loading overlay */}
        <div className="tw:absolute tw:inset-0 tw:bg-gray-900 tw:flex tw:items-center tw:justify-center tw:opacity-0 tw:pointer-events-none tw:transition-opacity tw:duration-300 peer-loading:tw:opacity-100">
          <div className="tw:animate-spin tw:w-8 tw:h-8 tw:border-2 tw:border-white/30 tw:border-t-white tw:rounded-full"></div>
        </div>
      </div>
    </Modal>
  );
};

export default VideoPopup;
