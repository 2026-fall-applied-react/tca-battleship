import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import type { GameResult, GeneralFacts, LeaderboardEntry } from "../GameResults";

export const APP_TITLE = "Battleship Companion";

type HomeProps = {
    leaderboard: LeaderboardEntry[];
    generalFacts: GeneralFacts;
    gameResults: GameResult[];
    setTitle: (t: string) => void;
};

export const Home: React.FC<HomeProps> = ({
    leaderboard: lb,
    generalFacts,
    gameResults,
    setTitle,
}) => {

    //
    // react hooks...
    //
    useEffect(
        () => setTitle(APP_TITLE),
        [],
    );

    const nav = useNavigate();

    //
    // calculated or derived state...
    //

    // newest 5 games, newest first (.slice() copies so .reverse() can't
    // touch the real list)
    const recentGames = gameResults.slice().reverse().slice(0, 5);

    //
    // return jsx...
    //
    return (
        <div className="-mx-3 -mb-3">
            <button
                className="btn btn-primary btn-lg mb-3 mx-3 w-[calc(100%-1.5rem)] lg:w-64"
                onClick={
                    () => nav('/setup')
                }
            >
                Setup a Game
            </button>
            <section className="border-t-2 border-primary/40 py-3">
                <h2 className="text-xl font-bold text-primary font-serif px-3 pb-2">
                    General
                </h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <tbody>
                            <tr>
                                <td>Last played</td>
                                <th>{generalFacts.lastPlayed}</th>
                            </tr>
                            <tr>
                                <td>Total games</td>
                                <th>{generalFacts.totalGames}</th>
                            </tr>
                            <tr>
                                <td>Shortest game</td>
                                <th>{generalFacts.shortestGame}</th>
                            </tr>
                            <tr>
                                <td>Longest game</td>
                                <th>{generalFacts.longestGame}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <section className="border-t-2 border-primary/40 py-3">
                <h2 className="text-xl font-bold text-primary font-serif px-3 pb-2">
                    Leaderboard
                </h2>
                {
                    lb.length === 0
                        ? (
                            <p className="px-3 pb-2">
                                Setup & play a game to see the leaderboard...
                            </p>
                        )
                        : (
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
                                            lb.map(
                                                x => (
                                                    <tr key={x.player}>
                                                        <td>{x.wins}</td>
                                                        <td>{x.losses}</td>
                                                        <td>{x.avg.toFixed(3)}</td>
                                                        <td>
                                                            <Link
                                                                className="link link-primary"
                                                                to={`/player/${encodeURIComponent(x.player)}`}
                                                            >
                                                                {x.player}
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                }
            </section>
            <section className="border-t-2 border-primary/40 py-3">
                <h2 className="text-xl font-bold text-primary font-serif px-3 pb-2">
                    Recent Games
                </h2>
                {
                    recentGames.length === 0
                        ? (
                            <p className="px-3 pb-2">
                                Setup & play a game to see recent games...
                            </p>
                        )
                        : (
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>DATE</th>
                                            <th>WINNER</th>
                                            <th>PLAYERS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            recentGames.map(
                                                x => (
                                                    <tr key={x.end}>
                                                        <td>{new Date(x.end).toLocaleDateString()}</td>
                                                        <td>{x.winner}</td>
                                                        <td>{x.players.join(" vs ")}</td>
                                                    </tr>
                                                )
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        )
                }
            </section>
        </div>
    );
};
