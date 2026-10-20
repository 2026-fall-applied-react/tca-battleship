import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import type { CellState, GameResult, Grid } from "../types";
import { BattleshipGrid } from "../components/BattleshipGrid.tsx";
import { cycleCell } from "../gridLogic";
import { loadGrid, saveGrid } from "../storage";

const GRID_SIZE = 10;

const makeEmptyGrid = (): Grid => Array<CellState>(GRID_SIZE * GRID_SIZE).fill('empty');

type PlayProps = {
    addNewGameResult : (r : GameResult) => void;
    setTitle: (t: string) => void;
    currentPlayers: string[];
};

export const Play = ({ addNewGameResult, setTitle, currentPlayers }: PlayProps) => {
    useEffect(
        () => setTitle("Play"),
        [],
    );
    
    const [startTimestamp] = useState(
        new Date().toISOString()
    );
    const nav = useNavigate();
    const [grid, setGrid] = useState<Grid>(() => loadGrid() ?? makeEmptyGrid());

    useEffect(() => {
    saveGrid(grid);
}, [grid]);

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
                {currentPlayers.map((x) => (
                    <button
                        key={x}
                        className="btn btn-soft btn-lg mt-3 w-full lg:w-64"
                        onClick={() => {
                            addNewGameResult({
                                winner: x,
                                players: currentPlayers,
                                start: startTimestamp,
                                end: new Date().toISOString(),
                            });
                            nav(-2);
                        }}
                    >
                        {x} Won
                    </button>
                ))}
            </div>
        </div>
    )
};
