interface SpasticitySignCard {
  title: string;
  description: string;
  image: string;
  alt: string;
}

const assetBase = "/assets/homepage/signs-of-spasticity";

const cards = [
  {
    title: "Persistent Muscle or Tendon Tightness",
    description: "Tightness may limit smooth joint movement.",
    image: `${assetBase}/signs-spasticity-stiff-tight-muscles.webp`,
    alt: "Clinician examining a child's leg for muscle stiffness"
  },
  {
    title: "Difficulty Standing or Walking",
    description: "Standing or walking may become tiring or less stable.",
    image: `${assetBase}/signs-spasticity-walking-difficulty.webp`,
    alt: "Child practising walking between parallel bars with a therapist"
  },
  {
    title: "Toe Walking or Poor Foot Position",
    description: "The foot may point down, turn inward or not rest flat.",
    image: `${assetBase}/signs-spasticity-toe-walking.webp`,
    alt: "Close-up of a child walking on their toes"
  },
  {
    title: "Alignment, Posture or Joint Changes",
    description: "Changes in limb or joint position may affect movement and comfort.",
    image: `${assetBase}/signs-spasticity-posture-joint-changes.webp`,
    alt: "Clinician assessing a child's standing posture and alignment"
  }
] satisfies readonly SpasticitySignCard[];

export function UnderstandingSpasticity() {
  return (
    <section
      className="section-band signs-spasticity-section"
      id="orthopedic-assessment-signs"
      aria-labelledby="orthopedic-assessment-signs-title"
    >
      <div className="container">
        <header className="signs-spasticity-heading">
          <h2 id="orthopedic-assessment-signs-title">Signs That May Need Orthopedic Assessment</h2>
          <p>
            These signs can have different causes. An orthopedic assessment can help clarify the
            underlying musculoskeletal concern.
          </p>
        </header>
        <div className="signs-spasticity-grid">
          {cards.map((card) => (
            <article className="signs-spasticity-card" key={card.title}>
              <div className="signs-spasticity-media">
                <img
                  src={card.image}
                  alt={card.alt}
                  width="555"
                  height="569"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="signs-spasticity-copy">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
