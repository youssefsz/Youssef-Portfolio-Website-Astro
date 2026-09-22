import React, { useRef } from "react";
import { CarouselTestimonialCard } from "./CarouselTestimonialCard";
import { CarouselControls } from "./CarouselControls";
import { useSnapCarousel } from "./useSnapCarousel";
import type { Testimonial } from "../../data/testimonials";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  locale?: "en" | "fr";
  triggerLabel: string;
  onActivate: (review: Testimonial, trigger: HTMLButtonElement) => void;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials, locale = "en", triggerLabel, onActivate }) => {
  const labels = locale === "fr"
    ? { controls: "Navigation des témoignages", previous: "Témoignage précédent", next: "Témoignage suivant", position: (current: number, total: number) => `Témoignage ${current} sur ${total}` }
    : { controls: "Testimonial carousel controls", previous: "Previous testimonial", next: "Next testimonial", position: (current: number, total: number) => `Testimonial ${current} of ${total}` };
  const {
    activeIndex,
    handleNext,
    handlePrevious,
    handleScroll,
    scrollContainerRef,
  } = useSnapCarousel(testimonials.length);
  // Keep native touch scrolling; reject the click a browser may emit after a drag.
  const gesture = useRef<{ id: number; x: number; y: number; scrollLeft: number; blocked: boolean } | null>(null);
  const checkDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const current = gesture.current;
    if (current && current.id === event.pointerId && Math.hypot(event.clientX - current.x, event.clientY - current.y) > 8) {
      current.blocked = true;
    }
  };
  const trackId = "testimonial-carousel-track";

  return (
    <div className="relative w-full min-w-0 max-w-full">
      {/* Carousel Container */}
      <div
        id={trackId}
        ref={scrollContainerRef}
        onPointerDownCapture={(event) => {
          gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, scrollLeft: event.currentTarget.scrollLeft, blocked: !event.isPrimary || event.button !== 0 };
        }}
        onPointerMoveCapture={checkDrag}
        onPointerUpCapture={checkDrag}
        onPointerCancelCapture={() => { if (gesture.current) gesture.current.blocked = true; }}
        onScroll={() => {
          if (gesture.current) gesture.current.blocked = true;
          handleScroll();
        }}
        className="flex w-full min-w-0 max-w-full snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        role="region"
        aria-roledescription="carousel"
        aria-label={locale === "fr" ? "Témoignages clients" : "Client testimonials"}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="box-border w-full min-w-0 basis-full flex-shrink-0 select-none snap-start [scroll-snap-stop:always]"
            data-carousel-slide
            role="group"
            aria-roledescription="slide"
            aria-label={labels.position(index + 1, testimonials.length)}
          >
            <div className="h-full w-full">
              <CarouselTestimonialCard
                {...testimonial}
                triggerLabel={triggerLabel.replace("{name}", testimonial.name)}
                onActivate={(event) => {
                  const current = gesture.current;
                  const scrolled = current && scrollContainerRef.current?.scrollLeft !== current.scrollLeft;
                  if (event.detail !== 0 && (current?.blocked || scrolled)) return;
                  onActivate(testimonial, event.currentTarget);
                }}
                className="h-full w-full"
              />
            </div>
          </div>
        ))}
      </div>

      <CarouselControls
        activeIndex={activeIndex}
        total={testimonials.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        previousLabel={labels.previous}
        nextLabel={labels.next}
        positionLabel={labels.position(activeIndex + 1, testimonials.length)}
        controlsId={trackId}
        ariaLabel={labels.controls}
        className="mt-4"
      />
    </div>
  );
};
