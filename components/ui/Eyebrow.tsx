interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

/** The small uppercase label that opens every section. */
export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-eyebrow uppercase text-gold ${className}`}
    >
      <span aria-hidden className="h-px w-6 bg-gold/50" />
      {children}
    </span>
  );
}
