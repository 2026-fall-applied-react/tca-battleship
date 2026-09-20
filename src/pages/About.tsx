import { useNavigate } from "react-router";

export const About = () => {
    const nav = useNavigate();
    return (
        <div>
            <h1>About</h1>
            <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => nav(-1)}
            >
                Go Home
            </button>
        </div>
    )
};
