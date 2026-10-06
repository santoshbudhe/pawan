import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";
import desktopHeroPoster from "../../assets/hero/desktopHeroBanner.png";
import mobileHeroPoster from "../../assets/hero/mobileHeroBanner.png";
import type { Asset } from "../services/assetService";

const HOMEPAGE_HERO_VIDEO = "/assets/home/hero/1000105145.mp4";
const MOBILE_HERO_QUERY = "(max-width: 767px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

interface HomepageHeroMediaProps {
  desktopHero?: Asset;
  mobileHero?: Asset;
}

function getMediaPreference(query: string): boolean {
  return typeof window !== "undefined" && window.matchMedia(query).matches;
}

export function HomepageHeroMedia({ desktopHero, mobileHero }: HomepageHeroMediaProps) {
  const [isMobile, setIsMobile] = useState(() => getMediaPreference(MOBILE_HERO_QUERY));
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    getMediaPreference(REDUCED_MOTION_QUERY)
  );
  const [videoUnavailable, setVideoUnavailable] = useState(false);

  const desktopPoster = desktopHero?.url ?? desktopHeroPoster;
  const mobilePoster = mobileHero?.url ?? mobileHeroPoster;
  const activePoster = isMobile ? mobilePoster : desktopPoster;
  const showVideo = !prefersReducedMotion && !videoUnavailable;

  useEffect(() => {
    const mobileQuery = window.matchMedia(MOBILE_HERO_QUERY);
    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const syncMobile = () => setIsMobile(mobileQuery.matches);
    const syncMotion = () => setPrefersReducedMotion(motionQuery.matches);

    syncMobile();
    syncMotion();
    mobileQuery.addEventListener("change", syncMobile);
    motionQuery.addEventListener("change", syncMotion);

    return () => {
      mobileQuery.removeEventListener("change", syncMobile);
      motionQuery.removeEventListener("change", syncMotion);
    };
  }, []);

  const handleVideoReady = (event: SyntheticEvent<HTMLVideoElement>) => {
    const playback = event.currentTarget.play();
    if (playback) {
      void playback.catch(() => setVideoUnavailable(true));
    }
  };

  return (
    <div
      className={`hero-media-stack${showVideo ? " hero-media-stack--video" : ""}`}
      aria-hidden="true"
    >
      <picture className="hero-static-fallback">
        {mobilePoster ? <source media={MOBILE_HERO_QUERY} srcSet={mobilePoster} /> : null}
        <img
          src={desktopPoster ?? mobilePoster}
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </picture>

      {showVideo ? (
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={activePoster}
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noplaybackrate nofullscreen"
          tabIndex={-1}
          aria-hidden="true"
          onLoadedMetadata={handleVideoReady}
          onError={() => setVideoUnavailable(true)}
        >
          <source src={HOMEPAGE_HERO_VIDEO} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
