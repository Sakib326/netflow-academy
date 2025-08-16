import ModalVideo from "react-modal-video";

type Props = {
  isVideoOpen: boolean;
  setIsVideoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  videoUrl: string;
};

const VideoPopup = ({ isVideoOpen, setIsVideoOpen, videoUrl }: Props) => {
  return (
    <>
      {/* @ts-ignore */}
      <ModalVideo
        channel="custom"
        isOpen={isVideoOpen}
        url={videoUrl}
        onClose={() => setIsVideoOpen(false)}
      />
    </>
  );
};

export default VideoPopup;
