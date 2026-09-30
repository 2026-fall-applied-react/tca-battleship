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
