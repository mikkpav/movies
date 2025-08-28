import { useState, useCallback, useEffect } from 'react';
import { toggleFavoriteMovie, getFavorites } from '../../../api/moviesApi';
import type { Favorite } from '../../../types/movies';

export function useFavorites() {
    const [favorites, setFavorites] = useState<Favorite[]>([]);

    useEffect(() => {
        getFavorites().then(response => {
            console.log(`>> Fetched favorites from backend: ${response.data}`)
            setFavorites(response.data);
        }).catch(err => {
            console.error("Error fetching favorites: ", err);
        });
    }, []);

    const toggleFavorite = useCallback((id: number) => {
        toggleFavoriteMovie(id)
            .then(response => {
                const { movieId, action, createdAt } = response.data;
                console.log('- toggle response: ', movieId, action, createdAt)
                setFavorites(prev => 
                    action === 'added'
                    ? [...prev, { movieId: movieId, createdAt: createdAt } ]
                    : prev.filter(f => f.movieId !== movieId)
                ) 
            })
            .catch(error => {
                console.error("Error toggling favorite:", error);
            })
    }, []);

    return { favorites, toggleFavorite };
}