import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { testimonials, type Testimonial } from "@/data/testimonials";

const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);
const thirdRow = testimonials.slice(0, testimonials.length / 2);
const fourthRow = testimonials.slice(testimonials.length / 2);

const ReviewCard = ({
  img,
  name,
  project,
  text,
  rating,
}: Testimonial) => {
  return (
    <figure
      className={cn(
        "group relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border p-6 transition-all duration-300",
        "bg-white/5 border-white/10 hover:border-blue-500/30 hover:bg-blue-500/5 backdrop-blur-sm"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <figcaption className="flex flex-row items-center gap-3">
        <img 
          className="h-10 w-10 rounded-full object-cover bg-gray-800 border border-white/10" 
          alt={name} 
          src={typeof img === 'string' ? img : img.src} 
          width={40}
          height={40}
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;
          }}
        />
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
    </figure>
  );
};

export function TestimonialsMarquee() {
  return (
    <div className="relative flex h-[500px] w-full flex-row items-center justify-center gap-4 overflow-hidden">
      <div className="flex flex-row items-center gap-4">
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {secondRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {thirdRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:20s]" vertical>
          {fourthRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
