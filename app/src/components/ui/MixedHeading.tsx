import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MixedHeadingProps {
  children: ReactNode;
  className?: string;
}

export function MixedHeading({ children, className }: MixedHeadingProps) {
  return (
    <h2
      className={cn(
        "font-sans font-medium text-[var(--royal-magenta)] leading-[1.1]",
        className
      )}
    >
      {children}
    </h2>
  );
}
