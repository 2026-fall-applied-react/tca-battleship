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

    // The log is stored oldest-first, but we want to show newest-first.
    // .reverse() changes the array it's called on, so .slice() makes a
    // copy first. useMemo remembers the reversed copy until shotLog
    // changes, instead of rebuilding it every time Play re-renders for some
    // other reason. (With a short list the saving is tiny. It's here to
    // practice how useMemo works, not because anything was slow.)
    const newestFirst = useMemo(
        () => shotLog.slice().reverse(),
        [shotLog],
    );

    return (
        <div className="w-full sm:w-64">
            <h2 className="text-xl font-bold text-primary pb-2">Shot history</h2>
            {
                newestFirst.length === 0
                    ? <p className="px-3">No shots yet.</p>
                    : (
                        <div className="max-h-64 overflow-y-auto">
                            {
                                newestFirst.map(
                                    x => (
                                        // timestamp works as the key: two clicks
                                        // can't land in the same time
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
