interface SpasticitySignCard {
  title: string;
  description: string;
  image: string;
  alt: string;
}

const assetBase = "/assets/homepage/signs-of-spasticity";

const cards = [
  {
    title: "Stiff or Tight Muscles",
    description: "Muscles may feel tight and resist smooth movement.",
    image: `${assetBase}/signs-spasticity-stiff-tight-muscles.webp`,
    alt: "Clinician examining a child's leg for muscle stiffness"
  },
  {
    title: "Walking Difficulty",
    description: "Walking may look awkward, tiring or less stable.",
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
    title: "Posture or Joint Changes Over Time",
    description: "Long-term tightness may affect alignment, posture and comfort.",
    image: `${assetBase}/signs-spasticity-posture-joint-changes.webp`,
    alt: "Clinician assessing a child's standing posture and alignment"
  }
] satisfies readonly SpasticitySignCard[];

export function UnderstandingSpasticity() {
  return (
    <section
      className="section-band signs-spasticity-section"
      id="signs-of-spasticity"
      aria-labelledby="signs-of-spasticity-title"
    >
      <div className="container">
        <header className="signs-spasticity-heading">
          <h2 id="signs-of-spasticity-title">Signs of Spasticity</h2>
          <p>
            These are some common signs families may notice. Similar symptoms can have different
            causes, so a clinical assessment is important.
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
