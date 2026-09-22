import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// React owns image state inside its islands; the Astro enhancer handles static markup.
export function ImageSkeleton({ as: Tag = "div", className, children }: {
  as?: "div" | "span";
  className: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [status, setStatus] = useState("is-loading");

  useEffect(() => {
    const image = ref.current?.querySelector("img");
    if (image?.complete) setStatus(image.naturalWidth > 0 ? "is-loaded" : "has-error");
  }, [children]);

  return (
    <Tag
      ref={(element) => { ref.current = element; }}
      data-react-skeleton
      className={cn("image-skeleton", status, className)}
      onLoadCapture={() => setStatus("is-loaded")}
      onErrorCapture={() => setStatus("has-error")}
    >
      {children}
    </Tag>
  );
}
