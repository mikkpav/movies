import { ErrorMessage } from '../../../ErrorMessage';
import MovieDetails from '../components/MovieDetails';
import { useMovieDetails } from '../hooks/useMovieDetails';

type MovieDetailsContainerProps = {
    id: number
}

export default function MovieDetailsContainer({ id }: MovieDetailsContainerProps) {
    const { details, loading, error, retry } = useMovieDetails(id);

    if (loading) return <div />;
    if (error) return <ErrorMessage message={error.message} onRetry={retry} />;
    
    return details && <MovieDetails details={details} />;
}