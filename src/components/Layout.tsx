import { Outlet } from 'react-router';
import { NavBar } from './NavBar.tsx';
import type { Player } from '../types.ts';

interface LayoutProps {
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
    players: Player[];
    onAddPlayer: (name: string) => void;
}

export const Layout = ({ theme, onToggleTheme, players, onAddPlayer }: LayoutProps) => {
    return (
        <>
            <NavBar theme={theme} onToggleTheme={onToggleTheme} />
            <Outlet context={{ players, onAddPlayer }} />
        </>
    );
};
