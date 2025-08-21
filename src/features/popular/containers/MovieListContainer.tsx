import { ErrorMessage } from '../../../ErrorMessage';
import { usePopularMovies } from '../hooks/usePopularMovies';
import MovieList from '../components/MovieList';

export default function MovieListContainer() {
  const { movies, loading, error, retry } = usePopularMovies();

  if (loading) return <div />;
  if (error) return <ErrorMessage message={error.message} onRetry={retry} />;

  return movies && <MovieList movies={movies} />;
}
