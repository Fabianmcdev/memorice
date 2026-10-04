// Mark recreated from public/favicon.ico (cyan circle with white "< >" chevrons) as a vector,
// since the ICO bitmaps are too small to scale up crisply. #00d5ff is sampled from its 32x32 image.
export default function GameLogo() {
  return (
    <div className="flex items-center gap-2 min-[640px]:gap-3">
      <svg
        width="44"
        height="44"
        viewBox="0 0 32 32"
        aria-hidden="true"
        focusable="false"
        className="h-9 w-9 shrink-0 min-[640px]:h-11 min-[640px]:w-11"
      >
        <circle cx="16" cy="16" r="16" fill="#00d5ff" />
        <path
          d="M10.5 11 6.75 16l3.75 5M21.5 11l3.75 5-3.75 5"
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h1 className="whitespace-nowrap font-display text-[22px] font-semibold leading-none text-ink min-[640px]:text-[28px]">
        Memo <span className="text-accent">Game</span>
      </h1>
    </div>
  );
}
