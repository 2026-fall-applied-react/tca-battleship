import { GRID_SIZE } from './gridLogic';
import type { Grid, ShipDef } from './GameResults';

const DIRECTIONS: [number, number][] = [
    [0, 1],
    [1, 0],
];



export const computeHeatmap = (grid: Grid, remainingShips: ShipDef[]): number[] => {
    const heat = Array<number>(GRID_SIZE * GRID_SIZE).fill(0);

    for (const ship of remainingShips) {
        for (const [rowStep, colStep] of DIRECTIONS) {
            for (let row = 0; row < GRID_SIZE; row++) {
                for (let col = 0; col < GRID_SIZE; col++) {

                    const endRow = row + rowStep * (ship.size - 1);
                    const endCol = col + colStep * (ship.size - 1);
                    if (endRow >= GRID_SIZE || endCol >= GRID_SIZE) continue;

                    const covered: number[] = [];
                    for (let i = 0; i < ship.size; i++) {
                        covered.push((row + rowStep * i) * GRID_SIZE + (col + colStep * i));
                    }

                    const fits = covered.every(
                        index => grid[index] === 'empty' || grid[index] === 'hit'
                    );
                    if (!fits) continue;

                    for (const index of covered) {
                        if (grid[index] === 'empty') heat[index] += 1;
                    }
                }
            }
        }
    }

    return heat;
};
