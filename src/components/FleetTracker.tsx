import { FLEET } from '../types';
import type { FleetStatus, ShipId } from '../types';

type FleetTrackerProps = {
    fleetStatus: FleetStatus;
    onToggleSunk: (id: ShipId) => void;
};

//
// A checklist of the opponent's ships. Press a ship's button when you sink
// it (or to undo). It only reports the press; Play and App decide what it
// means.
//
export const FleetTracker: React.FC<FleetTrackerProps> = ({
    fleetStatus,
    onToggleSunk,
}) => (
    <div className="w-full sm:w-64">
        <h2 className="text-xl font-bold text-primary pb-2">Fleet</h2>
        {
            FLEET.map(
                ship => {
                    const isSunk = fleetStatus[ship.id] === 'sunk';

                    return (
                        <div
                            key={ship.id}
                            className="flex items-center justify-between gap-2 px-3 py-2 odd:bg-base-200"
                        >
                            <span className={isSunk ? 'line-through opacity-60' : ''}>
                                {ship.name} ({ship.size})
                            </span>
                            <button
                                type="button"
                                className="btn btn-sm"
                                onClick={() => onToggleSunk(ship.id)}
                            >
                                {isSunk ? 'Mark afloat' : 'Mark sunk'}
                            </button>
                        </div>
                    );
                }
            )
        }
    </div>
);
