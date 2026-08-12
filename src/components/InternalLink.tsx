import { AnchorHTMLAttributes, ReactNode } from "react";
import { handleInternalLinkClick } from "../lib/navigation";

interface InternalLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
}

export function InternalLink({ href, children, onClick, ...props }: InternalLinkProps) {
  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        handleInternalLinkClick(event, href);
      }}
    >
      {children}
    </a>
  );
}
