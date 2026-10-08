
import { LeaderboardProp } from './Leaderboard.tsx'

import { getLeaderboard } from './GameResults.ts'
import type { GameResult } from '../types.ts';


  const dummyGameResults: GameResult[] = [
        {
            winner: "Bryson",
            players: [
                "Zack",
                "Bryson",
            ],
        },
        {
            winner: "Bryson",
            players: [
                "Bryson",
                "Tom",
            ],
        },
        {
            winner: "Zack",
            players: [
                "Zack",
                "Suzzie",
            ]
        },
        {
            winner: "John",
            players: [
                "John",
                "Tom",
            ],
        },
    ];

export const Home = () => {
    return (
        <div className="max-w-2xl mx-auto text-center mt-12">
            <h1 className="text-3xl font-bold mb-4">Welcome to TCA Battleship</h1>
            <p className="text-base-content/70">
                A digital tracker for the physical board game Battleship. Add
                players, mark hits and misses on a live grid as you call shots,
                and keep score across games — the boards stay physical, this
                just handles the bookkeeping.
            </p>
            <LeaderboardProp leaderboard={getLeaderboard(dummyGameResults)} setTitle={() => {}} />
        </div>
    );
}
