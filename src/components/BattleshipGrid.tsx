import { GRID_SIZE, getCoordinateLabel,  } from '../gridLogic';
import type { CellState, Grid } from '../GameResults';

type BattleshipGridProps = {
    grid: Grid;
    onCellClick: (row: number, col: number) => void;
    heatmap: number[];
};

// Each state gets a color AND a symbol, so it's never color alone.
const cellColor: Record<CellState, string> = {
    empty: 'bg-[color-mix(in_oklab,var(--water)_10%,var(--color-base-100))]', 
    hit: 'bg-error text-error-content',
    miss: 'bg-white text-slate-600',   // was 'bg-info/40'
    sunk: 'bg-neutral text-neutral-content',
};

const cellSymbol: Record<CellState, string> = {
    empty: '',
    hit: 'X',
    miss: '•',
    sunk: '■',
};

// The legend is a small table that explains what the colors and symbols mean.
const legendItems: { state: CellState; label: string }[] = [
    { state: 'empty', label: 'Not fired at' },
    { state: 'hit', label: 'Hit' },
    { state: 'miss', label: 'Miss' },
    { state: 'sunk', label: 'Sunk' },
];

export const GridLegend: React.FC = () => (
    <div
        role="group"
        aria-label="Grid legend"
        className="grid grid-cols-2 gap-2 mt-3"
    >
        {
            legendItems.map(
                x => (
                    <div
                        key={x.state}
                        className="flex items-center gap-2"
                    >
                        <span
                            aria-hidden="true"
                            className={`w-6 h-6 flex items-center justify-center rounded-sm border border-base-300 ${cellColor[x.state]}`}
                        >
                            {cellSymbol[x.state]}
                        </span>
                        {x.label}
                    </div>
                )
            )
        }

        {/* the heatmap: light to deep blue, same two blues the squares use */}
        <div className="col-span-2 flex items-center gap-2">
            <span
                aria-hidden="true"
                className="w-12 h-6 rounded-sm border border-base-300"
                //I'm not sure if this is the best way to do a gradient in daisyUI, but it works and it's not too bad.
                style={{
                    backgroundImage: 'linear-gradient(to right, color-mix(in oklab, var(--water) 10%, var(--color-base-100)), color-mix(in oklab, var(--water) 70%, var(--color-base-100)))',
                }}
            />
            Deeper blue = likelier hit spot
        </div>
    </div>
);

// Draws the board and reports clicks back up through onCellClick.

export const BattleshipGrid: React.FC<BattleshipGridProps> = ({
    grid,
    onCellClick,
    heatmap,
}) => {

    // empty squares are shaded by how hot they are, compared to the
    // hottest square on the board
    const maxHeat = Math.max(...heatmap);

    return (
        <div className="grid grid-cols-10 gap-1 w-fit aura aura-xs text-green-600">
            {
                grid.map(
                    (cell, index) => {
                        const row = Math.floor(index / GRID_SIZE);
                        const col = index % GRID_SIZE;
                        const bluePercent = maxHeat > 0 && heatmap[index] > 0
                            ? 10 + Math.round(heatmap[index] / maxHeat * 80)
                            : 10;

                        return (
                            <button
                                key={index}
                                type="button"
                                aria-label={`${getCoordinateLabel(row, col)}, ${cell}`}
                                className={`w-7 h-7 sm:w-9 sm:h-9 rounded-sm border border-base-300 cursor-pointer ${cellColor[cell]}`}
                                style={
                                    cell === 'empty'
                                        ? { backgroundColor: `color-mix(in oklab, var(--water) ${bluePercent}%, var(--color-base-100))` }

                                        : undefined
                                }
                                onClick={() => onCellClick(row, col)}
                            >
                                {cellSymbol[cell]}
                            </button>
                        );
                    }
                )
            }
        </div>
    );
};
