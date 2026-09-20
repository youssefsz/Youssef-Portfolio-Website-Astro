import React from "react";
import { ProjectCard } from "./CarouselProjectCard";
import { CarouselControls } from "./CarouselControls";
import { useSnapCarousel } from "./useSnapCarousel";

interface Project {
  title: string;
  description: string;
  category: string;
  image: string;
  srcSet?: string;
  sizes?: string;
  link?: string;
}

interface ProjectCarouselProps {
  projects: Project[];
  locale?: "en" | "fr";
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, locale = "en" }) => {
  const labels = locale === "fr"
    ? { controls: "Navigation des projets", previous: "Projet précédent", next: "Projet suivant", position: (current: number, total: number) => `Projet ${current} sur ${total}` }
    : { controls: "Project carousel controls", previous: "Previous project", next: "Next project", position: (current: number, total: number) => `Project ${current} of ${total}` };
  const {
    activeIndex,
    handleNext,
    handlePrevious,
    handleScroll,
    scrollContainerRef,
  } = useSnapCarousel(projects.length);
  const trackId = "project-carousel-track";

  return (
    <div className="relative w-full min-w-0 max-w-full">
      <CarouselControls
        activeIndex={activeIndex}
        total={projects.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        previousLabel={labels.previous}
        nextLabel={labels.next}
        positionLabel={labels.position(activeIndex + 1, projects.length)}
        controlsId={trackId}
        ariaLabel={labels.controls}
        className="mb-5"
      />

      <div
        id={trackId}
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex w-full min-w-0 max-w-full snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scrollbar-hide pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        role="region"
        aria-roledescription="carousel"
        aria-label={locale === "fr" ? "Projets sélectionnés" : "Selected projects"}
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className="box-border w-full min-w-0 basis-full flex-shrink-0 select-none snap-start [scroll-snap-stop:always]"
            data-carousel-slide
            role="group"
            aria-roledescription="slide"
            aria-label={labels.position(index + 1, projects.length)}
          >
            <div className="h-full w-full">
              <ProjectCard
                title={project.title}
                description={project.description}
                category={project.category}
                image={project.image}
                srcSet={project.srcSet}
                sizes={project.sizes}
                link={project.link}
                className="h-full w-full"
                locale={locale}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
