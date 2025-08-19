"use client";
import ReactPlayer from "react-player";
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/react";

const Lesson = () => {
  return (
    <div className="tw:w-full tw:max-w-7xl tw:mx-auto">
      <MediaController
        style={{
          width: "100%",
          aspectRatio: "16/9",
          maxHeight: "80vh",
        }}
      >
        <ReactPlayer
          slot="media"
          src="https://youtu.be/jHVDnbuB23k?si=vPUlWUvnzwuSxdCs"
          controls={false}
          width="100%"
          height="100%"
        />
        <MediaControlBar
          style={{
            display: "flex",
            gap: "12px", // gap between buttons
            padding: "8px",
            // backgroundColor: "rgba(0,0,0,0.4)",
          }}
        >
          <MediaPlayButton />
          <MediaSeekBackwardButton seekOffset={10} />
          <MediaSeekForwardButton seekOffset={10} />
          <MediaMuteButton />
          <MediaVolumeRange />
          <MediaTimeRange />
          <MediaTimeDisplay showDuration />
          <MediaPlaybackRateButton />
          <MediaFullscreenButton />
        </MediaControlBar>
      </MediaController>
    </div>
  );
};

export default Lesson;
