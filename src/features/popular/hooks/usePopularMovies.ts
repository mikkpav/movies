import { useEffect, useState, useCallback } from 'react';
import type { Movie } from '../../../types/movies';
import { getPopularMovies } from '../../../api/movieApi';

export function usePopularMovies() {
    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchMovies = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getPopularMovies();
            setMovies(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    return { movies, loading, error, retry: fetchMovies };
}
