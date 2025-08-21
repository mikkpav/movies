import { useEffect, useState, useCallback } from 'react';
import type { MovieDetails } from '../../../types/movies';
import { getMovieDetails } from '../../../api/movieApi';

export function useMovieDetails(id: string) {
    const [details, setDetails] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchMovieDetails = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getMovieDetails(id);
            setDetails(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMovieDetails();
    }, [fetchMovieDetails]);

    return { details, loading, error, retry: fetchMovieDetails };
}
