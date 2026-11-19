import { useMemo } from 'react';
import { getCoordinateLabel } from '../gridLogic';
import type { ShotLogEntry } from '../GameResults';

type ShotHistoryProps = {
    shotLog: ShotLogEntry[];
};

//
// Every click on the board, newest first.
//
export const ShotHistory: React.FC<ShotHistoryProps> = ({
    shotLog,
}) => {

    const newestFirst = useMemo(
        () => shotLog.slice().reverse(),
        [shotLog],
    );

    return (
        <div className="w-full sm:w-64">
            <h2 className="text-xl font-bold text-primary font-serif pb-2">Shot history</h2>
            {
                newestFirst.length === 0
                    ? <p className="px-3">No shots yet.</p>
                    : (
                        <div className="max-h-64 overflow-y-auto">
                            {
                                newestFirst.map(
                                    x => (
                                        <div
                                            key={x.timestamp}
                                            className="flex justify-between px-3 py-1 odd:bg-base-200"
                                        >
                                            <span>{getCoordinateLabel(x.row, x.col)} - {x.result}</span>
                                            <span className="opacity-60">
                                                {new Date(x.timestamp).toLocaleTimeString()}
                                            </span>
                                        </div>
                                    )
                                )
                            }
                        </div>
                    )
            }
        </div>
    );
};
