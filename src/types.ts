export interface Player {
    id: string;
    name: string;
}
export interface HomeProps {
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}
