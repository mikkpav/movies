import FavoriteOff from '../assets/favoriteOff.png';
import FavoriteOn from '../assets/favoriteOn.png';

type FavoriteToggleProps = {
    movieId: number;
    favorites: number[];
    toggleFavorite: (id: number) => void;
}

export default function FavoriteToggle({ movieId, favorites, toggleFavorite}: FavoriteToggleProps) {
    return (
        <button onClick={ () => toggleFavorite(movieId) } className='w-6 bg-transparent'>
            <img 
                src={ favorites.includes(movieId) ? FavoriteOn : FavoriteOff }
                alt='Favorite'>
            </img>
        </button>
    )
}