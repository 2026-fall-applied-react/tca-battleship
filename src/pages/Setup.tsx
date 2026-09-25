import { useState } from 'react';

export const Setup = () => {
    const [playerName, setPlayerName] = useState('');

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
                <button type="button" className="btn btn-primary">
                    Add player
                </button>
            </div>
        </div>
    );
};
