import type { Grid } from '../types';

const GRID_SIZE = 10;

interface BattleshipGridProps {
    grid: Grid;
    onCellClick: (row: number, col: number) => void;
}

export const BattleshipGrid = ({ grid, onCellClick }: BattleshipGridProps) => (
    <div className="grid grid-cols-10 gap-1 w-fit mx-auto mt-8 aura aura-xs text-green-500">
        {Array.from({ length: GRID_SIZE }).map((_, row) =>
            Array.from({ length: GRID_SIZE }).map((_, col) => {
                const index = row * GRID_SIZE + col;
                const cell = grid[index];

                return (
                    <div
                        key={index}
                        data-state={cell}
                        onClick={() => onCellClick(row, col)}
                        className="w-8 h-8 border border-base-300 bg-base-100 cursor-pointer hover:bg-base-300"
                    />
                );
            })
        )}
    </div>
);
