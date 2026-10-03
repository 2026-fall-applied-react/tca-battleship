import { useParams, useOutletContext } from 'react-router';
import type { AppOutletContext } from '../types';

export const PlayerDetail = () => {
    const { id } = useParams();
    const { players } = useOutletContext<AppOutletContext>();

    const player = players.find((p) => p.id === id);

    if (!player) {
        return (
            <div className="max-w-md mx-auto mt-12 text-center">
                <h1 className="text-2xl font-bold mb-2">Player not found</h1>
                <p className="text-base-content/70">
                    No player matches the id "{id}".
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-12 text-center">
            <h1 className="text-2xl font-bold mb-2">{player.name}</h1>
            <p className="text-base-content/70">Player id: {player.id}</p>
        </div>
    );
};
