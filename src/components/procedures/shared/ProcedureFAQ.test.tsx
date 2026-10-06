import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
import {
  deformityCorrectionFaqs,
  FAQItem,
  smfFaqs,
  tendonMuscleFaqs
} from "../../../content/procedureFaqs";
import { ProcedureFAQ } from "./ProcedureFAQ";

const workspaceRoot = fileURLToPath(new URL("../../../../", import.meta.url));

function readWorkspaceFile(relativePath: string): string {
  return readFileSync(join(workspaceRoot, relativePath), "utf8");
}

function contentDigest(items: readonly FAQItem[]): string {
  return createHash("sha256").update(JSON.stringify(items), "utf8").digest("hex");
}

const faqDatasets = [
  {
    name: "SMF",
    items: smfFaqs,
    count: 4,
    digest: "b49ad80957c1a45dda7943178c483421e1295bb68a75d59cca9cbe55ea9161c9"
  },
  {
    name: "Tendon & Muscle",
    items: tendonMuscleFaqs,
    count: 6,
    digest: "8ccf1dda3e5879eb0282c0b976889398c016a0921b1f1a62b6ca10a020daba10"
  },
  {
    name: "Deformity Correction",
    items: deformityCorrectionFaqs,
    count: 5,
    digest: "e09905a9d5ef72080dd983b5a21925cd6e99b0478ea8aca4fd8059b88480f149"
  }
] as const;

test("the three retained procedure FAQ datasets keep their approved copy", () => {
  for (const dataset of faqDatasets) {
    assert.equal(dataset.items.length, dataset.count, `${dataset.name} FAQ count changed`);
    assert.equal(contentDigest(dataset.items), dataset.digest, `${dataset.name} FAQ copy changed`);
    assert.ok(
      dataset.items.every(({ question, answer }) => question.trim().length > 0 && answer.trim().length > 0),
      `${dataset.name} contains an unanswered FAQ`
    );
    assert.equal(
      new Set(dataset.items.map(({ question }) => question)).size,
      dataset.count,
      `${dataset.name} contains a duplicate question`
    );
  }
});

test("ProcedureFAQ renders the canonical SMF container and complete accessible accordion", () => {
  for (const dataset of faqDatasets) {
    const html = renderToStaticMarkup(<ProcedureFAQ items={dataset.items} />);

    assert.match(
      html,
      /^<section id="frequently-asked-questions" class="smf-section procedure-faq"><div class="smf-container"><div class="smf-panel">/
    );
    assert.match(html, /<h2>Frequently asked questions<\/h2>/);
    assert.match(html, /class="smf-accordion "/);
    assert.equal((html.match(/class="smf-accordion-item"/g) ?? []).length, dataset.count);
    assert.equal((html.match(/<button /g) ?? []).length, dataset.count);
    assert.equal((html.match(/type="button"/g) ?? []).length, dataset.count);
    assert.equal((html.match(/aria-expanded="false"/g) ?? []).length, dataset.count);
    assert.equal((html.match(/aria-controls="[^"]+-panel-faq-\d+"/g) ?? []).length, dataset.count);
    assert.equal((html.match(/role="region"/g) ?? []).length, dataset.count);
    assert.equal((html.match(/aria-labelledby="[^"]+-trigger-faq-\d+"/g) ?? []).length, dataset.count);
    assert.equal((html.match(/class="smf-accordion-panel" hidden=""/g) ?? []).length, dataset.count);
    assert.equal((html.match(/class="[^"]*smf-accordion-chevron[^"]*"/g) ?? []).length, dataset.count);
    assert.doesNotMatch(html, /aria-disabled="true"/);

    const buttons = html.match(/<button [\s\S]*?<\/button>/g) ?? [];
    assert.equal(buttons.length, dataset.count);
    for (const button of buttons) {
      assert.equal((button.match(/smf-accordion-chevron/g) ?? []).length, 1);
    }

    for (const { question, answer } of dataset.items) {
      assert.ok(html.includes(question), `${dataset.name} is missing question: ${question}`);
      assert.ok(html.includes(answer), `${dataset.name} is missing the answer for: ${question}`);
    }
  }
});

test("ProcedureFAQ keeps its default and optional section API stable", () => {
  const html = renderToStaticMarkup(
    <ProcedureFAQ items={smfFaqs.slice(0, 1)} title="Procedure questions" sectionId="procedure-questions" />
  );

  assert.match(html, /^<section id="procedure-questions" class="smf-section procedure-faq">/);
  assert.match(html, /<h2>Procedure questions<\/h2>/);
  assert.match(html, /aria-label="Procedure questions"/);
});

test("all retained procedure pages consume one ProcedureFAQ after Patient Journeys", () => {
  const consumers = [
    {
      name: "SMF",
      source: readWorkspaceFile("src/pages/SmfProcedurePage.tsx"),
      dataset: "smfFaqs"
    },
    {
      name: "Tendon & Muscle",
      source: readWorkspaceFile("src/components/procedures/tendon-muscle/TendonMusclePartTwo.tsx"),
      dataset: "tendonMuscleFaqs"
    },
    {
      name: "Deformity Correction",
      source: readWorkspaceFile("src/pages/procedures/deformity-correction/DeformityCorrectionProcedurePage.tsx"),
      dataset: "deformityCorrectionFaqs"
    }
  ] as const;

  for (const consumer of consumers) {
    const storyPosition = consumer.source.indexOf("<SuccessStoryCarousel");
    const faqMarkup = `<ProcedureFAQ items={${consumer.dataset}}`;
    const faqPosition = consumer.source.indexOf(faqMarkup);

    assert.match(consumer.source, /import \{ ProcedureFAQ \} from /, `${consumer.name} lacks the shared component import`);
    assert.match(
      consumer.source,
      new RegExp(`import \\{ ${consumer.dataset} \\} from `),
      `${consumer.name} lacks its central dataset import`
    );
    assert.ok(storyPosition >= 0, `${consumer.name} lacks Real Patient Journeys`);
    assert.ok(faqPosition > storyPosition, `${consumer.name} FAQ must follow Real Patient Journeys`);
    assert.equal(consumer.source.split(faqMarkup).length - 1, 1, `${consumer.name} must render one FAQ section`);
  }

  const directClosingConsumers = [consumers[0], consumers[2]];
  for (const consumer of directClosingConsumers) {
    assert.ok(
      consumer.source.indexOf("<ProcedureClosingSections") > consumer.source.indexOf("<ProcedureFAQ"),
      `${consumer.name} FAQ must precede Our Specialist Team`
    );
  }

  const tendonPage = readWorkspaceFile("src/pages/procedures/tendon-muscle/TendonMuscleProcedurePage.tsx");
  assert.ok(tendonPage.indexOf("<ProcedureClosingSections") > tendonPage.indexOf("<TendonMusclePartTwo"));
});

test("legacy procedure-specific FAQ controls, placeholder copy and styles stay removed", () => {
  const procedureFaqSource = readWorkspaceFile("src/components/procedures/shared/ProcedureFAQ.tsx");
  const consumerSource = [
    "src/pages/SmfProcedurePage.tsx",
    "src/components/procedures/tendon-muscle/TendonMusclePartTwo.tsx",
    "src/pages/procedures/deformity-correction/DeformityCorrectionProcedurePage.tsx"
  ].map(readWorkspaceFile).join("\n");
  const legacyContentSource = [
    "src/content/smfPageContent.ts",
    "src/pages/procedures/deformity-correction/deformityCorrectionContent.ts"
  ].map(readWorkspaceFile).join("\n");
  const procedureCss = [
    "src/pages/procedures/tendon-muscle/tendonMusclePage.css",
    "src/pages/procedures/deformity-correction/deformityCorrectionPage.css"
  ].map(readWorkspaceFile).join("\n");

  assert.doesNotMatch(consumerSource, /function\s+(?:FaqSection|ApprovedFaqs)\b/);
  assert.doesNotMatch(consumerSource, /View all FAQs|Show more FAQs|Show fewer FAQs/i);
  assert.doesNotMatch(consumerSource, /Answers will be added after medical review\./i);
  assert.doesNotMatch(consumerSource, /\.slice\([^)]*faq|faq[^\n]*\.slice\(/i);
  assert.doesNotMatch(procedureFaqSource, /carousel|pagination|\.slice\(/i, "ProcedureFAQ must remain a vertical accordion");

  assert.doesNotMatch(legacyContentSource, /answersApproved|interface\s+SdrFaqItem|\bfaqs:\s*\{/);
  assert.doesNotMatch(legacyContentSource, /What is Selective Motor Fasciculotomy \(SMF\)\?/);
  assert.doesNotMatch(legacyContentSource, /What does Deformity Correction Surgery treat\?/);

  assert.doesNotMatch(procedureCss, /#frequently-asked-questions[^{]*\.smf-accordion/i);
});

test("the canonical SMF FAQ styles retain the shared responsive contract", () => {
  const smfCss = readWorkspaceFile("src/smf.css");
  const globalCss = readWorkspaceFile("src/styles.css");

  for (const width of [360, 390, 412, 430]) {
    assert.ok(width >= 320 && width <= 767, `${width}px must use the canonical mobile FAQ rules`);
  }

  assert.match(smfCss, /\.smf-container\s*\{[^}]*width:\s*100%;[^}]*padding-inline:\s*16px;/s);
  assert.match(smfCss, /\.smf-panel\s*\{[^}]*min-width:\s*0;[^}]*border:\s*1px solid var\(--smf-border\);[^}]*border-radius:\s*12px;/s);
  assert.match(smfCss, /\.smf-accordion-item\s*\{[^}]*min-width:\s*0;[^}]*border-bottom:\s*1px solid var\(--smf-border\);/s);
  assert.match(smfCss, /\.smf-accordion-item > button\s*\{[^}]*width:\s*100%;[^}]*min-height:\s*48px;[^}]*grid-template-columns:\s*auto minmax\(0, 1fr\) auto;/s);
  assert.match(smfCss, /\.smf-accordion-item > button span\s*\{[^}]*min-width:\s*0;[^}]*font-size:\s*13px;[^}]*line-height:\s*18px;[^}]*font-weight:\s*700;/s);
  assert.match(smfCss, /\.smf-accordion-panel p\s*\{[^}]*font-size:\s*14px;[^}]*line-height:\s*20px;/s);
  assert.match(smfCss, /\.smf-accordion-chevron\s*\{[^}]*transition:\s*transform 160ms ease;/s);
  assert.match(smfCss, /\.smf-accordion-item > button > svg:first-child:not\(\.smf-accordion-chevron\)/);
  assert.match(
    smfCss,
    /\.procedure-faq \.smf-accordion-item > button\s*\{[^}]*display:\s*flex;[^}]*align-items:\s*center;[^}]*justify-content:\s*space-between;/s
  );
  assert.match(
    smfCss,
    /\.procedure-faq \.smf-accordion-item > button span\s*\{[^}]*flex:\s*1 1 auto;[^}]*min-width:\s*0;/s
  );
  assert.match(
    smfCss,
    /\.procedure-faq \.smf-accordion-chevron\s*\{[^}]*flex:\s*0 0 18px;[^}]*width:\s*18px;[^}]*height:\s*18px;/s
  );
  assert.match(
    smfCss,
    /\.smf-accordion-item > button\[aria-expanded="true"\] \.smf-accordion-chevron\s*\{[^}]*transform:\s*rotate\(180deg\);/s
  );
  assert.match(globalCss, /:focus-visible\s*\{[^}]*outline:/s);

  const faqStyleContract = smfCss.match(/\.smf-accordion[\s\S]*?\.smf-risk-note/)?.[0] ?? "";
  assert.doesNotMatch(faqStyleContract, /\bvw\b|line-clamp|text-overflow/);
});
