import React from "react";
import { cn } from "../../lib/utils";

interface CarouselControlsProps {
  activeIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  previousLabel: string;
  nextLabel: string;
  positionLabel: string;
  controlsId: string;
  ariaLabel: string;
  className?: string;
}

export const CarouselControls: React.FC<CarouselControlsProps> = ({
  activeIndex,
  total,
  onPrevious,
  onNext,
  previousLabel,
  nextLabel,
  positionLabel,
  controlsId,
  ariaLabel,
  className,
}) => {
  if (total < 1) return null;

  const current = activeIndex + 1;

  return (
    <div
      className={cn(
        "grid w-full min-w-0 grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center gap-2",
        className
      )}
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={activeIndex === 0}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
        aria-label={previousLabel}
        aria-controls={controlsId}
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div className="flex min-w-0 items-center gap-3 px-1">
        <span
          className="shrink-0 text-[0.65rem] font-medium tabular-nums tracking-[0.14em] text-white/60"
          aria-live="polite"
        >
          {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <div
          className="h-1 min-w-0 flex-1 overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-label={ariaLabel}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={current}
          aria-valuetext={positionLabel}
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-300 ease-out"
            style={{ width: `${(current / total) * 100}%` }}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={activeIndex === total - 1}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
        aria-label={nextLabel}
        aria-controls={controlsId}
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};
