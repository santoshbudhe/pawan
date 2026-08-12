import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  deformityCorrectionContent,
  deformityCorrectionSectionOrder
} from "./deformityCorrectionContent";

const pageSource = readFileSync(
  new URL("./DeformityCorrectionProcedurePage.tsx", import.meta.url),
  "utf8"
);

test("Deformity Correction retains the locked procedure-page section order", () => {
  assert.deepEqual(deformityCorrectionSectionOrder, [
    "Hero",
    "What is Deformity Correction?",
    "Who may benefit from Deformity Correction?",
    "When Deformity Correction may not be appropriate",
    "Problems Deformity Correction may address",
    "Assessment & patient selection",
    "How Deformity Correction works",
    "Potential treatment goals",
    "Limitations & important considerations",
    "Treatment & rehabilitation journey",
    "Risks & important information",
    "Medical review",
    "Real Patient Journeys",
    "Frequently asked questions",
    "Our Specialist Team",
    "Consultation Locations",
    "Bottom treatment CTA",
    "Footer"
  ]);

  const renderSequence = [
    "<Hero whatsappHref=",
    "<WhatIsSection />",
    "<BenefitAndSuitabilitySections />",
    "<ProblemsSection />",
    "<AssessmentSection />",
    "<HowItWorksSection />",
    "<GoalsAndLimitations />",
    "<RehabilitationJourney />",
    "<RisksSection />",
    "<MedicalReviewSection />",
    "<SuccessStoryCarousel",
    "<ProcedureFAQ items={deformityCorrectionFaqs}",
    "<ProcedureClosingSections />"
  ];
  const positions = renderSequence.map((token) => pageSource.lastIndexOf(token));
  assert.equal(positions.every((position) => position >= 0), true);
  assert.deepEqual([...positions].sort((a, b) => a - b), positions);
});

test("renamed, added and removed Deformity sections retain the approved content contract", () => {
  assert.equal(deformityCorrectionContent.whatIs.title, "What is Deformity Correction?");
  assert.equal(deformityCorrectionContent.whoMayBenefit.title, "Who may benefit from Deformity Correction?");
  assert.equal(deformityCorrectionContent.whenNotAppropriate.items.length, 6);
  assert.equal(deformityCorrectionContent.problems.cards.length, 6);
  assert.equal(deformityCorrectionContent.assessment.steps.length, 6);
  assert.equal(deformityCorrectionContent.howItWorks.cards.length, 6);

  const serialized = JSON.stringify(deformityCorrectionContent);
  assert.equal(serialized.includes("What is it?"), false);
  assert.equal(serialized.includes("Who may need it?"), false);
  assert.equal(serialized.includes("What it may include"), false);
  assert.equal(serialized.includes("What difference it may make"), false);
});

test("approved Deformity card imagery maps to the four supplied six-image sets", () => {
  const resolvedCards = [
    ...deformityCorrectionContent.whoMayBenefit.cards,
    ...deformityCorrectionContent.problems.cards,
    ...deformityCorrectionContent.assessment.steps,
    ...deformityCorrectionContent.howItWorks.cards
  ];

  assert.equal(resolvedCards.length, 24);
  assert.equal(resolvedCards.every((card) => !card.imagePending), true);
  assert.equal(resolvedCards.every((card) => card.imageAlt.length > 0), true);
  assert.equal(new Set(resolvedCards.map((card) => card.image)).size, 24);
  assert.equal(
    resolvedCards.every((card) => card.image.startsWith("/assets/procedures/deformity-correction/cards/dcs-")),
    true
  );
  assert.equal(resolvedCards.some((card) => /\/(smf|sdr|tendon-muscle)\//.test(card.image)), false);
  assert.deepEqual(
    resolvedCards.map((card) => card.image.split("/").at(-1)),
    [
      "dcs-benefit-01-fixed-deformity.jpg",
      "dcs-benefit-02-abnormal-alignment.jpg",
      "dcs-benefit-03-walking-difficulty.jpg",
      "dcs-benefit-04-pain-instability.jpg",
      "dcs-benefit-05-footwear-bracing.jpg",
      "dcs-benefit-06-functional-limitations.jpg",
      "dcs-problems-01-fixed-deformity.png",
      "dcs-problems-02-malalignment.png",
      "dcs-problems-03-pain-instability.png",
      "dcs-problems-04-standing-movement.png",
      "dcs-problems-05-footwear-brace-fit.png",
      "dcs-problems-06-daily-care.png",
      "dcs-assessment-01-history-goals.png",
      "dcs-assessment-02-clinical-exam.png",
      "dcs-assessment-03-imaging-records.png",
      "dcs-assessment-04-gait-analysis.png",
      "dcs-assessment-05-structural-deformity.png",
      "dcs-assessment-06-recommendation.png",
      "dcs-how-01-planning.png",
      "dcs-how-02-osteotomy.png",
      "dcs-how-03-joint-foot-correction.png",
      "dcs-how-04-fixation.png",
      "dcs-how-05-postoperative-mobilisation.png",
      "dcs-how-06-rehabilitation.png"
    ]
  );
  assert.match(pageSource, /PENDING_IMAGE_BADGE = "Image pending"/);
});

test("Deformity reuses the canonical shared SMF and SPC-01 primitives", () => {
  for (const component of [
    "ProcedureWhatIsPanel",
    "StandardCompactCarousel",
    "SmfSectionHeading",
    "AccordionList",
    "ProcedureFAQ",
    "SuccessStoryCarousel",
    "ProcedureClosingSections"
  ]) {
    assert.match(pageSource, new RegExp(`<${component}`));
  }

  assert.match(pageSource, /variant="image-title"/);
  assert.doesNotMatch(pageSource, /HorizontalCardCarousel/);
});
