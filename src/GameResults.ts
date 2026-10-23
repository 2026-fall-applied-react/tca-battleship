import { durationFormatter } from "human-readable";

const formatGameDuration = durationFormatter<string>();

const formatLastPlayed = durationFormatter<string>(
    {
        allowMultiples: [
            "y",
            "mo",
            "d",
        ]
    }
);


// type defs/aliases
export type GameResult = {
    winner: string;
    players: string[];
    start: string;
    end: string;
};

export type LeaderboardEntry = {
    wins: number;
    losses: number;
    avg: number;
    player: string;
};

export type GeneralFacts = {
    lastPlayed: string;
    totalGames: number;
    shortestGame: string;
    longestGame: string;
};

export type GameDurationEntry = {
    players: number;
    games: number;
    avg: string;
};

//
// public funcs
//
export const getLeaderboard = (
    games: GameResult[]
): LeaderboardEntry[] => getPreviousPlayers(
    games
)
    .map(
        x => ({
            ...getLeaderboarEntry(
                games,
                x,
            )
        })
    )
    .sort(
        (a, b) => (
            a.avg !== b.avg
                // if diff avgs, sort highest avg first
                ? b.avg - a.avg
                : a.wins === 0 && b.wins === 0
                    // if tied avg, and zero wins, rank player with more games without a win lower
                    ? (a.wins + a.losses) - (b.wins + b.losses)
                    // if tied avg, and some wins, rank player with more games higher, 
                    // they maintained that avg for more games so higher ranked
                    : (b.wins + b.losses) - (a.wins + a.losses)
        )
    )
;

export const getGeneralFacts = (
    games: GameResult[],
): GeneralFacts => {

    // bail early if no game results
    if (
        games.length === 0
    ) {
        return (
            {
                lastPlayed: "N/A",
                totalGames: 0,
                shortestGame: "N/A",
                longestGame: "N/A",
            }
        );
    }

    const nowForCalcs = Date.now();

    const gamesLastPlayedInMs = games.map(
        x => nowForCalcs - Date.parse(x.end)
    );

    const mostRecentGameInMs = Math.min(
        ...gamesLastPlayedInMs
    );

    const gameDurationsInMs = games.map(
        x => Date.parse(x.end) - Date.parse(x.start)
    );

    return (
        {
            lastPlayed: `${formatLastPlayed(mostRecentGameInMs)} ago`,
            totalGames: games.length,
            shortestGame: formatGameDuration(
                Math.min(
                    ...gameDurationsInMs,
                ),
            ),
            longestGame: formatGameDuration(
                Math.max(
                    ...gameDurationsInMs,
                ),
            ),
        }
    );
};

export const getGameDurations = (
    games: GameResult[],
): GameDurationEntry[] => games

    // unique player counts
    .map(
        x => x.players.length
    )
    .filter(
        (x, i, a) => i === a.indexOf(x)
    )

    // sorted 1 - n
    .sort(
        (a, b) => a - b
    )

    .map(
        playerCount => {
            const durationsInMs = games
                .filter(
                    x => x.players.length === playerCount
                )
                .map(
                    x => Date.parse(x.end) - Date.parse(x.start)
                );

            return {
                players: playerCount,
                games: durationsInMs.length,
                avg: formatGameDuration(
                    durationsInMs.reduce(
                        (acc, x) => acc + x,
                        0,
                    ) / durationsInMs.length
                ),
            };
        }
    )
;

export const getPreviousPlayers = (
    games: GameResult[],
): string[] => games

    // just the players as a string array
    .flatMap(
        x => x.players
    )

    // unique players
    .filter(
        (x, i, a) => i === a.findIndex(
            y => y === x
        )
    )

    // sorted alphabetically
    .sort(
        (a, b) => a.localeCompare(b)
    )
;


// helper funcs
const getLeaderboarEntry = (
    games: GameResult[],
    player: string,
): LeaderboardEntry => {

    const numberOfPlayerGames = games.filter(
        x => x.players.some(
            y => y === player
        )
    ).length;

    const numerOfPlayerWins = games.filter(
        x => x.winner === player
    ).length;

    return {
        wins: numerOfPlayerWins,
        losses: numberOfPlayerGames - numerOfPlayerWins,
        avg: numberOfPlayerGames > 0
            ? numerOfPlayerWins / numberOfPlayerGames
            : 0,
        player: player
    };
};
