import { useLocation } from 'react-router';

// Any image works here: a file in the public folder ("/sweep.svg") or a full
// URL ("https://michaelrooney.dev/img/og-image.png").
const SWEEP_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/3/3e/English_pattern_king_of_clubs.svg';

export const ImageSweep: React.FC = () => {
    const { pathname } = useLocation();

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
            <img key={pathname} src={SWEEP_IMAGE} alt="" className="image-sweep" />
        </div>
    );
};
