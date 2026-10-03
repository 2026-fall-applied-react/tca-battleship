import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import type { CellState, GameResult, Grid } from "../types";
import { BattleshipGrid } from "../components/BattleshipGrid.tsx";
import { cycleCell } from "../gridLogic";

const GRID_SIZE = 10;

const makeEmptyGrid = (): Grid => Array<CellState>(GRID_SIZE * GRID_SIZE).fill('empty');

type PlayProps = {
    addNewGameResult : (r : GameResult) => void
}

export const Play = ({ addNewGameResult }: PlayProps) => {
    useEffect(
        () => {
        },

        []
    )
    const nav = useNavigate();
    const [grid, setGrid] = useState<Grid>(makeEmptyGrid);

    const handleCellClick = (row: number, col: number) => {
        console.log(`Cell clicked: row ${row}, col ${col}`);
        const index = row * GRID_SIZE + col;
        setGrid((currentGrid) => cycleCell(currentGrid, index));
    };

    return (
        <div>
            <h1 className="flex justify-center items-center p-2">Play</h1>
            

            <BattleshipGrid grid={grid} onCellClick={handleCellClick} />
            <div className="flex justify-center items-center p-2">
            <button
                className="btn btn-soft btn-lg mt-3 w-full lg:w-64"
                onClick={
                    () => {
                        addNewGameResult({
                            winner: "Bryson",
                            players: ["Bryson", "Tom"],
                        })
                        nav('/leaderboard');
                    }
                }
            >
                Game Over
            </button>
            </div>
        </div>
    )
};
