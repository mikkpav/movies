import { ErrorMessage } from '../../../ErrorMessage';
import { usePopularMovies } from '../hooks/usePopularMovies';
import MovieList from '../components/MovieList';

export default function MovieListContainer() {
    const { movies, loading, error, retry } = usePopularMovies();

    if (loading) return <div />;
    if (error) return <ErrorMessage message={error} onRetry={retry} />;

    return (
        <div className="flex flex-col gap-10">
            <h1 className="header-font">The most popular movies out now</h1>
            {movies && <MovieList movies={movies} />}
        </div>
    );
}
