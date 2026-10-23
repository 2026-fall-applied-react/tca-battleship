import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { BattleshipGrid, GridLegend } from "../components/BattleshipGrid";
import { FleetTracker } from "../components/FleetTracker";
import { ShotHistory } from "../components/ShotHistory";
import { computeHeatmap } from "../heatmap";
import { FLEET } from "../GameResults";
import type { FleetStatus, Grid, ShipId, ShotLogEntry } from "../GameResults";

type PlayProps = {
    currentPlayers: string[];
    grid: Grid;
    fleetStatus: FleetStatus;
    shotLog: ShotLogEntry[];
    onCellClick: (row: number, col: number) => void;
    onToggleSunk: (id: ShipId) => void;
    onFinishGame: (winner: string) => void;
    setTitle: (t: string) => void;
};

export const Play: React.FC<PlayProps> = ({
    currentPlayers,
    grid,
    fleetStatus,
    shotLog,
    onCellClick,
    onToggleSunk,
    onFinishGame,
    setTitle,
}) => {

    //
    // react hooks...
    //
    useEffect(
        () => setTitle("Play"),
        [],
    );

    const nav = useNavigate();

    //
    // calculated state...
    //

    // the ships still afloat
    const remainingShips = useMemo(
        () => FLEET.filter(
            x => fleetStatus[x.id] === 'afloat'
        ),
        [fleetStatus],
    );

    // The heatmap depends on two things: the grid (which squares are ruled
    // out) and the ships left (which lengths still count). useMemo only
    // recalculates when one of those two changes.
    const heatmap = useMemo(
        () => computeHeatmap(grid, remainingShips),
        [grid, remainingShips],
    );

    //
    // return jsx...
    //

    // nobody is playing yet (or the last game just ended)
    if (currentPlayers.length === 0) {
        return (
            <div className="flex flex-col">
                <p>No game in progress.</p>
                <button
                    className="btn btn-primary btn-lg mt-3 w-full lg:w-64"
                    onClick={
                        () => nav('/setup')
                    }
                >
                    Setup a Game
                </button>
            </div>
        );
    }

    return (
        <div
            className="flex flex-col"
        >
            <h2 className="text-xl font-bold text-primary pb-3">
                {currentPlayers.join(" vs ")}
            </h2>
            <div className="flex flex-wrap gap-8">
                <div>
                    <h2 className="text-xl font-bold text-primary pb-2">Your shots</h2>
                    <BattleshipGrid
                        grid={grid}
                        onCellClick={onCellClick}
                        heatmap={heatmap}
                    />
                    <GridLegend />
                </div>
                <div className="flex flex-col gap-6">
                    <FleetTracker
                        fleetStatus={fleetStatus}
                        onToggleSunk={onToggleSunk}
                    />
                    <ShotHistory
                        shotLog={shotLog}
                    />
                </div>
            </div>
            <div className="flex flex-col mt-6">
                {
                    currentPlayers.map(
                        x => (
                            <button
                                key={x}
                                className="btn btn-primary btn-lg mt-3 w-full lg:w-64"
                                onClick={
                                    () => {
                                        onFinishGame(x);
                                        nav('/');
                                    }
                                }
                            >
                                {x} Won
                            </button>
                        )
                    )
                }
            </div>
        </div>
    );
};
