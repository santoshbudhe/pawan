import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { deformityCorrectionContent } from "./deformityCorrectionContent";

const workspaceRoot = fileURLToPath(new URL("../../../../", import.meta.url));
const pageSource = readFileSync(
  new URL("./DeformityCorrectionProcedurePage.tsx", import.meta.url),
  "utf8"
);

const expectedEligibilityMapping = [
  {
    id: "fixed-deformity",
    title: "Fixed bone or joint deformity",
    image: "/assets/procedures/deformity-correction/cards/dcs-benefit-01-fixed-deformity.jpg"
  },
  {
    id: "abnormal-alignment",
    title: "Abnormal alignment affecting movement",
    image: "/assets/procedures/deformity-correction/cards/dcs-benefit-02-abnormal-alignment.jpg"
  },
  {
    id: "walking-difficulty",
    title: "Deformity causing difficulty walking",
    image: "/assets/procedures/deformity-correction/cards/dcs-benefit-03-walking-difficulty.jpg"
  },
  {
    id: "pain-instability",
    title: "Painful or unstable joints",
    image: "/assets/procedures/deformity-correction/cards/dcs-benefit-04-pain-instability.jpg"
  },
  {
    id: "footwear-bracing",
    title: "Footwear or brace-fitting difficulty",
    image: "/assets/procedures/deformity-correction/cards/dcs-benefit-05-footwear-bracing.jpg"
  },
  {
    id: "functional-limitations",
    title: "Structural functional limitations",
    image: "/assets/procedures/deformity-correction/cards/dcs-benefit-06-functional-limitations.jpg"
  }
] as const;

test("Deformity eligibility cards retain the exact six-image mapping with local JPG assets", () => {
  const cards = deformityCorrectionContent.whoMayBenefit.cards;

  assert.equal(cards.length, 6);
  assert.deepEqual(
    cards.map(({ id, title, image }) => ({ id, title, image })),
    expectedEligibilityMapping
  );
  assert.equal(new Set(cards.map(({ image }) => image)).size, 6);

  for (const card of cards) {
    assert.equal(card.imagePending, false, `${card.id} must not render the image-pending badge`);
    assert.ok(card.imageAlt.trim().length > 0, `${card.id} requires meaningful alt text`);
    assert.doesNotMatch(card.imageAlt, /pending|placeholder/i);
    assert.match(
      card.image,
      /^\/assets\/procedures\/deformity-correction\/cards\/dcs-benefit-\d{2}-[a-z0-9-]+\.jpg$/
    );
    assert.doesNotMatch(card.image, /\/(?:smf|sdr|tendon-muscle)\//);

    const physicalPath = join(workspaceRoot, "public", card.image.slice(1));
    const file = statSync(physicalPath);
    const bytes = readFileSync(physicalPath);
    assert.equal(file.isFile(), true, `${card.image} must resolve to a local file`);
    assert.ok(file.size > 1_000, `${card.image} appears to be an empty placeholder`);
    assert.deepEqual([...bytes.subarray(0, 3)], [0xff, 0xd8, 0xff], `${card.image} must be a valid JPEG`);
    assert.deepEqual([...bytes.subarray(-2)], [0xff, 0xd9], `${card.image} must have a JPEG end marker`);
  }
});

test("the eligibility image-only update preserves card content and SPC-01 layout", () => {
  const section = deformityCorrectionContent.whoMayBenefit;
  const contentContract = section.cards.map(({ id, title, description, icon }) => ({
    id,
    title,
    description,
    icon
  }));
  const contentDigest = createHash("sha256")
    .update(JSON.stringify(contentContract), "utf8")
    .digest("hex");

  assert.equal(section.id, "who-may-benefit-deformity-correction");
  assert.equal(section.title, "Who may benefit from Deformity Correction?");
  assert.equal(contentDigest, "013d0197dddfa171d25ddc8d59392737d8d310564efd11cd08ee72f253d4e427");

  const carouselStart = pageSource.indexOf("<StandardCompactCarousel\n          title={benefit.title}");
  const carouselEnd = pageSource.indexOf("/>", carouselStart);
  assert.ok(carouselStart >= 0 && carouselEnd > carouselStart, "eligibility must remain on SPC-01");

  const carouselMarkup = pageSource.slice(carouselStart, carouselEnd + 2);
  assert.match(carouselMarkup, /cards=\{benefitCards\}/);
  assert.match(carouselMarkup, /ariaLabel=\{benefit\.title\}/);
  assert.match(carouselMarkup, /sectionId=\{benefit\.id\}/);
  assert.match(carouselMarkup, /className="smf-panel"/);
  assert.match(carouselMarkup, /desktopColumns=\{6\}/);
  assert.match(carouselMarkup, /\bembedded\b/);
  assert.doesNotMatch(carouselMarkup, /variant=|cardWidth=|mobileCardWidth=|HorizontalCardCarousel/);
});

