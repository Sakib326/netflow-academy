"use client";

import { useRef, useEffect, useState } from "react";
import YouTube from "react-youtube";
import type { YouTubePlayer } from "react-youtube";

export default function VideoHome() {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the player is ready and in the viewport, play it.
        if (entry.isIntersecting) {
          playerRef.current?.playVideo();
        } else {
          // If it's not in the viewport, pause it to save resources.
          playerRef.current?.pauseVideo();
        }
      },
      {
        // Trigger when 50% of the video is visible
        threshold: 0.5,
      }
    );

    const currentContainer = containerRef.current;
    observer.observe(currentContainer);

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [isClient]);

  const onReady = (event: { target: YouTubePlayer }) => {
    // Store the player instance so we can control it
    playerRef.current = event.target;
  };

  return (
    <section className="tw:container tw:mx-auto tw:pb-20 tw:px-4">
      <div className="tw:max-w-4xl tw:mx-auto">
        <div
          ref={containerRef}
          className="tw:relative tw:w-full tw:aspect-video tw:rounded-lg tw:overflow-hidden tw:shadow-2xl tw:bg-black"
        >
          {isClient && (
            <YouTube
              videoId="Ewady5OXZv4"
              onReady={onReady}
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  // Set to 0 because we control playback with the observer
                  autoplay: 0,
                  // Mute is required for autoplay to work in modern browsers
                  mute: 1,
                  controls: 1,
                  rel: 0,
                  modestbranding: 1,
                },
              }}
              className="tw:w-full tw:h-full"
            />
          )}
        </div>

        <div className="tw:mt-6 tw:text-center">
          <h3 className="tw:text-2xl tw:font-bold tw:text-gray-800 tw:mb-2">
            Welcome to NetFlow Academy
          </h3>
          <p className="tw:text-gray-600 tw:max-w-2xl tw:mx-auto">
            Discover our comprehensive courses and start your learning journey
            today.
          </p>
        </div>
      </div>
    </section>
  );
}
