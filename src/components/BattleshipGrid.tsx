import type { Grid } from '../types';

const GRID_SIZE = 10;

interface BattleshipGridProps {
    grid: Grid;
}

export const BattleshipGrid = ({ grid }: BattleshipGridProps) => (
    <div className="grid grid-cols-10 gap-1 w-fit mx-auto mt-8 aura aura-xs">
        {Array.from({ length: GRID_SIZE }).map((_, row) =>
            Array.from({ length: GRID_SIZE }).map((_, col) => {
                const index = row * GRID_SIZE + col;
                const cell = grid[index];

                return (
                    <div
                        key={index}
                        data-state={cell}
                        className="w-8 h-8 border border-base-300 bg-base-200 "
                    />
                );
            })
        )}
    </div>
);
