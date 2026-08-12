import { Calendar, ChevronRight, MessageCircle, Sprout } from "lucide-react";
import { ReactNode } from "react";
import { handleInternalLinkClick } from "../lib/navigation";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "light";
  icon?: "calendar" | "arrow" | "leaf" | "message";
  className?: string;
}

export function Button({ children, href = "#assessment", variant = "primary", icon, className = "" }: ButtonProps) {
  const content = (
    <>
      {icon === "calendar" ? <Calendar aria-hidden="true" /> : null}
      {icon === "leaf" ? <Sprout aria-hidden="true" /> : null}
      {icon === "message" ? <MessageCircle aria-hidden="true" /> : null}
      <span>{children}</span>
      {icon === "arrow" ? <ChevronRight aria-hidden="true" /> : null}
    </>
  );

  return (
    <a
      className={`btn btn-${variant} ${className}`}
      href={href}
      onClick={(event) => handleInternalLinkClick(event, href)}
    >
      {content}
    </a>
  );
}
