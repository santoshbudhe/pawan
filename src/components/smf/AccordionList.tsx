import { ChevronDown } from "lucide-react";
import { KeyboardEvent, ReactNode, useId, useRef, useState } from "react";
import { SmfIconKey } from "../../content/smfPageContent";
import { SmfIcon } from "./SmfIcon";

export interface AccordionItem {
  id?: string;
  title: string;
  body?: string;
  icon?: SmfIconKey;
}

interface AccordionListProps {
  items: AccordionItem[];
  label: string;
  columns?: boolean;
  allowMultiple?: boolean;
  renderIcon?: (item: AccordionItem, index: number) => ReactNode;
}

export function AccordionList({ items, label, columns = false, allowMultiple = true, renderIcon }: AccordionListProps) {
  const baseId = useId();
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set());
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const toggleItem = (index: number, hasBody: boolean) => {
    if (!hasBody) return;
    setOpenItems((current) => {
      if (current.has(index)) {
        const next = new Set(current);
        next.delete(index);
        return next;
      }
      const next = allowMultiple ? new Set(current) : new Set<number>();
      next.add(index);
      return next;
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number, hasBody: boolean) => {
    if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
      event.preventDefault();
      toggleItem(index, hasBody);
      return;
    }
    let nextIndex: number | undefined;
    if (event.key === "ArrowDown") nextIndex = (index + 1) % items.length;
    if (event.key === "ArrowUp") nextIndex = (index - 1 + items.length) % items.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = items.length - 1;
    if (nextIndex === undefined) return;
    event.preventDefault();
    triggerRefs.current[nextIndex]?.focus();
  };

  return (
    <div className={`smf-accordion ${columns ? "smf-accordion-columns" : ""}`} aria-label={label}>
      {items.map((item, index) => {
        const hasBody = Boolean(item.body);
        const open = hasBody && openItems.has(index);
        const itemId = item.id ?? String(index);
        const triggerId = `${baseId}-trigger-${itemId}`;
        const panelId = `${baseId}-panel-${itemId}`;
        return (
          <div className="smf-accordion-item" key={item.title}>
            <button
              ref={(node) => { triggerRefs.current[index] = node; }}
              id={triggerId}
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              aria-disabled={!hasBody || undefined}
              onClick={() => toggleItem(index, hasBody)}
              onKeyDown={(event) => handleKeyDown(event, index, hasBody)}
            >
              {renderIcon ? renderIcon(item, index) : item.icon ? <SmfIcon name={item.icon} /> : null}
              <span>{item.title}</span>
              <ChevronDown className="smf-accordion-chevron" aria-hidden="true" />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="smf-accordion-panel"
              hidden={!open}
            >
              {item.body ? <p>{item.body}</p> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
