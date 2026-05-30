import Link from "next/link";

interface CTAProps {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  className?: string;
}

/** The site's button. Primary = gold fill; secondary = ledger outline. */
export function CTA({ href, children, primary = false, className = "" }: CTAProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 ease-editorial";
  const styles = primary
    ? "bg-gold text-ink-950 hover:bg-gold-bright hover:-translate-y-0.5"
    : "border border-ink-600 text-bone hover:border-gold hover:text-gold";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
