import LeftMenuItem from './LeftMenuItem';
import LeftMenuSearchItem from './LeftMenuSearchItem';
import { useNavigate } from 'react-router-dom';

export default function LeftMenu() {
    const navigate = useNavigate();

    const handleSelect = (movieId: number) => {
        console.log('>>> selected movie: ', movieId);
        navigate(`/movie/${movieId}`);
    };

    return (
        <div className="flex flex-col flex-1 text-lg gap-2">
            <LeftMenuItem to="/">Popular</LeftMenuItem>
            <LeftMenuItem to="/favorites">Favorites</LeftMenuItem>
            <LeftMenuSearchItem onSelect={handleSelect} />
        </div>
    );
}
