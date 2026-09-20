import React from "react";
import { CarouselTestimonialCard } from "./CarouselTestimonialCard";
import { CarouselControls } from "./CarouselControls";
import { useSnapCarousel } from "./useSnapCarousel";
import type { Testimonial } from "../../data/testimonials";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  locale?: "en" | "fr";
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials, locale = "en" }) => {
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
  const trackId = "testimonial-carousel-track";

  return (
    <div className="relative w-full min-w-0 max-w-full">
      {/* Carousel Container */}
      <div
        id={trackId}
        ref={scrollContainerRef}
        onScroll={handleScroll}
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
