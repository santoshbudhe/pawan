import { LoaderCircle, Play, Video } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getFirebaseStorageDownloadUrl } from "../../lib/firebase";

type MediaStatus = "resolving" | "available" | "missing";

interface SuccessStoryVideoProps {
  src?: string;
  storagePath?: string;
  poster?: string;
  ariaLabel: string;
  className?: string;
  objectFit?: "cover" | "contain";
}

export function SuccessStoryVideo({
  src,
  storagePath,
  poster,
  ariaLabel,
  className = "",
  objectFit = "cover"
}: SuccessStoryVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<MediaStatus>(
    storagePath || src ? "resolving" : "missing"
  );
  const [resolvedSrc, setResolvedSrc] = useState<string>();
  const [hasStarted, setHasStarted] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  useEffect(() => {
    if (!storagePath && !src) {
      setResolvedSrc(undefined);
      setStatus("missing");
      setHasStarted(false);
      setIsStarting(false);
      return;
    }

    let active = true;
    setResolvedSrc(undefined);
    setStatus("resolving");
    setHasStarted(false);
    setIsStarting(false);

    const sourcePromise = storagePath
      ? getFirebaseStorageDownloadUrl(storagePath)
      : Promise.resolve(src as string);

    sourcePromise
      .then((url) => {
        if (!active) return;
        setResolvedSrc(url);
        setStatus("available");
      })
      .catch(() => {
        if (!active) return;
        setResolvedSrc(undefined);
        setStatus("missing");
      });

    return () => {
      active = false;
    };
  }, [src, storagePath]);

  const classes = [
    "success-story-video-player",
    objectFit === "contain" ? "success-story-video-player--contain" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  const handlePlay = async () => {
    const video = videoRef.current;

    if (!video || isStarting) return;

    setIsStarting(true);

    try {
      await video.play();
      setHasStarted(true);
    } catch (error) {
      setHasStarted(false);

      if (import.meta.env.DEV) {
        console.error("Unable to start patient video", error);
      }
    } finally {
      setIsStarting(false);
    }
  };

  const handleMediaError = () => {
    setResolvedSrc(undefined);
    setStatus("missing");
    setHasStarted(false);
    setIsStarting(false);
  };

  if (status === "available" && resolvedSrc) {
    return (
      <div className={classes}>
        <video
          key={resolvedSrc}
          ref={videoRef}
          className="success-story-video-player__media"
          controls={hasStarted}
          playsInline
          preload="metadata"
          poster={poster}
          aria-label={ariaLabel}
          onPlay={() => setHasStarted(true)}
          onError={handleMediaError}
        >
          <source src={resolvedSrc} type="video/mp4" />
        </video>

        {!hasStarted ? (
          <>
            {poster ? (
              <img
                className="success-story-video-player__poster"
                src={poster}
                alt=""
                aria-hidden="true"
              />
            ) : null}
            <button
              type="button"
              className="success-story-video-player__play"
              onClick={handlePlay}
              aria-label={`Play ${ariaLabel}`}
              disabled={isStarting}
            >
              {isStarting ? (
                <LoaderCircle
                  className="success-story-video-player__spinner"
                  aria-hidden="true"
                />
              ) : (
                <Play aria-hidden="true" fill="currentColor" />
              )}
            </button>
          </>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={`${classes} success-story-video-player--placeholder success-story-video--placeholder`}
      role="status"
      aria-label={`${ariaLabel} media placeholder`}
      aria-live="polite"
      aria-busy={status === "resolving"}
    >
      {poster ? (
        <img
          className="success-story-video-player__poster"
          src={poster}
          alt=""
          aria-hidden="true"
        />
      ) : (
        <Video className="success-story-video-player__fallback-icon" aria-hidden="true" />
      )}

      {status === "resolving" ? (
        <span className="success-story-video-player__loading">
          <LoaderCircle
            className="success-story-video-player__spinner"
            aria-hidden="true"
          />
          <span className="sr-only">Loading patient video...</span>
        </span>
      ) : (
        <span className="success-story-video-player__status">
          Patient video is temporarily unavailable.
          <span>Please try again later.</span>
        </span>
      )}
    </div>
  );
}
