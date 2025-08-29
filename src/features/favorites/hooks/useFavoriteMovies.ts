import { useEffect, useState, useCallback } from 'react';
import type { MovieDetails } from '../../../types/movies';
import { getFavoriteMovies } from '../../../api/movies';
import { useFavoritesContext } from './FavoritesContext';

export function useFavoriteMovies() {
    const { favorites } = useFavoritesContext();
    const [favoriteMovies, setFavoriteMovies] = useState<MovieDetails[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMovies = useCallback(async () => {
        if (!favorites.length) {
            setFavoriteMovies([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const favoriteMovies = await getFavoriteMovies();
            setFavoriteMovies(favoriteMovies.data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch favorite movies');
        } finally {
            setLoading(false);
        }
    }, [favorites]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    return { favoriteMovies, loading, error, retry: fetchMovies };
}
