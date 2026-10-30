import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import localforage from "localforage";

type SetupProps = {
    previousPlayers: string[];
    onStartGame: (players: string[]) => void;
    setTitle: (t: string) => void;
};

export const Setup: React.FC<SetupProps> = ({
    previousPlayers,
    onStartGame,
    setTitle,
}) => {

    // hooks
    const [availablePlayers, setAvailablePlayers] = useState(
        previousPlayers.map(
            x => (
                {
                    name: x,
                    checked: false,
                }
            )
        )
    );

    const [newPlayerName, setNewPlayerName] = useState("");

    useEffect(
        () => setTitle("Setup"),
        [],
    );

    const nav = useNavigate();

    //
    // derived or calculated state and helpers
    //
    const chosenPlayers = availablePlayers
        .filter(
            x => x.checked
        )
        .map(
            x => x.name
        );

    // Battleship is always two players
    const readyToPlay = chosenPlayers.length === 2;

    const validateAndAdd = () => {
        const trimmedName = newPlayerName.trim();

        // check for dupe names
        const dupe = availablePlayers.find(
            x => x.name.toUpperCase() === trimmedName.toUpperCase()
        );
        //check marks the name if it is a dupe
        if (dupe) {
        console.log(`"${trimmedName}" is a dupe of "${dupe.name}", so it was checked instead of added`);
        }

        setAvailablePlayers(
            prev => [
                // a dupe isn't added again, it just gets checked
                ...prev.map(
                    x => x === dupe
                        ? {
                            name: x.name,
                            checked: true,
                        }
                        : x
                ),
                // a new name is added, already checked
                ...(
                    dupe
                        ? []
                        : [
                            {
                                name: trimmedName,
                                checked: true,
                            }
                        ]
                ),
            ]
        );

        setNewPlayerName(
            ""
        );
    };

    //
    // return the jsx
    //
    return (
        <div
            className="flex flex-col"
        >
            
            <div
                className="join mt-3 mb-5 w-full lg:w-64"
            >
                <input
                    className="input join-item w-full"
                    placeholder="Enter player name"
                    value={
                        newPlayerName
                    }
                    onChange={
                        (e) => setNewPlayerName(
                            e.target.value
                        )
                    }
                />
                <button
                    className="btn join-item"
                    disabled={
                        newPlayerName.trim().length === 0
                    }
                    onClick={
                        validateAndAdd
                    }
                >
                    Add
                </button>
            </div>
            {
                availablePlayers.map(
                    x => (
                        <p
                            key={x.name}
                            className="my-3"
                        >
                            <label
                                className="text-lg"
                            >
                                <input
                                    type="checkbox"
                                    className="checkbox checkbox-lg mr-3"
                                    checked={
                                        x.checked
                                    }
                                    onChange={
                                        (e) => setAvailablePlayers(
                                            players => players.map(
                                                player => player.name === x.name
                                                    ? {
                                                        ...player,
                                                        checked: e.target.checked,
                                                    }
                                                    : player
                                            )
                                        )
                                    }
                                />
                                {x.name}
                            </label>
                        </p>
                    )
                )
            }
            <button
                className="btn btn-primary btn-lg mt-3 w-full lg:w-64"
                disabled={
                    !readyToPlay
                }
                onClick={
                    () => {
                        onStartGame(chosenPlayers);
                        nav('/play');
                    }
                }
            >
                {
                    readyToPlay
                        ? `Play ${chosenPlayers[0]} vs ${chosenPlayers[1]}`
                        : "Choose 2 players"
                }
            </button>
            {
                // only exists while developing (npm run dev), never in a real build
                import.meta.env.DEV && (
                    <button
                        className="btn btn-sm btn-outline mt-10 w-full lg:w-64"
                        onClick={
                            () => {
                                localStorage.clear();
                                localforage.clear().then(() => window.location.reload());
                            }
                        }
                    >
                        Reset all saved data (dev only)
                    </button>
                )
            }
        </div>
    );
};
