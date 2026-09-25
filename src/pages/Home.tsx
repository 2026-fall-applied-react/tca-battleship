import { useNavigate } from "react-router";
import { NavBar } from "../components/NavBar.tsx";

interface HomeProps {
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
}

export const Home = ({ theme, onToggleTheme }: HomeProps) => {
    const nav = useNavigate();

    return (
        <>
            <NavBar theme={theme} onToggleTheme={onToggleTheme} />
            <div>
                <h1>Home</h1>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => nav('/about')}
                >
                    Click me
                </button>
            </div>
        </>
    );
};
