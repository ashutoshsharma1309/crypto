import Link from "next/link";
import { footer, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-ink-700 bg-ink-900">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link
              href="#top"
              className="flex items-center gap-2.5 font-display text-xl text-bone"
            >
              <span
                aria-hidden
                className="inline-block h-2.5 w-2.5 rotate-45 border border-gold bg-gold/30"
              />
              {site.name}
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-bone-dim">
              {footer.blurb}
            </p>
            <p className="mt-5 text-xs uppercase tracking-wider text-bone-faint">
              {site.status}
            </p>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-eyebrow uppercase text-bone-faint">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-bone-dim transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rule-ledger my-10" />

        <div className="flex flex-col items-start justify-between gap-4 text-xs text-bone-faint sm:flex-row sm:items-center">
          <p>
            © {site.name}. {site.domain}
          </p>
          <p className="flex flex-wrap items-center gap-2">
            <span className="text-bone-dim">Built on</span>
            {site.builtOn.map((b, i) => (
              <span key={b}>
                {b}
                {i < site.builtOn.length - 1 ? (
                  <span className="ml-2 text-gold/40">·</span>
                ) : null}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
