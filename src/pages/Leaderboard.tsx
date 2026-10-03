import { useNavigate } from "react-router";

type leaderboard = {
    leaderboard: LeaderboardEntry[];
}

export const Leaderboard: React.FC<leaderboard> = () => {
    console.log(LeaderboardEntry)
    const nav = useNavigate();
    return (
        <div>
            <h1>Leaderboard</h1>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => nav('/')}
            >
                Go Home
            </button>
        </div>
    );
}
