//types

    export type GameResult = {
        winner: string;
        players: string[];

        // If only four players max...
        // playerOne: string;
        // playerTwo: string;
        // playerThree: string;
        // plaeryFour: string;
    };

    export type LeaderboardEntry = {
        wins: number;
        losses: number;
        avg: number; // we'll need to make a string for rounding and display...
        player: string;
    };




//Public funcs

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








//Helper funcs

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


    const getPreviousPlayers = (
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
