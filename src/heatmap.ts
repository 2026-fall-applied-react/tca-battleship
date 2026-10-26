import { GRID_SIZE } from './gridLogic';
import type { Grid, ShipDef } from './GameResults';

// Both ways a ship can lie, as [rowStep, colStep]:
// [0, 1] = left to right, [1, 0] = top to bottom.
const DIRECTIONS: [number, number][] = [
    [0, 1],
    [1, 0],
];


// For every cell, count how many ways a ship that is still afloat could be
// placed so that it covers that cell. A bigger number = a likelier place to
// find a ship = a better place to fire next.
// A placement is allowed when every cell it covers is 'empty' or 'hit'
// (an unsunk hit could be part of this very ship). A 'miss' or 'sunk' cell
// rules it out. Only empty cells get a score, because you can't fire at a
// square you've already marked.
// Returns a flat list of 100 numbers, same indexing as the grid.

export const computeHeatmap = (grid: Grid, remainingShips: ShipDef[]): number[] => {
    const heat = Array<number>(GRID_SIZE * GRID_SIZE).fill(0);

    for (const ship of remainingShips) {
        for (const [rowStep, colStep] of DIRECTIONS) {
            for (let row = 0; row < GRID_SIZE; row++) {
                for (let col = 0; col < GRID_SIZE; col++) {

                    // skip placements that would hang off the edge
                    const endRow = row + rowStep * (ship.size - 1);
                    const endCol = col + colStep * (ship.size - 1);
                    if (endRow >= GRID_SIZE || endCol >= GRID_SIZE) continue;

                    // the cells this placement would cover
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
