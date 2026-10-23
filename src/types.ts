

export type CellState = 'empty' | 'hit' | 'miss' | 'sunk';

// The 10x10 board as ONE flat list of 100 cells, not a list of rows.
// The cell at (row, col) is at index row * 10 + col.
export type Grid = CellState[];

export type ShipId = 'carrier' | 'battleship' | 'cruiser' | 'submarine' | 'destroyer';

export type ShipDef = {
    id: ShipId;
    name: string;
    size: number;
};

export const FLEET: ShipDef[] = [
    { id: 'carrier', name: 'Carrier', size: 5 },
    { id: 'battleship', name: 'Battleship', size: 4 },
    { id: 'cruiser', name: 'Cruiser', size: 3 },
    { id: 'submarine', name: 'Submarine', size: 3 },
    { id: 'destroyer', name: 'Destroyer', size: 2 },
];

export type ShipStatus = 'afloat' | 'sunk';

// One status per ship. Record<ShipId, ShipStatus> means every ship must have an entry
export type FleetStatus = Record<ShipId, ShipStatus>;

// One line of the shot history: where you fired, what you marked, and when.
export type ShotLogEntry = {
    row: number;
    col: number;
    result: CellState;
    timestamp: number;
};

export type Theme = 'light' | 'dark';
