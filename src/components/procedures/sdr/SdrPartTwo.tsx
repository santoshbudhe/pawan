import reviewerPortrait from "../../../../assets/doctors/pawan.png";
import { ProcedureLowerSections } from "../shared/ProcedureLowerSections";
import { ProcedureFAQ } from "../shared/ProcedureFAQ";
import { SuccessStoryCarousel } from "../../success-stories/SuccessStoryCarousel";
import { AccordionItem } from "../../smf/AccordionList";
import { sdrFaqs } from "../../../content/procedureFaqs";
import { getStoriesForProcedure } from "../../../data/successStories.database";
import { SdrPageContent } from "../../../pages/procedures/sdr/sdrTypes";
import { SdrIcon } from "./SdrIcon";

interface SdrPartTwoProps {
  content: SdrPageContent;
}

export function SdrPartTwo({ content }: SdrPartTwoProps) {
  const { sections } = content;
  const goals = sections.goals;
  const limitations = sections.limitations;
  const recovery = sections.recovery;
  const risks = sections.risks;
  const review = sections.medicalReview;
  const riskItems: AccordionItem[] = risks.items.map((item) => ({ id: item.id, title: item.title, body: item.summary }));

  return (
    <>
      <ProcedureLowerSections
        goals={{
          id: goals.id,
          title: goals.heading,
          items: goals.items
        }}
        limitations={{
          id: limitations.id,
          title: limitations.heading,
          items: limitations.items
        }}
        journey={{
          id: recovery.id,
          title: recovery.heading,
          steps: recovery.steps.map((step) => ({
            id: step.id,
            title: step.title,
            body: step.description ?? "",
            icon: <SdrIcon name={step.icon!} />
          })),
          note: recovery.callout
        }}
        risks={{
          id: risks.id,
          title: risks.heading,
          items: riskItems,
          note: risks.finalNote,
          renderIcon: (_item, index) => <SdrIcon name={risks.items[index].icon} />
        }}
        medicalReview={{
          id: review.id,
          title: review.heading,
          portrait: (
            <img
              src={reviewerPortrait}
              alt={review.reviewer.name}
              width="240"
              height="240"
              loading="lazy"
              decoding="async"
            />
          ),
          name: review.reviewer.name,
          qualifications: review.reviewer.qualifications,
          specialty: review.reviewer.designation,
          experience: review.reviewer.experience,
          reviewedOn: review.reviewer.reviewedOn
        }}
      />

      <SuccessStoryCarousel
        stories={getStoriesForProcedure("sdr")}
        title="Real Patient Journeys"
        subtitle="Real patient stories showing progress through specialist treatment and rehabilitation."
        sectionId="patient-journeys"
      />
      <ProcedureFAQ items={sdrFaqs} />
    </>
  );
}
