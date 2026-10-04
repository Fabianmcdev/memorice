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

const ScoreBoard = ({ turns, hits, misses, totalPairs, onReset, onLogout }: ScoreBoardProps) => {
    const { user } = useUser();
    const { level } = useImages();
    const { accuracy, progressPct } = getScoreSummary({ hits, turns, totalPairs });
    const player = { name: user ?? '', levelLabel: getLevelLabel(level), pairs: level };

    return (
        <div className="flex flex-col gap-4 text-left">
            <header className="flex items-center justify-between gap-2 rounded-[20px] border border-white/[0.08] bg-surface py-2 pl-3 pr-2 min-[640px]:py-[14px] min-[640px]:pl-5 min-[640px]:pr-[14px]">
                <GameLogo />
                <div className="flex items-center gap-2 min-[640px]:gap-3">
                    <PlayerChip {...player} variant="pill" className="hidden min-[640px]:flex" />
                    <span aria-hidden="true" className="hidden h-7 w-px bg-white/[0.12] min-[640px]:block" />
                    <button
                        type="button"
                        onClick={onReset}
                        aria-label="Restart game"
                        className="flex h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-accent text-[15px] font-bold text-white transition-colors hover:bg-accent-strong focus-visible:bg-accent-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent min-[640px]:w-auto min-[640px]:px-[18px]"
                    >
                        <RestartIcon />
                        <span className="hidden min-[640px]:inline">Restart</span>
                    </button>
                    <LogOutButton onLogout={onLogout} />
                </div>
            </header>

            <PlayerChip {...player} variant="row" className="min-[640px]:hidden" />

            <GameStats
                hits={hits}
                turns={turns}
                misses={misses}
                totalPairs={totalPairs}
                accuracy={accuracy}
                progressPct={progressPct}
            />
        </div>
    );
};

export default ScoreBoard;
