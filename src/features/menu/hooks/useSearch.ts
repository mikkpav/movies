import { useState, useCallback, useEffect } from 'react';
import type { Movie } from '../../../types/movies';
import { searchForMovies } from '../../../api/movies';

export default function useSearch(query: string) {
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchMovies = useCallback(async () => {
        if (query.length < 2) {
            setSearchResults([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const movies = await searchForMovies(query);
            setSearchResults(movies.data.results);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch favorite movies');
        } finally {
            setLoading(false);
        }
    }, [query]);

    useEffect(() => {
        searchMovies();
    }, [searchMovies]);

    return { searchResults, loading, error, retry: searchMovies };
}