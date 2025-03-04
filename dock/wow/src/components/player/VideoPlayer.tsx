import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css"; // Import Video.js styles

const VideoPlayer = ({ videoSrc }: { videoSrc: string }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null); // Ref to the video element
  const playerRef = useRef<any>(null); // Ref to the Video.js player

  // Initialize Video.js on mount and clean up on unmount
  useEffect(() => {
    if (videoRef.current) {
      // Initialize the Video.js player
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: true,
        preload: "auto",
        sources: [{ src: videoSrc, type: "video/mp4" }]
      });
    }

    // Clean up the player on unmount
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose(); // Dispose of the Video.js player instance
      }
    };
  }, [videoSrc]); // Only reinitialize when the video source changes

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-default-skin"></video>
    </div>
  );
};

export default VideoPlayer;
