import {
  Children,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState
} from "react";
import { Icon } from "./Icon";

type CarouselFrameProps = {
  children: ReactNode;
  className: string;
  itemCount: number;
  label: string;
  shellClassName?: string;
  previousLabel?: string;
  nextLabel?: string;
  dotLabel?: (index: number) => string;
};

const POSITION_TOLERANCE = 2;

export function getReachableCarouselPositions(offsets: number[], maxScroll: number) {
  if (maxScroll <= POSITION_TOLERANCE) return [0];

  const candidates = [0, ...offsets, maxScroll]
    .map((offset) => Math.max(0, Math.min(offset, maxScroll)))
    .sort((first, second) => first - second);

  return candidates.filter((position, index) => (
    index === 0 || Math.abs(position - candidates[index - 1]) > POSITION_TOLERANCE
  ));
}

export function getClosestCarouselPosition(positions: number[], scrollLeft: number) {
  let closestIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  positions.forEach((position, index) => {
    const distance = Math.abs(position - scrollLeft);
    if (distance < closestDistance) {
      closestIndex = index;
      closestDistance = distance;
    }
  });

  return closestIndex;
}

export function CarouselFrame({
  children,
  className,
  itemCount,
  label,
  shellClassName = "",
  previousLabel = "Previous cards",
  nextLabel = "Next cards",
  dotLabel
}: CarouselFrameProps) {
  const trackId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startScrollLeft: number;
    active: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);
  const renderedItemCount = Children.count(children) || itemCount;
  const [positions, setPositions] = useState<number[]>([0]);
  const [activePosition, setActivePosition] = useState(0);

  const syncActivePosition = useCallback((nextPositions = positions) => {
    const track = trackRef.current;
    if (!track) return;
    setActivePosition(getClosestCarouselPosition(nextPositions, track.scrollLeft));
  }, [positions]);

  const recalculatePositions = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const trackRect = track.getBoundingClientRect();
    const paddingLeft = Number.parseFloat(window.getComputedStyle(track).paddingLeft) || 0;
    const offsets = Array.from(track.children)
      .slice(0, renderedItemCount)
      .map((child) => {
        const childRect = (child as HTMLElement).getBoundingClientRect();
        return childRect.left - trackRect.left + track.scrollLeft - paddingLeft;
      });
    const nextPositions = getReachableCarouselPositions(offsets, maxScroll);

    setPositions((current) => (
      current.length === nextPositions.length
      && current.every((position, index) => Math.abs(position - nextPositions[index]) <= POSITION_TOLERANCE)
        ? current
        : nextPositions
    ));
    syncActivePosition(nextPositions);
  }, [renderedItemCount, syncActivePosition]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    recalculatePositions();
    const resizeObserver = new ResizeObserver(recalculatePositions);
    resizeObserver.observe(track);
    Array.from(track.children).forEach((child) => resizeObserver.observe(child));

    return () => {
      resizeObserver.disconnect();
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [recalculatePositions]);

  const scrollToPosition = useCallback((requestedPosition: number) => {
    const track = trackRef.current;
    if (!track || positions.length < 2) return;

    const nextPosition = Math.max(0, Math.min(requestedPosition, positions.length - 1));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: positions[nextPosition],
      behavior: reduceMotion ? "auto" : "smooth"
    });
    setActivePosition(nextPosition);
  }, [positions]);

  const handleScroll = () => {
    if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(() => syncActivePosition());
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToPosition(activePosition + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToPosition(activePosition - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      scrollToPosition(0);
    } else if (event.key === "End") {
      event.preventDefault();
      scrollToPosition(positions.length - 1);
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0 || positions.length < 2) return;
    const track = trackRef.current;
    if (!track) return;

    suppressClickRef.current = false;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startScrollLeft: track.scrollLeft,
      active: false
    };
    track.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const drag = dragRef.current;
    if (!track || !drag || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;
    const deltaY = event.clientY - drag.startY;
    if (!drag.active && Math.abs(deltaX) > 5 && Math.abs(deltaX) > Math.abs(deltaY)) {
      drag.active = true;
    }
    if (!drag.active) return;

    event.preventDefault();
    suppressClickRef.current = true;
    track.scrollLeft = drag.startScrollLeft - deltaX;
  };

  const finishPointerDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    const drag = dragRef.current;
    if (!track || !drag || drag.pointerId !== event.pointerId) return;

    const wasDragging = drag.active;
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    dragRef.current = null;
    const closestPosition = getClosestCarouselPosition(positions, track.scrollLeft);
    scrollToPosition(closestPosition);
    if (wasDragging) window.setTimeout(() => { suppressClickRef.current = false; }, 0);
  };

  const handleClickCapture = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!suppressClickRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  const canScroll = positions.length > 1;
  const shellClasses = [
    "carousel-shell",
    canScroll ? "carousel-shell--scrollable" : "carousel-shell--static",
    shellClassName
  ].filter(Boolean).join(" ");

  return (
    <div className={shellClasses} data-carousel-positions={positions.length}>
      <button
        className="carousel-control carousel-control-prev"
        type="button"
        aria-label={previousLabel}
        aria-controls={trackId}
        disabled={!canScroll || activePosition === 0}
        onClick={() => scrollToPosition(activePosition - 1)}
      >
        <Icon name="ChevronLeft" />
      </button>
      <div
        id={trackId}
        className={className}
        ref={trackRef}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointerDrag}
        onPointerCancel={finishPointerDrag}
        onClickCapture={handleClickCapture}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={`${label} carousel`}
      >
        {children}
      </div>
      <button
        className="carousel-control carousel-control-next"
        type="button"
        aria-label={nextLabel}
        aria-controls={trackId}
        disabled={!canScroll || activePosition === positions.length - 1}
        onClick={() => scrollToPosition(activePosition + 1)}
      >
        <Icon name="ChevronRight" />
      </button>
      <div className="carousel-dots" aria-label={`${label} carousel position`}>
        {positions.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={dotLabel?.(index) ?? `Go to carousel position ${index + 1}`}
            aria-current={activePosition === index ? "true" : undefined}
            aria-controls={trackId}
            onClick={() => scrollToPosition(index)}
          />
        ))}
      </div>
    </div>
  );
}
