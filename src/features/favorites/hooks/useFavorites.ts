import { useState, useCallback, useEffect } from 'react';
import { toggleFavoriteMovie, getFavorites } from '../../../api/moviesAuthenticated';
import type { Favorite } from '../../../types/movies';
import { useAuth } from '../../../contexts/useAuth';

export function useFavorites() {
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            getFavorites()
                .then((response) => {
                    console.log(response.data);
                    setFavorites(response.data);
                })
                .catch((err) => {
                    console.error('Error fetching favorites: ', err);
                });
        } else {
            setFavorites([]);
        }
    }, [user]);

    const toggleFavorite = useCallback((id: number) => {
        if (!user) {
            
            return;
        }
        
        toggleFavoriteMovie(id)
            .then((response) => {
                const { movieId, action, createdAt } = response.data;
                setFavorites((prev) =>
                    action === 'added'
                        ? [...prev, { movieId: movieId, createdAt: createdAt }]
                        : prev.filter((f) => f.movieId !== movieId)
                );
            })
            .catch((error) => {
                console.error('Error toggling favorite:', error);
            });
    }, [user]);

    return { favorites, toggleFavorite };
}
