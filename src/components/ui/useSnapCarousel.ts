import { useCallback, useEffect, useRef, useState } from "react";

const getSlides = (container: HTMLDivElement) =>
  Array.from(container.querySelectorAll<HTMLElement>("[data-carousel-slide]"));

const getSlideLeft = (container: HTMLDivElement, slide: HTMLElement) => {
  const containerLeft = container.getBoundingClientRect().left;
  return container.scrollLeft + slide.getBoundingClientRect().left - containerLeft;
};

export const useSnapCarousel = (itemCount: number) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const container = scrollContainerRef.current;
      if (!container || itemCount < 1) return;

      const nextIndex = Math.min(Math.max(index, 0), itemCount - 1);
      const slide = getSlides(container)[nextIndex];
      if (!slide) return;

      container.scrollTo({
        left: getSlideLeft(container, slide),
        behavior,
      });
    },
    [itemCount]
  );

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const slides = getSlides(container);
    if (!slides.length) return;

    const nextIndex = slides.reduce((closestIndex, slide, index) => {
      const currentDistance = Math.abs(getSlideLeft(container, slide) - container.scrollLeft);
      const closestDistance = Math.abs(
        getSlideLeft(container, slides[closestIndex]) - container.scrollLeft
      );

      return currentDistance < closestDistance ? index : closestIndex;
    }, 0);
    const clampedIndex = Math.min(Math.max(nextIndex, 0), Math.max(itemCount - 1, 0));
    activeIndexRef.current = clampedIndex;
    setActiveIndex(clampedIndex);
  }, [itemCount]);

  const handlePrevious = useCallback(() => {
    scrollToIndex(activeIndex - 1);
  }, [activeIndex, scrollToIndex]);

  const handleNext = useCallback(() => {
    scrollToIndex(activeIndex + 1);
  }, [activeIndex, scrollToIndex]);

  useEffect(() => {
    setActiveIndex((current) => {
      const nextIndex = Math.min(current, Math.max(itemCount - 1, 0));
      activeIndexRef.current = nextIndex;
      return nextIndex;
    });
  }, [itemCount]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => {
      scrollToIndex(activeIndexRef.current, "auto");
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, [scrollToIndex]);

  return {
    activeIndex,
    handleNext,
    handlePrevious,
    handleScroll,
    scrollContainerRef,
  };
};
