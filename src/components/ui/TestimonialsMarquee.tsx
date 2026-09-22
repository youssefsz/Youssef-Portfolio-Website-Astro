import { ImageSkeleton } from "./ImageSkeleton";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { TestimonialDialog } from "./TestimonialDialog";
import { TestimonialTrigger } from "./TestimonialTrigger";
import type { TestimonialDialogLabels } from "@/i18n/content";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import type { Testimonial } from "@/data/testimonials";

const ReviewCard = ({ review, label, onActivate, tabIndex }: {
  review: Testimonial;
  label: string;
  onActivate: (review: Testimonial, trigger: HTMLButtonElement) => void;
  tabIndex: number;
}) => {
  const { img, name, project, text, rating } = review;
  return (
    <figure
      className={cn(
        "group relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border p-6 transition-all duration-300 motion-reduce:transition-none",
        "bg-white/5 border-white/10 hover:border-blue-500/30 hover:bg-blue-500/5 backdrop-blur-sm"
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 motion-reduce:transition-none"></div>
      
      <figcaption className="flex flex-row items-center gap-3">
        <ImageSkeleton as="span" className="h-10 w-10 shrink-0 rounded-full border border-white/10 bg-gray-800">
          <img
            className="h-full w-full rounded-full object-cover"
            alt={name}
            src={typeof img === 'string' ? img : img.src}
            width={40}
            height={40}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
            }}
          />
        </ImageSkeleton>
        <div className="flex flex-col">
          <span className="text-base font-bold text-white tracking-tight">
            {name}
          </span>
          <p className="text-xs font-medium text-white/50">{project}</p>
        </div>
      </figcaption>
      <div className="mt-3 flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
            <svg
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? "text-yellow-500" : "text-gray-600"}`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
        ))}
      </div>
      <blockquote className="mt-4 text-sm leading-relaxed text-gray-300">{text}</blockquote>
      <TestimonialTrigger tabIndex={tabIndex} label={label} onClick={(event) => onActivate(review, event.currentTarget)} />
    </figure>
  );
};

export function TestimonialsMarquee({ testimonials, labels, locale = "en" }: { testimonials: Testimonial[]; labels: TestimonialDialogLabels; locale?: "en" | "fr" }) {
  const [selected, setSelected] = useState<Testimonial | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [focused, setFocused] = useState(false);
  const paused = selected !== null || focused;
  const activate = useCallback((review: Testimonial, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setSelected(review);
  }, []);
  const close = useCallback(() => {
    setFocused(false);
    setSelected(null);
  }, []);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const area = scrollAreaRef.current!;
    // Start at the existing centered view, with a scroll origin that lets native
    // keyboard focus reach cards in every column. No card geometry is needed.
    const center = () => {
      if (!area.clientWidth || area.contains(document.activeElement)) return;
      area.style.alignItems = "flex-start";
      area.style.justifyContent = "flex-start";
      area.scrollLeft = (area.scrollWidth - area.clientWidth) / 2;
      area.scrollTop = (area.scrollHeight - area.clientHeight) / 2;
    };
    center();
    const observer = new ResizeObserver(center);
    observer.observe(area);
    return () => observer.disconnect();
  }, []);
  const triggerLabel = (review: Testimonial) => labels.open.replace("{name}", review.name);
  const firstRow = testimonials.slice(0, testimonials.length / 2);
  const secondRow = testimonials.slice(testimonials.length / 2);
  const thirdRow = testimonials.slice(0, testimonials.length / 2);
  const fourthRow = testimonials.slice(testimonials.length / 2);
  return (
    <>
      <div
        className="relative"
        onFocusCapture={(event) => {
          setFocused((event.target as HTMLElement).matches(":focus-visible"));
        }}
        onKeyDownCapture={() => setFocused(true)}
        onBlurCapture={(event) => setFocused(event.currentTarget.contains(event.relatedTarget))}
      >
        {/* Desktop View - Vertical Marquees */}
        <div className="testimonial-desktop-viewport relative hidden h-[500px] w-full flex-row items-center justify-center gap-4 overflow-clip md:flex [&_.animate-marquee-vertical]:motion-reduce:[animation-play-state:paused]">
          <div ref={scrollAreaRef} className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="flex shrink-0 flex-row items-center gap-4">
              <Marquee pauseOnHover paused={paused} vertical className="[--duration:20s]">
                {(copy) => firstRow.map((review) => (
                  <ReviewCard key={review.name} review={review} label={triggerLabel(review)} onActivate={activate} tabIndex={copy === 1 ? 0 : -1} />
                ))}
              </Marquee>
              <Marquee reverse pauseOnHover paused={paused} className="[--duration:20s]" vertical>
                {(copy) => secondRow.map((review) => (
                  <ReviewCard key={review.name} review={review} label={triggerLabel(review)} onActivate={activate} tabIndex={copy === 1 ? 0 : -1} />
                ))}
              </Marquee>
              <Marquee reverse pauseOnHover paused={paused} className="[--duration:20s]" vertical>
                {(copy) => thirdRow.map((review) => (
                  <ReviewCard key={review.name} review={review} label={triggerLabel(review)} onActivate={activate} tabIndex={copy === 1 ? 0 : -1} />
                ))}
              </Marquee>
              <Marquee pauseOnHover paused={paused} className="[--duration:20s]" vertical>
                {(copy) => fourthRow.map((review) => (
                  <ReviewCard key={review.name} review={review} label={triggerLabel(review)} onActivate={activate} tabIndex={copy === 1 ? 0 : -1} />
                ))}
              </Marquee>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>

        {/* Mobile View - Carousel */}
        <div className="relative flex w-full min-w-0 max-w-full flex-col items-center justify-center gap-4 py-10 md:hidden">
          <TestimonialCarousel testimonials={testimonials} locale={locale} triggerLabel={labels.open} onActivate={activate} />
        </div>
      </div>
      <TestimonialDialog testimonial={selected} labels={labels} trigger={triggerRef} onClose={close} />
    </>
  );
}
