import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MixedHeadingProps {
  children: ReactNode;
  className?: string;
}

export function MixedHeading({ children, className }: MixedHeadingProps) {
  return (
    <h2 className={cn("font-sans tracking-tight text-foreground", className)}>
      {children}
    </h2>
  );
}

// Global styles for <em> within MixedHeading:
// <em> should use serif and italic. 
// This is handled by a utility class or global CSS, but we can also do it inline if needed.
// E.g. [&>em]:font-serif [&>em]:italic [&>em]:font-normal
