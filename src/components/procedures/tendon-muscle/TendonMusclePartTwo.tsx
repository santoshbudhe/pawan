import { AccordionItem } from "../../smf/AccordionList";
import { SuccessStoryCarousel } from "../../success-stories/SuccessStoryCarousel";
import { ProcedureLowerSections } from "../shared/ProcedureLowerSections";
import { ProcedureFAQ } from "../shared/ProcedureFAQ";
import { tendonMuscleFaqs } from "../../../content/procedureFaqs";
import { getStoriesForProcedure } from "../../../data/successStories.database";
import { TendonMusclePageContent } from "../../../pages/procedures/tendon-muscle/tendonMuscleTypes";
import { TendonMuscleIcon } from "./TendonMuscleIcon";

interface TendonMusclePartTwoProps {
  content: TendonMusclePageContent;
}

export function TendonMusclePartTwo({ content }: TendonMusclePartTwoProps) {
  const { partTwo } = content;
  const accordionItems: AccordionItem[] = partTwo.risks.items.map((item) => ({
    id: item.id,
    title: item.title,
    body: item.body
  }));

  return (
    <>
      <ProcedureLowerSections
        goals={{
          id: partTwo.goals.id,
          title: partTwo.goals.heading,
          items: partTwo.goals.items
        }}
        limitations={{
          id: partTwo.limitations.id,
          title: partTwo.limitations.heading,
          items: partTwo.limitations.items,
          note: partTwo.limitations.callout
        }}
        journey={{
          id: partTwo.journey.id,
          title: partTwo.journey.heading,
          steps: partTwo.journey.steps.map((step) => ({
            id: step.id,
            title: step.title,
            body: step.description ?? "",
            icon: <TendonMuscleIcon name={step.icon} />
          })),
          note: partTwo.journey.callout
        }}
        risks={{
          id: partTwo.risks.id,
          title: partTwo.risks.heading,
          items: accordionItems,
          note: partTwo.risks.callout,
          renderIcon: (_item, index) => <TendonMuscleIcon name={partTwo.risks.items[index].icon} />
        }}
        medicalReview={{
          id: partTwo.review.id,
          title: partTwo.review.heading,
          portrait: (
            <img
              src={partTwo.review.portrait}
              alt={partTwo.review.name}
              width="240"
              height="240"
              loading="lazy"
              decoding="async"
            />
          ),
          name: partTwo.review.name,
          qualifications: partTwo.review.credentials,
          specialty: partTwo.review.role,
          experience: partTwo.review.experience,
          reviewedOn: partTwo.review.lastReviewed
        }}
      />

      <SuccessStoryCarousel
        stories={getStoriesForProcedure("tendon-muscle")}
        title="Real Patient Journeys"
        subtitle="Real patient stories showing progress through specialist treatment and rehabilitation."
        sectionId="patient-journeys"
      />
      <ProcedureFAQ items={tendonMuscleFaqs} />
    </>
  );
}
