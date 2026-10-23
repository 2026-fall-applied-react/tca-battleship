import { FLEET } from './types';
import type { CellState, FleetStatus, Grid } from './types';


export const GRID_SIZE = 10;

//
// starting values
//
export const makeEmptyGrid = (): Grid => Array<CellState>(GRID_SIZE * GRID_SIZE).fill('empty');

// Every ship starts afloat.
export const makeInitialFleetStatus = (): FleetStatus => FLEET.reduce(
    (acc, ship) => ({ ...acc, [ship.id]: 'afloat' }),
    {} as FleetStatus,
);

//
// clicking a cell
//

// The order a cell steps through on each click. After 'sunk' it wraps
// back to 'empty'.
const CYCLE: CellState[] = ['empty', 'hit', 'miss', 'sunk'];

export const nextCellState = (state: CellState): CellState => {
    const nextIndex = (CYCLE.indexOf(state) + 1) % CYCLE.length;
    return CYCLE[nextIndex];
};


export const cycleCell = (grid: Grid, index: number): Grid => grid.map(
    (cell, i) => i === index ? nextCellState(cell) : cell
);

//
// display
//

// Battleship-style name for a square: row letter + column number, so
// row 1, col 6 is "B7".
export const getCoordinateLabel = (row: number, col: number): string => (
    `${String.fromCharCode(65 + row)}${col + 1}`
);
