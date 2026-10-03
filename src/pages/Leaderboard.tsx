import { useNavigate } from "react-router";
import { APP_TITLE, type LeaderboardEntry } from "../types";
import { useEffect } from "react";

type LeaderboardProps = {
    leaderboard: LeaderboardEntry[];
    setTitle: (title: string) => void;
}

export const LeaderboardProp = ({ leaderboard, setTitle }: LeaderboardProps) => {
    useEffect(
        () => setTitle(APP_TITLE),
        []
    )
    const nav = useNavigate();
    return (
        <div>
            
            <div className="max-w-2xl mx-auto text-center mt-12">
             <button
                className="btn btn-soft btn-lg mt-3 w-full lg:w-64"
                onClick={
                    () => nav('/setup')
                }
            >
                Setup a Game
            </button>   
            <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
            
            
            <div>
            
            <div className="card w-full bg-base-100 card-md shadow-lg my-5">
                <div className="card-body p-0">
                    <h2 className="card-title ml-3 mt-3">
                        Leaderboard
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr>
                                    <th>W</th>
                                    <th>L</th>
                                    <th>AVG</th>
                                    <th>PLAYER</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    leaderboard.map(
                                        x => (
                                            <tr key={x.player}>
                                                <td>{x.wins}</td>
                                                <td>{x.losses}</td>
                                                <td>{x.avg.toFixed(3)}</td>
                                                <td>{x.player}</td>
                                            </tr>
                                        )
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
        
    );
}
