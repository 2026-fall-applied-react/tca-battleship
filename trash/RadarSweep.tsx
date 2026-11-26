import { useLocation } from 'react-router';


export const RadarSweep: React.FC = () => {
    const { pathname } = useLocation();

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
            <div key={pathname} className="radar-sweep" />
        </div>
    );
};
