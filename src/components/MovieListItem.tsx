import type { Movie, MovieDetails } from '../types/movies';
import { useNavigate } from 'react-router-dom';
import FavoriteToggle from './FavoriteToggle';
import { useFavoritesContext } from '../contexts/FavoritesContext';

type MovieListItemProps = {
    movie: Movie | MovieDetails;
};

export default function MovieListItem({ movie }: MovieListItemProps) {
    const navigate = useNavigate();
    const { favorites, toggleFavorite } = useFavoritesContext();

    function navigateToMovieDetails() {
        navigate(`/movie/${movie.id}`);
    }

    return (
        <div className="flex flex-row p-2 pr-4 max-h-40 bg-gray-100 rounded-2xl">
            <img
                src={movie.posterPathSmall}
                alt={movie.title}
                className="object-contain cursor-pointer"
                onClick={navigateToMovieDetails}
            />
            <div className="flex flex-col justify-end gap-2">
                <section className="flex justify-between">
                    <h1 className="font-list-item-title line-clamp-2">
                        {movie.title}
                    </h1>
                    <FavoriteToggle
                        movieId={movie.id}
                        favorites={favorites}
                        toggleFavorite={toggleFavorite}
                    />
                </section>
                <p
                    className="flex-1 font-list-item-content cursor-pointer"
                    onClick={navigateToMovieDetails}
                >
                    <span className='line-clamp-3'>{movie.overview}</span>
                </p>
                <p className='font-list-item-content'>{movie.voteAverage}</p>
            </div>
        </div>
    );
}
