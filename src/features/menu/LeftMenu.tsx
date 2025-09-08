import { useAuth } from '../../contexts/useAuth';
import LeftMenuItem from './LeftMenuItem';
import LeftMenuSearchItem from './LeftMenuSearchItem';
import { useNavigate } from 'react-router-dom';

export default function LeftMenu() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleSelect = (movieId: number) => {
        navigate(`/movie/${movieId}`);
    };

    return (
        <div className="flex flex-col flex-1 text-lg gap-2">
            <LeftMenuSearchItem onSelect={handleSelect} />
            <LeftMenuItem to='/'>Popular</LeftMenuItem>
            <LeftMenuItem to='/favorites' disabled={ user===null }>Favorites</LeftMenuItem>
        </div>
    );
}
