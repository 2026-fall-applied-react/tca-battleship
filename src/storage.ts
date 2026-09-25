import type { Player } from './types';

const PLAYERS_STORAGE_KEY = 'tca-battleship:players';

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
