import { Outlet } from 'react-router';
import { NavBar } from './NavBar.tsx';

interface LayoutProps {
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

export const Layout = ({ theme, onToggleTheme }: LayoutProps) => {
    return (
        <>
            <NavBar theme={theme} onToggleTheme={onToggleTheme} />
            <Outlet />
        </>
    );
};
