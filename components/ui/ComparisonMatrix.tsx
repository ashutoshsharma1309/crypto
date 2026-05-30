"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Cell, MatrixRow } from "@/lib/content";
import { inView } from "./motion";

function CellMark({ cell, highlight }: { cell: Cell; highlight: boolean }) {
  if (cell === "partial") {
    return (
      <span
        className="text-bone-faint"
        aria-label="Partial"
        title="Partial"
      >
        ◐
      </span>
    );
  }
  if (cell) {
    return (
      <span
        className={highlight ? "text-gold" : "text-bone"}
        aria-label="Yes"
        title="Yes"
      >
        ✓
      </span>
    );
  }
  return (
    <span className="text-ink-600" aria-label="No" title="No">
      —
    </span>
  );
}

/**
 * The "Others exist. None do this." matrix. Destiny is the first, highlighted
 * column. Scrolls horizontally on small screens; the header row stays sticky
 * while the body scrolls — one of the site's two pinned "moment" sections.
 */
export function ComparisonMatrix({
  columns,
  rows,
}: {
  columns: readonly string[];
  rows: MatrixRow[];
}) {
  const reduce = useReducedMotion();

  return (
    <div className="overflow-x-auto hide-scrollbar -mx-gutter px-gutter">
      <div className="min-w-[640px]">
        <table className="w-full border-separate border-spacing-0 text-left">
          <thead className="sticky top-0 z-10">
            <tr>
              <th className="bg-ink-950 py-4 pr-4 align-bottom text-sm font-normal text-bone-faint">
                Capability
              </th>
              {columns.map((col, i) => (
                <th
                  key={col}
                  className={`bg-ink-950 px-3 py-4 align-bottom text-sm font-medium ${
                    i === 0
                      ? "text-gold"
                      : "text-bone-dim"
                  }`}
                >
                  <span
                    className={
                      i === 0
                        ? "inline-block rounded-full border border-gold/40 bg-gold-wash px-3 py-1"
                        : ""
                    }
                  >
                    {col}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <motion.tr
                key={row.feature}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.45, delay: ri * 0.04 }}
              >
                <td className="border-t border-ink-700 py-4 pr-4 text-sm text-bone">
                  {row.feature}
                </td>
                {row.cells.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`border-t border-ink-700 px-3 py-4 text-lg ${
                      ci === 0 ? "bg-gold-wash" : ""
                    }`}
                  >
                    <CellMark cell={cell} highlight={ci === 0} />
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
