"use client";

import { useEffect, useRef } from "react";
import Hls from "hls.js";

export default function HlsPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        debug: true,
        xhrSetup: function (xhr) {
          xhr.withCredentials = false;
        },
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {});

      hls.on(Hls.Events.ERROR, function (event, data) {
        console.log("❌ HLS error:", data);
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      video.addEventListener("loadedmetadata", () => {});
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls
      className="w-full rounded-lg"
      crossOrigin="anonymous" // 👈 MUY IMPORTANTE
    />
  );
}
