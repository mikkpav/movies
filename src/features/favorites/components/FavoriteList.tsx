import type { MovieDetails } from '../../../types/movies';
import MovieListItem from '../../popular/components/MovieListItem';

type FavoriteListProps = {
    favoriteMovies: MovieDetails[];
}

export default function FavoriteList({ favoriteMovies }: FavoriteListProps ) {
    return favoriteMovies.length 
        ? ( <ul className='flex flex-col gap-4'>
                { favoriteMovies.map(movie => (
                    <li key={movie.id}>
                        <MovieListItem movie={movie} />
                    </li>
                ))}
            </ul>)
        : (
            <div className='flex w-full items-center'>
                <p className='w-full text-center'>No favorites selected</p>
            </div>
        );
}