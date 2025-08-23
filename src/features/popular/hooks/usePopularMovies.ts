import { useEffect, useState, useCallback } from 'react';
import type { Movie } from '../../../types/movies';
import { getPopularMovies } from '../../../api/movieApi';

export function usePopularMovies() {
    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMovies = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getPopularMovies();
            setMovies(data);
        } catch (err) {
            console.log(err)
            setError('Failed to fetch popular movies');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    return { movies, loading, error, retry: fetchMovies };
}
