import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import type { AppOutletContext } from '../types';

export const Setup = () => {
    const nav = useNavigate();
    const { players, onAddPlayer } = useOutletContext<AppOutletContext>();
    const [playerName, setPlayerName] = useState('');

    const addPlayer = () => {
        const trimmed = playerName.trim();
        if (trimmed === '') return;

        const isFirstPlayer = players.length === 0;

        onAddPlayer(trimmed);
        setPlayerName('');
        // I think this method of initiating a game is incorrect. 
        if (isFirstPlayer) {
            nav('/play');
        }
    };

    // Function to clear local storage and refresh the page, remove after testing
    const handleClearAndRefresh = () => {
        localStorage.clear();
        // localStorage.removeItem('tca-battleship:grid');
        // localStorage.removeItem('tca-battleship:players');
        // localStorage.removeItem('tca-battleship:theme');
        window.location.reload(); 
        console.log('Local storage cleared and page refreshed.');
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
            <div className="flex justify-center items-center p-2 mt-4">
                <button type="button" className="btn btn-primary"
                    onClick={handleClearAndRefresh} 
                >
                    Reset (dev only)
                </button>
            </div>
        </div>
    );
};
