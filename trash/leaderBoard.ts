

type GameResult = {
    winner: string;
    players: string[];

    // If only four players max...
    // playerOne: string;
    // playerTwo: string;
    // playerThree: string;
    // plaeryFour: string;
};

type LeaderboardEntry = {
    wins: number;
    losses: number;
    avg: number; // we'll need to make a string for rounding and display...
    player: string;
};

const dummyGameResults: GameResult[] = [
    {
        winner: "Bryson",
        players: [
            "Zack",
            "Bryson",
            "Tom",
        ],
    },
    {
        winner: "Bryson",
        players: [
            "Bryson",
            "Tom",
            "Suzzie",
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

const getLeaderboard = (
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



const formatAvg = (
    avg: number,
): string => `${(avg * 100).toFixed(1)}%`;

const getLeaderboardWithFormattedAvg = (
    games: GameResult[],
): (LeaderboardEntry & { formattedAvg: string })[] => getLeaderboard(
    games,
)
    .map(
        entry => ({
            ...entry,
            formattedAvg: formatAvg(entry.avg),
        })
    )
;

type HeadToHead = {
    playerA: string;
    playerB: string;
    gamesTogether: number;
    playerAWins: number;
    playerBWins: number;
};

const getHeadToHead = (
    games: GameResult[],
    playerA: string,
    playerB: string,
): HeadToHead => {

    const gamesTogether = games.filter(
        x => x.players.includes(playerA)
            && x.players.includes(playerB)
    );

    return {
        playerA,
        playerB,
        gamesTogether: gamesTogether.length,
        playerAWins: gamesTogether.filter(
            x => x.winner === playerA
        ).length,
        playerBWins: gamesTogether.filter(
            x => x.winner === playerB
        ).length,
    };
};


const getLongestWinStreak = (
    games: GameResult[],
    player: string,
): number => games
    .filter(
        x => x.players.includes(player)
    )
    .reduce(
        (streak, game) => {
            const current = game.winner === player
                ? streak.current + 1
                : 0;

            return {
                current,
                longest: Math.max(streak.longest, current),
            };
        },
        { current: 0, longest: 0 },
    )
    .longest
;

type FrequentOpponent = {
    opponent: string;
    gamesTogether: number;
};

const getMostFrequentOpponents = (
    games: GameResult[],
    player: string,
): FrequentOpponent[] => Object.entries(
    games
        .filter(
            x => x.players.includes(player)
        )
        .flatMap(
            x => x.players.filter(p => p !== player)
        )
        .reduce<Record<string, number>>(
            (counts, opponent) => ({
                ...counts,
                [opponent]: (counts[opponent] ?? 0) + 1,
            }),
            {},
        )
)
    .map(
        ([opponent, gamesTogether]) => ({ opponent, gamesTogether })
    )
    .sort(
        (a, b) => b.gamesTogether - a.gamesTogether
    )
;

console.log(
    getLeaderboardWithFormattedAvg(dummyGameResults),
);
console.log(
    getHeadToHead(dummyGameResults, "Bryson", "Tom"),
);
console.log(
    "Bryson's longest win streak:",
    getLongestWinStreak(dummyGameResults, "Bryson"),
);
console.log(
    "Tom's most frequent opponents:",
    getMostFrequentOpponents(dummyGameResults, "Tom"),
);
