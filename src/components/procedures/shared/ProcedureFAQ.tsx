import { FAQItem } from "../../../content/procedureFaqs";
import { AccordionItem, AccordionList } from "../../smf/AccordionList";
import { SmfSectionHeading } from "../../smf/SmfSectionHeading";

export type { FAQItem } from "../../../content/procedureFaqs";

interface ProcedureFAQProps {
  items: readonly FAQItem[];
  title?: string;
  sectionId?: string;
}

export function ProcedureFAQ({
  items,
  title = "Frequently asked questions",
  sectionId = "frequently-asked-questions"
}: ProcedureFAQProps) {
  const accordionItems: AccordionItem[] = items.map((item, index) => ({
    id: `faq-${index + 1}`,
    title: item.question,
    body: item.answer
  }));

  return (
    <section id={sectionId} className="smf-section procedure-faq">
      <div className="smf-container">
        <div className="smf-panel">
          <SmfSectionHeading title={title} />
          <AccordionList items={accordionItems} label={title} />
        </div>
      </div>
    </section>
  );
}
