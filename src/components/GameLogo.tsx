export default function GameLogo() {
  return (
    <div className="flex items-center gap-2 min-[640px]:gap-3">
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        aria-hidden="true"
        focusable="false"
        className="h-9 w-9 shrink-0 min-[640px]:h-11 min-[640px]:w-11"
      >
        <rect x="6" y="8" width="20" height="28" rx="4" transform="rotate(-12 16 22)" fill="#f0f8ff" />
        <rect
          x="18"
          y="8"
          width="20"
          height="28"
          rx="4"
          transform="rotate(10 28 22)"
          fill="#c23866"
          stroke="#251d31"
          strokeWidth="2"
        />
        <path
          d="M28.6 16.5l1.6 3.3 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5z"
          fill="#fff"
        />
      </svg>
      <h1 className="whitespace-nowrap font-display text-[22px] font-semibold leading-none text-ink min-[640px]:text-[28px]">
        Memo <span className="text-accent">Game</span>
      </h1>
    </div>
  );
}
