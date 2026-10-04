import { ReactNode } from 'react';

type StatTileProps = {
  label: string;
  icon: ReactNode;
  /** Optional content aligned to the right of the label row. */
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
};

// Below 640px the four stats share one row (tiles can be ~66px wide at a 320px viewport), so the tile
// tightens its padding, stacks the icon above a sentence-case label and shrinks the value.
export default function StatTile({ label, icon, aside, className = '', children }: StatTileProps) {
  return (
    <div
      className={`flex min-w-0 flex-col gap-2 rounded-2xl border border-white/[0.08] bg-surface px-2 py-[10px] text-left min-[640px]:gap-[10px] min-[640px]:px-5 min-[640px]:py-4 min-[1024px]:bg-surface-2 min-[1024px]:px-4 ${className}`}
    >
      {/* Wraps so a long label plus the aside never overflow (e.g. the pairs tile at ~640-700px). */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <span className="flex flex-col items-start gap-1 text-[11px] font-bold leading-tight text-muted min-[640px]:flex-row min-[640px]:items-center min-[640px]:gap-2 min-[640px]:text-[12px] min-[640px]:uppercase min-[640px]:leading-normal min-[640px]:tracking-[0.08em] min-[1024px]:text-[11px]">
          {icon}
          {label}
        </span>
        {aside}
      </div>
      {children}
    </div>
  );
}

type StatValueProps = {
  className?: string;
  children: ReactNode;
};

export const StatValue = ({ className = '', children }: StatValueProps) => (
  <span
    className={`font-display text-[22px] font-semibold leading-none tabular-nums min-[640px]:text-[32px] min-[1024px]:text-[28px] ${className}`}
  >
    {children}
  </span>
);
