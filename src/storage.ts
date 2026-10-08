import type { Grid, Player } from './types';

const PLAYERS_STORAGE_KEY = 'tca-battleship:players';
const GRID_STORAGE_KEY = 'tca-battleship:grid';

export const loadPlayers = (): Player[] => {
    const raw = localStorage.getItem(PLAYERS_STORAGE_KEY);
    if (raw === null) return [];

    try {
        return JSON.parse(raw) as Player[];
    } catch {
        return [];
    }
};

export const savePlayers = (players: Player[]): void => {
    localStorage.setItem(PLAYERS_STORAGE_KEY, JSON.stringify(players));
};

export const loadGrid = (): Grid | null => {
    const raw = localStorage.getItem(GRID_STORAGE_KEY);
    if (raw === null) return null;

    try {
        return JSON.parse(raw) as Grid;
    } catch {
        return null;
    }
};

export const saveGrid = (grid: Grid): void => {
    localStorage.setItem(GRID_STORAGE_KEY, JSON.stringify(grid));
};
