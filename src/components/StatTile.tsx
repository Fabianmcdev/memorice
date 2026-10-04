import { ReactNode } from 'react';

type StatTileProps = {
  label: string;
  icon: ReactNode;
  /** Optional content aligned to the right of the label row. */
  aside?: ReactNode;
  className?: string;
  children: ReactNode;
};

export default function StatTile({ label, icon, aside, className = '', children }: StatTileProps) {
  return (
    <div
      className={`flex flex-col gap-[10px] rounded-2xl border border-white/[0.08] bg-surface px-5 py-4 text-left ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-muted min-[640px]:text-[12px]">
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
    className={`font-display text-[26px] font-semibold leading-none tabular-nums min-[640px]:text-[32px] ${className}`}
  >
    {children}
  </span>
);
