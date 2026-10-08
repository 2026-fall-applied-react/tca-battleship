import { Outlet } from 'react-router';
import { NavBar } from './NavBar.tsx';
import type { Player } from '../types.ts';

interface LayoutProps {
    title: string;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
    players: Player[];
    onAddPlayer: (name: string) => void;
}

export const Layout = ({ title, theme, onToggleTheme, players, onAddPlayer }: LayoutProps) => {
    return (
        <>
            <NavBar title={title} theme={theme} onToggleTheme={onToggleTheme} />
            <Outlet context={{ players, onAddPlayer }} />
        </>
    );
};
