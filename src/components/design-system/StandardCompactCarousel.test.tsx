import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
import {
  StandardCarouselCard,
  StandardCompactCarousel
} from "./StandardCompactCarousel";
import {
  getClosestCarouselPosition,
  getReachableCarouselPositions
} from "../CarouselFrame";
import { smfPageContent } from "../../content/smfPageContent";

const cards: StandardCarouselCard[] = [
  {
    id: "first",
    image: "/first.webp",
    imageAlt: "First example",
    icon: <span>1</span>,
    title: "A longer title that wraps at normal spaces",
    description: "Compact supporting text.",
    href: "/first",
    ctaLabel: "View procedure",
    badge: "Selected",
    tags: ["SMF", "Rehabilitation"],
    showPlayIndicator: true,
    ariaLabel: "View the first procedure"
  },
  {
    id: "second",
    image: "/second.webp",
    imageAlt: "Second example",
    title: "Informational card",
    description: "This card does not have a CTA."
  }
];

test("SPC-01 renders structured cards with optional content", () => {
  const html = renderToStaticMarkup(
    <StandardCompactCarousel
      title="Compact carousel"
      subtitle="Optional subtitle"
      cards={cards}
      ariaLabel="Compact examples"
      embedded
    />
  );

  assert.match(html, /class="section-band compact spc-01 spc-01--embedded"/);
  assert.match(html, /class="spc-01__inner"/);
  assert.match(html, />Compact carousel</);
  assert.match(html, />Optional subtitle</);
  assert.match(html, /data-spc-01-card="first"/);
  assert.match(html, /data-spc-01-card="second"/);
  assert.match(html, /aria-label="View the first procedure"/);
  assert.match(html, /href="\/first"/);
  assert.match(html, />View procedure</);
  assert.match(html, />Selected</);
  assert.match(html, /spc-01__play/);
  assert.match(html, />SMF</);
  assert.match(html, />Rehabilitation</);
  assert.match(html, />A longer title that wraps at normal spaces</);
  assert.equal((html.match(/data-spc-01-card=/g) ?? []).length, cards.length);
  assert.equal((html.match(/spc-01__action/g) ?? []).length, 1);
});

test("SPC-01 stylesheet keeps the approved mobile token contract", () => {
  const stylesheetPath = fileURLToPath(new URL("./standardCompactCarousel.css", import.meta.url));
  const css = readFileSync(stylesheetPath, "utf8");

  const requiredTokens = [
    "--spc-01-section-title-size: 18px",
    "--spc-01-section-title-line-height: 24px",
    "--spc-01-section-subtitle-size: 15px",
    "--spc-01-section-subtitle-line-height: 22px",
    "--spc-01-card-width: 146px",
    "--spc-01-card-height: 190px",
    "--spc-01-card-gap: 8px",
    "--spc-01-image-height: 84px",
    "--spc-01-title-size: 10px",
    "--spc-01-title-line-height: 12px",
    "--spc-01-body-size: 9px",
    "--spc-01-body-line-height: 10.5px",
    "--spc-01-cta-height: 44px",
    "--spc-01-arrow-size: 44px",
    "--spc-01-dot-visible-size: 6px"
  ];

  requiredTokens.forEach((token) => assert.ok(css.includes(token), `Missing ${token}`));
  assert.doesNotMatch(css, /word-break\s*:\s*break-all/i);
  assert.doesNotMatch(css, /overflow-wrap\s*:\s*anywhere/i);
  assert.doesNotMatch(css, /hyphens\s*:\s*auto/i);
  assert.doesNotMatch(css, /transform\s*:\s*scale\(/i);
  assert.match(css, /--spc-01-desktop-card-basis/);
  assert.match(css, /@media \(min-width: 960px\)/);
  assert.match(css, /--spc-01-desktop-card-max-width:\s*380px/);
  assert.match(css, /flex-basis:\s*min\(\s*var\(--spc-01-desktop-card-basis\)/);
});

test("SPC-01 full-width media follows responsive tablet and desktop cards", () => {
  const stylesheetPath = fileURLToPath(new URL("./standardCompactCarousel.css", import.meta.url));
  const css = readFileSync(stylesheetPath, "utf8");

  assert.match(
    css,
    /\.spc-01__media\s*\{[^}]*width:\s*100%;[^}]*max-width:\s*none;[^}]*aspect-ratio:\s*var\(--spc-01-image-aspect-ratio\)/s
  );
  assert.match(
    css,
    /\.spc-01__media img,[^{]+\{[^}]*width:\s*100%;[^}]*max-width:\s*none;[^}]*height:\s*100%;[^}]*object-fit:\s*cover;[^}]*object-position:\s*center;/s
  );
  assert.match(
    css,
    /@media \(min-width:\s*768px\)[\s\S]*?\.spc-01__media\s*\{\s*height:\s*auto;/
  );
});

test("shared carousel positions represent only reachable scroll states", () => {
  assert.deepEqual(
    getReachableCarouselPositions([0, 320, 640, 960, 1280, 1600], 900),
    [0, 320, 640, 900]
  );
  assert.deepEqual(getReachableCarouselPositions([0, 320], 1), [0]);
});

test("shared carousel active state follows the nearest actual scroll position", () => {
  const positions = [0, 320, 640, 900];

  assert.equal(getClosestCarouselPosition(positions, 0), 0);
  assert.equal(getClosestCarouselPosition(positions, 350), 1);
  assert.equal(getClosestCarouselPosition(positions, 610), 2);
  assert.equal(getClosestCarouselPosition(positions, 895), 3);
});

test("shared carousel engine tracks native scrolling and resize recalculation", () => {
  const carouselPath = fileURLToPath(new URL("../CarouselFrame.tsx", import.meta.url));
  const source = readFileSync(carouselPath, "utf8");

  assert.match(source, /onScroll=\{handleScroll\}/);
  assert.match(source, /new ResizeObserver\(recalculatePositions\)/);
  assert.match(source, /getClosestCarouselPosition\(nextPositions, track\.scrollLeft\)/);
  assert.match(source, /aria-label=\{previousLabel\}/);
  assert.match(source, /aria-label=\{nextLabel\}/);
  assert.match(source, /aria-current=\{activePosition === index/);
});

test("the duplicate legacy carousel engine has been removed", () => {
  const legacyPath = fileURLToPath(new URL("../smf/HorizontalCardCarousel.tsx", import.meta.url));
  assert.equal(existsSync(legacyPath), false);
});

test("embedded mode does not alter canonical consumers", () => {
  const html = renderToStaticMarkup(
    <StandardCompactCarousel
      title="Canonical carousel"
      cards={cards}
      ariaLabel="Canonical examples"
    />
  );

  assert.match(html, /class="section-band compact spc-01"/);
  assert.doesNotMatch(html, /spc-01--embedded/);
  assert.match(html, /class="container"/);
});

test("image-title variant omits description and CTA placeholders", () => {
  const imageTitleCards: StandardCarouselCard[] = [{
    id: "elbow-flexor-spasticity",
    image: "/elbow.jpg",
    imageAlt: "Child undergoing an elbow assessment",
    icon: <span>icon</span>,
    title: "Elbow flexor spasticity"
  }];
  const html = renderToStaticMarkup(
    <StandardCompactCarousel
      title="Problems SMF may address"
      cards={imageTitleCards}
      ariaLabel="Problems SMF may address"
      variant="image-title"
    />
  );

  assert.match(html, /spc-01--image-title/);
  assert.match(html, /spc-01__card--image-title/);
  assert.match(html, /alt="Child undergoing an elbow assessment"/);
  assert.match(html, />Elbow flexor spasticity</);
  assert.doesNotMatch(html, /spc-01__description/);
  assert.doesNotMatch(html, /spc-01__action/);
  assert.doesNotMatch(html, /spc-01__image-placeholder/);
});

test("SPC-01 mobile geometry shows two cards and a partial third", () => {
  const cardWidth = 146;
  const gap = 8;

  [360, 390, 412].forEach((viewportWidth) => {
    const containerWidth = Math.min(viewportWidth, 390);
    const trackWidth = containerWidth - 32;
    const thirdCardStart = (cardWidth + gap) * 2;
    const thirdCardPeek = trackWidth - thirdCardStart;

    assert.ok(trackWidth >= cardWidth * 2 + gap, `${viewportWidth}px must show two complete cards`);
    assert.ok(thirdCardPeek > 0, `${viewportWidth}px must show a third-card preview`);
    assert.ok(thirdCardPeek < cardWidth, `${viewportWidth}px must not show three complete cards`);
  });
});

test("embedded SPC-01 geometry retains the mobile two-card preview", () => {
  const cardWidth = 146;
  const gap = 8;

  [360, 390, 412].forEach((viewportWidth) => {
    const trackWidth = viewportWidth - 32 - 2;
    const thirdCardPeek = trackWidth - (cardWidth + gap) * 2;

    assert.ok(trackWidth >= cardWidth * 2 + gap, `${viewportWidth}px must show two complete cards`);
    assert.ok(thirdCardPeek > 0, `${viewportWidth}px must retain a third-card preview`);
    assert.ok(thirdCardPeek < cardWidth, `${viewportWidth}px must not expose three complete cards`);
  });
});

test("SPC-01 desktop geometry shows three cards and a partial fourth", () => {
  const gap = 22;
  const visibleCards = 3.2;
  const maxCardWidth = 380;

  [1024, 1100, 1280, 1366, 1440, 1920].forEach((viewportWidth) => {
    const containerWidth = Math.min(viewportWidth - 64, 1280);
    const responsiveCardWidth = containerWidth / visibleCards
      - gap * (visibleCards - 1) / visibleCards;
    const cardWidth = Math.min(responsiveCardWidth, maxCardWidth);
    const mediaHeight = cardWidth * 84 / 146;
    const widthAfterThreeCards = containerWidth - (cardWidth * 3 + gap * 2);
    const fourthCardPeek = widthAfterThreeCards - gap;

    assert.ok(cardWidth <= maxCardWidth, `${viewportWidth}px cards must respect the width cap`);
    assert.ok(mediaHeight > 0, `${viewportWidth}px media must scale from the card width`);
    assert.ok(fourthCardPeek > 0, `${viewportWidth}px must show part of card four`);
    assert.ok(fourthCardPeek < cardWidth, `${viewportWidth}px must not show four complete cards`);
  });
});

test("SPC-01 tablet geometry shows two cards and a partial third", () => {
  const gap = 16;
  const visibleCards = 2.2;
  const containerWidth = 768 - 96;
  const cardWidth = containerWidth / visibleCards - gap * (visibleCards - 1) / visibleCards;
  const thirdCardPeek = containerWidth - (cardWidth * 2 + gap * 2);

  assert.ok(thirdCardPeek > 0);
  assert.ok(thirdCardPeek < cardWidth);
});

test("SMF benefit content retains the five approved cards exactly", () => {
  assert.deepEqual(
    smfPageContent.whoMayBenefit.items.map(({ title, body }) => ({ title, description: body })),
    [
      {
        title: "Focal spasticity",
        description: "Tightness affecting a specific limb or area."
      },
      {
        title: "Specific muscle groups affected",
        description: "Problem in selected muscles causing difficulty."
      },
      {
        title: "Useful movement still present",
        description: "Able to move the limb with some control."
      },
      {
        title: "Daily activities affected",
        description: "Walking, standing or self-care limited by overactive muscles."
      },
      {
        title: "Ready for rehabilitation",
        description: "Motivated and able to participate in therapy and training."
      }
    ]
  );
});

test("SMF problem content and cropped assets retain the approved six-card order", () => {
  const titles = smfPageContent.problems.items.map(({ text }) => text);
  assert.deepEqual(titles, [
    "Elbow flexor spasticity",
    "Wrist & finger flexion",
    "Thumb-in-palm posture",
    "Hip adductor spasticity",
    "Knee flexor spasticity",
    "Calf spasticity / toe walking"
  ]);

  const assetNames = [
    "smf-problem-elbow-flexor.jpg",
    "smf-problem-wrist-finger-flexion.jpg",
    "smf-problem-thumb-in-palm.jpg",
    "smf-problem-hip-adductor.jpg",
    "smf-problem-knee-flexor.jpg",
    "smf-problem-calf-toe-walking.jpg"
  ];
  const publicRoot = fileURLToPath(new URL("../../../public/assets/procedures/smf/problems/", import.meta.url));
  assetNames.forEach((assetName) => {
    assert.ok(existsSync(`${publicRoot}${assetName}`), `Missing cropped asset: ${assetName}`);
  });
});
