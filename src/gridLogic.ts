import { FLEET } from './GameResults';
import type { CellState, FleetStatus, Grid } from './GameResults';


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

export const getCoordinateLabel = (row: number, col: number): string => (
    `${String.fromCharCode(65 + row)}${col + 1}`
);
