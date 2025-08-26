import FavoriteOff from '../assets/favoriteOff.png';
import FavoriteOn from '../assets/favoriteOn.png';
import type { Favorite } from '../types/movies';

type FavoriteToggleProps = {
    movieId: number;
    favorites: Favorite[];
    toggleFavorite: (id: number) => void;
}

export default function FavoriteToggle({ movieId, favorites, toggleFavorite}: FavoriteToggleProps) {
    return (
        <button onClick={ () => toggleFavorite(movieId) } className='w-6 bg-transparent'>
            <img 
                src={ favorites.map(f => f.movieId).includes(movieId) ? FavoriteOn : FavoriteOff }
                alt='Favorite'>
            </img>
        </button>
    )
}