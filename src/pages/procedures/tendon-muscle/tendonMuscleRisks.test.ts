import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const contentSource = readFileSync(new URL("./tendonMuscleContent.ts", import.meta.url), "utf8");
const risksStart = contentSource.indexOf("    risks: {");
const risksEnd = contentSource.indexOf("    review: {", risksStart);
const risksSource = contentSource.slice(risksStart, risksEnd);

const expectedRisks = [
  {
    title: "Pain, swelling or discomfort",
    body: "Some pain, swelling and soreness are expected after tendon or muscle surgery, particularly during the first few days. These are usually managed with pain relief, elevation and the recommended splint, cast or brace. Increasing pain, redness, drainage or fever should be reported to the surgical team."
  },
  {
    title: "Wound healing, infection or scar sensitivity",
    body: "As with any operation, there is a small risk of wound problems, infection, bruising or sensitivity around the scar. Careful wound care and follow-up help identify and treat these problems early."
  },
  {
    title: "Under-correction, recurrence or over-correction",
    body: "The amount of tendon or muscle release is carefully planned. Too little correction may leave some tightness, while excessive lengthening can reduce strength or alter movement. Tightness or deformity may also recur over time, particularly as a child grows."
  },
  {
    title: "Need for rehabilitation to achieve results",
    body: "Surgery changes the mechanical tightness, but rehabilitation helps the person learn to use the improved range of movement. Physiotherapy, strengthening, stretching, gait or hand training, and sometimes splints or orthoses may form part of recovery."
  },
  {
    title: "Stiffness, weakness or reduced joint movement",
    body: "Muscles can feel weaker or joints stiffer during the early recovery period. This usually improves gradually with healing and rehabilitation. Because tendon lengthening changes muscle tension, the amount of correction is carefully selected to preserve useful strength and movement."
  },
  {
    title: "Possible need for additional procedures in the future",
    body: "Tendon and muscle surgery aims to improve alignment, comfort and useful movement, but it does not remove the underlying neurological condition causing spasticity. As growth, muscle balance and movement patterns change, additional therapy, orthoses, injections or surgery may occasionally be needed later."
  }
] as const;

const expectedNote =
  "Individual risks vary depending on which muscles or tendons are treated, the number of procedures performed, mobility level and overall health. Your surgeon will explain the expected benefits, recovery plan and risks specific to you before surgery.";

test("Tendon and Muscle risks retain the approved six-item copy and order", () => {
  assert.ok(risksStart >= 0 && risksEnd > risksStart, "the Tendon risks data block must exist");
  assert.match(risksSource, /id: "risks-important-information"/);
  assert.match(risksSource, /heading: "Risks & important information"/);
  assert.equal((risksSource.match(/\n\s+title: /g) ?? []).length, 6);
  assert.equal((risksSource.match(/\n\s+body: /g) ?? []).length, 6);
  assert.equal((risksSource.match(/icon: "ShieldAlert"/g) ?? []).length, 6);

  const titlePositions = expectedRisks.map(({ title }) => {
    const position = risksSource.indexOf(`title: ${JSON.stringify(title)}`);
    assert.ok(position >= 0, `missing approved risk title: ${title}`);
    return position;
  });
  assert.deepEqual([...titlePositions].sort((a, b) => a - b), titlePositions);

  for (const { body } of expectedRisks) {
    assert.ok(risksSource.includes(`body: ${JSON.stringify(body)}`), "missing approved risk answer");
  }
  assert.equal(new Set(expectedRisks.map(({ body }) => body)).size, 6);
  assert.ok(risksSource.includes(`callout: ${JSON.stringify(expectedNote)}`));

  assert.doesNotMatch(
    risksSource,
    /Your surgeon will discuss the specific risks, alternatives and expected outcomes in detail during your assessment\./
  );
  assert.doesNotMatch(risksSource, /Healing concerns or delayed bone healing/i);
  assert.doesNotMatch(risksSource, /delayed bone healing/i);
});

test("Tendon risks continue through the shared responsive accordion and information panel", () => {
  const adapterSource = readFileSync(
    new URL("../../../components/procedures/tendon-muscle/TendonMusclePartTwo.tsx", import.meta.url),
    "utf8"
  );
  const lowerSectionsSource = readFileSync(
    new URL("../../../components/procedures/shared/ProcedureLowerSections.tsx", import.meta.url),
    "utf8"
  );

  assert.match(adapterSource, /partTwo\.risks\.items\.map/);
  assert.match(adapterSource, /body: item\.body/);
  assert.match(adapterSource, /note: partTwo\.risks\.callout/);
  assert.match(adapterSource, /<ProcedureLowerSections/);

  assert.match(lowerSectionsSource, /<AccordionList/);
  assert.match(lowerSectionsSource, /items=\{\[\.\.\.risks\.items\]\}/);
  assert.match(lowerSectionsSource, /\bcolumns\b/);
  assert.match(lowerSectionsSource, /<div className="smf-risk-note">/);
  assert.match(lowerSectionsSource, /<p>\{risks\.note\}<\/p>/);
});
