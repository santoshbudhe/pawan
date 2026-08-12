import { SdrIllustrationName } from "../../../pages/procedures/sdr/sdrTypes";

interface SdrIllustrationProps {
  name: SdrIllustrationName;
  className?: string;
}

function NerveLines({ selected = false }: { selected?: boolean }) {
  return (
    <>
      <path d="M31 22c20 15 29 30 30 73M47 18c11 18 17 37 14 77M78 19c-12 19-17 40-17 76M94 24C76 42 68 63 61 95" />
      <path className={selected ? "sdr-svg-accent" : undefined} d="M23 50c20 2 29 12 38 28M99 50C82 55 72 65 61 78" />
      <circle className="sdr-svg-node" cx="61" cy="78" r="5" />
    </>
  );
}

function LowerBody({ crossed = false, toes = false }: { crossed?: boolean; toes?: boolean }) {
  return (
    <>
      <circle cx="60" cy="22" r="9" />
      <path d="M60 31v31M39 43l21 11 20-11" />
      {crossed ? (
        <path className="sdr-svg-accent" d="M60 61l20 37M61 61L43 98M80 98h14M29 98h14" />
      ) : (
        <path className="sdr-svg-accent" d="M60 61L48 96M61 61l15 35M38 101h16M72 101h17" />
      )}
      {toes ? <path d="M72 101c8-8 13-8 20-4" /> : null}
    </>
  );
}

export function SdrIllustration({ name, className }: SdrIllustrationProps) {
  const walking = name === "leg-stiffness" || name === "toe-walking" || name === "scissoring-gait" || name === "begin-rehabilitation";
  const process = name === "identify-sensory-rootlets" || name === "test-select-rootlets" || name === "treat-targeted-rootlets";

  return (
    <svg
      className={`sdr-illustration ${className ?? ""}`}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {walking ? <LowerBody crossed={name === "scissoring-gait"} toes={name === "toe-walking"} /> : null}
      {process ? (
        <>
          <path d="M18 57h84M29 44l-11 13 11 13M91 44l11 13-11 13" />
          <path className="sdr-svg-accent" d={name === "test-select-rootlets" ? "M34 57l8-14 10 29 10-30 9 30 10-15" : "M36 57c12-23 32-23 48 0-16 23-36 23-48 0Z"} />
          {name === "treat-targeted-rootlets" ? <path d="M76 28L45 89M43 34l36 50" /> : null}
        </>
      ) : null}
      {name === "sensory-rootlets" || name === "sensory-signal" ? <NerveLines selected={name === "sensory-signal"} /> : null}
      {name === "lower-spine" ? (
        <>
          <path d="M58 14c-12 12-10 22 0 29-10 8-10 18 0 27-9 9-7 21 2 34" />
          <path className="sdr-svg-accent" d="M65 15c12 12 10 22 0 29 10 8 10 18 0 27 9 9 7 21-2 34" />
          <path d="M47 29h28M47 56h28M48 84h27" />
        </>
      ) : null}
      {name === "fixed-deformity" ? (
        <>
          <path d="M35 18v38c0 13 8 22 22 22h27" />
          <path className="sdr-svg-accent" d="M57 78l14 24M84 78l-5 24M46 56h16" />
          <circle cx="58" cy="78" r="7" />
        </>
      ) : null}
      {name === "realistic-expectations" ? (
        <>
          <circle cx="60" cy="58" r="36" />
          <circle className="sdr-svg-accent" cx="60" cy="58" r="22" />
          <circle cx="60" cy="58" r="8" />
          <path d="M82 34l17-17M84 17h15v15" />
        </>
      ) : null}
    </svg>
  );
}
