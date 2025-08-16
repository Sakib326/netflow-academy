import ModalVideo from "react-modal-video";
import ReactPlayer from "react-player";

const VideoPopup = ({
  isVideoOpen,
  setIsVideoOpen,
  videoId = "bgMEvrd2E",
}: any) => {
  return (
    <>
      {/* @ts-ignore */}
      {/* <ModalVideo
        channel="youtube"
        // autoplay
        isOpen={isVideoOpen}
        videoId={videoId}
        onClose={() => setIsVideoOpen(false)}
      /> */}

      <ReactPlayer />
    </>
  );
};

export default VideoPopup;
