import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { ProcedureLowerSections } from "./ProcedureLowerSections";

test("shared procedure lower sections keep their canonical structure", () => {
  const riskItems = [
    { id: "risk-one", title: "Example risk", body: "Example risk information." },
    { id: "risk-two", title: "Another risk", body: "Additional risk information." }
  ];
  const html = renderToStaticMarkup(
    <ProcedureLowerSections
      goals={{
        id: "goals",
        title: "Potential treatment goals",
        items: [{ id: "goal-one", text: "Support useful movement" }]
      }}
      limitations={{
        id: "limitations",
        title: "Limitations & important considerations",
        items: [{ id: "limitation-one", text: "Individual results vary" }]
      }}
      journey={{
        id: "journey",
        title: "Treatment & rehabilitation journey",
        steps: Array.from({ length: 6 }, (_, index) => ({
          id: `step-${index + 1}`,
          title: `Step ${index + 1}`,
          body: "Individual care step.",
          icon: <span aria-hidden="true" />
        })),
        note: "Recovery depends on the individual treatment plan."
      }}
      risks={{
        id: "risks",
        title: "Risks & important information",
        items: riskItems,
        note: "Your surgeon will discuss individual risks.",
        renderIcon: () => <span aria-hidden="true" />
      }}
      medicalReview={{
        id: "medical-review",
        title: "Medically reviewed by",
        portrait: <img src="/reviewer.png" alt="Dr. Pawan Kumar Sadhvani" />,
        name: "Dr. Pawan Kumar Sadhvani",
        qualifications: "MBBS, MS (Ortho)",
        specialty: "Deformity Correction Specialist",
        experience: "Clinical experience",
        reviewedOn: "18 May 2025"
      }}
    />
  );

  const expectedHeadings = [
    "Potential treatment goals",
    "Limitations &amp; important considerations",
    "Treatment &amp; rehabilitation journey",
    "Risks &amp; important information",
    "Medically reviewed by"
  ];
  const headingPositions = expectedHeadings.map((heading) => html.indexOf(heading));

  assert.ok(headingPositions.every((position) => position >= 0));
  assert.deepEqual([...headingPositions].sort((a, b) => a - b), headingPositions);
  assert.match(html, /class="smf-container smf-panel smf-goals-panel"/);
  assert.match(html, /class="smf-warning-list"/);
  assert.match(html, /class="smf-timeline"/);
  assert.match(html, /class="smf-accordion smf-accordion-columns"/);
  assert.match(html, /class="smf-risk-note"/);
  assert.match(html, /class="smf-review-card"/);
  assert.equal((html.match(/class="smf-timeline-number"/g) ?? []).length, 6);
  assert.equal((html.match(/class="smf-accordion-item"/g) ?? []).length, riskItems.length);
  assert.equal((html.match(/<img/g) ?? []).length, 1);
  assert.match(html, /Your surgeon will discuss individual risks/);
  assert.match(html, /Reviewed on: 18 May 2025/);
  assert.doesNotMatch(html, /Recovery &amp; rehabilitation journey/);
  assert.doesNotMatch(html, /Individual assessment matters/);
  assert.doesNotMatch(html, /sdr-risk-aside|sdr-recovery-grid|sdr-limitations-panel/);
});
