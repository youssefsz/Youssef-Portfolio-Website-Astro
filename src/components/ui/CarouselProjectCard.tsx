import React from "react";
import { cn } from "../../lib/utils"; // Assuming utils exists, otherwise I'll just use template literals or classnames

interface ProjectCardProps {
  title: string;
  description: string;
  category: string;
  image: string;
  link?: string;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  category,
  image,
  link,
  className,
}) => {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-none border border-white/10 bg-black transition-all duration-300 hover:border-white/20",
        className
      )}
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/5 to-white/0 opacity-100 transition-opacity duration-500 group-hover:opacity-0" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/10 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-white/5">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-widest text-accent">
          {category}
        </div>

        <h3 className="mb-3 font-display text-xl font-bold text-white">
          {title}
        </h3>

        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="mt-auto">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 border border-white/10 bg-white/5 px-4 py-3 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-white/10 sm:w-auto"
              aria-label={`View Project — ${title}`}
            >
              <span>View Project</span>
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          ) : (
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center gap-2 border border-white/10 bg-white/5 px-4 py-3 text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              <span>Learn More</span>
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
