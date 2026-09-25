import { NavBar } from "../components/NavBar.tsx";

interface HomeProps {
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

export const Home = ({ theme, onToggleTheme }: HomeProps) => {
    return (
        <>
            <NavBar theme={theme} onToggleTheme={onToggleTheme} />
            <div className="max-w-2xl mx-auto text-center mt-12">
                <h1 className="text-3xl font-bold mb-4">Battleship Companion</h1>
                <p className="text-base-content/70">
                    A digital tracker for the physical board game Battleship. Add
                    players, mark hits and misses on a live grid as you call shots,
                    and keep score across games — the boards stay physical, this
                    just handles the bookkeeping.
                </p>
            </div>
        </>
    );
};
