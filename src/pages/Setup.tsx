import { useState } from 'react';
import type { Player } from '../types';

interface SetupProps {
    players: Player[];
    onAddPlayer: (name: string) => void;
}

export const Setup = ({ players, onAddPlayer }: SetupProps) => {
    const [playerName, setPlayerName] = useState('');

    const addPlayer = () => {
        const trimmed = playerName.trim();
        if (trimmed === '') return;
        onAddPlayer(trimmed);
        setPlayerName('');
    };

    return (
        <div className="max-w-md mx-auto mt-12">
            <h1 className="text-2xl font-bold mb-4">Setup</h1>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Player name"
                    className="input input-bordered flex-1"
                />
                <button type="button" className="btn btn-primary" onClick={addPlayer}>
                    Add player
                </button>
            </div>

            <ul className="mt-6 space-y-1">
                {players.map((player) => (
                    <li key={player.id} className="px-3 py-2 rounded bg-base-200">
                        {player.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};
