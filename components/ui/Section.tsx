import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Adds the standard vertical section rhythm. */
  rhythm?: boolean;
}

/** Page section wrapper: consistent max-width, gutter and vertical rhythm. */
export function Section({
  id,
  children,
  className = "",
  rhythm = true,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative ${rhythm ? "py-section" : ""} ${className}`}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}
