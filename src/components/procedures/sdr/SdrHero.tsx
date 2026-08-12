import { SdrPageContent } from "../../../pages/procedures/sdr/sdrTypes";
import { ProcedureHeroLayout } from "../ProcedureHeroLayout";
import { SdrIcon } from "./SdrIcon";

interface SdrHeroProps {
  content: SdrPageContent["hero"];
  whatsappHref: string;
}

export function SdrHero({ content, whatsappHref }: SdrHeroProps) {
  return (
    <ProcedureHeroLayout
      sectionId="sdr-hero"
      titleId="sdr-page-title"
      breadcrumb="sdr"
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      features={content.tags.map((tag) => ({ id: tag.id, label: tag.label, icon: <SdrIcon name={tag.icon} /> }))}
      mobileAsset={content.mobileAsset}
      desktopAsset={content.desktopAsset}
      mobileMediaQuery="(max-width: 1199px)"
      imageWidth={1280}
      imageHeight={512}
      whatsappHref={whatsappHref}
      accessibleArtworkExplanation={content.accessibleArtworkExplanation}
      classNames={{
        section: "sdr-hero",
        media: "sdr-hero-media",
        inner: "sdr-container sdr-hero-inner",
        copy: "sdr-hero-copy",
        eyebrow: "sdr-eyebrow",
        description: "sdr-hero-description",
        features: "sdr-hero-tags",
        actions: "sdr-hero-actions"
      }}
    />
  );
}
