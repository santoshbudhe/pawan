import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { sdrPageContent } from "../../../pages/procedures/sdr/sdrContent";
import { ProcedureLowerSections } from "./ProcedureLowerSections";

test("SDR lower sections use the canonical SMF structure with SDR content", () => {
  const { goals, limitations, recovery, risks, medicalReview } = sdrPageContent.sections;
  const html = renderToStaticMarkup(
    <ProcedureLowerSections
      goals={{ id: goals.id, title: goals.heading, items: goals.items }}
      limitations={{ id: limitations.id, title: limitations.heading, items: limitations.items }}
      journey={{
        id: recovery.id,
        title: recovery.heading,
        steps: recovery.steps.map((step) => ({
          id: step.id,
          title: step.title,
          body: step.description ?? "",
          icon: <span aria-hidden="true" />
        })),
        note: recovery.callout
      }}
      risks={{
        id: risks.id,
        title: risks.heading,
        items: risks.items.map((item) => ({ id: item.id, title: item.title, body: item.summary })),
        note: risks.finalNote,
        renderIcon: () => <span aria-hidden="true" />
      }}
      medicalReview={{
        id: medicalReview.id,
        title: medicalReview.heading,
        portrait: <img src="/reviewer.png" alt={medicalReview.reviewer.name} />,
        name: medicalReview.reviewer.name,
        qualifications: medicalReview.reviewer.qualifications,
        specialty: medicalReview.reviewer.designation,
        experience: medicalReview.reviewer.experience,
        reviewedOn: medicalReview.reviewer.reviewedOn
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
  assert.equal((html.match(/class="smf-accordion-item"/g) ?? []).length, risks.items.length);
  assert.equal((html.match(/<img/g) ?? []).length, 1);
  assert.match(html, new RegExp(risks.finalNote));
  assert.match(html, /Reviewed on: 18 May 2025/);
  assert.doesNotMatch(html, /Potential goals of SDR/);
  assert.doesNotMatch(html, /Recovery &amp; rehabilitation journey/);
  assert.doesNotMatch(html, /Individual assessment matters/);
  assert.doesNotMatch(html, /sdr-risk-aside|sdr-recovery-grid|sdr-limitations-panel/);
});
