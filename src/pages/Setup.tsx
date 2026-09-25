import { useState } from 'react';

export const Setup = () => {
    const [playerName, setPlayerName] = useState('');

    const [players, setPlayers] = useState<string[]>([]);

    const addPlayer = () => {
        const trimmed = playerName.trim();
        if (trimmed === '') return;

        setPlayers((current) => [...current, trimmed]);
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
                {players.map((name, index) => (
                    <li key={index} className="px-3 py-2 rounded bg-base-200">
                        {name}
                    </li>
                ))}
            </ul>
        </div>
    );
};
