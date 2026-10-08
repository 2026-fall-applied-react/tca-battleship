
type Shot = {
    game: number;         // which dummy game this shot happened in
    player: string;       // who took the shot
    coordinate: string;   // Battleship-style grid reference, e.g. "C5"
    result: "hit" | "miss";
};


const dummyShots: Shot[] = [
    { game: 0, player: "Zack", coordinate: "C5", result: "miss" },
    { game: 0, player: "Bryson", coordinate: "C5", result: "hit" },
    { game: 0, player: "Zack", coordinate: "C6", result: "miss" },
    { game: 0, player: "Bryson", coordinate: "D5", result: "miss" },
    { game: 0, player: "Zack", coordinate: "C5", result: "hit" },
    { game: 0, player: "Bryson", coordinate: "A1", result: "miss" },
    { game: 1, player: "Bryson", coordinate: "H8", result: "hit" },
    { game: 1, player: "Tom", coordinate: "H8", result: "hit" },
    { game: 1, player: "Bryson", coordinate: "H9", result: "miss" },
    { game: 1, player: "Tom", coordinate: "G8", result: "miss" },
    { game: 1, player: "Bryson", coordinate: "H8", result: "miss" },
    { game: 1, player: "Suzzie", coordinate: "J10", result: "miss" },
    { game: 2, player: "Zack", coordinate: "C5", result: "hit" },
    { game: 2, player: "Suzzie", coordinate: "B2", result: "miss" },
    { game: 2, player: "Zack", coordinate: "C4", result: "miss" },
    { game: 3, player: "John", coordinate: "H8", result: "miss" },
    { game: 3, player: "Tom", coordinate: "A1", result: "hit" },
];

type Coordinate = {
    col: number; // 0-based: A -> 0, B -> 1, ...
    row: number; // 0-based: "1" -> 0, "2" -> 1, ...
};


const parseCoordinate = (
    coordinate: string,
): Coordinate => ({
    col: coordinate.charCodeAt(0) - "A".charCodeAt(0),
    row: Number(coordinate.slice(1)) - 1,
});


const buildShotCountGrid = (
    shots: Shot[],
    boardSize: number = 10,
): number[][] => shots.reduce(
    (grid, shot) => {
        const { col, row } = parseCoordinate(shot.coordinate);
        grid[row][col] += 1;
        return grid;
    },
    Array.from({ length: boardSize }, () => Array(boardSize).fill(0)) as number[][],
);



const buildHitRateGrid = (
    shots: Shot[],
    boardSize: number = 10,
): (number | null)[][] => {
    const totalGrid = buildShotCountGrid(shots, boardSize);
    const hitGrid = buildShotCountGrid(
        shots.filter(x => x.result === "hit"),
        boardSize,
    );

    return totalGrid.map(
        (row, r) => row.map(
            (total, c) => total === 0 ? null : hitGrid[r][c] / total
        )
    );
};

type CoordinateHeat = {
    coordinate: string;
    shots: number;
};


const getMostTargetedCoordinates = (
    shots: Shot[],
    topN: number = 5,
): CoordinateHeat[] => Object.entries(
    shots.reduce<Record<string, number>>(
        (counts, shot) => ({
            ...counts,
            [shot.coordinate]: (counts[shot.coordinate] ?? 0) + 1,
        }),
        {},
    )
)
    .map(
        ([coordinate, shots]) => ({ coordinate, shots })
    )
    .sort(
        (a, b) => b.shots - a.shots
    )
    .slice(0, topN)
;

type ColumnHeat = {
    column: string;
    shots: number;
};


const getColumnHeat = (
    shots: Shot[],
): ColumnHeat[] => Object.entries(
    shots.reduce<Record<string, number>>(
        (counts, shot) => {
            const column = shot.coordinate[0].toUpperCase();
            return {
                ...counts,
                [column]: (counts[column] ?? 0) + 1,
            };
        },
        {},
    )
)
    .map(
        ([column, shots]) => ({ column, shots })
    )
    .sort(
        (a, b) => a.column.localeCompare(b.column)
    )
;



console.log(
    "Most targeted coordinates:",
    getMostTargetedCoordinates(dummyShots),
);
console.log(
    "Column heat:",
    getColumnHeat(dummyShots),
);
console.log(
    "Hit-rate grid, rows 1-4 and columns A-F only (full 10x10 is mostly nulls with this little dummy data):",
    buildHitRateGrid(dummyShots).slice(0, 4).map(row => row.slice(0, 6)),
);
