import FavoriteOff from '../assets/favoriteOff.png';
import FavoriteOn from '../assets/favoriteOn.png';
import type { Favorite } from '../types/movies';
import  { Tooltip } from 'react-tooltip';

type FavoriteToggleProps = {movieId: number;
    favorites: Favorite[];
    toggleFavorite: (id: number) => void;
}

export default function FavoriteToggle({ movieId, favorites, toggleFavorite}: FavoriteToggleProps) {
    const isFavorite = favorites.map(f => f.movieId).includes(movieId);
    const showTooltip = !favorites || favorites.length === 0;
    
    return (
        <>
            <button 
                onClick={ () => toggleFavorite(movieId) } 
                className='w-6 bg-transparent'
                data-tooltip-content={showTooltip ? 'Log in to save favorites' : ''}
                data-tooltip-id='toggle-tooltip'
                >
                <img 
                    src={ isFavorite ? FavoriteOn : FavoriteOff }
                    alt='Favorite'>
                </img>
            </button>
            <Tooltip id='toggle-tooltip' place='top'/>
        </>
    )
}