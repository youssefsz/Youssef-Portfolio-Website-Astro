import React, { useRef, useState } from "react";
import { CarouselTestimonialCard } from "./CarouselTestimonialCard";
import type { Testimonial } from "../../data/testimonials";
import { cn } from "../../lib/utils";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveIndex(index);
  };

  const scrollTo = (index: number) => {
    if (!scrollContainerRef.current) return;
    const width = scrollContainerRef.current.clientWidth;
    scrollContainerRef.current.scrollTo({
      left: width * index,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    scrollTo(Math.max(0, activeIndex - 1));
  };

  const handleNext = () => {
    scrollTo(Math.min(testimonials.length - 1, activeIndex + 1));
  };

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex w-full snap-x snap-mandatory overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 snap-center px-4 sm:px-0"
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

      {/* Controls */}
      <div className="mt-4 flex items-center justify-between px-4">
        {/* Dots */}
        <div className="flex items-center gap-1">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className="flex min-h-[48px] items-center justify-center px-1"
              aria-label={`Go to testimonial slide ${index + 1}`}
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? "w-8 bg-accent"
                    : "w-1.5 bg-white/20 hover:bg-white/40"
                )}
              />
            </button>
          ))}
        </div>

        {/* Arrows */}
        <div className="flex space-x-3">
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={activeIndex === testimonials.length - 1}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
      </div>
    </div>
  );
};
