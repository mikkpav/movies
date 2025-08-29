import { useEffect, useState, useCallback, useRef } from 'react';
import type { Movie } from '../../../types/movies';
import { getPopularMovies } from '../../../api/movies';

export function usePopularMovies() {
    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const didLoad = useRef(false);

    const fetchMovies = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const movies = await getPopularMovies();
            setMovies(movies.data);
        } catch (err) {
            console.log(err);
            setError('Failed to fetch popular movies');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (didLoad.current) return;
        didLoad.current = true;

        fetchMovies();
    }, [fetchMovies]);

    return { movies, loading, error, retry: fetchMovies };
}
