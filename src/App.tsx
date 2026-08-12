import { Menu, Phone, ShieldCheck, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { AssessmentJourney } from "./components/AssessmentJourney";
import { CarouselFrame } from "./components/CarouselFrame";
import { CombinedCareSection, ProcedureFocusKey } from "./components/CombinedCareSection";
import {
  StandardCarouselCard,
  StandardCompactCarousel
} from "./components/design-system/StandardCompactCarousel";
import { FamilyBenefitsCarousel } from "./components/FamilyBenefitsCarousel";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { HomepageHeroMedia } from "./components/HomepageHeroMedia";
import { Icon } from "./components/Icon";
import { SectionTitle } from "./components/SectionTitle";
import {
  ConsultationLocations,
  SiteFooter,
  SpecialistTeam,
  TreatmentContactBanner
} from "./components/SiteClosingSections";
import { SpasticityExplainer } from "./components/SpasticityExplainer";
import { SuccessStoryCarousel } from "./components/success-stories/SuccessStoryCarousel";
import { UnderstandingSpasticity } from "./components/UnderstandingSpasticity";
import { WhatsAppIcon } from "./components/WhatsAppIcon";
import { contactDetails } from "./content/contactDetails";
import { getPreviewHomepageStories } from "./data/successStories.database";
import { useHomepageData } from "./hooks/useHomepageData";
import { handleInternalLinkClick, scrollToCurrentLocation } from "./lib/navigation";
import { Asset, AssetRegistry } from "./services/assetService";
import { FeatureItem, HomepageContent, ImageCardContent, ProcedureContent } from "./services/homepageService";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.35, ease: "easeOut" }
} as const;

function assetUrl(asset?: Asset): string | undefined {
  return asset?.url;
}

function MissingAsset({ id }: { id: string }) {
  return (
    <div className="missing-asset" role="alert">
      Missing Firebase asset: {id}
    </div>
  );
}

function Header({ assets }: { assets?: AssetRegistry }) {
  const nav = ["Home", "About", "Conditions", "Treatments", "For Families", "Locations", "Resources"];
  const dropdownItems = new Set(["Conditions", "Treatments", "For Families", "Resources"]);
  const logo = assets?.logos.transparentMainLogo ?? assets?.logos.primary;
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="container header-inner">
        <a className="brand" href="/" aria-label="Dr. Pawan Kumar Sadhvani home">
          {assetUrl(logo) ? <img src={logo?.url} alt="Dr. Pawan Kumar Sadhvani logo" /> : assets ? <MissingAsset id="logos_transparentMainLogo" /> : null}
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`} aria-current={item === "Home" ? "page" : undefined}>
              {item}
              {dropdownItems.has(item) ? <Icon name="ChevronDown" /> : null}
            </a>
          ))}
        </nav>
        <a
          className="btn btn-primary header-cta header-call-link"
          href={contactDetails.phoneHref}
          aria-label="Call Dr. Pawan Kumar Sadhvani"
        >
          <Phone aria-hidden="true" />
          <span>Call Now</span>
        </a>
        <button className="menu-button" type="button" aria-label="Open menu" aria-expanded="false">
          <Menu aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}

function Hero({ content, assets }: { content: HomepageContent; assets?: AssetRegistry }) {
  const desktopHero = assets?.hero.desktopHeroBanner ?? assets?.hero.desktop;
  const mobileHero = assets?.hero.mobileHeroBanner ?? assets?.hero.mobile;
  const families = (Object.values(assets?.trustedFamilies ?? {}).filter(Boolean) as Asset[])
    .sort((a, b) => a.storagePath.localeCompare(b.storagePath));
  const familyCount = content.trustStats[0].replace(/^Trusted by\s*/i, "");
  const [rating, ...reviewWords] = content.trustStats[1].split(" ");
  const heroDescriptionLines = [
    "Compassionate, expert care for children",
    "and adults with cerebral palsy,",
    "stroke-related spasticity, and other",
    "neurological conditions \u2014 helping",
    "you move better, live easier,",
    "and stay independent."
  ];

  return (
    <section className="hero section-band">
      <div className="container hero-grid">
        <motion.div className="hero-composite" {...fadeUp}>
          {assetUrl(desktopHero) || assetUrl(mobileHero) ? (
            <HomepageHeroMedia desktopHero={desktopHero} mobileHero={mobileHero} />
          ) : assets ? (
            <MissingAsset id="hero_mobileHeroBanner" />
          ) : null}
        </motion.div>
        <motion.div className="hero-copy" {...fadeUp}>
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h1 aria-label={content.hero.heading}>
            <span>Specialised Care for</span>
            <span>Spasticity,</span>
            <span>Movement</span>
            <span>Difficulty &</span>
            <span>Deformity</span>
          </h1>
          <p className="hero-description" aria-label={content.hero.description}>
            {heroDescriptionLines.map((line) => <span key={line}>{line}</span>)}
          </p>
          <div className="hero-contact-actions">
            <a
              className="hero-whatsapp-cta"
              href={contactDetails.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with our team on WhatsApp"
            >
              <WhatsAppIcon />
              <span>WhatsApp Us</span>
            </a>
            <p className="hero-contact-note">
              <ShieldCheck aria-hidden="true" />
              <span>Share videos, reports or questions directly with our team.</span>
            </p>
          </div>
        </motion.div>
        <motion.div className="hero-trust" {...fadeUp}>
          <div className="hero-trust-family">
            <div className="avatar-stack">
              {families.length > 0 ? (
                families.slice(0, 5).map((asset) => (
                  <img key={asset.storagePath} src={asset.url} alt="" loading="lazy" decoding="async" />
                ))
              ) : assets ? (
                <MissingAsset id="trust_*" />
              ) : null}
            </div>
            <strong className="hero-trust-copy">
              <span>Trusted by</span>
              <span>{familyCount}</span>
            </strong>
          </div>
          <div className="stars" aria-label="Five star rating">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} fill="currentColor" aria-hidden="true" />
            ))}
          </div>
          <strong className="hero-review">
            <span>{rating}</span>
            <small>({reviewWords.join(" ")})</small>
          </strong>
        </motion.div>
      </div>
    </section>
  );
}

function TrustStrip({ content, assets }: { content: HomepageContent; assets?: AssetRegistry }) {
  const families = Object.values(assets?.trustedFamilies ?? {}).filter(Boolean) as Asset[];
  const familyCount = content.trustStats[0].replace(/^Trusted by\s*/i, "");
  const [rating, ...reviewWords] = content.trustStats[1].split(" ");
  return (
    <section className="trust-strip" aria-label="Family trust and reviews">
      <div className="container trust-inner">
        <div className="avatar-stack">
          {families.length > 0 ? (
            families.slice(0, 5).map((asset) => (
              <img key={asset.storagePath} src={asset.url} alt="" loading="lazy" decoding="async" />
            ))
          ) : assets ? (
            <MissingAsset id="trust_*" />
          ) : null}
        </div>
        <strong className="trust-copy"><span>Trusted by</span><span>{familyCount}</span></strong>
        <div className="stars" aria-label="Five star rating">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} fill="currentColor" aria-hidden="true" />
          ))}
        </div>
        <strong className="trust-review"><span>{rating}</span><small>({reviewWords.join(" ")})</small></strong>
      </div>
    </section>
  );
}

function FeatureGrid({ items }: { items: FeatureItem[] }) {
  return (
    <section className="section-band compact why-section" id="for-families">
      <div className="container">
        <SectionTitle title="Why Families Choose Us" />
        <FamilyBenefitsCarousel items={items} />
      </div>
    </section>
  );
}

function ImageCards({
  title,
  items,
  assets,
  id
}: {
  title: string;
  items: ImageCardContent[];
  assets?: AssetRegistry;
  id: string;
}) {
  return (
    <section className="section-band compact image-card-section whoWeHelp-section" id={id}>
      <div className="container">
        <SectionTitle title={title} />
        <CarouselFrame
          className="image-card-row whoWeHelp"
          itemCount={items.length}
          label={title}
          shellClassName="who-we-help-carousel"
          previousLabel={`Previous ${title} cards`}
          nextLabel={`Next ${title} cards`}
        >
          {items.map((item) => {
            const asset = assets?.whoWeHelp[item.assetKey];
            const desktopTitle = ({
              upperLimb: "Upper-Limb Stiffness",
              deformity: "Contractures & Deformity"
            }[item.assetKey] ?? item.title);

            return (
              <motion.article className="image-card" key={item.title} {...fadeUp}>
                {assetUrl(asset)
                  ? <img src={asset?.url} alt={item.title} loading="lazy" decoding="async" />
                  : <div className="thumb-placeholder" />}
                <h3>
                  {desktopTitle === item.title ? item.title : (
                    <>
                      <span className="mobile-card-title">{item.title}</span>
                      <span className="desktop-card-title">{desktopTitle}</span>
                    </>
                  )}
                </h3>
                <p>{item.description}</p>
              </motion.article>
            );
          })}
        </CarouselFrame>
      </div>
    </section>
  );
}

function Procedures({
  items,
  assets,
  highlightedProcedureKeys
}: {
  items: ProcedureContent[];
  assets?: AssetRegistry;
  highlightedProcedureKeys: ProcedureFocusKey[];
}) {
  const procedureRoutes: Record<string, string> = {
    sdr: "/procedures/selective-dorsal-rhizotomy",
    smf: "/procedures/selective-motor-fasciculotomy",
    tendonMuscle: "/procedures/tendon-muscle-procedures",
    deformityCorrection: "/procedures/deformity-correction-surgery"
  };
  const procedureCardIds: Record<string, string> = {
    sdr: "procedure-sdr",
    smf: "procedure-smf",
    tendonMuscle: "procedure-tendon-muscle",
    deformityCorrection: "procedure-deformity-correction"
  };
  const cards: StandardCarouselCard[] = items.map((item) => ({
    id: item.assetKey,
    image: assetUrl(assets?.procedures[item.assetKey]) ?? "",
    imageAlt: item.title,
    icon: item.icon ? <Icon name={item.icon} /> : undefined,
    title: item.title,
    description: item.description,
    href: procedureRoutes[item.assetKey],
    ctaLabel: "View procedure",
    ariaLabel: `View ${item.title}`,
    elementId: procedureCardIds[item.assetKey],
    highlighted: highlightedProcedureKeys.includes(item.assetKey as ProcedureFocusKey)
  }));

  return (
    <div id="procedures" className="section-anchor">
      <StandardCompactCarousel
        title="Specialised Procedures"
        cards={cards}
        ariaLabel="Specialised Procedures"
        sectionId="treatments"
        onCardClick={(event, card) => {
          if (card.href) handleInternalLinkClick(event, card.href);
        }}
      />
    </div>
  );
}

function Goals({ items }: { items: FeatureItem[] }) {
  return (
    <section className="section-band compact goals-section">
      <div className="container">
        <div className="section-link-row">
          <SectionTitle title="Treatment Goals" centered={false} />
          <a href="#assessment">View all goals <Icon name="ChevronRight" /></a>
        </div>
        <div className="goals-row">
          {items.map((item) => (
            <article className="goal-card" key={item.title}>
              <Icon name={item.icon} />
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: "Dr. Pawan Kumar Sadhvani",
    medicalSpecialty: "Neuro-Orthopaedic Spasticity Care",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hyderabad",
      addressCountry: "IN"
    }
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function Homepage() {
  const { content, assets, loading, error } = useHomepageData();
  const [highlightedProcedureKeys, setHighlightedProcedureKeys] = useState<ProcedureFocusKey[]>([]);
  const procedureHighlightTimerRef = useRef<number | null>(null);

  useEffect(() => {
    scrollToCurrentLocation();
  }, []);

  useEffect(() => {
    return () => {
      if (procedureHighlightTimerRef.current !== null) {
        window.clearTimeout(procedureHighlightTimerRef.current);
      }
    };
  }, []);

  const handleProcedureFocus = useCallback((
    firstCard: ProcedureFocusKey,
    highlightedCards: ProcedureFocusKey[]
  ) => {
    setHighlightedProcedureKeys(highlightedCards);

    if (procedureHighlightTimerRef.current !== null) {
      window.clearTimeout(procedureHighlightTimerRef.current);
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reducedMotion ? "auto" : "smooth";

    window.requestAnimationFrame(() => {
      document.getElementById("procedures")?.scrollIntoView({ behavior, block: "start" });

      const targetCard = document.getElementById({
        sdr: "procedure-sdr",
        smf: "procedure-smf",
        tendonMuscle: "procedure-tendon-muscle",
        deformityCorrection: "procedure-deformity-correction"
      }[firstCard]);
      const track = targetCard?.closest<HTMLElement>(".spc-01__track");

      if (targetCard && track) {
        track.scrollTo({ left: targetCard.offsetLeft, behavior });
      }
    });

    procedureHighlightTimerRef.current = window.setTimeout(() => {
      setHighlightedProcedureKeys([]);
      procedureHighlightTimerRef.current = null;
    }, 3000);
  }, []);

  return (
    <>
      <StructuredData />
      <Header assets={assets} />
      <main id="main" aria-busy={loading}>
        {error ? <p className="sr-only" role="status">{error}</p> : null}
        <Hero content={content} assets={assets} />
        <TrustStrip content={content} assets={assets} />
        <SpasticityExplainer />
        <FeatureGrid items={content.whyChooseUs} />
        <ImageCards title="Who We Help" items={content.whoWeHelp} assets={assets} id="conditions" />
        <UnderstandingSpasticity />
        <AssessmentJourney />
        <Procedures
          items={content.procedures}
          assets={assets}
          highlightedProcedureKeys={highlightedProcedureKeys}
        />
        <CombinedCareSection onProcedureFocus={handleProcedureFocus} />
        <Goals items={content.treatmentGoals} />
        <SpecialistTeam content={content} assets={assets} />
        <ConsultationLocations content={content} assets={assets} />
        <SuccessStoryCarousel
          stories={getPreviewHomepageStories()}
          title="Real Success Stories"
          subtitle="Real patient journeys showing progress through specialist care and rehabilitation."
          sectionId="real-success-stories"
        />
        <TreatmentContactBanner />
      </main>
      <FloatingWhatsApp />
      <SiteFooter assets={assets} />
    </>
  );
}

export function App() {
  return <Homepage />;
}
