/**
 * Inline icon set — hand-rolled SVGs so the pillars get iconography with zero
 * new dependencies and no extra network request. Stroke uses currentColor.
 */
const paths: Record<string, React.ReactNode> = {
  vault: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 8.8v-1M12 16.2v-1M8.8 12h-1M16.2 12h-1" />
    </>
  ),
  fingerprint: (
    <>
      <path d="M5.5 11a6.5 6.5 0 0 1 12.9-1" />
      <path d="M8.5 12a3.5 3.5 0 0 1 7 0c0 2.5-.4 4.5-1 6" />
      <path d="M12 12v3c0 1.5-.3 3-1 4.5" />
      <path d="M6.5 14.5c.4 2-.1 3.8-1 5" />
    </>
  ),
  pulse: (
    <>
      <path d="M3 12h4l2.5-6 4 14 2.5-8H21" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="18" r="2.2" />
      <path d="M12 7.2 6.5 16M12 7.2 17.5 16M7 18h10" />
    </>
  ),
  monument: (
    <>
      <path d="M5 20h14" />
      <path d="M7 20V9l5-4 5 4v11" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
};

export function Icon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {paths[name] ?? null}
    </svg>
  );
}
