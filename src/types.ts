export const APP_TITLE = "Battleship Companion";

export interface Player {
    id: string;
    name: string;
}

export interface HomeProps {
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

export interface AppOutletContext {
    players: Player[];
    onAddPlayer: (name: string) => void;
}

export type LeaderboardEntry = {
    wins: number
    losses: number
    avg: number
    player: string
}

export interface GameResult {
    winner: string;
    players: string[];
}

export type CellState = 'empty' | 'hit' | 'miss' | 'sunk';

export type Grid = CellState[];
