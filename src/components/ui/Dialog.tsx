import { useLayoutEffect, useRef, type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/utils";
import { createDialog } from "@/lib/dialog";

interface DialogProps {
  id: string;
  open: boolean;
  labelledBy: string;
  closeLabel: string;
  trigger: RefObject<HTMLButtonElement | null>;
  fallbackFocusId?: string;
  onClose: () => void;
  className?: string;
  panelClassName?: string;
  children: ReactNode;
}

export function Dialog({
  id, open, labelledBy, closeLabel, trigger, fallbackFocusId,
  onClose, className, panelClassName, children,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    if (!open) return;
    const dialog = createDialog(dialogRef.current!, { onClose, fallbackFocusId });
    dialog.open(trigger.current);
    return () => dialog.destroy();
  }, [open, trigger, fallbackFocusId, onClose]);

  return (
    <dialog ref={dialogRef} id={id} className={cn("portfolio-dialog", className)} aria-labelledby={labelledBy}>
      <div data-dialog-panel className={cn("portfolio-dialog-panel", panelClassName)}>
        <button type="button" autoFocus data-dialog-close className="portfolio-dialog-close" aria-label={closeLabel}>
          <svg className="pointer-events-none h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m6 6 12 12M6 18 18 6" />
          </svg>
        </button>
        {children}
      </div>
    </dialog>
  );
}
