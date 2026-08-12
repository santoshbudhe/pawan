import { ReactNode } from "react";

interface SuccessStoryInfoCardProps {
  icon: ReactNode;
  title: string;
  text: string;
}

export function SuccessStoryInfoCard({ icon, title, text }: SuccessStoryInfoCardProps) {
  return (
    <article className="success-story-info-card">
      <span className="success-story-info-card__icon" aria-hidden="true">{icon}</span>
      <div className="success-story-info-card__text">
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </article>
  );
}
