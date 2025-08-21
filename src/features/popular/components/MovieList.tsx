import type { Movie } from '../../../types/movies';
import MovieListItem from './MovieListItem';

type MovieListProps = {
    movies: Movie[]
};

export default function MovieList({ movies }: MovieListProps) {
    return (
        <ul className='flex flex-col gap-4'>
        {movies.map( movie => (
          <li key={movie.id}>
            <MovieListItem movie={movie} />
          </li>
        ))}
      </ul>
    )
}