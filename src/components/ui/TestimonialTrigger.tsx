import type { MouseEventHandler } from "react";

interface TestimonialTriggerProps {
  label: string;
  tabIndex?: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

// An overlay button preserves the figure's semantics and intrinsic dimensions.
export function TestimonialTrigger({ label, tabIndex, onClick }: TestimonialTriggerProps) {
  return (
    <button
      type="button"
      tabIndex={tabIndex}
      className="absolute inset-0 z-10 cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-blue-500"
      aria-label={label}
      aria-haspopup="dialog"
      onClick={onClick}
    />
  );
}
