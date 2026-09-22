import type { RefObject } from "react";
import { Dialog } from "./Dialog";
import type { Testimonial } from "@/data/testimonials";
import type { TestimonialDialogLabels } from "@/i18n/content";

interface TestimonialDialogProps {
  testimonial: Testimonial | null;
  labels: TestimonialDialogLabels;
  trigger: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}

export function TestimonialDialog({ testimonial: review, labels, trigger, onClose }: TestimonialDialogProps) {
  return (
    <Dialog
      id="testimonial-dialog"
      open={review !== null}
      labelledBy="testimonial-dialog-heading"
      closeLabel={labels.close}
      trigger={trigger}
      fallbackFocusId="testimonials-heading"
      onClose={onClose}
      className="testimonial-dialog"
      panelClassName="testimonial-dialog-panel max-w-[640px] rounded-xl bg-card"
    >
      {review && (
        <>
          <div className="shrink-0 p-5 pb-0 pr-14 sm:p-6 sm:pb-0 sm:pr-14">
            <div className="flex min-w-0 items-center gap-3">
              <span className="h-10 w-10 shrink-0 rounded-full border border-white/10 bg-gray-800">
                <img
                  className="h-full w-full rounded-full object-cover"
                  src={typeof review.img === "string" ? review.img : review.img.src}
                  alt={review.name}
                  width={40}
                  height={40}
                />
              </span>
              <div className="min-w-0 [overflow-wrap:anywhere]">
                <h3 id="testimonial-dialog-heading" className="text-base font-bold text-white tracking-tight">{review.name}</h3>
                <p className="mt-1 text-xs font-medium text-white/50">{review.project}</p>
              </div>
            </div>
          </div>
          <div data-dialog-scroll className="testimonial-dialog-content min-h-0 overflow-y-auto overscroll-contain p-5 pt-3 sm:p-6 sm:pt-3" tabIndex={0}>
            <p role="img" className="mb-4 text-sm text-yellow-500" aria-label={labels.rating.replace("{rating}", String(review.rating))}>
              <span aria-hidden="true">{"★".repeat(Math.floor(review.rating))} <span className="text-gray-300">{review.rating}/5</span></span>
            </p>
            <blockquote className="whitespace-pre-line text-sm leading-relaxed text-gray-300 [overflow-wrap:anywhere]">{review.text}</blockquote>
            {labels.translation && <p className="mt-4 text-xs text-white/50">{labels.translation}</p>}
          </div>
        </>
      )}
    </Dialog>
  );
}
