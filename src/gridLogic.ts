import type { CellState, Grid } from './types';

const CYCLE: CellState[] = ['empty', 'hit', 'miss', 'sunk'];

export const nextCellState = (state: CellState): CellState => {
    const currentIndex = CYCLE.indexOf(state);
    const nextIndex = (currentIndex + 1) % CYCLE.length;
    return CYCLE[nextIndex];
};

export const cycleCell = (grid: Grid, index: number): Grid =>
    grid.map((cell, i) => (i === index ? nextCellState(cell) : cell));
