import { useState, useCallback } from 'react';

export function useFavorites() {
    const STORAGE_KEY = 'favorites';
    const [favorites, setFavorites] = useState<number[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    const toggleFavorite = useCallback((id: number) => {
        setFavorites((prev) => {
            const updated = prev.includes(id)
                ? prev.filter(prevId => prevId !== id)
                : [...prev, id];
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    }, []);

    return { favorites, toggleFavorite };
}