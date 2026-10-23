import { useEffect } from "react";
import { Link, useParams } from "react-router";
import type { LeaderboardEntry } from "../GameResults";

type PlayerDetailProps = {
    leaderboard: LeaderboardEntry[];
    setTitle: (t: string) => void;
};

//
// One player's record. The route is "/player/:name", and useParams() hands
// back whatever was in the URL where ":name" is.
//
export const PlayerDetail: React.FC<PlayerDetailProps> = ({
    leaderboard,
    setTitle,
}) => {

    //
    // react hooks...
    //
    const { name } = useParams();

    useEffect(
        () => setTitle(name ?? "Player"),
        [name],
    );

    //
    // calculated or derived state...
    //
    const entry = leaderboard.find(
        x => x.player === name
    );

    //
    // return jsx...
    //
    return (
        <div className="max-w-md mx-auto mt-6">
            {
                entry === undefined
                    ? <p>No games on record for "{name}".</p>
                    : (
                        <table className="table table-zebra">
                            <tbody>
                                <tr>
                                    <td>Wins</td>
                                    <th>{entry.wins}</th>
                                </tr>
                                <tr>
                                    <td>Losses</td>
                                    <th>{entry.losses}</th>
                                </tr>
                                <tr>
                                    <td>Win average</td>
                                    <th>{entry.avg.toFixed(3)}</th>
                                </tr>
                            </tbody>
                        </table>
                    )
            }
            <Link className="btn mt-6" to="/">Back to Home</Link>
        </div>
    );
};
