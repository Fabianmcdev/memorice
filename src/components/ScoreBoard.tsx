import { useImages } from "../context/ImageContext";
import { useUser } from "../context/UserContext";
import { getLevelLabel, getScoreSummary } from "../game/score";
import GameLogo from "./GameLogo";
import GameStats from "./GameStats";
import { RestartIcon } from "./icons";
import LogOutButton from "./LogOutButton";
import PlayerChip from "./PlayerChip";

type ScoreBoardProps = {
    turns: number;
    hits: number;
    misses: number;
    totalPairs: number;
    onReset: () => void;
    onLogout: () => void;
}

// One render, two layouts:
// - below 1024px: top bar (logo + actions) followed by the player row (<640px) and the stats;
// - from 1024px: a fixed-width sidebar panel. The bar wrapper turns into `display: contents`, so the
//   logo and the actions become direct items of the panel, and the actions move to the end (last flex order)
//   and stick to the bottom (`mt-auto`). Only a plain div uses `contents`, so no semantics are lost.
const ScoreBoard = ({ turns, hits, misses, totalPairs, onReset, onLogout }: ScoreBoardProps) => {
    const { user } = useUser();
    const { level } = useImages();
    const { accuracy, progressPct } = getScoreSummary({ hits, turns, totalPairs });
    const player = { name: user ?? '', levelLabel: getLevelLabel(level), pairs: level };

    return (
        <header className="mx-auto flex w-full max-w-screen-lg shrink-0 flex-col gap-4 text-left min-[1024px]:mx-0 min-[1024px]:h-full min-[1024px]:w-[280px] min-[1024px]:max-w-none min-[1024px]:gap-5 min-[1024px]:overflow-y-auto min-[1024px]:rounded-[20px] min-[1024px]:border min-[1024px]:border-white/[0.08] min-[1024px]:bg-surface min-[1024px]:p-5">
            <div className="flex items-center justify-between gap-2 rounded-[20px] border border-white/[0.08] bg-surface py-2 pl-3 pr-2 min-[640px]:py-[14px] min-[640px]:pl-5 min-[640px]:pr-[14px] min-[1024px]:contents">
                <GameLogo />
                <div className="flex items-center gap-2 min-[640px]:gap-3 min-[1024px]:order-last min-[1024px]:mt-auto min-[1024px]:flex-col min-[1024px]:items-stretch">
                    <PlayerChip {...player} variant="pill" className="hidden min-[640px]:flex min-[1024px]:hidden" />
                    <span aria-hidden="true" className="hidden h-7 w-px bg-white/[0.12] min-[640px]:block min-[1024px]:hidden" />
                    <button
                        type="button"
                        onClick={onReset}
                        aria-label="Restart game"
                        className="flex h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-accent text-[15px] font-bold text-white transition-colors hover:bg-accent-strong focus-visible:bg-accent-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent min-[640px]:w-auto min-[640px]:px-[18px] min-[1024px]:w-full"
                    >
                        <RestartIcon />
                        <span className="hidden min-[640px]:inline">Restart</span>
                    </button>
                    <LogOutButton
                        onLogout={onLogout}
                        className="min-[1024px]:flex min-[1024px]:w-full min-[1024px]:items-center min-[1024px]:justify-center min-[1024px]:gap-2 min-[1024px]:text-[15px] min-[1024px]:font-bold"
                        labelClassName="hidden min-[1024px]:inline"
                    />
                </div>
            </div>

            <PlayerChip {...player} variant="row" className="min-[640px]:hidden min-[1024px]:flex" />

            <GameStats
                hits={hits}
                turns={turns}
                misses={misses}
                totalPairs={totalPairs}
                accuracy={accuracy}
                progressPct={progressPct}
            />
        </header>
    );
};

export default ScoreBoard;
