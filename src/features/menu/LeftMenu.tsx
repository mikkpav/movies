import LeftMenuItem from './LeftMenuItem';
import LeftMenuSearchItem from './LeftMenuSearchItem';
import type { SearchMovieItem } from '../../types/movies';

export default function LeftMenu() {
    const handleSelect = (item: SearchMovieItem) => {
        console.log('>>> selected movie: ', item.title);
    };

    return (
        <div className="flex flex-col flex-1 text-lg gap-2">
            <LeftMenuItem to="/">Popular</LeftMenuItem>
            <LeftMenuItem to="/favorites">Favorites</LeftMenuItem>
            <LeftMenuSearchItem
                results={[
                    { id: '234', title: 'Batman' },
                    { id: '234345', title: 'Interstellar' },
                ]}
                onSelect={handleSelect}
            />
        </div>
    );
}
