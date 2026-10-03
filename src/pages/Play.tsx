import { useNavigate } from "react-router";
import type { CellState, Grid } from "../types";
import { BattleshipGrid } from "../components/BattleshipGrid.tsx";

const GRID_SIZE = 10;

const staticGrid: Grid = Array<CellState>(GRID_SIZE * GRID_SIZE).fill('empty');

export const Play = () => {
    const nav = useNavigate();
    return (
        <div>
            <h1>Play</h1>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => nav('/')}
            >
                Go Home
            </button>

            <BattleshipGrid grid={staticGrid} />
        </div>
    )
};
